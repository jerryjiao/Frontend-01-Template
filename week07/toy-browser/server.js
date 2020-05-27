const http = require('http');

const server = http.createServer((req, res) => {
  console.log('request received');
  console.log(req.headers);
  res.setHeader('Content-Type', 'text/html');
  res.setHeader('X-Foo', 'bar');
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end(`
<html maaa=a >
<head>
<style>
#wrap {
  display: flex;
  width: 600px;
  height: 600px;
  background-color: #fff;
}
.item1 {
  width: 200px;
  height: 300px;
  background-color: #000;
}
.item12{
  flex: 1
  height: 400px;
  background-color: green;
}
</style>
</head>
<body>
  <div id="wrap">
    <div class="item1">item1</div>
    <div class="item2">item2</div>
  </div>
</body>
</html>
  `);
})

server.listen(8088);