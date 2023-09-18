const { MongoClient, ServerApiVersion } = require("mongodb");

const client = new MongoClient(process.env.MONGO_URI, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true
    }
});

const run = async () => {
    try {
        await client.connect();
        await client.db("instagram").command({ ping: 1 });
        return client;
    } catch (error) {
        console.error(error.message);
        throw error;
    }
}

module.exports = run