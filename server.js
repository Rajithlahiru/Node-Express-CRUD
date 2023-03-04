const express = require('express')
const mongoose = require('mongoose')
const Product = require('./models/productModel')
const app = express()
const port = 3000


app.use(express.json())
app.use(express.urlencoded({extended: false}))

//testing
app.get('/add',(req, res)=>{
  res.send('test')
})

//post products
app.post('/products', async(req, res) => {
  try {
      const product = await Product.create(req.body);
      res.status(200).json(product);
      
  } catch (error) {
      console.log(error.message);
      res.status(500).json({message: error.message})
  }
})

//get all products
app.get('/products', async(req, res) =>{
  try {
    const products = await Product.find({});
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({message: error.message})
  }
})

//get a single product using id
app.get('/products/:id', async(req, res) =>{
  try {
    const {id} = req.params;
    const product = await Product.findById(id);
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({message: error.message})
  }
})

// update a item using id
app.put('/products/:id',async(req, res) =>{
  try {
    const {id} = req.params;
    const product = await Product.findByIdAndUpdate(id, req.body);
    if(!product){
      //if a database haven't have that item
      res.status(404).json({message:`cant find any product using ${id}`})
    }
    const updatedProduct = await Product.findById(id);
    res.status(200).json(updatedProduct);
  } catch (error) {
    res.status(500).json({message: error.message})
  }
})

// delete a product using id
app.delete('/products/:id',async(req, res) =>{
  try {
    const {id} = req.params;
    const product = await Product.findByIdAndDelete(id);
    if(!product){
      //if a database haven't have that item
      res.status(404).json({message:`cant find any product using ${id}`})
    }
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({message: error.message})
  }
})


// connect database
mongoose.connect('mongodb+srv://rajithlahiru7:admin123@quadratsapi.jmrgvxh.mongodb.net/Node-API?retryWrites=true&w=majority')
.then(() =>{
  console.log('connect to mongoDB')
  app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  });
}).catch((error) =>{
  console.log(error)
})