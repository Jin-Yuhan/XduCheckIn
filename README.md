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
    |CHECKUP_USERNAME|用户名（学号）|必填|
    |CHECKUP_PASSWORD|密码|必填|
    |CHECKUP_SENDKEY|Server酱的 SendKey|选填|

## 测试
1. 点击「Actions」。
2. 在左侧选择「CheckUp」，点击「Run workflow」。
3. 等待运行结果。如果运行成功会显示绿色的对勾。

# 免责声明
如果身体有任何疑似新冠肺炎症状的情况，请立即停止使用该脚本，并根据实际情况手动填报。

若发生因使用本脚本而导致的任何意外，作者概不负责。

# 参考项目
1. [raspirin/dailycheck](https://github.com/raspirin/dailycheck)

谢谢上面这个项目让我想起了 GitHub Actions，原本我是写在一个微信小程序里的。顺便抄了点 README，我比较懒（

2. [xdlinux/xidian-scripts](https://github.com/xdlinux/xidian-scripts)

大部分代码都是按 xidian-scripts 里的 check_in.py 写的。