const { MongoClient } = require('mongodb');

const url = 'mongodb://localhost:27017'; // Replace with your MongoDB connection string

const client = new MongoClient(url, { useNewUrlParser: true, useUnifiedTopology: true});

async function main() {
  try {
    await client.connect();
    console.log('Connected to MongoDB');

    const databasesList = await client.db().admin().listDatabases();
    console.log('Databases:');
    databasesList.databases.forEach(db => {
      console.log(`- ${db.name}asi`);
    });
  }catch (error) {
    console.error('Error connecting to MongoDB:', error);
  }finally {
    await client.close();
  }
};

main().catch(console.error);