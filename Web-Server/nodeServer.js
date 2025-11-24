const http = require("http");

const port = 5000;

const server = http.createServer((req, res) => {
  res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });

  if (req.url === "/") {
    res.write("<h2>Index sayfasına hoşgeldiniz</h2>");
  } else if (req.url === "/hakkimda") {
    res.write("<h2>Hakkımda sayfasına hoşgeldiniz</h2>");
  } else if (req.url === "/iletisim") {
    res.write("<h2>İletişim sayfasına hoşgeldiniz</h2>");
  } else {
    res.writeHead(404, { "Content-Type": "text/html; charset=utf-8" });
    res.write("<h2>404 - Sayfa bulunamadı</h2>");
  }

  res.end();
});

server.listen(port, () => {
  console.log(`Sunucu ${port} portunda başlatıldı.`);
});
