const express = require("express");
const app = express();
const morgan = require("morgan");
const cors = require("cors");

morgan.token("request-body", function (req, res) {
  return JSON.stringify(req.body);
});

app.use(express.json());
app.use(
  morgan(
    ":method :url :status :res[content-length] :response-time ms :request-body"
  )
);
app.use(cors());

const requestLogger = (request, response, next) => {
  console.log("Method:", request.method);
  console.log("Path:  ", request.path);
  console.log("Body:  ", request.body);
  console.log("---");
  next();
};

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: "unknown endpoint" });
};

app.use(requestLogger);

let persons = [
  {
    name: "Ada Lovelace",
    number: "124325",
    id: 2,
  },
  {
    name: "Dan Abramov",
    number: "12-43-234345",
    id: 3,
  },
  {
    name: "roma",
    number: "1234",
    id: 6,
  },
  {
    name: "roma",
    number: "1234",
    id: 7,
  },
  {
    name: "Ada Lovelace",
    number: "124325",
    id: 8,
  },
];

let personLength = persons.length;

app.get("/info", (req, res) => {
  res.send(`<div><p>Phonebook has info for ${personLength} people</p>
          <p>${new Date()}</p>
  </div
  `);
});

app.get("/api/persons", (req, res) => {
  res.json(persons);
});

app.get("/api/persons/:id", (request, response) => {
  const id = Number(request.params.id);
  const person = persons.find((person) => person.id === id);
  if (person) {
    response.json(person);
  } else {
    response.status(404).end();
  }
});

app.delete("/api/persons/:id", (request, response) => {
  const id = Number(request.params.id);
  persons = persons.filter((person) => person.id !== id);

  response.status(204).end();
});

const generateRandom = (max) => {
  return Math.floor(Math.random() * Math.floor(max));
};

app.post("/api/persons", (request, response) => {
  const body = request.body;

  if (!body.name || !body.number) {
    return response.status(400).json({
      error: "name or number is missing",
    });
  }

  const alreadyExists = persons
    .map((person) => person.name === body.name)
    .includes(true);

  if (alreadyExists) {
    return response.status(400).json({
      error: "name must be unique",
    });
  }

  const person = {
    name: body.name,
    number: body.number,
    id: generateRandom(10000000),
  };

  persons = persons.concat(person);

  response.json(person);
});

app.use(unknownEndpoint);

const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
