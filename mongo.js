const mongoose = require("mongoose");
const { response } = require("express");

if (process.argv.length < 3) {
  console.log("придурок, пароль введи");
  process.exit(1);
}

const password = process.argv[2];

const url = `mongodb+srv://phonebookdb:${password}@cluster1-lm71m.mongodb.net/phoneDB?retryWrites=true&w=majority`;

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });

const personSchema = new mongoose.Schema({
  name: String,
  number: Number,
});

const Person = mongoose.model("Person", personSchema);

const person = new Person({
  name: process.argv[3],
  number: process.argv[4],
});

person.save().then((response) => {
  console.log(`added ${response.name} number ${response.number} to phonebook`);
  mongoose.connection.close();
});
