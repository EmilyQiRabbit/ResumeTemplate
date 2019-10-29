import Koa from "koa";
import views from "koa-views";
import server from "koa-static";
// import fs from "fs";
import path from "path";
import router from "./routes";

const app = new Koa();

// 客户端静态资源地址
const __clientStaticDir = path.join(__dirname, "client");
// 配置静态资源
app.use(server(__clientStaticDir, { extensions: ["js"] }));
// 重定向 .js 资源，但是这个重定向的方法感觉有点蠢...之后换到路由里面去了
// app.use((ctx, next) => {
//   let { path } = ctx;
//   if (path.match(/\/[a-z\d]+\/[a-z\d]+\.bundle\.js/)) {
//     ctx.redirect(path.match(/\/[a-z\d]+\.bundle\.js/)[0]);
//   }
//   return next();
// });
// 配置模版引擎
app.use(
  views(__dirname, {
    extension: "hbs",
    map: { hbs: "handlebars" },
    options: {
      scriptSrc: "main.bundle.js"
    }
  })
);
// 路由
app.use(router.routes());
// 本地服务端口
app.listen(3001, function() {
  console.log("Server listening on: ", 3001);
  console.log("请访问：http://localhost:3001/resume/page0");
});

export default app;
