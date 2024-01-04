const { MongoClient, ServerApiVersion } = require("mongodb");
const express = require("express");

const app = express();
const cors = require("cors");

require("dotenv").config();
const port = process.env.PORT || 2000;

app.use(cors());
app.use(express.json());
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.8zviwwt.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});
async function run() {
  try {
    const serviceCollection = client
      .db("weforthem-data")
      .collection("supports-data");
    const eventsCollection = client.db("weforthem-data").collection("events");
    const volunteerCollection = client
      .db("weforthem-data")
      .collection("volunteers");
    const supportCollection = client.db("weforthem-data").collection("users");

    // Connect the client to the server	(optional starting in v4.7)
    app.get("/supports", async (req, res) => {
      const query = {};
      const cursor = serviceCollection.find(query);
      const supports = await cursor.toArray();
      res.send(supports);
    });
    app.get("/events", async (req, res) => {
      const query1 = {};
      const cursorEvent = eventsCollection.find(query1);
      const events = await cursorEvent.toArray();
      res.send(events);
    });
    app.post("/volunteers", async (req, res) => {
      const data = req.body;
      console.log(data);
      const result = await volunteerCollection.insertOne(data);
      res.send(result);
    });
    app.get("/volunteers", async (req, res) => {
      const query2 = {};
      const cursorEvent = volunteerCollection.find(query2);
      const volunteers = await cursorEvent.toArray();
      res.send(volunteers);
    });

    //register for volunteer part
    app.delete("/volunteers/:id", async (req, res) => {
      const id = req.params.id;
      
      const filter = { _id: new ObjectId(id) };
      const result = await volunteerCollection.deleteOne(filter);
      res.send(result)
      if (result.deletedCount === 1) {
        console.log("Successfully deleted one document.");
      } else {
      console.log('not deleted');
      }
    });
  } finally {
    // Ensures that the client will close when you finish/error
  }
}
run().catch((err) => console.error(err));

app.get("/", (req, res) => {
  res.send("Welcome WeforThem Server");
});

app.listen(port, () => {
  console.log(`port in ${port}`);
});
