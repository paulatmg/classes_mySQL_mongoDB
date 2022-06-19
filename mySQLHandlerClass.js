var mysql = require('mysql');

class MySQLHandlerClass {
    constructor() {
    }

    async setHost(host) {
        if (!host) {
            throw new Error("Invalid host name");
        }
        this.host = host;
    }

    async setUser(user) {
        if (!user) {
            throw new Error("Invalid user");
        }
        this.user = user;
    }

    async setPassword(password) {
        if (!password) {
            throw new Error("Invalid password");
        }
        this.password = password;
    }

    async setDatabase(database) {
        if (!database) {
            throw new Error("Invalid database");
        }
        this.database = database;
    }

    async getHost() {
        return this.host;
    }

    async getUser() {
        return this.user;
    }

    async getPassword() {
        return this.password;
    }

    async getDatabase() {
        return this.database;
    }


    async build(host, user, password, database) {
        await this.setHost(host);
        await this.setUser(user);
        await this.setPassword(password);
        await this.setDatabase(database);
    }

    async setActiveConnection(connection) {
        this.activeConnection = connection;
    }

//singleton pattern used here to open one time connection
    async getActiveConnection() {
        if (!this.activeConnection) {
            await this.connect();
        }
        return this.activeConnection;
    }

    async connect() {
        var mySQLConnection = mysql.createConnection({
            host: await this.getHost(),
            user: await this.getUser(),
            password: await this.getPassword(),
            database: await this.getDatabase()
        });
        mySQLConnection.connect();
        await this.setActiveConnection(mySQLConnection);
    }

    async executeQuery( query ) {
        const connection = await this.getActiveConnection();
        return new Promise((resolve, reject) => {
            connection.query(query, (error, results, fields) => {
                connection.end();

                if (error) {
                    return reject(error.message);
                }
    
                return resolve(results)

            })
        })
    }
    

}




module.exports = {
    MySQLHandlerClass
}