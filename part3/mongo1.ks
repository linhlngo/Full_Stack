const mongoose = require('mongoose')
mongoose.set('strictQuery', false);

if (process.argv.length<3) {
  console.log('give password as argument')
  process.exit(1)
}

const password = process.argv[2]


const url =
`mongodb+srv://ngol4:${password}@cluster0.ubyl1eq.mongodb.net/phonebookApp?retryWrites=true&w=majority`


mongoose.connect(url)

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
})

const Person = mongoose.model('Person', personSchema)

mongoose
  .connect(url)
  .then((result) => {
    console.log('connected')

    const person = new Person({
      name: process.argv[3],
      number: process.argv[4],
    })

    return person.save()
  })
  .then( person => {
    console.log(`added ${person.name} number ${person.number} to phonebook`)
    return mongoose.connection.close()
  })
  .catch((err) => console.log(err))

Person.find({}).then(result => {
  console.log('Phonebook: ')
  result.forEach(person => {
    console.log(`${person.name} ${person.number}`)
  })
  mongoose.connection.close()
})
