const { Car } = require('./carClass');
const { mongoHandlerClass } = require('./mongoHandlerClass');

(async () => {


    const connection = new mongoHandlerClass();
    await connection.build("mongodb+srv://paulatmg:Paula1512@paulatmg.atezy.mongodb.net/?retryWrites=true&w=majority", "paula", "car");
    const result = await connection.fetchDoc({ make: "audi" });

    const veiculos = [];

    for (var i = 0; i < result.length; i++) {
        let veiculo = new Car();
        let car = result[i];
        await veiculo.build(car.make, car.year, car.model);
        veiculos.push(veiculo);

    }


    console.log(veiculos);


    //     const car = new Car();

    //     await car.fetch({
    //         make: "bmw"
    //     });

    //     console.log("\n \n \n car:", car);

})();
