const express = require("express");
const app = express();
const cors = require("cors");
require('dotenv').config()
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());



const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.zyvach0.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();

    const servicesCollection = client.db("portfolioNEXT").collection("services")
    const skillsCollection = client.db("portfolioNEXT").collection("skills")
    const aboutCollection = client.db("portfolioNEXT").collection("about")
    const workCollection = client.db("portfolioNEXT").collection("work")

    app.get("/services", async (req, res) => {
        const result = await servicesCollection.find().toArray()
        res.send(result)
    })

    app.get("/skills", async (req, res) => {
        const result = await skillsCollection.find().toArray()
        res.send(result)
    })

    app.get("/about", async (req, res) => {
        const result = await aboutCollection.find().toArray()
        res.send(result)
    })

    app.get("/work", async (req, res) => {
        const result = await workCollection.find().toArray()
        res.send(result)
    })

    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);



app.get("/", (req, res) => {
    res.send("portfolio");
});

app.listen(port, () => {
    console.log(`Portfolio is running on port ${port}`);
});
