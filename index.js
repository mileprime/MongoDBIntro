const { MongoClient } = require('mongodb');

async function main() {
    const uri = "mongodb://localhost:27017";
    const client = new MongoClient(uri);

    try {
        await client.connect();
        // await createDocument(client);
        // await findDocument(client);
        await createFind(client);
        console.log("Connected to MongoDB!");
    } catch(e) {
        console.error(e);
    } finally {
        await client.close();
    }
}


async function createDocument(client){
    const result = await 
    client.db("Node").collection("users").insertMany([{
        name: "John Doe",
        age: 30,
        profession: "Software Engineer"
    },
    {
        name: "Miles Road",
        age: 30,
        profession: "Tech Creator"
    },
    {
        name: "Miles Green",
        age: 100000001,
        profession: "System Designer"
    }
    
]);
console.log(`New document created with the following id: ${result.insertedId}`);
}
async function findDocument(client) {
    const result = await 
    client.db("Node").collection("users").findOne({name: "John Doe"});
    if (result) {
        console.log("Found a document in the collection:", result);
    } else {
        console.log("No document atches the provided query.");
    }
}

    

async function createFind(client) {
    const result = await
    client.db("Node").collection("users").insertOne({ name: "Chinedu Ochongor", age: 25});
    console.log(" name is: ", result.name );
    const result1 = await
    
    client.db("Node").collection("users").findOne({age: 30});
    if (result1) {
        console.log("Age exists", result1);
    } else {
        console.log("Age does not exist");
    }
}
main().catch(console.error);