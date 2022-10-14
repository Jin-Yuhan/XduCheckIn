# Xdu Check In
用于自动填报西电的晨午晚检。

每次填报后会发送微信通知反馈结果。

使用 GitHub Actions 部署。

仅支持南校区。

# 用法

## Fork 本仓库
点击右上角的「Fork」按钮。

## 添加 Secrets
1. （可选）在 [Server酱官网](https://sct.ftqq.com/) 按步骤申请 SendKey 并关注微信公众号「方糖」。
2. 点击「Settings → Secrets → Actions」。
3. 点击「New repository secret」创建以下几个 Secret：

|Secret 名称|Secret 值|备注|
|:-|:-|:-|
|CHECK_IN_USERNAME|用户名（学号）|必填|
|CHECK_IN_PASSWORD|密码|必填|
|CHECK_IN_SEND_KEY|Server酱的 SendKey|选填|

# 测试
1. 点击「Actions」。
2. 在左侧选择「Auto Check In」，点击「Run workflow」。
3. 等待运行结果。如果运行成功会显示绿色的对勾。

# 约定
使用该程序，即代表您同意以下约定：
1. 如果身体有任何疑似新冠肺炎症状的情况，请立即停止使用该程序，并根据实际情况手动填报。
2. 使用该程序导致的任何不良后果与该程序的作者无关，**应由该程序的使用者承担**。

~~（虽然不太可能出问题，但还是在这里说一下）~~