sqlmap Web UI 
================
A simple sqlmap web interface

#运行环境
- Apache/2.4
- php 5.6
- sqlmap 1.0-dev-nongit-198002100a89

#启动
- 启动sqlmapapi服务器
  `./start_api_serv.sh`

- 启动web服务
  * 在`/sqlmap_web/api_serv_conf.php`的IP和port改为实际sqlmapapi服务器的IP（默认127.0.0.1）和端口（默认8775）
  * 启动Apache

#调试
## 服务器端
sqlmapapi 服务器端在后台运行，日志输出到`api_serv.log`
## 命令行客户端
`sqlmapapi -c -H <API服务器IP>`

#目录结构说明
- `sqlmap_web/`
  - `api_serv.log` 本地API服务器日志文件
  - `dist/` 包含前端框架bootstrap，jQuery等
     - `/js/front.js` 页面的异步请求，tasks_list, new_task等等
     - `/css/style.css` 页面css
  - include/
     - `api_serv_conf.php` API服务器配置
     - `connect_db.php` 数据库连接
  - handle/
     - `admin_list.php` 任务列表请求
     - `flush_tasks.php` 清除列表请求
     - `handler.php` 表单数据分析，封装为JSON数据格式，发送到API服务器
     - `request_function.php` 请求函数
     - `scan_data.php` 扫描结果请求
     - `scan_log.php` 扫描日志请求
     - `scan_status.php` 扫描状态请求
     - `scan_result.php` 直接向sqlmapipc数据库查询任务结果请求
  - `README.md` README文件
  - `index.htm` 首页
  - `start_api_serv.sh` 启动脚本
  - `set_options.txt` sqlmapapi请求参数合集，供参考



