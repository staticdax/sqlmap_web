sqlmap Web UI 
================
A simple sqlmap web interface

#运行环境
- Apache/2.4
- php 5.6
- sqlmap 1.0-dev-nongit-198002100a89

#启动
- 启动sqlmapapi服务器
`sqlmapapi -s -H 0.0.0.0`
`-s` 启动为sqlmapapi server
`-H` API服务器IP

- 启动web服务
在`/sqlmap_web/api_serv_conf.php`的IP和port改为实际sqlmapapi服务器的IP（默认127.0.0.1）和端口（默认8775）

#调试
## 服务器端
`sqlmapapi -s -H 0.0.0.0` 默认输出日志
## 命令行客户端
`sqlmapapi -c -H [API服务器IP]`

#目录结构说明
- `sqlmap_web/`
  - `api_serv_conf.php` API服务器配置
  - `dist/` 包含前端框架bootstrap，jQuery等
     - `/js/front.js` 一些按钮的异步请求，tasks_list, new_task等等
  - `admin_list.php` 任务列表请求
  - `front.htm` 前端页面
  - `flush_tasks.php` 清除列表请求
  - `handler.php` 表单数据分析，变更为JSON数据格式，发送到API服务器
  - `README.md` README文件
  - `request_function.php` 请求函数
  - `scan_data.php` 扫描结果请求
  - `scan_log.php` 扫描日志请求
  - `scan_status.php` 扫描状态请求
  - `set_options.txt` sqlmapapi请求参数合集，供参考



