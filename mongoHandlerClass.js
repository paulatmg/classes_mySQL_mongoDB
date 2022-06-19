const { MongoClient, ObjectId } = require('mongodb');

class mongoHandlerClass {
    constructor() {

    }

    async setURL(url) {
        if (!url) {
            throw new Error("Invalid URL");
        }
        this.url = url;
    }

    async setdbName(dbName) {
        if (!dbName) {
            throw new Error("Invalid Database");
        }
        this.dbName = dbName;
    }

    async setCollectionName(collectionName) {
        if (!collectionName) {
            throw new Error("Invalid Collection Name");
        }
        this.collectionName = collectionName;
    }

    async getURL() {
        return this.url;
    }

    async getdbName() {
        return this.dbName;
    }

    async getCollectionName() {
        return this.collectionName;
    }

    async build(url, dbName, collectionName) {
        await this.setURL(url);
        await this.setdbName(dbName);
        await this.setCollectionName(collectionName);
    }

    async setActiveConnection(connection) {
        this.activeConnection = connection;
    }

    async getActiveConnection() {
        if (!this.activeConnection) {
            await this.openConnectionwithMongo();
        }
        return this.activeConnection;
    }


    async setActiveClient(activeClient) {
        if (!activeClient) {
            throw new Error("Invalid Active Client");
        }
        this.activeClient = activeClient;
    }

    async getActiveClient() {
        return this.activeClient;

    }


    async openConnectionwithMongo() {
        const url = await this.getURL();
        const dbName = await this.getdbName();
        const collectionName = await this.getCollectionName();

        const client = new MongoClient(url);
        await client.connect();
        const db = client.db(dbName);
        const activeConnection = db.collection(collectionName);

        await this.setActiveConnection(activeConnection);
        await this.setActiveClient(client);
    }


    async fetchDoc(search) {
        const connection = await this.getActiveConnection();
        const activeClient = await this.getActiveClient();
        const result = await connection.find(search).toArray()
        activeClient.close();
        
        return result;
    }












}








module.exports = {
    mongoHandlerClass
}