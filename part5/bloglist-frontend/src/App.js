import { useState, useEffect } from 'react'

import Blog from './components/Blog'
import Notification from './components/Notification'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'


import blogService from './services/blogs'
import loginService from './services/login'


const App = () => {
  const [blogs, setBlogs] = useState([])
  const [newTitle, setNewTitle] = useState('')
  const [newAuthor, setNewAuthor] = useState('')
  const [newUrl, setNewUrl] = useState('')

  const [errorMessage, setErrorMessage] = useState(null)
  const [addMessage, setAddMessage] = useState(null)


  const [username, setUsername] = useState('') 
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)



  useEffect(() => {
    console.log('effect')
    blogService
      .getAll()
      .then(initiateBlogs => {
        setBlogs(initiateBlogs)
      })
  }, [])




  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  
  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password,
      })
      setUser(user)
      blogService.setToken(user.token)
      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      ) 
      setUsername('')
      setPassword('')
    } catch (exception) {
      setErrorMessage('wrong credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }



  const addBlog = (event) => {
    event.preventDefault()
    const blogObject = {
      title: newTitle,
      author: newAuthor,
      url: newUrl,
      id: blogs.length + 1
    }


      blogService
      .create(blogObject)
      .then(returnedBlog => {
        setBlogs(blogs.concat(returnedBlog)) 
        setNewTitle('')
        setNewAuthor('')
        setNewUrl('')
        setAddMessage(`Add '${blogObject.title}' `)
        setTimeout(() => {
          setAddMessage(null)
        }, 5000)
        })
      .catch(error => {
          // this is the way to access the error message
          setAddMessage(error.response.data.error)
          setTimeout(() => {
            setAddMessage(null)
          }, 5000)
        })
  }
  

  const handleTitleChange = (event) => {
    setNewTitle(event.target.value)
  }

  const handleAuthorChange = (event) =>{
    setNewAuthor(event.target.value)
  }
  
  const handleUrlChange = (event) => {
    setNewUrl(event.target.value)
  }

  
  
    
  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <div>
          username
          <input
            type="text"
            value={username}
            name="Username"
            onChange={({ target }) => setUsername(target.value)}
          />
      </div>
      <div>
          password
          <input
            type="password"
            value={password}
            name="Password"
            onChange={({ target }) => setPassword(target.value)}
          />
      </div>
      <button type="submit">login</button>
    </form>      
  )
  

  return (
    <div>
      <h1>Blogs</h1>
      <Notification message={errorMessage} />

      {user === null ?
        loginForm() :
        <div>
          <p>{user.name} logged in</p>
          <BlogForm onSubmit={addBlog} handleTitleChange={handleTitleChange} handleAuthorChange={handleAuthorChange}
                    handleUrlChange = {handleUrlChange} title= {newTitle} author={newAuthor} url = {newUrl}/>
        </div>
      }


      <ul>
        {blogs.map(blog => 
          <Blog
            key={blog.id}
            blog={blog}
          />
        )}
      </ul>

    </div>
  )
}

export default App