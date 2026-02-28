#!/bin/bash
# 部署脚本 - 上传游戏到服务器

# 服务器信息
SERVER_IP="47.85.133.245"
SERVER_USER="root"
SERVER_PASS="Wstzzdg!!3"
REMOTE_PATH="/var/www/html/mini-games"

# 使用 expect 自动输入密码
expect << EOF
set timeout 60
spawn scp -r /Users/mac/lobsterai/project/mini-games/* ${SERVER_USER}@${SERVER_IP}:${REMOTE_PATH}/
expect {
    "yes/no" {
        send "yes\r"
        expect "*assword:*" { send "${SERVER_PASS}\r" }
    }
    "*assword:*" { send "${SERVER_PASS}\r" }
}
expect eof
EOF

echo "部署完成！"
