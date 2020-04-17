const mongoose = require("mongoose");
const express = require("express");
const morgan = require("morgan");
//const { urlencoded, json } = require("dev");

const app = express();
app.use(morgan("dev"));
//app.use(urlencoded({ extended: true }));
//app.use(json());

const connect = () => {
  return mongoose.connect("mongodb://localhost:27017/");
};

app.listen(8080, () => {
  console.log("Server Listening at port 3000...");
});

const noteSchema = mongoose.Schema({
  title: {
    type: String,
  },
  content: {
    type: String,
  },
});

const Note = mongoose.model("note", noteSchema);

connect()
  .then(async connection => {
    const note = await Note.create({
      title: "My First Mongo/Express App",
      content:
        "This content has been fetched from mongoDB. Express server has been used to serve me.",
    });
    console.log(note);
  })
  .catch(err => console.error(err));

app.get("/note", async (req, res) => {
  const notes = await Note.find({})
    .lean()
    .exec();
  res.status(200).send({ notes: notes });
});
