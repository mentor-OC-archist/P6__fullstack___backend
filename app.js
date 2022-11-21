const express = require('express');
const mongoose = require('mongoose');





const app = express();

const Product = require('./models/Product');





mongoose.connect('mongodb+srv://archist:1&Bigcyri@cluster0.61na4.mongodb.net/?retryWrites=true&w=majority',
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));





app.use(express.json());

//CORS
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});



// RÉCUPÉRER TOUS LES PRODUITS
app.get('/api/products', (req, res, next) => {
  console.log("GET ALL");
  Product.find()
      .then(products => res.status(200).json({products}))
      .catch(error => res.status(400).json({ error }));
});
// RÉCUPÉRER UN SEUL PRODUIT
app.get('/api/products/:id', (req, res, next) => {
  console.log("GET ONE");
  console.log(req.params);
  Product.findOne({ _id: req.params.id })
        .then(product => res.status(200).json({product}))
        .catch(error => res.status(400).json({ error }));
});
// ENREGISTRER UN NOUVEAU PRODUITS
app.post('/api/products', (req, res, next) => {
  console.log("POST");
  console.log(req.body);
  const product = new Product({
    ...req.body
  });
  product.save()
    .then(response => {
      console.log(response);
      return res.status(201).json({ product })
    })
    .catch(error => res.status(400).json({ error }));
});
// MODIFIER UN PRODUIT EXISTANT
app.put('/api/products/:id', (req, res, next) => {
  console.log("PUT");
  console.log(req.body)
  Product.updateOne({ _id: req.params.id }, { ...req.body })
    .then(() => res.status(200).json({ message: 'Modified!'}))
    .catch(error => res.status(400).json({ error }));
});

// SUPPRIMER UN PRODUIT EXISTANT
app.delete('/api/products/:id', (req, res, next) => {
  console.log("DELETE");
    Product.deleteOne({ _id: req.params.id })
      .then(() => res.status(200).json({ message: 'Deleted!'}))
      .catch(error => res.status(400).json({ error }));
});





module.exports = app;