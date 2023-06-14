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
foods.add("たけのこの丘", 190);
//初期データ挿入
  //何もなし（全データ表示）
  app.get('/', (req, res) => {
    res.contentType('json');
    res.header('Access-Control-Allow-Origin', '*');
    res.send({ result: foods.length, data: foods });
  });
  
  app.get('/request', (req, res) => {
    let result = { err: "", result: 0, data: [] };
    res.contentType('json');
    res.header('Access-Control-Allow-Origin', '*');
    foods.products.forEach(e => {
    //   if (e.name == req.query.cmd) {
    //     result.result++;
    //     result.data.push(e);
    //   }
      if(req.query.cmd == "search"){
        if (e.name.indexOf(req.query.name) !== -1) {
            result.result++;
            result.data.push(e);
          }
        if (req.query.name == null){
            result.err ="search name not specified";
        }
      }
    });
    if(req.query.cmd == "all"){
        res.send({ result: foods.length, data: foods });
      }
    res.send(result);
  });

  app.get('/add', (req, res) => {
    foods.add(req.query.name,req.query.price)
    res.send({ result: foods.length, data: foods });
  });