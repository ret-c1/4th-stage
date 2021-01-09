### 应急响应

- 案例审核        -> CaseAssess  
- 应急处置全流程   -> Emergency
- 工程师应急案例   -> EngineerCase
- 项目经理应急案例 -> ManagerCase
- 成员列表        -> MemberList
- 应急事件列表     -> Event
- 应急报告详情     -> Report   
- 应急报告列表     -> ReportList   
- 应急处置        -> Handle   
- 应急评审        -> Examine
- 应急同步        -> Sync
- 应急案例        -> Case
- 隐患全流程       -> Hidden
- 评审            -> Assess

-------------------------------------

- 应急基本信息     -> components/BasicInfo
- 应急排查记录     -> components/CheckLists
- 基本键值展示     -> components/InfoItem (解决框架Discriptions不能嵌套)
- 报告基本信息     -> components/ReportInfo

## 情报管理（新 2020-05-28）

- 情报管理
    - 情报列表 - 未发布/已发布 `Intelligence`
    - 情报上报 - 0/n day `Create0Day`
    - 情报上报 - 安全事件 `CreateEven`
    - 情报上报 - 成功 `CreateDone`
    - 情报审核 - 待审核列表 `WaitVerify`
    - 情报审核 - 已审核列表 `AlreadyVerify`
    - 情报审核 - 0day审核（情报专家/运营专家） `Verify0Day` （查看详情是否共用）
    - 情报审核 - 事件审核（情报专家/运营专家） `VerifyEven` （查看详情是否共用）
    - 威胁列表 - 待排查/已派发/已排查 `Threat`
    - 威胁列表 - 安全事件详情 `ThreatDetailEven`
    - 威胁列表 - 0day详情 `ThreatDetail0Day`


- 恶意Ip列表 - `MaliciousIP`
    - 新增
    - 导入
    - 导出


## 应急模块（迭代 2020-05-28）

- 应急案例 - 全部/我的 `PublicCase` （界面共用、分路由）
- 应急案例 - 导入 `PublicCaseImport`
- 应急案例 - 导入成功 `PublicCaseImportDone`
- 应急案例 - 案例详情 `PublicCaseDetail`


## 移动端（新增 2020-05-28）

- 移动端 - 情报分享
    - 登录界面 `Login`
    - 0day详情 `Detail0day`
    - 情报详情 `DetailEven`

#### 共用组件

- -

#### 进度

- 静态界面 0/19
    - 情报 0/8
    - 威胁 0/3
    - 恶意Ip 0/1
    - 应急 0/4
    - 分享 0/3
- 对接接口 0/19
    - 情报 0/8
    - 威胁 0/3
    - 恶意Ip 0/1
    - 应急 0/4
    - 分享 0/3
