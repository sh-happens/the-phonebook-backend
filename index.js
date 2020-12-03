require("dotenv").config();
const express = require("express");
const app = express();
const morgan = require("morgan");
const cors = require("cors");
const Person = require("./models/person");
const { request, response } = require("express");

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


app.use(requestLogger);
app.use(express.static("build"));

app.get("/info", (req, res, next) => {
  Person.find({})
  .then(person => {res.send(`<div><p>Phonebook has info for ${person.length} people</p>
  <p>${new Date()}</p>
  </div
  `)}).catch(error => next(error))
});

app.get("/api/persons", (req, res, next) => {
  Person.find({}).then((person) => {
    res.json(person);
  }).catch(error => next(error))
});

app.get("/api/persons/:id", (request, response, next) => {
  Person.findById(request.params.id)
  .then((person) => {
    if (person) {
      response.json(person);
    } else {
      response.status(404).end();
    }
  })
  .catch((error) => {
    next(error);
  });
});

app.delete("/api/persons/:id", (request, response, next) => {
  Person.findByIdAndRemove(request.params.id)
  .then((result) => {
      response.status(204).end();
    })
    .catch((error) => next(error));
  });
  
app.post("/api/persons", (request, response, next) => {
  const body = request.body;
  
  if (body.number === undefined || body.name === undefined) {
    response.status(400).json({ error: "content missing" })
    response.end()
  } else {
    Person
    .create({
      name: body.name,
      number: body.number,
    })
  .then(person => person.toJSON())
  .then(savedAndFormattedPerson => {
    response.json(savedAndFormattedPerson)
  })
  .catch(error => next(error))
}
  
  // const alreadyExists = Person.map(
    //   (person) => person.name === body.name
    // ).includes(true);
    
    // if (alreadyExists) {
      //   return response.status(400).json({
        //     error: "name must be unique",
        //   });
        // }
        
      });
      
app.put('/api/persons/:id', (request, response, next) => {
  const body = request.body;
  
  const person = {
    number: body.number
  };
  
  Person.findByIdAndUpdate(request.params.id, person)
  .then(updatedPerson => {
    response.json(updatedPerson)
  })
  .catch(error => next(error))
})
  
const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: "unknown endpoint" });
};

const errorHandler = (error, request, response, next) => {
  console.error(error.message);
  
  if (error.name === "CastError") {
    return response.status(400).send({ error: "malfucktion" });
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  }
  
  next(error);
};

app.use(unknownEndpoint);
app.use(errorHandler);

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
    