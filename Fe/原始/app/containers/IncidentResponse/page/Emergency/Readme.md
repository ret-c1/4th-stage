# 应急响应全流程
+ 路由 -> /incident/emergency
+ 参数 ->  id: 应急id eventId: 事件id

- 告警分析记录、日志分析记录 -> Step1CheckRecord -> 组件接受告警分析信息(oWarningInfo)和日志分析信息(oLogInfo)
- 研判结果 -> Step1Judgement
