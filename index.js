require('dotenv').config();
const express = require("express");
const mongoose = require("mongoose");
const methodOverride = require('method-override');
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(methodOverride('_method'));
app.set("view engine", "ejs");

mongoose.connect(process.env.MONGODB_URI)

const taskSchema = new mongoose.Schema({
    name: { type: String, required: true },
    priority: { type: String, default: "Medium" }});

const Task = mongoose.model("Task", taskSchema);

app.get("/", async (req, res) => {const foundItems = await Task.find({});
    res.render("list", { ros: foundItems });    });


app.post("/", async (req, res) => {if (req.body.newItem) {
         await Task.create({  name: req.body.newItem, priority: req.body.priority || "Medium"
        }); }
    res.redirect("/");
});

app.put("/:id", async (req, res) => {const itemId = req.params.id;
  const updatedName = req.body.name;
        if (!updatedName) {return res.redirect("/");   }
         const updatedItem = await Task.findByIdAndUpdate(itemId, { name: updatedName }, { new: true });
        if (!updatedItem) {  return res.redirect("/");}
        res.redirect("/");
    });

app.delete("/:id", async (req, res) => {const itemId = req.params.id;
        await Task.findByIdAndDelete(itemId);
             res.redirect("/");
   
});

app.listen(port, function(){
        console.log("server started")
});
