require('dotenv').config();
const express = require("express");
const mongoose = require("mongoose");
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(require('method-override')('_method'));

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

app.put("/:id", async (req, res) => {const itemId = req.params.id;
  const updatedName = req.body.name;
        if (!updatedName) {
          
            return res.redirect("/");   }
                const updatedItem = await Item.findByIdAndUpdate(itemId, { name: updatedName }, { new: true });
        if (!updatedItem) {
            return res.redirect("/");}
        res.redirect("/");
   
});

app.delete("/:id", async (req, res) => {const itemId = req.params.id;
        await Item.findByIdAndDelete(itemId);
             res.redirect("/");
   
});

app.listen(port, function(){
        console.log("server started")
});
