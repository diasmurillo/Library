import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

export default function RentBook() {
    
    const { bookId } = useParams()
    const [book, setBook] = useState(null)
    const [rentalDate, setRentalDate] = useState('')
    const [returnDate, setReturnDate] = useState('')
    const [error, setError] = useState(null)
    const [success, setSuccess] = useState(false)
    const navigate = useNavigate()

    const token = localStorage.getItem('token')

    async function fetchBook() {
        try {
            const response = await fetch(`http://localhost:3000/api/books/${bookId}`)
            const data = await response.json()
            if (!response.ok) {
                throw new Error(data.message || "Failed to fetch Book")
            }
            setBook(data)
        } catch (err) {
            setError(err.message)
        }
    }

    async function handleSubmit(e) {
        e.preventDefault()

        if (!token) {
            setError("You need to be logged in to rent books")
            return
        }

        try {
            const response = await fetch("http://localhost:3000/api/rentals", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    bookId, startDate: rentalDate, endDate: returnDate
                })
            })
            const data = await response.json()
            if (!response.ok) {
                throw new Error(data.message || "Rental failed")
            }
            setSuccess(true)
            setError(null)
            setTimeout(() => navigate("/"), 2000)
        } catch (err) {
            setError(err.message)
        }
    }

    useEffect(() => {
        fetchBook()
    }, [])

    if (!book) return <p>Loading book...</p>

    return (
        <div>
            <section className="md:w-md mx-auto p-4 rounded-2xl bg-gray-800 text-white mt-48">
                <h2 className="font-medium text-4xl text-center">Rent Book: {book.title}</h2>

                <form onSubmit={handleSubmit} className="flex flex-col">

                    <label htmlFor="rentalDate" className="font-medium pt-3 pb-1">Rental Date</label>
                    <input
                    type="date"
                    id="rentalDate"
                    value={rentalDate}
                    onChange={(e) => setRentalDate(e.target.value)}
                    required
                    className="py-2 px-1 border rounded-2xl" 
                    />

                    <label htmlFor="returnDate" className="font-medium pt-3 pb-1">Return Date</label>
                    <input
                    type="date"
                    id="returnDate"
                    value={returnDate}
                    onChange={(e) => setReturnDate(e.target.value)}
                    required
                    className="py-2 px-1 border rounded-2xl" 
                    />

                    <button type="submit" className="w-fit rounded-2xl bg-gray-200 text-black shadow-md py-1 px-4 mt-5 cursor-pointer transition duration-300 hover:bg-gray-300">Confirm Rental</button>
                    {error && <p style={{ color: 'red' }}>{error}</p>}
                    {success && <p style={{ color: 'green' }}>Book rented successfully!</p>}
                </form>
            </section>
        </div>
    )
}