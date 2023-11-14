const fs = require("fs");
const axios = require("axios");
const { parse } = require("csv-parse");

const imagesDir = "./images";

async function readCsvFile(csvFilename) {
  let records = [];
  return new Promise(resolve => {
    fs.createReadStream(csvFilename)
    .pipe(parse({ delimiter: ",", from_line: 2 }))
    .on("data", row => records.push(row))
    .on("close", () => resolve(records));
  });
}

async function downloadImagesFromCsv(csvFilename, columnIdx) {
  let count = 0;
  const csv = await readCsvFile(csvFilename);
  for(let i = 0; i < csv.length; i++) {
    const imageUrl = csv[i][columnIdx];
    const fileName = imagesDir + "/" + imageUrl.split("/").pop();
    const response = await axios.get(imageUrl, { responseType: "arraybuffer"});
    fs.writeFileSync(fileName, response.data);  
    count++;
  }

  return count;
}

if (!fs.existsSync(imagesDir)){
  fs.mkdirSync(imagesDir);
}

async function main() {
  let count = 0;
 
  count += await downloadImagesFromCsv('./xkomcases.csv', 8);
  console.log(`cases images downloaded ${count}`);
  count += await downloadImagesFromCsv('./xkomdisplays.csv', 9);
  console.log(`display images downloaded ${count}`);
  count += await downloadImagesFromCsv(`./xkomgraphiccards.csv`, 9);
  console.log(`graphic card images downloaded ${count}`)
  count += await downloadImagesFromCsv(`./xkommemory.csv`, 10);
  console.log(`memory images downloaded ${count}`)
  count += await downloadImagesFromCsv(`./xkommotherboards.csv`, 11);
  console.log(`motherboards images downloaded ${count}`)
  count += await downloadImagesFromCsv(`./xkompowersupplies.csv`, 10);
  console.log(`power supplies images downloaded ${count}`)
  count += await downloadImagesFromCsv(`./xkomprocessors.csv`, 6);
  console.log(`processor images downloaded ${count}`)
  count += await downloadImagesFromCsv(`./xkomstorage.csv`, 10);
  console.log(`storage images downloaded ${count}`);
}

main();

