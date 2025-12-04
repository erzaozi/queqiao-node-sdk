# QUEQIAO-NODE-SDK

### How to install:

```bash
npm install queqiao-node-sdk@latest
```

### Or you can build it by yourself:

```bash
git clone https://github.com/erzaozi/queqiao-node-sdk.git
npm run build
```

### How to use:

```javascript
// commonjs
import QueQiao from 'queqiao-node-sdk';
const queqiao = new QueQiao();
queqiao.startServer(); // optional, you will start a websocket server
queqiao.connect({
    serverName: 'server',
    url: 'ws://localhost:8080/queqiao',
    authorization: '114514',
}); // you will connect to remote websocket server
// you can register callback function and destroy them
queqiao.onChat(callback).();
queqiao.onJoin(callback).();
queqiao.onDeath(callback).();
queqiao.onCommand(callback).();
queqiao.onQuit(callback).();
queqiao.onAchievement(callback).();
// you can invoke api
queqiao.api.boardcast('server',{type:'text',message:'hello world'});
```
