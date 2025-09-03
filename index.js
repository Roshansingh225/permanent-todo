require('dotenv').config();
const express = require("express");
const mongoose = require("mongoose");

const app = express();


const port = process.env.PORT || 3000;

app.use(express.json());
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

mongoose.connect(process.env.MONGODB_URI)

const trySchema = new mongoose.Schema({ name: String });
const Item = mongoose.model("Task", trySchema);

app.get("/", async (req, res) => {
    
        const foundItems = await Item.find({});
        res.render("list", { ros: foundItems });
    
});

app.post("/", async (req, res) => {
    
        const taskName = req.body.newItem;
        const newTask = new Item({ name: taskName });
        await newTask.save();
        res.redirect("/");
   
});

app.post("/delete", async (req, res) => {
    
        const checkedItemId = req.body.checkbox;
        await Item.findByIdAndDelete(checkedItemId);
        res.redirect("/");
   
});

app.listen(port, function(){
        console.log("server started")
});
