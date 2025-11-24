
const Koa = require("koa");
const app = new Koa();

const port = 3000;

app.use(async (ctx) => {
  ctx.set("Content-Type", "text/html; charset=utf-8");

  if (ctx.path === "/") {
    ctx.body = "<h1>Index sayfasına hoşgeldiniz</h1>";
  } else if (ctx.path === "/hakkimda") {
    ctx.body = "<h1>Hakkımda sayfasına hoşgeldiniz</h1>";
  } else if (ctx.path === "/iletisim") {
    ctx.body = "<h1>İletişim sayfasına hoşgeldiniz</h1>";
  } else {
    ctx.status = 404;
    ctx.body = "<h1>404 - Sayfa bulunamadı</h1>";
  }
});

app.listen(port, () => {
  console.log(`Koa sunucusu ${port} portunda çalışıyor...`);
});
