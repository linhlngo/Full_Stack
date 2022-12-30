const mongoose = require('mongoose')

if (process.argv.length<3) {
  console.log('give password as argument')
  process.exit(1)
}

const password = process.argv[2]

const url =
  `mongodb+srv://ngol4:<password>@cluster0.ubyl1eq.mongodb.net/?retryWrites=true&w=majority`

mongoose.connect(url)

const personSchema = new mongoose.Schema({
  id: Number,
  name: String,
  number: String,
})

const Person = mongoose.model('Person', noteSchema)

const person = new Person({
  id: 'CSS is hard',
  number: new Date(),
  important: false,
})

if ( false ) {
  person.save().then(result => {
    console.log('person saved!')
    mongoose.connection.close()
  })
}


Person.find({}).then(result => {
  result.forEach(person => {
    console.log(person)
  })
  mongoose.connection.close()
})