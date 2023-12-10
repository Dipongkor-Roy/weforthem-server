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
    const serviceCollection=client.db("weforthem-data").collection("supports-data");
    const supportCollection=client.db("weforthem-data").collection("users");
    // Connect the client to the server	(optional starting in v4.7)
    app.get("/supports",async(req,res)=>{
        const query={};
        const cursor=serviceCollection.find(query);
        const supports=await cursor.toArray();
        res.send(supports);
    })
  } finally {
    // Ensures that the client will close when you finish/error
    
  }
}
run().catch((err)=>console.error(err));

app.get("/", (req, res) => {
  res.send("Welcome WeforThem Server");
});

app.listen(port, () => {
  console.log(`port in ${port}`);
});
