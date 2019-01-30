/*
 * Copyright (C) 2009-2018 Hangzhou FanDianEr Technology Co., Ltd. All rights reserved
 */
package com.taobao.csp.sentinel.dashboard.repository.nacos;

import com.alibaba.fastjson.JSON;
import com.alibaba.nacos.api.config.ConfigService;
import com.alibaba.nacos.api.exception.NacosException;
import com.taobao.csp.sentinel.dashboard.datasource.entity.rule.RuleEntity;
import com.taobao.csp.sentinel.dashboard.discovery.MachineInfo;
import com.taobao.csp.sentinel.dashboard.repository.rule.RuleRepository;

import javax.annotation.Resource;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

/**
 * NacosRuleRepository
 *
 * @author huaifeng
 * @since 2019-01-29
 */
public abstract class NacosRuleRepository<T extends RuleEntity> implements RuleRepository<T, Long> {
    @Resource
    private ConfigService configService;
    private Map<MachineInfo, Map<Long, T>> machineRules = new ConcurrentHashMap<>(16);
    private Map<Long, T> allRules = new ConcurrentHashMap<>(16);

    private Map<String, Map<Long, T>> appRules = new ConcurrentHashMap<>(16);

    @Override
    public T save(T entity) throws NacosException {
        if (entity.getId() == null) {
            entity.setId(nextId());
        }
        if (configService.publishConfig(NacosConfigUtil.DATA_ID,NacosConfigUtil.GROUP_ID, JSON.toJSONString(entity))){
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
            savedRules.add(save(rule));
        }
        return savedRules;
    }

    @Override
    public T delete(Long aLong) {
        return null;
    }

    @Override
    public T findById(Long aLong) {
        return null;
    }

    @Override
    public List<T> findAllByMachine(MachineInfo machineInfo) {
        return null;
    }

    @Override
    public List<T> findAllByApp(String appName) {
        return null;
    }
}
