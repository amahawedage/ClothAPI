const express = require('express');
const mongoose = require('mongoose');
const app = express();

// Middleware to parse JSON bodies
app.use(express.json());

const Schema = mongoose.Schema;

const productSchema = new Schema({
  name: { type: String, required: true },
  category: { type: String, required: true },
  description: { type: String, required: true },
  imageurl: { type: String, required: true },
  price: { type: Number, required: true },
  availability: { type: Number, default: 1 },
  tags: { type: [String], required: true },
  availablesize: { type: [String], required: true },
  availablecolor: { type: [String], required: true },
});

const Product = mongoose.model('Product', productSchema);

// Connection to MongoDB
mongoose.connect('mongodb+srv://adminAPI:API123@weatherapi.e6fytdl.mongodb.net/Node-API?retryWrites=true&w=majority&appName=WeatherAPI')
.then(() => {
    console.log('Connected to MongoDB');
}).catch((error) => {
    console.error(error);
});

// Basic route
app.get('/', (req, res) => {
    res.send('Hello Node NIBM');
});

app.get('/blog', (req, res) => {
    res.send('Hello Blog, My name is Anusha');
});

// CRUD operations for Product
// Create a Product
app.post('/product', async (req, res) => {
    try {
        const product = new Product(req.body);
        await product.save();
        res.status(201).send(product);
    } catch (error) {
        res.status(400).send(error);
    }
});

// Read all Products
app.get('/products', async (req, res) => {
    try {
        const products = await Product.find({});
        res.send(products);
    } catch (error) {
        res.status(500).send();
    }
});

// Read a single Product by ID
app.get('/product/:id', async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) {
            return res.status(404).send();
        }
        res.send(product);
    } catch (error) {
        res.status(500).send();
    }
});

// Update a Product
app.patch('/product/:id', async (req, res) => {
    const updates = Object.keys(req.body);
    const allowedUpdates = ['name', 'category', 'description', 'imageurl', 'price', 'availability', 'tags', 'availablesize', 'availablecolor'];
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update));

    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid updates!' });
    }

    try {
        const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!product) {
            return res.status(404).send();
        }
        res.send(product);
    } catch (error) {
        res.status(400).send(error);
    }
});

// Delete a Product
app.delete('/product/:id', async (req, res) => {
    try {
        const product = await Product.findByIdAndDelete(req.params.id);
        if (!product) {
            return res.status(404).send();
        }
        res.send(product);
    } catch (error) {
        res.status(500).send();
    }
});

// Read Product by Category
/*
app.get('/product/:category', async (req, res) => {
    try {
        const category = req.params.category;
        const products = await Product.find({Category:category});
        if (!products) {
            return res.status(404).send();
        }
        res.send(products);
    } catch (error) {
        res.status(500).send();
    }
});
*/

// Read Product by Category
app.get('/productbycat/:category', async (req, res) => {
    try {
      const category = req.params.category;
      const products = await Product.find({ category: category });
  
      if (products.length === 0) {
        return res.status(404).send({ error: 'No products found for the specified category' });
      }
  
      res.send(products);
    } catch (error) {
      console.error(error);
      res.status(500).send({ error: 'Internal server error' });
    }
  });

//category

const categorySchema = new Schema({
    code: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    imageurl: { type: String, required: true }
  });
  
  const Category = mongoose.model('Category', categorySchema);

// CRUD operations for Category
// Create a Category
app.post('/category', async (req, res) => {
    try {
        const category = new Category(req.body);
        await category.save();
        res.status(201).send(category);
    } catch (error) {
        res.status(400).send(error);
    }
});

// Read all Category
app.get('/categories', async (req, res) => {
    try {
        const category = await Category.find({});
        res.send(category);
    } catch (error) {
        res.status(500).send();
    }
});

// Read a single Category by ID
app.get('/category/:id', async (req, res) => {
    try {
        const category = await Category.findById(req.params.id);
        if (!category) {
            return res.status(404).send();
        }
        res.send(category);
    } catch (error) {
        res.status(500).send();
    }
});

// Update a Category
app.patch('/category/:id', async (req, res) => {
    const updates = Object.keys(req.body);
    const allowedUpdates = ['code','name','imageurl'];
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update));

    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid updates!' });
    }

    try {
        const category = await Category.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!category) {
            return res.status(404).send();
        }
        res.send(category);
    } catch (error) {
        res.status(400).send(error);
    }
});

// Delete a Product
app.delete('/category/:id', async (req, res) => {
    try {
        const category = await Category.findByIdAndDelete(req.params.id);
        if (!category) {
            return res.status(404).send();
        }
        res.send(category);
    } catch (error) {
        res.status(500).send();
    }
});

//cart

//Users
const userSchema = new Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    email: { type: String, required: true },
    // Add any other fields you find necessary
  });
  
  const User = mongoose.model('User', userSchema);

  app.post('/user', async (req, res) => {
    try {
        const user = new User(req.body);
        await user.save();
        res.status(201).send(user);
    } catch (error) {
        res.status(400).send(error);
    }
});

app.get('/users', async (req, res) => {
    try {
        const users = await User.find({});
        res.send(users);
    } catch (error) {
        res.status(500).send();
    }
});

app.patch('/user/:id', async (req, res) => {
    const updates = Object.keys(req.body);
    const allowedUpdates = ['username', 'password', 'email']; // Specify allowable fields for update
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update));

    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid updates!' });
    }

    try {
        const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!user) {
            return res.status(404).send();
        }
        res.send(user);
    } catch (error) {
        res.status(400).send(error);
    }
});

app.delete('/user/:id', async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        if (!user) {
            return res.status(404).send();
        }
        res.send(user);
    } catch (error) {
        res.status(500).send();
    }
});

app.post('/user/login', async (req, res) => {
    console.log(req.body)
    try {
        // Find the user by username
        const user = await User.findOne({ username: req.body.username, password: req.body.password });

        // Check if user exists
        if (user) {
            // Returning the entire user object (consider excluding sensitive information in a real app)
            res.send(user);
        } else {
            // User not found or password does not match
            res.status(401).send({ message: 'Login failed: Invalid username or password' });
        }
    } catch (error) {
        // Handle potential server errors
        res.status(500).send(error);
    }
});

// Starting the server
app.listen(3000, () => {
    console.log('Server running on port 3000');
});

