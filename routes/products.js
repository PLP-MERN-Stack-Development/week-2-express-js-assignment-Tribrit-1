const express = require('express');
const { v4: uuidv4 } = require('uuid');
const { NotFoundError, ValidationError } = require('../middleware/errorHandler');
const authenticate = require('../middleware/auth');

const router = express.Router();
let products = [
  {
    id: '1',
    name: 'Laptop',
    description: 'High-performance laptop with 16GB RAM',
    price: 1200,
    category: 'electronics',
    inStock: true
  },
  {
    id: '2',
    name: 'Smartphone',
    description: 'Latest model with 128GB storage',
    price: 800,
    category: 'electronics',
    inStock: true
  },
  {
    id: '3',
    name: 'Coffee Maker',
    description: 'Programmable coffee maker with timer',
    price: 50,
    category: 'kitchen',
    inStock: false
  }
];

// router.use(authenticate);

// Validation middleware
const validateProduct = (req, res, next) => {
  const { name, description, price, category, inStock } = req.body;
  
  if (!name || !description || !price || !category || inStock === undefined) {
    return next(new ValidationError('Missing required fields'));
  }
  
  if (typeof price !== 'number' || price <= 0) {
    return next(new ValidationError('Price must be a positive number'));
  }
  
  next();
};

// GET all products (with filtering and pagination)
router.get('/', (req, res) => {
  let filteredProducts = [...products];
  
  if (req.query.category) {
    filteredProducts = filteredProducts.filter(
      p => p.category.toLowerCase() === req.query.category.toLowerCase()
    );
  }
  
  if (req.query.inStock) {
    const inStock = req.query.inStock.toLowerCase() === 'true';
    filteredProducts = filteredProducts.filter(p => p.inStock === inStock);
  }
  
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const startIndex = (page - 1) * limit;
  
  const results = {
    total: filteredProducts.length,
    page,
    limit,
    data: filteredProducts.slice(startIndex, startIndex + limit)
  };
  
  res.json(results);
});

// GET product by ID
router.get('/:id', (req, res, next) => {
  const product = products.find(p => p.id === req.params.id);
  if (!product) {
    return next(new NotFoundError('Product not found'));
  }
  res.json(product);
});

// POST create new product
router.post('/', validateProduct, (req, res) => {
  const { name, description, price, category, inStock } = req.body;
  
  const newProduct = {
    id: uuidv4(),
    name,
    description,
    price,
    category,
    inStock
  };

  products.push(newProduct);
  res.status(201).json(newProduct);
});

// PUT update product
router.put('/:id', validateProduct, (req, res, next) => {
  const productIndex = products.findIndex(p => p.id === req.params.id);
  
  if (productIndex === -1) {
    return next(new NotFoundError('Product not found'));
  }

  const { name, description, price, category, inStock } = req.body;
  
  products[productIndex] = {
    ...products[productIndex],
    name,
    description,
    price,
    category,
    inStock
  };

  res.json(products[productIndex]);
});

// DELETE product
router.delete('/:id', (req, res, next) => {
  const productIndex = products.findIndex(p => p.id === req.params.id);
  
  if (productIndex === -1) {
    return next(new NotFoundError('Product not found'));
  }

  products.splice(productIndex, 1);
  res.status(204).send();
});

// Search products
router.get('/search', (req, res) => {
  const searchTerm = req.query.q;
  if (!searchTerm) {
    return res.status(400).json({ message: 'Search term is required' });
  }
  
  const searchResults = products.filter(p =>
    p.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  res.json(searchResults);
});

// Product statistics
router.get('/stats', (req, res) => {
  const stats = {
    totalProducts: products.length,
    inStock: products.filter(p => p.inStock).length,
    outOfStock: products.filter(p => !p.inStock).length,
    byCategory: {}
  };
  
  products.forEach(product => {
    if (!stats.byCategory[product.category]) {
      stats.byCategory[product.category] = 0;
    }
    stats.byCategory[product.category]++;
  });
  
  res.json(stats);
});

module.exports = router;