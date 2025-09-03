const express = require("express");
const mongoose = require("mongoose");

const app = express();


app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

mongoose.connect("mongodb://127.0.0.1:27017/todo");

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

app.listen("3000",function(){
    console.log("server started")
});
