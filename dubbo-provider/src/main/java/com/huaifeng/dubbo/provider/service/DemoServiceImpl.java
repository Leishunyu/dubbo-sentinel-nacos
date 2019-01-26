/*
 * Copyright (C) 2009-2018 Hangzhou FanDianEr Technology Co., Ltd. All rights reserved
 */
package com.huaifeng.dubbo.provider.service;

import com.huaifeng.dubbo.DemoService;

/**
 * DemoServiceImpl
 *
 * @author huaifeng
 * @since 2019-01-26
 */
public class DemoServiceImpl implements DemoService {
    @Override
    public void sayHello() {
        System.out.println("!111");
    }
}
