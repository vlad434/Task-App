const { MongoClient, ObjectId } = require("mongodb");

const connectionURL = "mongodb://localhost:27017"; // URL-ul pentru db care rulează local
const databaseName = "task-app"; // Database name

const client = new MongoClient(connectionURL);

async function main() {
  try {
    await client.connect();

    const db = client.db(databaseName);

    await db.collection("users").deleteMany({
      age: 18,
    });
  } catch (error) {
    console.error("Unable to connect to database", error);
  } finally {
    await client.close();
  }
}

main();
