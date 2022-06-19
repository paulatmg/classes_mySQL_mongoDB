const { MySQLHandlerClass } = require('./mySQLHandlerClass');


class User {
    constructor(fName, lName, dob, phoneNumber, email) {
        this.fName = fName;
        this.lName = lName;
        this.dob = dob;
        this.phoneNumber = phoneNumber;
        this.email = email;
    }

    async setFirstName(fName) {
        this.fName = fName.trim();
    }

    async setLastName(lName) {
        this.lName = lName.trim();
    }

    async setDob(dob) {
        this.dob = dob;
    }

    async setPhoneNumber(phoneNumber) {
        this.phoneNumber = phoneNumber.trim();
    }

    async setEmail(email) {
        this.email = email.trim();
    }

    async getFirstName() {
        return this.fName;
    }

    async getLastName() {
        return this.lName;
    }

    async getDob() {
        return this.dob;
    }

    async getPhoneNumber() {
        return this.phoneNumber ? `+55${this.phoneNumber}` : undefined;
    }

    async getEmail() {
        return this.email;
    }

    async build(fName, lName, dob, phoneNumber, email) {
        await this.setFirstName(fName);
        await this.setLastName(lName);
        await this.setDob(dob);
        await this.setPhoneNumber(phoneNumber);
        await this.setEmail(email);
    }

    async fetch(userID) {
        const connection = new MySQLHandlerClass();
        await connection.build("ebh2y8tqym512wqs.cbetxkdyhwsb.us-east-1.rds.amazonaws.com", "q2w01mu95z1r9p9x", "b3cthljmoxgfhpyt", "zgwqhx5rlwm7kj0u");
        //console.log("connection", connection);
        const result = await connection.executeQuery(`SELECT * FROM users WHERE id = "${userID}"`);

        console.log("Result", result);
        
        await this.build(result[0].firstName, result[0].lastName, result[0].dob, result[0].phoneNumber, result[0].email);

    }



}

module.exports = {
    User
}