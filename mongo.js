const mongoose = require('mongoose')

/*const password = process.argv[2]*/
const name = process.argv[3]
const number = process.argv[4]

const url = process.env.MONGODB_URI

mongoose.set('strictQuery', false)

mongoose.connect(url)

const personSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  number: {
    type: String,
    required: true
  }
})

const Person = mongoose.model('Person', personSchema)

if (!name || !number) {
  Person.find({})
    .then(result => {
      console.log('Phonebook:')
      result.forEach(person => {
        console.log(`${person.name} ${person.number}`)
      })
    })
    .finally(() => {
      mongoose.connection.close()
    })
} else {
  const person = new Person({
    name: name,
    number: number,
  })

  person.save().then(() => {
    console.log(`Added ${name} number ${number} to phonebook`)
    mongoose.connection.close()
  })
}