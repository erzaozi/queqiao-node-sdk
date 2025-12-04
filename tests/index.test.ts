import QueQiao from "../src/websocket/queqiao";

describe('QueQiaoServer', () => {
    let queqiao: QueQiao;

    beforeEach(() => {
        queqiao = new QueQiao(false, {
            host: '127.0.0.1',
            port: 25565,
        });
    });

    afterEach(async () => {
        if (queqiao) {
            await queqiao.closeServer();
        }
    });

    test('should start server successfully', (done) => {
        queqiao.startServer().then(() => {
            expect(queqiao.queQiaoServer).not.toBeNull();
            done();
        }).catch(done);
    });
});

describe('QueQiaoWithoutServer', () => {
    let queqiao: QueQiao;

    beforeEach(() => {
        queqiao = new QueQiao();
    });

    afterEach(async () => { });

    test('should not start server', (done) => {
        expect(queqiao.queQiaoServer).toBeNull();
        done();
    });
});
