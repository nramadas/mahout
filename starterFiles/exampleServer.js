import Koa from 'koa';
import KoaRouter from 'koa-router';
import KoaBodyParser from 'koa-bodyparser';
import KoaStatic from 'koa-static';
import template from './templates/main';

const PORT = 8888;
const server = new Koa();
const bodyparser = KoaBodyParser();
const router = new KoaRouter();

router.get('/', ctx => {
  ctx.body = template();
});

server.use(bodyparser);
server.use(router.routes());
server.use(router.allowedMethods());

server.listen(PORT, () => {
  console.log(`App launching on port ${PORT}`);
});
