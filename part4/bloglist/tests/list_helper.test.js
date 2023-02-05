const listHelper = require('../utils/list_helper')

describe('dummy test', () => {

  test('dummy returns one', () => {
    const blogs = []
    const result = listHelper.dummy(blogs)
    expect(result).toBe(1)
  })
})

describe('total likes', () => {
  test('when list has only one blog, equals the likes of that', () => {
    const result = listHelper.totalLikes(listHelper.listWithOneBlog)
    expect(result).toBe(5)
  })

  test('of empty list is zero', () => {
    const result = listHelper.totalLikes([])
    expect(result).toBe(0)
  })

  test('of a bigger list is calculated right', () => {
    const result = listHelper.totalLikes(listHelper.blogs)
    expect(result).toBe(36)
  })
})


describe('favorite blogs', () => {
  test('when list has only one blog, equals the likes of that', () => {
    const result = listHelper.favoriteBlogs(listHelper.listWithOneBlog)
    expect(result).toEqual(listHelper.listWithOneBlog[0])
  })

  test('of empty list is undefined', () => {
    const result = listHelper.favoriteBlogs([])
    expect(result).toEqual(undefined)
  })

  test('of a bigger list is calculated right', () => {
    const result = listHelper.favoriteBlogs(listHelper.blogs)
    expect(result).toEqual( {
      _id: '5a422b3a1b54a676234d17f9',
      title: 'Canonical string reduction',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
      likes: 12,
      __v: 0
    })
  })
})



describe('most blogs', () => {
  test('of empty list is undefined', () => {
    const result = listHelper.mostBlogs([])
    expect(result).toEqual(undefined)
  })

  test('when list has only one blog, equals the object of 1 blog and the autho', () => {
    const result = listHelper.mostBlogs(listHelper.listWithOneBlog)
    expect(result).toEqual({
      author: 'Edsger W. Dijkstra',
      blogs: 1
    })
  })

  test('of a bigger list is calculated right', () => {
    const result = listHelper.mostBlogs(listHelper.blogs)
    expect(result).toEqual({
      author: 'Robert C. Martin', blogs: 3 }
    )
  })
})

describe('most likes', () => {
  test('of empty list is undefined', () => {
    const result = listHelper.mostLikes([])
    expect(result).toEqual(undefined)
  })

  test('when list has only one blog, equals the object of 1 blog and the autho', () => {
    const result = listHelper.mostLikes(listHelper.listWithOneBlog)
    expect(result).toEqual({
      author: 'Edsger W. Dijkstra',
      likes: 5
    })
  })

  test('of a bigger list is calculated right', () => {
    const result = listHelper.mostLikes(listHelper.blogs)
    expect(result).toEqual({
      author: 'Edsger W. Dijkstra',
      likes: 17
    })
  })
})