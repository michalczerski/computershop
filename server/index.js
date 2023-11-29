const express = require('express')
const { MongoClient } = require("mongodb");
const crypto = require('crypto');

const app = express()
const port = 3030;
const pageSize = 30;
const client = new MongoClient("mongodb://root:root@localhost:27017/");
const database = client.db('computershop');
const productsCollection = database.collection('products');
const customersCollection = database.collection('customers');
const ordersCollection = database.collection('orders');

const hashPassword = (password) => {
  const sha1 = crypto.createHash('sha1');
  sha1.update(password);
  return sha1.digest("hex");
}

const buildFilter = (query) => {
  let filter = {category: query.c};

  Object.keys(query.search ?? []).map((key) => {
    filter[key] = {$in: query.search[key].split(',') };
  });

  if (query.q) {
    filter.name = {"$regex": query.q, "$options": "i"};
  }

  return filter;
};

app.use(express.json());

//TODO - AS ONE PROJECTION (COUNT + FETCH)
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

app.post('/add-customer', async (req, res) => {
      const customer = req.body;
      customer.password = hashPassword(customer.password);
      await customersCollection.insertOne(req.body);
      res.send("1");
});

app.post('/login-customer', async(req, res) => {
    const password = hashPassword(req.body?.password);
    const filter = {username: req.body?.username, password: password};
    const customer = await customersCollection.findOne(filter);
    if (customer) {
      res.send(customer);
    } else {
      res.sendStatus(204);
    }
});

app.post('/make-order', async(req, res) => {
    const order = req.body;
    console.log(order);
    await ordersCollection.insertOne(order);
    res.sendStatus(200);
});

app.use(express.static('public'))

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
})

