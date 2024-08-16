const mongoose = require("mongoose");
const express = require("express");
const app = express();
const port = 8845;
// dataBase's Objects property conditions

const userSchemaTrial = new mongoose.Schema({
  name: {
    type: String, // type of the value, string, number, bullean, etc.
    required: true, // requred feald
    trim: true, // remove all the spaces from the beginning, end  and in between of the string
  },
  email: {
    type: String,
    required: true,
    unique: true, // unique value not to be repeated in the arrey
    lowercase: true, // make all the letters in the string to be lower case or Vice Versa
  },
  age: {
    type: Number,
    min: 18,
    max: 65,
    default: 18,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  active: {
    type: Boolean,
    default: 1,
  },
});

const Mongooseuser = mongoose.model("users", userSchemaTrial);

mongoose
  .connect("mongodb://127.0.0.1:27017/Node")
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log("Error Happened", err));


  //Define routes
  app.post('/users', async (req, res ) => {
    try {
        const newUser = new Mongooseuser(req.body);
        const savedUser = await newUser.save();
        res.statusCode(200).json(savedUser);
    } catch (error) {
        res.statusCode(400).json({error: error.message});
    }

  });
  app.get('/users', async (req, res) => {
    try {
        const users = await Mongooseuser.find({age: { $gte: 31}})
        
        
        res.json(users);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
  });

//Start the server
app.listen(port, () => {
  console.log(`Server running at http://127.0.0.1:${port}`);
});