const express = require('express')
const { MongoClient } = require('mongodb');
const cors = require('cors')
const ObjectId = require('mongodb').ObjectId
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
    const bookingCollection = database.collection("user_book")
    
    // POST API
    app.post('/addservice', async(req, res)=>{
      const newService = (req.body);
      const result = await toursCollection.insertOne(newService)
      res.json(result)
    })

    // ADD BOOKING POST
    app.post('/addbooking', async(req, res)=>{
      const newBook = (req.body)
      const result = await bookingCollection.insertOne(newBook)
      res.json(result)
      console.log(result);
    })
  

    // GET MY BOOKING
    app.get('/mybooking/:email', async(req, res)=>{
      const query = (req.params.email)
      const result = await bookingCollection.find({email : (query)}).toArray()
      res.send(result);
    })

    // GET API
    app.get('/tours', async(req,res)=>{
      const result = await toursCollection.find({}).toArray()
      res.send(result)
    })

    // GET ALL Booking API
    app.get('/allbooking', async(req,res)=>{
      const result = await toursCollection.find({}).toArray()
      res.send(result)
    })

    // DELETE BOOKING

    app.delete('/booking/:id', async (req, res) => {
      const id = req.params.id
      const query = {_id: ObjectId(id)}
      const result = bookingCollection.deleteOne(query)
      res.json(result)
    });
   
  } finally {
    // await client.close();
  }
}
run().catch(console.dir);


app.listen(port, () =>{
  console.log('Running web server listening on port', port)
})