const mongoose = require("mongoose")
// eslint-disable-next-line
const { response } = require("express")
// eslint-disable-next-line
if (process.argv.length < 3) {
  console.log("придурок, пароль введи")
  // eslint-disable-next-line
  process.exit(1)
}
// eslint-disable-next-line
const password = process.argv[2]

const url = `mongodb+srv://phonebookdb:${password}@cluster1-lm71m.mongodb.net/phoneDB?retryWrites=true&w=majority`

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })

const personSchema = new mongoose.Schema({
  name: String,
  number: Number,
})

const Person = mongoose.model("Person", personSchema)

const person = new Person({
  // eslint-disable-next-line
  name: process.argv[3],
  // eslint-disable-next-line
  number: process.argv[4],
})

person.save().then((response) => {
  console.log(`added ${response.name} number ${response.number} to phonebook`)
  mongoose.connection.close()
})
