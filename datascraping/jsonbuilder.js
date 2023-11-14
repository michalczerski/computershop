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
    const queryFile = "./products.seed.json";
    const fd = fs.openSync(queryFile, "w");

    fs.writeSync(fd, '[');

    let records = await readCvFile("./xkomcases.csv");
    records.forEach(r => {
        let standard = r[6].replace(",", '');
        let pricePL = parseInt(r[7].replace(" ", ""));
        let priceUS = Math.round(pricePL / 4.2);
        let photo = r[8].split("/").pop();
        fs.writeSync(fd, `{"name": "${r[4]}", "category": "computercases", "pricePL": ${pricePL}, "priceUS": ${priceUS}, 
            "url": "${photo}", "type": "${r[5]}", "format": "${standard}"}, \n`)
    });

    records = await readCvFile("./xkomdisplays.csv");
    records.forEach(r => {
        let pricePL = parseInt(r[5].replace(" ", ""));
        let priceUS = Math.round(pricePL / 4.2);
        let resolution = r[7];
        let matrix = r[8];
        let photo = r[9].split("/").pop();
        fs.writeSync(fd, `{"name": "${r[4]}", "category": "displays", "pricePL": ${pricePL}, "priceUS": ${priceUS}, 
                "url": "${photo}", "resolution": "${resolution}", "matrix": "${matrix}"}, \n`)
    });    

    records = await readCvFile("./xkomgraphiccards.csv");
    records.forEach(r => {
        let pricePL = parseInt(r[5].replace(" ", ""));
        let priceUS = Math.round(pricePL / 4.2);
        let photo = r[9].split("/").pop();
        let chipset = r[6];
        let vram = r[7].replace(" GB", "");
        let type = r[8];
        fs.writeSync(fd, `{"name": "${r[4]}", "category": "graphiccards", "pricePL": ${pricePL}, "priceUS": ${priceUS},
            "url": "${photo}", "chipset": "${chipset}", "capacity": "${vram}", "type": "${type}"}, \n`)
    }); 
    
    records = await readCvFile("./xkommemory.csv");
    records.forEach(r => {
        let pricePL = parseInt(r[5].replace(" ", ""));
        let priceUS = Math.round(pricePL / 4.2);
        let photo = r[10].split("/").pop();
        let capacity = r[6].replace(" GB", "");
        let type = r[7];
        let frequency = r[8].replace(" MHz", "");
        let latency = r[9].replace("CL ", "");
        fs.writeSync(fd, `{"name": "${r[4]}", "category": "memories", "pricePL": ${pricePL}, "priceUS": ${priceUS}, 
            "url": "${photo}", "capacity": "${capacity}", "type": "${type}", 
            "frequency": "${frequency}", "latency": "${latency}"}, \n`)
    });      

    records = await readCvFile("./xkommotherboards.csv");
    records.forEach(r => {
        let pricePL = parseInt(r[6].replace(" ", ""));
        let priceUS = Math.round(pricePL / 4.2);
        let photo = r[11].split("/").pop();
        let standard = r[8];
        let socket = r[9];
        let chipset = r[10];
        fs.writeSync(fd, `{"name": "${r[5]}", "category": "motherboards", "pricePL": ${pricePL}, "priceUS": ${priceUS}, 
            "url": "${photo}", "format": "${standard}", "socket": "${socket}", "chipset": "${chipset}"}, \n`)
    });   
    
    records = await readCvFile("./xkompowersupplies.csv");
    records.forEach(r => {
        let pricePL = parseInt(r[5].replace(" ", ""));
        let priceUS = Math.round(pricePL / 4.2);
        let photo = r[10].split("/").pop();
        let power = r[6].replace(" W", "");
        let standard = r[7];
        fs.writeSync(fd, `{"name": "${r[4]}", "category": "powersupplies", "pricePL": ${pricePL}, "priceUS": ${priceUS}, 
            "url": "${photo}", "power": "${power}", "format": "${standard}"}, \n`)
    });     

    records = await readCvFile("./xkomprocessors.csv");
    records.forEach(r => {
        let pricePL = parseInt(r[10].replace(" ", ""));
        let priceUS= Math.round(pricePL / 4.2);
        let photo = r[6].split("/").pop();
        let socket = r[5];
        let frequency  = r[7].replace(" GHz", "");
        fs.writeSync(fd, `{"name": "${r[4]}", "category": "processors", "pricePL": ${pricePL}, "priceUS": ${priceUS}, 
            "url": "${photo}", "socket": "${socket}", "frequency": "${frequency}"}, \n`)
    });        
    
    records = await readCvFile("./xkomstorage.csv");
    records.forEach(r => {
        let pricePL = parseInt(r[5].replace(" ", ""));
        let priceUS = Math.round(pricePL / 4.2);
        let photo = r[10].split("/").pop();
        let capacity = r[6].replace(" GB", "");
        let interface  = r[7];
        fs.writeSync(fd, `{"name": "${r[4].replace("\"","''")}", "category": "storage", "pricePL": ${pricePL}, "priceUS": ${priceUS}, 
            "url": "${photo}",  "capacity": "${capacity}", "interface": "${interface.replace("\"","''")}"}, \n`)
    });      

    fs.writeSync(fd, ']');

    fs.closeSync(fd);
}

main();