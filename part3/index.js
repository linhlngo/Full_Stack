
const express = require('express')
const app = express()
const cors = require('cors')
require('dotenv').config()
const morgan = require('morgan')

const requestLogger = (request, response, next) => {
    console.log('Method:', request.method)
    console.log('Path:  ', request.path)
    console.log('Body:  ', request.body)
    console.log('---')
    next()
  }

  app.use(express.json())

  app.use(requestLogger)
  
  app.use(cors())
  
  app.use(express.static('build'))

//app.use(morgan(':method :url :status :res[content-length] - :response-time ms'))

//morgan.token("data", (request) => {
 //   return request.method === "POST" ? JSON.stringify(request.body) : " ";
 // });

 /*
const generateId = () => {
    return Math.floor(Math.random() * 10000)
  }
  */
 
const Person = require('./models/person')

app.get('/api/persons', (request, response) => {
    Person.find({}).then(persons => {
      response.json(persons)
    })
  })


app.post('/api/persons', (request, response, next) => {
    const body = request.body
    
    /** 
    if (body.name === undefined) {
      return response.status(400).json({ error: 'missing name' })
    } 
    
    if (body.number === undefined) {
      return response.status(400).json({ error: 'missing number ' })
    }
  */

    const person = new Person ({
      name: body.name,
      number: body.number,
    })

    person.save()
      .then(savedPerson => {
        response.json(savedPerson)
      })
      .catch(error => next(error))

  })



app.get('/api/info', (req, res) => {
    res.send(`<div>
    <p>Phone book has info for ${persons.length} people </p>
    <p> ${new Date()}</p>
    </div>`)
  })



app.get('/api/persons/:id', (request, response, next) => {
    Person.findById(request.params.id)
      .then(person => {
        if (person){
          response.json(person)
        } else {
          response.status(404).end()
    }
  })
      .catch(error => {
        //console.log(error)
        //response.status(500).end()
        next(error)
      })
  })


app.delete('/api/persons/:id', (request, response, next) => {
  Person.findByIdAndRemove(request.params.id)
  .then(result => {
    response.status(204).end()
  })
  .catch(error => next(error))
  })
  

  app.put('/api/persons/:id', (request, response, next) => {
    const body = request.body
  
    const {name,number} =request.body
   
  
    Person.findByIdAndUpdate(
      request.params.id, 
      {name,number}, 
      { new: true, runValidators: true, context: 'query'}
      )
      .then(updatedPerson => {
        response.json(updatedPerson)
      })
      .catch(error => next(error))
  })



  const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint' })
  }
  
  app.use(unknownEndpoint)
  
  const errorHandler = (error, request, response, next) => {
    console.error(error.message)
  
    if (error.name === 'CastError') {
      return response.status(400).send({ error: 'malformatted id' })
    } else if (error.name === 'ValidationError') {
      return response.status(400).json({ error: error.message })
    }
  
    next(error)
  }
  
  const PORT = process.env.PORT || 8080
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
  })