const express = require('express')
var cors = require('cors')
const { MongoClient } = require('mongodb');
require('dotenv').config()
const app = express()
const port = process.env.port || 5000

// Middleware
app.use(cors())
app.use(express.json())

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.zz9qt.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });


async function run(){
   try{
      // Connect the client to the server
    await client.connect();
    console.log("Connected successfully to server");
   }
   finally{
      await client.close()
   }
}
run().catch(console.dir)


app.get("/", (req, res)=>{
   res.send("Server is running")
})

app.listen(port, ()=>{
   console.log("Server running at port", port);
})