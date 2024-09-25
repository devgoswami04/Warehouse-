// classes/ManageProduct.js
const fs = require('fs');
const path = require('path');
const WareHouse = require('./WareHouse');

class ManageProduct extends WareHouse {
    constructor() {
        super(); // Call the constructor of the base class
    }

    listUnique() {
        const uniqueCategories = new Set();
        const filename = `${this.fileName}.txt`;
        const filePath = path.join(__dirname, filename);

        const data = fs.readFileSync(filePath, 'utf-8');
        const lines = data.split('\n');

        for (const line of lines) {
            const category = line.split(' | ')[1]; // Assuming category is in the second position
            uniqueCategories.add(category);
        }

        console.log('Unique Categories:');
        uniqueCategories.forEach(category => console.log(category));
    }

    changePrice(productName, newPrice) {
        const filename = `${this.fileName}.txt`;
        const filePath = path.join(__dirname, filename);
        const data = fs.readFileSync(filePath, 'utf-8');
        const lines = data.split('\n');
        const updatedLines = lines.map(line => {
            const parts = line.split(' | ');
            if (parts[2] === productName) { // Assuming productName is in the third position
                parts[3] = newPrice; // Update the price
            }
            return parts.join(' | ');
        });

        fs.writeFileSync(filePath, updatedLines.join('\n'));
        console.log(`Price of ${productName} changed to ${newPrice}`);
    }

    displayProducts() {
        const filename = `${this.fileName}.txt`;
        const filePath = path.join(__dirname, filename);
        const data = fs.readFileSync(filePath, 'utf-8');
        console.log('Products:');
        console.log(data);
    }

    changeQuantity(productName, newQuantity) {
        const filename = `${this.fileName}.txt`;
        const filePath = path.join(__dirname, filename);
        const data = fs.readFileSync(filePath, 'utf-8');
        const lines = data.split('\n');
        const updatedLines = lines.map(line => {
            const parts = line.split(' | ');
            if (parts[2] === productName) { // Assuming productName is in the third position
                parts[4] = newQuantity; // Update the quantity
            }
            return parts.join(' | ');
        });

        fs.writeFileSync(filePath, updatedLines.join('\n'));
        console.log(`Quantity of ${productName} changed to ${newQuantity}`);
    }
}

module.exports = ManageProduct; // Export the class
