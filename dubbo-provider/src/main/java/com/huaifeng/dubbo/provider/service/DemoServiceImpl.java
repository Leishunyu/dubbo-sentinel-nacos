/*
 * Copyright (C) 2009-2018 Hangzhou FanDianEr Technology Co., Ltd. All rights reserved
 */
package com.huaifeng.dubbo.provider.service;

import com.alibaba.csp.sentinel.annotation.SentinelResource;
import com.alibaba.dubbo.config.annotation.Service;
import com.huaifeng.dubbo.DemoService;

/**
 * DemoServiceImpl
 *
 * @author huaifeng
 * @since 2019-01-26
 */
@Service
public class DemoServiceImpl implements DemoService {
    @Override
    @SentinelResource("test")

    public void sayHello() {
        System.out.println("!111");
    }
}
