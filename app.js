const express = require('express');
const path = require('path');
const fs = require("fs");
const app = express()

const port = 4567;

app.use(express.static(path.join(__dirname + "/public")));
app.use(express.json());

app.get('/', function (req, res) {
    res.send(fs.readFileSync("./views/index.html","utf-8"));
});

app.get('/card', function (req, res) {
  res.send(fs.readFileSync("./views/card.html","utf-8"));
});

app.get('/shops', function (req, res) {
  res.send(fs.readFileSync("./shops.json","utf-8"));
})

app.get('/goods', function (req, res) {
  res.send(fs.readFileSync("./goods.json","utf-8"));
})

app.get('/goods/:goodId', function (req, res) {
  let goods = JSON.parse(fs.readFileSync("./goods.json","utf-8"));
  res.send(goods.find((el)=>el.id === req.params.goodId));
});


app.post('/orders',function (req, res) {
  let orders = JSON.parse(fs.readFileSync("./orders.json","utf-8"));
  orders.push(req.body);
  fs.writeFileSync("./orders.json", JSON.stringify(orders));
  res.send(req.body);
});


app.get('/orders', function (req, res) {
  let orders = JSON.parse(fs.readFileSync("./orders.json","utf-8"));
  res.send(orders);
});

app.listen(port)
console.log('listening on port 4567');