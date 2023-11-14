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
  const attributes = {
    processors: {
      socket: [
        'Socket 1200',
        'Socket 1700',
        'Socket 2066',
        'Socket AM4',
        'Socket AM5',
        'Socket sWRX8'
      ],
      frequency: [
        '2.0', '2.1', '2.4', '2.5',
        '2.6', '2.7', '2.8', '2.9',
        '3.0', '3.2', '3.3', '3.4',
        '3.5', '3.6', '3.7', '3.8',
        '3.9', '4.0', '4.1', '4.2',
        '4.4', '4.5', '4.7'
      ]
    },
    storage: {
      interface: [
        "2,5'' SATA",
        '3400 MB/s',
        'M.2 SATA',
        'PCIe NVMe 3.0 x4',
        'PCIe NVMe 4.0 x4',
        'PCIe NVMe 5.0 x4',
        'mSATA'
      ],
      capacity: [
        '1000', '1024', '120',
        '128',  '1920', '2000',
        '2048', '240',  '250',
        '256',  '32',   '3840',
        '4000', '4096', '480',
        '500',  '512',  '8000',
        '960'
      ]
    },
    memories: {
      capacity: [
        '128', '16', '24',
        '32',  '4',  '48',
        '64',  '8',  '96'
      ],
      type: [ 'DDR3', 'DDR3L', 'DDR4', 'DDR5' ],
      frequency: [
        '1333', '1600', '1866', '2133',
        '2400', '2666', '2933', '3000',
        '3200', '3333', '3600', '3733',
        '4000', '4133', '4266', '4400',
        '4600', '4800', '5200', '5600',
        '6000', '6200', '6400', '6600',
        '6800', '7200', '7400', '7800'
      ]  
    },
    graphiccards: {
      chipset: [
        'GeForce GT 1030',     'GeForce GT 710',
        'GeForce GT 730',      'GeForce GTX 1630',
        'GeForce GTX 1650',    'GeForce GTX 1660 SUPER',
        'GeForce GTX 1660 Ti', 'GeForce RTX 3050',
        'GeForce RTX 3060',    'GeForce RTX 3060 Ti',
        'GeForce RTX 3070',    'GeForce RTX 3070 Ti',
        'GeForce RTX 4060',    'GeForce RTX 4060 Ti',
        'GeForce RTX 4070',    'GeForce RTX 4070 Ti',
        'GeForce RTX 4080',    'GeForce RTX 4090',
        'Intel Arc A580',      'Intel Arc A750',
        'Quadro P1000',        'Quadro P400',
        'Quadro RTX 4000',     'Quadro RTX 5000',
        'Quadro RTX A2000',    'Quadro RTX A4500',
        'Quadro RTX A5000',    'Quadro T1000',
        'Quadro T400',         'Radeon™ Pro W6800',
        'Radeon™ RX 550',      'Radeon™ RX 560',
        'Radeon™ RX 6400',     'Radeon™ RX 6500 XT',
        'Radeon™ RX 6600',     'Radeon™ RX 6650 XT',
        'Radeon™ RX 6700 XT',  'Radeon™ RX 6750 XT',
        'Radeon™ RX 6800',     'Radeon™ RX 6800 XT',
        'Radeon™ RX 7600',     'Radeon™ RX 7700 XT',
        'Radeon™ RX 7800 XT',  'Radeon™ RX 7900 XT',
        'Radeon™ RX 7900 XTX'
      ],  
      capacity: [
        '1',  '12', '16',
        '2',  '20', '24',
        '32', '4',  '6',
        '8'
      ]     
    },
    powersupplies: {
      power: [
        '1000',
        '1050',
        '1200',
        '1250',
        '1300',
        '1350',
        '150',
        '1500',
        '1600',
        '1800',
        '1850',
        '2000',
        '300',
        '350',
        '400',
        '420',
        '450',
        '500',
        '550',
        '560',
        '600',
        '630',
        '650',
        '660',
        '700',
        '730',
        '750',
        '760',
        '850',
        '90',
        '950'
      ],
      format: [
        'ATX',
        'ATX 3.0',
        'PCI-E',
        'SFX',
        'SFX-L',
        'TFX'
      ]
    },
    computercases: {
      format: [
        'ATX',
        'ITX',
        'Mini-ITX',
        'Raspberry Pi 4',
        'Stal',
        'm-ATX',
        'microATX'
      ], 
      type: [
        'ATX,',
        'Big Tower',
        'Cube Case',
        'Full Tower',
        'High Mid Tower',
        'Micro Tower',
        'Middle Tower',
        'Mini ITX',
        'Mini Tower',
        'Open-Air Tower',
        'Raspberry Pi 4',
        'Raspberry Pi 4B',
        'Slim tower',
        'Small Form Factor SFF',
        'Stelaż do koparki kryptowalut'
      ]      
    },
    displays: {
      resolution: [
        '1024 x 768',
        '1280 x 1024', '1280 x 800',
        '1366 x 768',  '1600 x 900',
        '1920 x 1080', '1920 x 1200',
        '1920 x 550',  '2560 x 1080',
        '2560 x 1440', '2560 x 1600',
        '2560 x 2880', '3440 x 1440',
        '3840 x 1080', '3840 x 1600',
        '3840 x 2160', '4096 x 2160',
        '5120 x 1440', '5120 x 2160',
        '5120 x 2880', '6016x 3384',
        '6144 x 3456'
      ], 
      matrix: [
        'LED',            'LED, AH-IPS',
        'LED, AMVA',      'LED, IPS',
        'LED, IPS Black', 'LED, IPS-ADS',
        'LED, IPS-AHVA',  'LED, MVA',
        'LED, Nano IPS',  'LED, Rapid IPS',
        'LED, TFT',       'LED, TFT, IPS',
        'LED, TN',        'LED, VA',
        'OLED',           'Retina',
        'W-LED',          'W-LED, TFT, IPS'
      ]
    },
    motherboards: {
      chipset: ["Intel Z790", "Intel B560","Intel B660","Intel B760","Intel H410","Intel H510",
        "Intel H670","Intel Z590","Intel H610","Intel Z690","Intel H470","Intel H310","AMD B650",
        "AMD A520","AMD X670","AMD X570","AMD B450","AMD B550"],
      format: ["ATX", "mATX", "E-ATX", "uATX", "mITX"],
      socket: ["Socket 1700", "Socket 1200", "Socket 1151", "Socket AM5", "Socket AM4"]
    },
  }

  res.send(attributes[req.query.c]);
});

app.use(express.static('public'))

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
