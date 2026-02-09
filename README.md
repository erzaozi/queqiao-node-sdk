# QUEQIAO-NODE-SDK

鹊桥SDK 现已发布正式版，主要特性如下：
- 提供完整的 TypeScript 类型支持
- 同时支持 CommonJS 和 ES6 模块版本
- 最低兼容鹊桥 MOD 版本 >= 0.4.1

### 如何安装:

```bash
npm install queqiao-node-sdk@latest
```

### 如何自己构建:

```bash
git clone --depth 1 https://github.com/erzaozi/queqiao-node-sdk.git
npm install
npm run build
```

### 如何使用（以ES6为例）:

```javascript
import QueQiao from 'queqiao-node-sdk';
const queqiao = new QueQiao();
queqiao.startServer(); // 可选，如果默认启动ws server
queqiao.connect({
    serverName: 'server',
    url: 'ws://localhost:8080/queqiao',
    authorization: '114514',
}); // 作为客户端连接鹊桥服务器
// 如何调用api
const conn = WebSocketManager.getQueQiaoConnection(serverName);
conn.api.broadcast(message);
conn.api.sendActionbar(message);
conn.api.sendPrivateMsg(message, {nickname: 'steve'});
conn.api.sendTitle({title: 'Hello World!'});
conn.api.sendRconCommand(command);
// 同时，注册的事件回调包含api
const callback = (event) => {
    if (event.event_type === "PlayerChatEvent") {
        event.api.sendPrivateMsg({
            text: "我能收到你的消息！",
            type: "text"
        }, {uuid: event.player.uuid});
    };
};
// 注册回调并销毁
queqiao.onChat(callback).();
queqiao.onJoin(callback).();
queqiao.onDeath(callback).();
queqiao.onCommand(callback).();
queqiao.onQuit(callback).();
queqiao.onAchievement(callback).();
```
