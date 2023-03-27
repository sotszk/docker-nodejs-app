import { MongoClient } from "mongodb";

const connectMongodb = () => {
  // Replace the uri string with your connection string.
  const uri = "mongodb://localhost:27017";

  const client = new MongoClient(uri);

  async function run() {
    try {
      const database = client.db("sample_mflix");
      const collection = database.collection("movies");

      const result = await collection.find({}).toArray();
      console.log(result.length > 0 ? result[0] : null);

      // const movies = database.collection("movies");

      // Query for a movie that has the title 'Back to the Future'
      // const query = { title: "Back to the Future" };
      // const movie = await movies.findOne(query);

      // console.log(movie);
    } finally {
      // Ensures that the client will close when you finish/error
      await client.close();
    }
  }

  run().catch(console.dir);
};

connectMongodb();
