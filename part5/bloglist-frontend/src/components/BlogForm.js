const BlogForm = ({ onSubmit, handleTitleChange, handleAuthorChange, handleUrlChange, title, author, url}) => {
    return (  
        <form onSubmit={onSubmit}>
           <div> Title: <input value={title} onChange = {handleTitleChange} /> 
            </div>
            <div> Author: <input value={author} onChange = {handleAuthorChange}/> 
            </div>
            <div> URL: <input value={url} onChange = {handleUrlChange}/> 
            </div>
          <div>
          <button type="submit">
            create
            </button>
            </div>
        </form>
    )
  }
  
  export default BlogForm
