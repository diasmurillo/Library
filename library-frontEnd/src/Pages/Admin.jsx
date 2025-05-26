import { useEffect, useState } from "react"
import { Link } from "react-router-dom"


export default function Admin() {
    
    const [books, setBooks] = useState([])
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [genre, setGenre] = useState('')
    const [author, setAuthor] = useState('')
    const [error, setError] = useState(null)
    const [success, setSuccess] = useState(false)
    const [loading, setLoading] = useState(false)

    const token = localStorage.getItem('token')

    async function createBook(newBooK) {

        if (!token) {
            setError("You need to be logged in as admin to create books.")
            return
        }
        const response = await fetch("http://localhost:3000/api/books", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(newBooK)
        })

        const data = await response.json()

        if (!response.ok) {
            throw new Error (data.message || "Failed to create book")
        }

        return data
    }

    async function fetchBooks() {
        try {
            setLoading(true)
            const response = await fetch("http://localhost:3000/api/books")

            const data = await response.json()

            if (!response.ok) {
                throw new Error(data.message || "Failed to see books") 
            }

            setBooks(data)
            return data
        } catch (err) {
            setError(err.message)
        } finally {
            setLoading(false)
        }
    }

    async function handleDelete (bookId) {
        if (!token) {
            setError("You need to be logged in as admin to delete books.")
            return
        }

        const confirmDelete = window.confirm("Are you sure you want to delete this book?")
        if (!confirmDelete) return

        try {
            const response = await fetch(`http://localhost:3000/api/books/${bookId}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })

            const data = await response.json()

            if (!response.ok) {
                throw new Error(data.message || "Failed to delete books")
            }

            setBooks(prevBooks => prevBooks.filter(book => book._id !== bookId))
        } catch (err) {
            setError(err.message)
        }
    }

    async function handleSubmit(e) {

        e.preventDefault()
        setError(null)
        setSuccess(false)

        try {
        const createdBook = await createBook({ title, description, genre, author })

        if (createdBook) {
            setBooks(prev => [...prev, createdBook])
            setTitle('')
            setDescription('')
            setGenre('')
            setAuthor('')
            setSuccess(true)
        }
        } catch (err) {
            setError("Failed to create book: " + err.message)
        }
    }

    useEffect(() => {
        fetchBooks()
    }, [])

    return (
        <div className="min-h-screen">

            <h1>Admin Page</h1>
            <h2>Create Book</h2>

            <form onSubmit={handleSubmit}>
                <label htmlFor="title">Title</label>
                <input type="text" name="title" id="title" placeholder="Enter your book" value={title} onChange={(e) => setTitle(e.target.value)}/>

                <label htmlFor="description">Description</label>
                <input type="text" name="description" id="description" placeholder="Enter your description" value={description} onChange={(e) => setDescription(e.target.value)} />

                <label htmlFor="genre">Genre</label>
                <input type="text" name="genre" id="genre" placeholder="Enter your genre" value={genre} onChange={(e) => setGenre(e.target.value)} />

                <label htmlFor="author">Author</label>
                <input type="text" name="author" id="author" placeholder="Enter your author" value={author} onChange={(e) => setAuthor(e.target.value)} />

                <button type="submit" disabled={loading}>
                    {loading ? "Creating..." : "Create Book"}
                </button>
                {error && <p style={{color: 'red'}}>{error}</p>} 
                {success && <p style={{ color: 'green' }}>Book created successfully!</p>}
            </form>

            <Link to="/">Home</Link>

            <h2>See books</h2>
            {books.map((book) => (
                <div key={book._id}>
                    <h3>{book.title}</h3>
                    <button onClick={() => handleDelete(book._id)}>Delete</button>
                </div>
            ))}
        </div>
    )
}