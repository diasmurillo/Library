import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Books() {

    const [books, setBooks] = useState([])
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(false)

    async function fetchBooks() {

        setLoading(true)

        try {
            const response = await fetch("http://localhost:3000/api/books")

            const data = await response.json()

            if (!response.ok) {
                throw new Error(data.message || "No books Found")
            }

            setBooks(data)
        } catch (err) {
            setError(err)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchBooks()
    }, [])


    return (
        <>
            <main className="max-w-7xl mx-auto p-2 pt-16">
                <h1 className="font-medium text-4xl text-center mx-auto shadow-md w-fit">Our Books</h1>
                <div className="mt-12">
                    {books.length == 0 && <p className="text-2xl text-center">No books found</p>}
                    {loading && <p className="text-2xl text-center">Loading...</p>}
                    {error && <p className="text-2xl text-center">{error}</p>}
                </div> 

                <section className="md:flex md:gap-6 md:flex-wrap mb-4">
                    {books.map((book) => (
                    <div key={book._id} className="mb-4 md:w-sm md:h-64 flex flex-col justify-between gap-2 bg-gray-800 text-white shadow-2xl rounded-2xl py-2 px-4 transition duration-500 md:hover:scale-105">
                        <h3 className="font-medium text-2xl italic text-center">{book.title}</h3>
                        <p className="text-justify"><strong>Description: </strong>{book.description}</p>
                        <p><strong>Genre: </strong>{book.genre}</p>
                        <p><strong>Author: </strong>{book.author}</p>
                        <Link to={`/rent/${book._id}`} >
                            <button className="rounded-2xl bg-gray-200 text-black shadow-md py-1 px-4 cursor-pointer transition duration-300 hover:bg-gray-300">Book Now</button>
                        </Link>
                    </div>
                    ))}
                </section>
                <div className="flex justify-center my-6">
                    <Link to="/">
                        <button className="rounded-2xl bg-gray-800 text-white shadow-md py-2 px-4 cursor-pointer transition duration-300 hover:bg-gray-700">Back Home</button>
                    </Link>
                </div>
            </main>
            
        </>
    )
}