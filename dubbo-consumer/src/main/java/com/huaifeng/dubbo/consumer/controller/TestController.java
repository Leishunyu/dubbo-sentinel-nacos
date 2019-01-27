/*
 * Copyright (C) 2009-2018 Hangzhou FanDianEr Technology Co., Ltd. All rights reserved
 */
package com.huaifeng.dubbo.consumer.controller;

import com.alibaba.dubbo.config.annotation.Reference;
import com.huaifeng.dubbo.DemoService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * TestController
 *
 * @author huaifeng
 * @since 2019-01-27
 */
@RestController
public class TestController {
    @Reference
    private DemoService demoService;

    @GetMapping("/test")
    public String test(){
        demoService.sayHello();
        return "test";
    }
}
