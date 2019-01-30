"use strict";
var app;
angular.module("sentinelDashboardApp", ["oc.lazyLoad", "ui.router", "ui.bootstrap", "angular-loading-bar", "ngDialog", "ui.bootstrap.datetimepicker", "ui-notification", "rzTable", "angular-clipboard", "selectize", "angularUtils.directives.dirPagination"]).config(["$stateProvider", "$urlRouterProvider", "$ocLazyLoadProvider", function (e, r, t) {
    t.config({debug: !1, events: !0}), r.otherwise("/dashboard/home"), e.state("dashboard", {
        url: "/dashboard",
        templateUrl: "app/views/dashboard/main.html",
        resolve: {
            loadMyDirectives: ["$ocLazyLoad", function (e) {
                return e.load({
                    name: "sentinelDashboardApp",
                    files: ["app/scripts/directives/header/header.js", "app/scripts/directives/sidebar/sidebar.js", "app/scripts/directives/sidebar/sidebar-search/sidebar-search.js"]
                })
            }]
        }
    }).state("dashboard.home", {
        url: "/home",
        templateUrl: "app/views/dashboard/home.html",
        resolve: {
            loadMyFiles: ["$ocLazyLoad", function (e) {
                return e.load({name: "sentinelDashboardApp", files: ["app/scripts/controllers/main.js"]})
            }]
        }
    }).state("dashboard.flowV1", {
        templateUrl: "app/views/flow_v2.html",
        url: "/flow/:app",
        controller: "FlowControllerV2",
        resolve: {
            loadMyFiles: ["$ocLazyLoad", function (e) {
                return e.load({name: "sentinelDashboardApp", files: ["app/scripts/controllers/flow_v2.js"]})
            }]
        }
    }).state("dashboard.flow", {
        templateUrl: "app/views/flow_v2.html",
        url: "/v2/flow/:app",
        controller: "FlowControllerV2",
        resolve: {
            loadMyFiles: ["$ocLazyLoad", function (e) {
                return e.load({name: "sentinelDashboardApp", files: ["app/scripts/controllers/flow_v2.js"]})
            }]
        }
    }).state("dashboard.paramFlow", {
        templateUrl: "app/views/param_flow.html",
        url: "/paramFlow/:app",
        controller: "ParamFlowController",
        resolve: {
            loadMyFiles: ["$ocLazyLoad", function (e) {
                return e.load({name: "sentinelDashboardApp", files: ["app/scripts/controllers/param_flow.js"]})
            }]
        }
    }).state("dashboard.clusterAppAssignManage", {
        templateUrl: "app/views/cluster_app_assign_manage.html",
        url: "/cluster/assign_manage/:app",
        controller: "SentinelClusterAppAssignManageController",
        resolve: {
            loadMyFiles: ["$ocLazyLoad", function (e) {
                return e.load({
                    name: "sentinelDashboardApp",
                    files: ["app/scripts/controllers/cluster_app_assign_manage.js"]
                })
            }]
        }
    }).state("dashboard.clusterAppServerList", {
        templateUrl: "app/views/cluster_app_server_list.html",
        url: "/cluster/server/:app",
        controller: "SentinelClusterAppServerListController",
        resolve: {
            loadMyFiles: ["$ocLazyLoad", function (e) {
                return e.load({
                    name: "sentinelDashboardApp",
                    files: ["app/scripts/controllers/cluster_app_server_list.js"]
                })
            }]
        }
    }).state("dashboard.clusterAppClientList", {
        templateUrl: "app/views/cluster_app_client_list.html",
        url: "/cluster/client/:app",
        controller: "SentinelClusterAppTokenClientListController",
        resolve: {
            loadMyFiles: ["$ocLazyLoad", function (e) {
                return e.load({
                    name: "sentinelDashboardApp",
                    files: ["app/scripts/controllers/cluster_app_token_client_list.js"]
                })
            }]
        }
    }).state("dashboard.clusterSingle", {
        templateUrl: "app/views/cluster_single_config.html",
        url: "/cluster/single/:app",
        controller: "SentinelClusterSingleController",
        resolve: {
            loadMyFiles: ["$ocLazyLoad", function (e) {
                return e.load({name: "sentinelDashboardApp", files: ["app/scripts/controllers/cluster_single.js"]})
            }]
        }
    }).state("dashboard.authority", {
        templateUrl: "app/views/authority.html",
        url: "/authority/:app",
        controller: "AuthorityRuleController",
        resolve: {
            loadMyFiles: ["$ocLazyLoad", function (e) {
                return e.load({name: "sentinelDashboardApp", files: ["app/scripts/controllers/authority.js"]})
            }]
        }
    }).state("dashboard.degrade", {
        templateUrl: "app/views/degrade.html",
        url: "/degrade/:app",
        controller: "DegradeCtl",
        resolve: {
            loadMyFiles: ["$ocLazyLoad", function (e) {
                return e.load({name: "sentinelDashboardApp", files: ["app/scripts/controllers/degrade.js"]})
            }]
        }
    }).state("dashboard.system", {
        templateUrl: "app/views/system.html",
        url: "/system/:app",
        controller: "SystemCtl",
        resolve: {
            loadMyFiles: ["$ocLazyLoad", function (e) {
                return e.load({name: "sentinelDashboardApp", files: ["app/scripts/controllers/system.js"]})
            }]
        }
    }).state("dashboard.machine", {
        templateUrl: "app/views/machine.html",
        url: "/app/:app",
        controller: "MachineCtl",
        resolve: {
            loadMyFiles: ["$ocLazyLoad", function (e) {
                return e.load({name: "sentinelDashboardApp", files: ["app/scripts/controllers/machine.js"]})
            }]
        }
    }).state("dashboard.identity", {
        templateUrl: "app/views/identity.html",
        url: "/identity/:app",
        controller: "IdentityCtl",
        resolve: {
            loadMyFiles: ["$ocLazyLoad", function (e) {
                return e.load({name: "sentinelDashboardApp", files: ["app/scripts/controllers/identity.js"]})
            }]
        }
    }).state("dashboard.metric", {
        templateUrl: "app/views/metric.html",
        url: "/metric/:app",
        controller: "MetricCtl",
        resolve: {
            loadMyFiles: ["$ocLazyLoad", function (e) {
                return e.load({name: "sentinelDashboardApp", files: ["app/scripts/controllers/metric.js"]})
            }]
        }
    })
}]), (app = angular.module("sentinelDashboardApp")).filter("range", [function () {
    return function (e, r) {
        if (isNaN(r) || r <= 0) return [];
        e = [];
        for (var t = 1; t <= r; t++) e.push(t);
        return e
    }
}]), (app = angular.module("sentinelDashboardApp")).service("AppService", ["$http", function (e) {
    this.getApps = function () {
        return e({url: "app/briefinfos.json", method: "GET"})
    }
}]), (app = angular.module("sentinelDashboardApp")).service("FlowServiceV1", ["$http", function (a) {
    function r(e) {
        return void 0 === e || "" === e || isNaN(e) || e <= 0
    }

    this.queryMachineRules = function (e, r, t) {
        return a({url: "/v1/flow/rules", params: {app: e, ip: r, port: t}, method: "GET"})
    }, this.newRule = function (e) {
        e.resource, e.limitApp, e.grade, e.count, e.strategy, e.refResource, e.controlBehavior, e.warmUpPeriodSec, e.maxQueueingTimeMs, e.app, e.ip, e.port;
        return a({url: "/v1/flow/rule", data: e, method: "POST"})
    }, this.saveRule = function (e) {
        var r = {
            id: e.id,
            resource: e.resource,
            limitApp: e.limitApp,
            grade: e.grade,
            count: e.count,
            strategy: e.strategy,
            refResource: e.refResource,
            controlBehavior: e.controlBehavior,
            warmUpPeriodSec: e.warmUpPeriodSec,
            maxQueueingTimeMs: e.maxQueueingTimeMs
        };
        return a({url: "/v1/flow/save.json", params: r, method: "PUT"})
    }, this.deleteRule = function (e) {
        var r = {id: e.id, app: e.app};
        return a({url: "/v1/flow/delete.json", params: r, method: "DELETE"})
    }, this.checkRuleValid = function (e) {
        return void 0 === e.resource || "" === e.resource ? (alert("资源名称不能为空"), !1) : void 0 === e.count || e.count < 0 ? (alert("限流阈值必须大于等于 0"), !1) : void 0 === e.strategy || e.strategy < 0 ? (alert("无效的流控模式"), !1) : 1 != e.strategy && 2 != e.strategy || void 0 !== e.refResource && "" != e.refResource ? void 0 === e.controlBehavior || e.controlBehavior < 0 ? (alert("无效的流控整形方式"), !1) : 1 == e.controlBehavior && r(e.warmUpPeriodSec) ? (alert("预热时长必须大于 0"), !1) : 2 == e.controlBehavior && r(e.maxQueueingTimeMs) ? (alert("排队超时时间必须大于 0"), !1) : !e.clusterMode || void 0 !== e.clusterConfig && void 0 !== e.clusterConfig.thresholdType || (alert("集群限流配置不正确"), !1) : (alert("请填写关联资源或入口"), !1)
    }
}]), (app = angular.module("sentinelDashboardApp")).service("FlowServiceV2", ["$http", function (a) {
    function r(e) {
        return void 0 === e || "" === e || isNaN(e) || e <= 0
    }

    this.queryMachineRules = function (e, r, t) {
        return a({url: "/v2/flow/rules", params: {app: e, ip: r, port: t}, method: "GET"})
    }, this.newRule = function (e) {
        return a({url: "/v2/flow/rule", data: e, method: "POST"})
    }, this.saveRule = function (e) {
        return a({url: "/v2/flow/rule/" + e.id, data: e, method: "PUT"})
    }, this.deleteRule = function (e) {
        return a({url: "/v2/flow/rule/" + e.id, method: "DELETE"})
    }, this.checkRuleValid = function (e) {
        return void 0 === e.resource || "" === e.resource ? (alert("资源名称不能为空"), !1) : void 0 === e.count || e.count < 0 ? (alert("限流阈值必须大于等于 0"), !1) : void 0 === e.strategy || e.strategy < 0 ? (alert("无效的流控模式"), !1) : 1 != e.strategy && 2 != e.strategy || void 0 !== e.refResource && "" != e.refResource ? void 0 === e.controlBehavior || e.controlBehavior < 0 ? (alert("无效的流控整形方式"), !1) : 1 == e.controlBehavior && r(e.warmUpPeriodSec) ? (alert("预热时长必须大于 0"), !1) : 2 == e.controlBehavior && r(e.maxQueueingTimeMs) ? (alert("排队超时时间必须大于 0"), !1) : !e.clusterMode || void 0 !== e.clusterConfig && void 0 !== e.clusterConfig.thresholdType || (alert("集群限流配置不正确"), !1) : (alert("请填写关联资源或入口"), !1)
    }
}]), (app = angular.module("sentinelDashboardApp")).service("DegradeService", ["$http", function (a) {
    this.queryMachineRules = function (e, r, t) {
        return a({url: "degrade/rules.json", params: {app: e, ip: r, port: t}, method: "GET"})
    }, this.newRule = function (e) {
        var r = {
            id: e.id,
            resource: e.resource,
            limitApp: e.limitApp,
            count: e.count,
            timeWindow: e.timeWindow,
            grade: e.grade,
            app: e.app,
            ip: e.ip,
            port: e.port
        };
        return a({url: "/degrade/new.json", params: r, method: "GET"})
    }, this.saveRule = function (e) {
        var r = {
            id: e.id,
            resource: e.resource,
            limitApp: e.limitApp,
            grade: e.grade,
            count: e.count,
            timeWindow: e.timeWindow
        };
        return a({url: "/degrade/save.json", params: r, method: "GET"})
    }, this.deleteRule = function (e) {
        var r = {id: e.id, app: e.app};
        return a({url: "/degrade/delete.json", params: r, method: "GET"})
    }, this.checkRuleValid = function (e) {
        return void 0 === e.resource || "" === e.resource ? (alert("资源名称不能为空"), !1) : void 0 === e.grade || e.grade < 0 ? (alert("未知的降级策略"), !1) : void 0 === e.count || "" === e.count || e.count < 0 ? (alert("降级阈值不能为空或小于 0"), !1) : void 0 === e.timeWindow || "" === e.timeWindow || e.timeWindow <= 0 ? (alert("降级时间窗口必须大于 0"), !1) : !(1 == e.grade && 1 < e.count) || (alert("异常比率超出范围：[0.0 - 1.0]"), !1)
    }
}]), (app = angular.module("sentinelDashboardApp")).service("SystemService", ["$http", function (a) {
    this.queryMachineRules = function (e, r, t) {
        return a({url: "system/rules.json", params: {app: e, ip: r, port: t}, method: "GET"})
    }, this.newRule = function (e) {
        var r = {app: e.app, ip: e.ip, port: e.port};
        return 0 == e.grade ? r.avgLoad = e.avgLoad : 1 == e.grade ? r.avgRt = e.avgRt : 2 == e.grade ? r.maxThread = e.maxThread : 3 == e.grade && (r.qps = e.qps), a({
            url: "/system/new.json",
            params: r,
            method: "GET"
        })
    }, this.saveRule = function (e) {
        var r = {id: e.id};
        return 0 == e.grade ? r.avgLoad = e.avgLoad : 1 == e.grade ? r.avgRt = e.avgRt : 2 == e.grade ? r.maxThread = e.maxThread : 3 == e.grade && (r.qps = e.qps), a({
            url: "/system/save.json",
            params: r,
            method: "GET"
        })
    }, this.deleteRule = function (e) {
        var r = {id: e.id, app: e.app};
        return a({url: "/system/delete.json", params: r, method: "GET"})
    }
}]), (app = angular.module("sentinelDashboardApp")).service("MachineService", ["$http", function (r) {
    this.getAppMachines = function (e) {
        return r({url: "app/" + e + "/machines.json", method: "GET"})
    }
}]), (app = angular.module("sentinelDashboardApp")).service("IdentityService", ["$http", function (a) {
    this.fetchIdentityOfMachine = function (e, r, t) {
        return a({url: "resource/machineResource.json", params: {ip: e, port: r, searchKey: t}, method: "GET"})
    }, this.fetchClusterNodeOfMachine = function (e, r, t) {
        return a({
            url: "resource/machineResource.json",
            params: {ip: e, port: r, type: "cluster", searchKey: t},
            method: "GET"
        })
    }
}]), (app = angular.module("sentinelDashboardApp")).service("MetricService", ["$http", function (s) {
    this.queryAppSortedIdentities = function (e) {
        return s({url: "/metric/queryTopResourceMetric.json", params: e, method: "GET"})
    }, this.queryByAppAndIdentity = function (e) {
        return s({url: "/metric/queryByAppAndResource.json", params: e, method: "GET"})
    }, this.queryByMachineAndIdentity = function (e, r, t, a, o) {
        var l = {ip: e, port: r, identity: t, startTime: a.getTime(), endTime: o.getTime()};
        return s({url: "/metric/queryByAppAndResource.json", params: l, method: "GET"})
    }
}]), angular.module("sentinelDashboardApp").service("ParamFlowService", ["$http", function (a) {
    function o(e) {
        return !("int" !== (t = e.classType) && "double" !== t && "float" !== t && "long" !== t && "short" !== t || void 0 !== (r = e.object) && "" !== r && !isNaN(r)) || (!!("byte" === e.classType && (a = e.object, o = -128, l = 127, void 0 === a || "" === a || isNaN(a) || a < o || l < a)) || (void 0 === e.object || void 0 === e.classType || (void 0 === (s = e.count) || "" === s || isNaN(s) || s < 0)));
        var r, t, a, o, l, s
    }

    this.queryMachineRules = function (e, r, t) {
        return a({url: "/paramFlow/rules", params: {app: e, ip: r, port: t}, method: "GET"})
    }, this.addNewRule = function (e) {
        return a({url: "/paramFlow/rule", data: e, method: "POST"})
    }, this.saveRule = function (e) {
        return a({url: "/paramFlow/rule/" + e.id, data: e, method: "PUT"})
    }, this.deleteRule = function (e) {
        return a({url: "/paramFlow/rule/" + e.id, method: "DELETE"})
    }, this.checkRuleValid = function (e) {
        if (!e.resource || "" === e.resource) return alert("资源名称不能为空"), !1;
        if (1 != e.grade) return alert("未知的限流模式"), !1;
        if (e.count < 0) return alert("限流阈值必须大于等于 0"), !1;
        if (void 0 === e.paramIdx || "" === e.paramIdx || isNaN(e.paramIdx) || e.paramIdx < 0) return alert("热点参数索引必须大于等于 0"), !1;
        if (void 0 !== e.paramFlowItemList) for (var r = 0; r < e.paramFlowItemList.length; r++) {
            var t = e.paramFlowItemList[r];
            if (o(t)) return alert("热点参数例外项不合法，请检查值和类型是否正确：参数为 " + t.object + ", 类型为 " + t.classType + ", 限流阈值为 " + t.count), !1
        }
        return !0
    }
}]), angular.module("sentinelDashboardApp").service("AuthorityRuleService", ["$http", function (a) {
    this.queryMachineRules = function (e, r, t) {
        return a({url: "/authority/rules", params: {app: e, ip: r, port: t}, method: "GET"})
    }, this.addNewRule = function (e) {
        return a({url: "/authority/rule", data: e, method: "POST"})
    }, this.saveRule = function (e) {
        return a({url: "/authority/rule/" + e.id, data: e, method: "PUT"})
    }, this.deleteRule = function (e) {
        return a({url: "/authority/rule/" + e.id, method: "DELETE"})
    }, this.checkRuleValid = function (e) {
        return void 0 === e.resource || "" === e.resource ? (alert("资源名称不能为空"), !1) : void 0 === e.limitApp || "" === e.limitApp ? (alert("流控针对应用不能为空"), !1) : void 0 !== e.strategy || (alert("必须选择黑白名单模式"), !1)
    }
}]), angular.module("sentinelDashboardApp").service("ClusterStateService", ["$http", function (a) {
    this.fetchClusterUniversalStateSingle = function (e, r, t) {
        return a({url: "/cluster/state_single", params: {app: e, ip: r, port: t}, method: "GET"})
    }, this.fetchClusterUniversalStateOfApp = function (e) {
        return a({url: "/cluster/state/" + e, method: "GET"})
    }, this.fetchClusterServerStateOfApp = function (e) {
        return a({url: "/cluster/server_state/" + e, method: "GET"})
    }, this.fetchClusterClientStateOfApp = function (e) {
        return a({url: "/cluster/client_state/" + e, method: "GET"})
    }, this.modifyClusterConfig = function (e) {
        return a({url: "/cluster/config/modify_single", data: e, method: "POST"})
    }, this.applyClusterFullAssignOfApp = function (e, r) {
        return a({url: "/cluster/assign/all_server/" + e, data: r, method: "POST"})
    }, this.applyClusterSingleServerAssignOfApp = function (e, r) {
        return a({url: "/cluster/assign/single_server/" + e, data: r, method: "POST"})
    }, this.applyClusterServerBatchUnbind = function (e, r) {
        return a({url: "/cluster/assign/unbind_server/" + e, data: r, method: "POST"})
    }
}]);