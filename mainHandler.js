const { User } = require('./userClass');

(async () => {
    const person = new User();
    const person2 = new User();

await person.fetch(3);

await person2.fetch(16);

console.log("\n \n \n person", person);

console.log("person2", person2);

console.log(`${person.fName} say HELLO to ${person2.fName}`);

})();