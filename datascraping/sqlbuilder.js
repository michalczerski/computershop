const fs = require("fs");
const { parse } = require("csv-parse");

async function readCvFile(filename) {
    let records = []
    return new Promise(resolve => {
        fs.createReadStream(filename)
            .pipe(parse({ delimiter: ",", from_line: 2 }))
            .on("data", (data) => {
                records.push(data)
            })
            .on("end", () => {
                resolve(records.reverse())
            });
    });
}

async function main() {
    const queryFile = "./products.seed.sql";
    const fd = fs.openSync(queryFile, "w");

    let records = await readCvFile("./xkomcases.csv");
    records.forEach(r => {
        let standard = r[6].replace(",", '');
        let pricePL = parseInt(r[7].replace(" ", ""));
        let priceEN = Math.round(pricePL / 4.2);
        let photo = r[8].split("/").pop();
        fs.writeSync(fd, `INSERT INTO computerCases (name, type, standard, pricePL, priceUS, photo) 
            VALUES ("${r[4]}", "${r[5]}", "${standard}", ${pricePL}, ${priceEN}, "${photo}"); \n`)
    });

    records = await readCvFile("./xkomdisplays.csv");
    records.forEach(r => {
        let pricePL = parseInt(r[5].replace(" ", ""));
        let priceEN = Math.round(pricePL / 4.2);
        let diagonal = r[6].replace("\"", "");
        let resolution = r[7];
        let matrix = r[8];
        let photo = r[9].split("/").pop();
        fs.writeSync(fd, `INSERT INTO displays (name, pricePL, priceUS, photo, diagonal, resolution, matrix) 
            VALUES ('${r[4]}', '${pricePL}', '${priceEN}', '${photo}', '${diagonal}', '${resolution}', '${matrix}'); \n`)
    });    

    records = await readCvFile("./xkomgraphiccards.csv");
    records.forEach(r => {
        let pricePL = parseInt(r[5].replace(" ", ""));
        let priceEN = Math.round(pricePL / 4.2);
        let photo = r[9].split("/").pop();
        let chipset = r[6];
        let vram = r[7].replace(" GB", "");
        let type = r[8];
        fs.writeSync(fd, `INSERT INTO graphicCards (name, pricePL, priceUS, photo, chipset, vram, vramtype) 
            VALUES ('${r[4]}', '${pricePL}', '${priceEN}', '${photo}', '${chipset}', '${vram}', '${type}'); \n`)
    }); 
    
    records = await readCvFile("./xkommemory.csv");
    records.forEach(r => {
        let pricePL = parseInt(r[5].replace(" ", ""));
        let priceEN = Math.round(pricePL / 4.2);
        let photo = r[10].split("/").pop();
        let capacity = r[6].replace(" GB", "");
        let type = r[7];
        let frequency = r[8].replace(" MHz", "");
        let latency = r[9].replace("CL ", "");
        fs.writeSync(fd, `INSERT INTO memories (name, pricePL, priceUS, photo, capacity, type, frequency, latency) 
            VALUES ('${r[4]}', '${pricePL}', '${priceEN}', '${photo}', '${capacity}', '${type}', '${frequency}', '${latency}'); \n`)
    });      

    records = await readCvFile("./xkommotherboards.csv");
    records.forEach(r => {
        let pricePL = parseInt(r[6].replace(" ", ""));
        let priceEN = Math.round(pricePL / 4.2);
        let photo = r[11].split("/").pop();
        let processor = r[7];
        let standard = r[8];
        let socket = r[9];
        let chipset = r[10];
        fs.writeSync(fd, `INSERT INTO motherBoards (name, pricePL, priceUS, photo, processor, standard, socket, chipset) 
            VALUES ('${r[5]}', '${pricePL}', '${priceEN}', '${photo}', '${processor}', '${standard}', '${socket}', '${chipset}'); \n`)
    });   
    
    records = await readCvFile("./xkompowersupplies.csv");
    records.forEach(r => {
        let pricePL = parseInt(r[5].replace(" ", ""));
        let priceEN = Math.round(pricePL / 4.2);
        let photo = r[10].split("/").pop();
        let power = r[6].replace(" W", "");
        let standard = r[7];
        fs.writeSync(fd, `INSERT INTO powerSupplies (name, pricePL, priceUS, photo, power, standard) 
            VALUES ('${r[4]}', '${pricePL}', '${priceEN}', '${photo}', '${power}', '${standard}'); \n`)
    });     

    records = await readCvFile("./xkomprocessors.csv");
    records.forEach(r => {
        let pricePL = parseInt(r[10].replace(" ", ""));
        let priceEN = Math.round(pricePL / 4.2);
        let photo = r[6].split("/").pop();
        let socket = r[5];
        let frequency  = r[7].replace(" GHz", "");
        fs.writeSync(fd, `INSERT INTO processors (name, pricePL, priceUS, photo, socket, frequency) 
            VALUES ('${r[4]}', '${pricePL}', '${priceEN}', '${photo}', '${socket}', '${frequency}'); \n`)
    });        
    
    records = await readCvFile("./xkomstorage.csv");
    records.forEach(r => {
        let pricePL = parseInt(r[5].replace(" ", ""));
        let priceEN = Math.round(pricePL / 4.2);
        let photo = r[10].split("/").pop();
        let capacity = r[6].replace(" GB", "");
        let interface  = r[7];
        fs.writeSync(fd, `INSERT INTO storages (name, pricePL, priceUS, photo, capacity, interface) 
            VALUES ('${r[4]}', '${pricePL}', '${priceEN}', '${photo}', '${capacity}', '${interface}'); \n`)
    });      

    fs.closeSync(fd);
}

main();