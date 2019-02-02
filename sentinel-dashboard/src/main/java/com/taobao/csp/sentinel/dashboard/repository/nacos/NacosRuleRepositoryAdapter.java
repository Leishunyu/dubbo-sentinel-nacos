/*
 * Copyright (C) 2009-2018 Hangzhou FanDianEr Technology Co., Ltd. All rights reserved
 */
package com.taobao.csp.sentinel.dashboard.repository.nacos;

import com.alibaba.csp.sentinel.datasource.Converter;
import com.alibaba.nacos.api.config.ConfigService;
import com.alibaba.nacos.api.exception.NacosException;
import com.taobao.csp.sentinel.dashboard.datasource.entity.rule.RuleEntity;
import com.taobao.csp.sentinel.dashboard.discovery.MachineInfo;
import com.taobao.csp.sentinel.dashboard.repository.rule.RuleRepository;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;

import javax.annotation.Resource;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;
import java.util.stream.Collectors;

/**
 * NacosRuleRepositoryAdapter
 *
 * @author huaifeng
 * @since 2019-01-29
 */
public abstract class NacosRuleRepositoryAdapter<T extends RuleEntity> implements RuleRepository<T, Long> {
    @Resource
    private ConfigService configService;
    @Autowired
    private Converter<String, List<T>> converter;
    private Map<MachineInfo, Map<Long, T>> machineRules = new ConcurrentHashMap<>(16);
    private Map<Long, T> allRules = new ConcurrentHashMap<>(16);

    private Map<String, Map<Long, T>> appRules = new ConcurrentHashMap<>(16);

    @Autowired
    private Converter<List<T>, String> converterString;
    @Override
    public T save(T entity) throws NacosException {
        if (entity.getId() == null) {
            entity.setId(nextId());
        }
        String ruleJson = configService.getConfig(entity.getApp()+NacosConfigUtil.DATA_ID,NacosConfigUtil.GROUP_ID,10000);
        List<T> list = null;
        if (StringUtils.isBlank(ruleJson)){
            list = new ArrayList<>();
        }else {
            list = converter.convert(ruleJson);
        }
        list.add(entity);
        if (configService.publishConfig(entity.getApp()+ NacosConfigUtil.DATA_ID,NacosConfigUtil.GROUP_ID, converterString.convert(list))){
            T processedEntity = preProcess(entity);
            if (processedEntity != null) {
                allRules.put(processedEntity.getId(), processedEntity);
                machineRules.computeIfAbsent(MachineInfo.of(processedEntity.getApp(), processedEntity.getIp(),
                        processedEntity.getPort()), e -> new ConcurrentHashMap<>(32))
                        .put(processedEntity.getId(), processedEntity);
                appRules.computeIfAbsent(processedEntity.getApp(), v -> new ConcurrentHashMap<>(32))
                        .put(processedEntity.getId(), processedEntity);
            }
            return processedEntity;
        }
        return null;
    }

    protected T preProcess(T entity) {
        return entity;
    }

    /**
     * Get next unused id.
     *
     * @return next unused id
     */
    abstract protected long nextId();

    @Override
    public List<T> saveAll(List<T> rules) {
        allRules.clear();
        machineRules.clear();
        appRules.clear();
        if (rules == null) {
            return null;
        }
        List<T> savedRules = new ArrayList<>(rules.size());
        for (T rule : rules) {
            try {
                savedRules.add(save(rule));
            } catch (NacosException e) {
                e.printStackTrace();
            }
        }
        return savedRules;
    }

    @Override
    public T delete(Long id) {
        T entity = allRules.get(id);
        if (entity != null) {
            try {
                String ruleJson = configService.getConfig(entity.getApp()+NacosConfigUtil.DATA_ID,NacosConfigUtil.GROUP_ID,10000);
                List<T> list = converter.convert(ruleJson);
                Map<Long,T> maps = list.stream().collect(Collectors.toMap(T::getId,t->t));
                if (maps.containsKey(id)){
                    maps.remove(id);
                }
                configService.publishConfig(entity.getApp()+NacosConfigUtil.DATA_ID,NacosConfigUtil.GROUP_ID,converterString.convert(new ArrayList<>(maps.values()) ));
            } catch (NacosException e) {
                e.printStackTrace();
            }
        }
        entity = allRules.remove(id);
        if (entity != null) {
            if (appRules.get(entity.getApp()) != null) {
                appRules.get(entity.getApp()).remove(id);
            }
            machineRules.get(MachineInfo.of(entity.getApp(), entity.getIp(), entity.getPort())).remove(id);
        }
        return entity;
    }

    @Override
    public T findById(Long id) {
        return allRules.get(id);
    }

    @Override
    public List<T> findAllByMachine(MachineInfo machineInfo) {
        return null;
    }

    @Override
    public List<T> findAllByApp(String appName) {
        String ruleJson="";
        try {
            ruleJson = configService.getConfig(appName + NacosConfigUtil.DATA_ID,NacosConfigUtil.GROUP_ID,10000);
        } catch (NacosException e) {
            e.printStackTrace();
        }
        return converter.convert(ruleJson);
    }
}
