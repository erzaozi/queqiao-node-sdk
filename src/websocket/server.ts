import { WebSocketServer } from 'ws';

import QueQiao from './queqiao';

class QueQiaoServer {
  private wsServer: WebSocketServer | null = null;
  readonly host: string;
  readonly port: number;
  readonly path: string;
  private readonly authorization: string;
  private readonly queQiao: QueQiao;

  constructor(
    host: string,
    port: number,
    path: string,
    authorization: string,
    queQiao: QueQiao,
  ) {
    this.host = host;
    this.port = port;
    this.path = path;
    this.authorization = authorization;
    this.queQiao = queQiao;
  }

  async start(): Promise<QueQiaoServer> {
    return new Promise((resolve, reject) => {
      this.wsServer = new WebSocketServer({
        host: this.host,
        port: this.port,
        path: this.path,
      });

      this.wsServer.on('error', (error) => {
        console.error('Server startup failed:' + error.message);
        if (this.wsServer) {
          this.wsServer.removeAllListeners();
          this.wsServer.close();
        }
        this.wsServer = null;
        reject(error);
      });

      this.wsServer.on('listening', () => {
        console.log(
          'Server started on: ws://' + this.host + ':' + this.port + this.path,
        );
        resolve(this);
      });

      this.wsServer.on('connection', (ws, request) => {
        const authToken = decodeURIComponent(
          request.headers['authorization'] || '',
        );
        if (
          this.authorization &&
          authToken.replace(/^Bearer\s*/i, '') !== this.authorization
        ) {
          console.error('Same server name is not allowed.');
          ws.close();
          return;
        } else {
          const selfName = request.headers['x-self-name'];
          const serverName = decodeURIComponent(
            (Array.isArray(selfName) ? selfName[0] : selfName) || '',
          );
          if (!serverName) {
            console.error('Empty server name is not allowed.');
            ws.close();
            return;
          }
          try {
            ws.on('error', (error) => {
              console.error(
                `Server name [${serverName}] inbound connection error:` +
                  error.message,
              );
            });
            this.queQiao._add(ws, serverName, 'inbound');
            console.log(`Server name [${serverName}] connected successfully.`);
          } catch (error) {
            if (error instanceof Error) {
              console.error(error.message);
            } else {
              console.error('An unknown error occurred', error);
            }
            ws.close();
            return;
          }
        }
      });
    });
  }

  async restart(): Promise<QueQiaoServer> {
    console.log('Server restarting...');
    if (this.wsServer) {
      this.wsServer.removeAllListeners();
      this.wsServer.close();
    }
    this.wsServer = null;
    await this.start();
    return this;
  }

  close(): void {
    if (this.wsServer) {
      this.wsServer.removeAllListeners();
      this.wsServer.close();
      console.log('Server closed');
    }
  }
}

export default QueQiaoServer;
