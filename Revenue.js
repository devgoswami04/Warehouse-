// classes/Revenue.js
const fs = require('fs');
const path = require('path');

class Revenue {
    constructor() {
        this.TotalWeight = 0.0;
        this.TotalWeightCategory = 0.0;
        this.TotalWeightCity = 0.0;
    }

    allWeight(filename) {
        const filePath = path.join(__dirname, filename);
        if (!fs.existsSync(filePath)) {
            console.error(`Error opening file: ${filename}`);
            return 0;
        }

        const data = fs.readFileSync(filePath, 'utf-8');
        const lines = data.split('\n');

        for (const line of lines) {
            if (!line) continue; // Skip empty lines
            const [city, category, productName, price, quantity, weight] = line.split(' | ');
            this.TotalWeight += parseFloat(weight) * parseInt(quantity);
        }

        return this.TotalWeight;
    }

    weightPerCategory(fileName, searchTerm) {
        this.TotalWeightCategory = 0.0;
        const filePath = path.join(__dirname, `${fileName}.txt`);
        if (!fs.existsSync(filePath)) {
            console.error(`Error opening file: ${fileName}`);
            return 0.0;
        }

        const data = fs.readFileSync(filePath, 'utf-8');
        const lines = data.split('\n');

        for (const line of lines) {
            if (line.includes(searchTerm)) {
                const [city, category, productName, price, quantity, weight] = line.split(' | ');
                this.TotalWeightCategory += parseInt(quantity) * parseFloat(weight);
            }
        }

        return this.TotalWeightCategory;
    }

    weightPerCity(fileName, searchTerm) {
        this.TotalWeightCity = 0.0;
        const filePath = path.join(__dirname, `${fileName}.txt`);
        if (!fs.existsSync(filePath)) {
            console.error(`Error opening file: ${fileName}`);
            return 0.0;
        }

        const data = fs.readFileSync(filePath, 'utf-8');
        const lines = data.split('\n');

        for (const line of lines) {
            if (line.includes(searchTerm)) {
                const [city, category, productName, price, quantity, weight] = line.split(' | ');
                this.TotalWeightCity += parseInt(quantity) * parseFloat(weight);
            }
        }

        return this.TotalWeightCity;
    }
}

module.exports = Revenue; // Export the class
