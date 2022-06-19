const { mongoHandlerClass } = require('./mongoHandlerClass');

class Car {
    constructor(make, year, model) {
        this.make = make;
        this.model = model;
        this.year = year;
    }

    async setMake(make) {
        if ((/^[A-Za-z\s]+$/.test(make))) {
            this.make = make;
        }
    }

    async setYear(year) {
        if (((year).toString().match(/\d/g)).length === 4) {
            this.year = year;
        }
    }

    async setModel(model) {
        this.model = model.trim();
    }

    async getMake() {
        return this.make;
    }

    async getYear() {
        return this.year;
    }

    async getModel() {
        return this.model;
    }

    async build(make, year, model) {
        await this.setMake(make);
        await this.setYear(year);
        await this.setModel(model);
    }

    async fetch(make) {
        const connection = new mongoHandlerClass();
        await connection.build("mongodb+srv://paulatmg:Paula1512@paulatmg.atezy.mongodb.net/?retryWrites=true&w=majority", "paula", "car");
        const result = await connection.fetchDoc(make);
        await this.build(result[0].make, result[0].year, result[0].model);

    }
}


module.exports = {
    Car
}