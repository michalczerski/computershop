const express = require('express')
const { MongoClient } = require("mongodb");

const app = express()
const port = 3030;
const pageSize = 30;
const client = new MongoClient("mongodb://root:root@localhost:27017/");
const database = client.db('computershop');
const productsCollection = database.collection('products');

const buildFilter = (query) => {
  let filter = {category: query.c};

  Object.keys(query.search ?? []).map((key) => {
    filter[key] = {$in: query.search[key].split(',') };
  });

  if (query.q) {
    filter.name = {"$regex": query.q, "$options": "i"};
    console.log(filter);
  }

  return filter; 
};

app.get('/products', async(req, res) => {
  const filter = buildFilter(req.query);
  const offset = (req.query.p - 1) * pageSize;  
  const products = await productsCollection
    .find(filter)
    .limit(pageSize)
    .skip(offset)
    .toArray();
  res.send(products);
});

app.get('/count-products', async (req, res) => {
  const filter = buildFilter(req.query);
  const count = await productsCollection.count(filter);
  res.send(`${count}`);
});

app.get('/attributes', async (req, res) => {
  const attributes = require("./attributes.json");
  res.send(attributes[req.query.c]);
});

app.use(express.static('public'))

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

