const process = require('process');
const express = require('express')
const { MongoClient, ObjectId } = require("mongodb");
const crypto = require('crypto');

const mongoMachine = process.env.NODE_ENV == 'production' ? "mongo" : "localhost";

const computerSets = require("./computer-sets.json");
const attributes = require("./attributes.json");

const app = express()
const port = 3030;
const pageSize = 15;
const client = new MongoClient(`mongodb://root:root@${mongoMachine}:27017/`);
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

app.get('/product/:id', async(req, res) => {
    const id = req.params.id;
    const product = await productsCollection.findOne({_id:  new ObjectId(id)});
    res.send(product);
});


app.get('/count-products', async (req, res) => {
    const filter = buildFilter(req.query);
    const count = await productsCollection.count(filter);
    res.send(`${count}`);
});

app.get('/computer-sets', async(req, res) => {
    res.send(computerSets);
})

app.get('/attributes', async (req, res) => {
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

app.get('/account/:id', async (req, res) => {
    const id = req.params.id;
    const account = await customersCollection.findOne({_id:  new ObjectId(id)});
    res.send(account);
});

app.post('/account/update/:id', async (req, res) => {
    const id = req.params.id;

    const account = {
        city: req.body?.city,
        street: req.body?.street,
        postCode: req.body?.postCode
    };
    customersCollection.updateOne({_id: new ObjectId(id)}, {$set: account});
    res.sendStatus(200);
})

//session instead userid
app.post('/make-order', async(req, res) => {
    const order = req.body;
    order.date = Date.now();
    await ordersCollection.insertOne(order);
    res.sendStatus(200);
});

app.get('/orders', async(req, res) => {
    const userId = req.header("user-id");
    const filter = {userId: userId};
    const orders = await ordersCollection
        .find(filter)
        .sort({date: -1})
        .toArray();
    res.send(orders);
});

app.use(express.static('public'))

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
})

