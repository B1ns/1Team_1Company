const express = require("express");

const mongoose = require("mongoose");

const app = express();

mongoose.connect("mongodb+srv://bash:bash1122!@cluster0-ww7s2.mongodb.net/test", {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => {
        console.log("Mongoose Connect");
    })
    .catch(() => {
        console.error("Mongoose Connect Error");
    });

const PORT = process.env.PORT || 8080;

app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));

const userSchema = mongoose.Schema({
    id: {
        type: String,
        require: true
    },

    pass:{
        type: String,
        require: true
    }
})

const userModel = mongoose.model("user", userSchema);

app.post("/register", (req, res) => {
    const id = req.body.id;
    const pass = req.body.pass;

    const user = new userModel({
        id,
        pass
    });

    user.save()
    .then(() => {
        return res.json({id, pass});
    });

    console.log(id, pass);
    return res.json({ id, pass });
});

app.post("/login", (req, res) =>{

    const id = req.body.id;
    const pass = req.body.pass;

    userModel.countDocuments({id, pass})
    .then((count) => {
        if(count){
            return res.json({success: true});
        }else{
            return res.json({success: false});
        }
    });
});

app.get("/", (req, res) => {
    res.send("My Hoem");
    return;
})

app.listen(PORT, () => {
    console.log("SERVER LISTEN");
});
