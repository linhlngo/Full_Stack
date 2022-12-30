const mongoose = require('mongoose')

if (process.argv.length<3) {
  console.log('give password as argument')
  process.exit(1)
}

const password = process.argv[2]

const url =
`mongodb+srv://ngol4:${password}@cluster0.ubyl1eq.mongodb.net/bloglist?retryWrites=true&w=majority`

mongoose.connect(url)


const blogSchema = new mongoose.Schema({
  title: String,
  author: String,
  url: String,
  likes: Number
})


const Blog = mongoose.model('Blog', blogSchema)

const blog = new Blog({
  title: 'Harry Potter',
  author: 'J.K.Rowling',
  url: 'www',
  likes: 12
})

// eslint-disable-next-line no-constant-condition
if ( false ) {
  blog.save().then(() => {
    console.log('blog saved!')
    mongoose.connection.close()
  })
}

Blog.find({}).then(result => {
  result.forEach(blog => {
    console.log(blog)
  })
  mongoose.connection.close()
})