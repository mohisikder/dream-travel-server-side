const express = require('express')
const { MongoClient } = require('mongodb');
const cors = require('cors')
require('dotenv').config()

const app = express()
const port = process.env.PORT || 5000

// Middleware
app.use(cors())
app.use(express.json());



const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.zz9qt.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

async function run() {
  try {
    await client.connect();
    const database = client.db("dream_travel_db");
    const toursCollection = database.collection("tours");
    const bookingCollection = database.collection("booking")
    
    // POST API
    app.post('/addservice', async(req, res)=>{
      const newService = (req.body);
      const result = await toursCollection.insertOne(newService)
      res.json(result)
    })

    // GET API
    app.get('/tours', async(req,res)=>{
      const result = await toursCollection.find({}).toArray()
      res.send(result)
    })
   
  } finally {
    // await client.close();
  }
}
run().catch(console.dir);

app.get('/', (req, res)=>{
   res.send('Hello World!! from heroku')
})

app.get('/products/:id', (req, res)=> {
  res.json({msg: 'This is CORS-enabled for all origins!'})
})

app.listen(port, () =>{
  console.log('Running web server listening on port', port)
})