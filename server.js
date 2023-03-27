import express from "express";

import { logger } from "./middlewares/logger.js";
import { MongoClient } from "mongodb";
import bodyParser from "body-parser";

const app = express();
const PORT = 4300;
const databaseUri = "mongodb://localhost:27017";
const databaseName = "sample_mflix";

const mongoClient = new MongoClient(databaseUri);

const jsonParser = bodyParser.json();

app.set("port", PORT);

app.use(logger);

app.post("/movies", jsonParser, async (req, res) => {
  if (!req?.body?.title) {
    console.error("Invalid body");
    res.status(400).send("Bad request");
    return;
  }

  const movie = { title: req.body.title, rating: req.body.rating ?? 3 };

  try {
    await mongoClient.connect();
    const database = mongoClient.db(databaseName);
    const collection = database.collection("movies");
    const result = await collection.insertOne(movie);
    res.status(201).json(result);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("DB Error");
  } finally {
    await mongoClient.close();
  }
});

app.get("/movies", async (req, res) => {
  try {
    await mongoClient.connect();
    const database = mongoClient.db(databaseName);
    const collection = database.collection("movies");
    const result = await collection.find({}).toArray();
    res.status(200).json(result);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("DB Error");
  } finally {
    await mongoClient.close();
  }
});

// app.get("/movies/:id", async(req, res) => {})

app.listen(app.get("port"), () => {
  console.log(`server running on port ${PORT}`);
});
