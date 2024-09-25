// classes/WareHouse.js
const fs = require('fs');
const path = require('path');

class WareHouse {
    constructor() {
        this.fileName = 'warehouse'; // Default filename
    }

    addProduct(city, category, productName, price, quantity, weight) {
        const filename = `${this.fileName}.txt`;
        const filePath = path.join(__dirname, filename);
        
        const data = `${city} | ${category} | ${productName} | ${price} | ${quantity} | ${weight}\n`;
        fs.appendFileSync(filePath, data);
    }

    countProducts(filename) {
        const filePath = path.join(__dirname, filename);
        if (!fs.existsSync(filePath)) {
            console.error(`Error: Unable to open file ${filename}`);
            return;
        }

        const data = fs.readFileSync(filePath, 'utf-8');
        const lines = data.split('\n').filter(line => line.trim() !== '');
        console.log(`Total Products: ${lines.length}`);
    }

    listUnique() {
        const uniqueCities = new Set();
        const filename = `${this.fileName}.txt`;
        const filePath = path.join(__dirname, filename);

        const data = fs.readFileSync(filePath, 'utf-8');
        const lines = data.split('\n');

        for (const line of lines) {
            const city = line.split(' | ')[0];
            uniqueCities.add(city);
        }

        console.log('::TOTAL CITIES::');
        uniqueCities.forEach(city => console.log(city));
    }

    displayProductListFromFile(filename) {
        const filePath = path.join(__dirname, filename);
        const data = fs.readFileSync(filePath, 'utf-8');
        const lines = data.split('\n');

        console.log(left + 'City' + left + 'Category' + left + 'Product Name' + left + 'Price' + left + 'Quantity' + left + 'Weight');
        
        for (const line of lines) {
            const [city, category, productName, price, quantity, weight] = line.split(' | ');
            console.log(`${city} | ${category} | ${productName} | ${price} | ${quantity} | ${weight}`);
        }
    }

    searchProducts(filename, searchTerm) {
        const filePath = path.join(__dirname, filename);
        const data = fs.readFileSync(filePath, 'utf-8');
        const lines = data.split('\n');

        console.log(left + 'City' + left + 'Category' + left + 'Product Name' + left + 'Price' + left + 'Quantity' + left + 'Weight');
        lines.forEach(line => {
            if (line.includes(searchTerm)) {
                const [city, category, productName, price, quantity, weight] = line.split(' | ');
                console.log(`${city} | ${category} | ${productName} | ${price} | ${quantity} | ${weight}`);
            }
        });
    }
}

module.exports = WareHouse; // Export the class
