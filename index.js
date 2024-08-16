// Importing MongoClient from the mongodb package to establish a connection with MongoDB
const { MongoClient } = require('mongodb');

// Asynchronous function named main that will serve as the entry point of our script
async function main() {
    // Defining the URI string for the MongoDB instance running locally on port 27017
    const uri = "mongodb://localhost:27017";
    // Creating a new MongoClient instance using the provided URI
    const client = new MongoClient(uri);

    // Using a try-catch-finally block to handle asynchronous operations safely
    try {
        // Attempting to connect to the MongoDB server asynchronously
        await client.connect();
        // Commented out for now, but would call a function to create a document in the database
        // await createDocument(client);
        // Commented out for now, but would call a function to find a document in the database
        // await findDocument(client);
        // Calling the createFind function to insert a new document and then find a document based on certain criteria
        await createFind(client);
        // Logging a success message once connected to MongoDB
        console.log("Connected to MongoDB!");
    } catch(e) {
        // Logging any errors that occur during the execution of the try block
        console.error(e);
    } finally {
        // Ensuring the MongoDB client connection is closed after the operations are completed
        await client.close();
    }
}

// Asynchronous function to create multiple documents in the users collection of the Node database
async function createDocument(client){
    // Inserting multiple documents into the users collection of the Node database
    const result = await client.db("Node").collection("users").insertMany([
        {
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
    // Logging the ID of the newly inserted document(s)
    console.log(`New document created with the following id: ${result.insertedId}`);
}

// Asynchronous function to find a single document in the users collection of the Node database
async function findDocument(client) {
    // Searching for a document with the name "John Doe" in the users collection of the Node database
    const result = await client.db("Node").collection("users").findOne({name: "John Doe"});
    // Checking if a document was found and logging the result accordingly
    if (result) {
        console.log("Found a document in the collection:", result);
    } else {
        console.log("No document matches the provided query.");
    }
}

// Asynchronous function to demonstrate inserting a single document and then finding a document based on a condition
async function createFind(client) {
    // Inserting a single document into the users collection of the Node database
    const result = await client.db("Node").collection("users").insertOne({ name: "Chinedu Ochongor", age: 25});
    // Logging the inserted document's name
    console.log("Name is: ", result.name);
    // Finding a document with the age 30 in the users collection of the Node database
    const result1 = await client.db("Node").collection("users").findOne({age: 30});
    // Checking if a document matching the age condition was found and logging the result accordingly
    if (result1) {
        console.log("Age exists", result1);
    } else {
        console.log("Age does not exist");
    }
}

// Calling the main function and catching any errors that may occur
main().catch(console.error);
