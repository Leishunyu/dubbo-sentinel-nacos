/*
 * Copyright (C) 2009-2018 Hangzhou FanDianEr Technology Co., Ltd. All rights reserved
 */
package com.huaifeng.dubbo.provider.config;

import com.alibaba.csp.sentinel.datasource.ReadableDataSource;
import com.alibaba.csp.sentinel.datasource.nacos.NacosDataSource;
import com.alibaba.csp.sentinel.init.InitFunc;
import com.alibaba.csp.sentinel.slots.block.flow.FlowRule;
import com.alibaba.csp.sentinel.slots.block.flow.FlowRuleManager;
import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.TypeReference;

import java.util.List;

/**
 * DataSourceInitFunc
 *
 * @author huaifeng
 * @since 2019-01-28
 */
public class DataSourceInitFunc implements InitFunc {
    @Override
    public void init() throws Exception {
        final String remoteAddress = "localhost:8848";
        final String groupId = "Sentinel:Demo";
        final String dataId = "test-providercom.alibaba.csp.sentinel.demo.flow.rule";

        ReadableDataSource<String, List<FlowRule>> flowRuleDataSource = new NacosDataSource<>(remoteAddress, groupId, dataId,
                source -> JSON.parseObject(source, new TypeReference<List<FlowRule>>() {}));
        FlowRuleManager.register2Property(flowRuleDataSource.getProperty());

    }
}
