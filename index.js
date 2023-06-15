const express = require('express');
const app = express();
const PORT = 8080;

app.listen(process.env.PORT || PORT);

class Product {
    constructor(id, name, price) {
      this.id = id;
      this.name = name;
      this.price = price;
    }
  }

  class ProductDB {
    constructor() {
      this.productNum = 0;
      this.products = [];
    }
  
    add(name, price) {
      this.products.push(new Product(this.productNum, name, price));
      this.productNum++;
    }
  }
  
let foods = new ProductDB();

foods.add("ポッキー", 280);
foods.add("きのこの山", 190);
foods.add("たけのこの里", 190);
// foods.add("たけのこの丘", 190);

  app.get('/', (req, res) => {
    res.contentType('json');
    res.header('Access-Control-Allow-Origin', '*');
    res.send({ err: "", result: foods.products.length, data: foods });
  });
  
  app.get('/request', (req, res) => {
    let result = { err: "", result: 0, data: [] };
    res.contentType('json');
    res.header('Access-Control-Allow-Origin', '*');
    foods.products.forEach(e => {
      if(req.query.cmd == "search"){
        if (e.name.indexOf(req.query.name) !== -1) {
            result.result++;
            result.data.push(e);
          }
        if (req.query.name == null){
            //searchnameの指定がないときのエラー
            result.err ="search name not specified";
        }
      }
    });
    if(req.query.cmd == "all"){
      result.result = foods.products.length
      result.data = foods
      }
    if(req.query.cmd != "all" && req.query.cmd != "search"){
      //allかsearch以外のコマンドが指定されt場合はエラーを返す
      result.err = "this command can not use";
      result = { err: "", result: foods.products.length, data: foods }
    }
    res.send(result);
  });

  app.get('/add', (req, res) => {
    let result = { err: "", result: 0, data: [] }
    if(req.query.name == null || req.query.price == null){
      //nameまたはpriceの指定がない場合はエラーを返す
      result.err = "add name or price not specified";
    }else{
      foods.add(req.query.name,req.query.price)
      //追加後全表示
      result = { err: "", result: foods.products.length, data: foods }
    }
    res.send(result);
  });