import { useState, useEffect } from "react"
import { Link, useNavigate } from "react-router-dom"

export default function Profile() {

    const [rentals, setRentals] = useState([]);
    const [profile, setProfile] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    const [logout, setLogout] = useState(false)
    const [deleted, setDeleted] = useState(false)
    const navigate = useNavigate()

    async function fetchProfile() {
        const token = localStorage.getItem('token')

        if (!token) {
                setError("You are not logged in.")
                setLoading(false)
                return
            }

        try {
            setLoading(true)
            const response = await fetch("http://localhost:3000/api/users/profile", {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`}
            })
            const data = await response.json()

            if (!response.ok) {
                throw new Error(data.message || "Error to load profile")
            }

            setProfile(data)
            setLoading(false)
        } catch (err) {
            setError(err.message)
        }
    }

    async function fetchRentals() {
    const token = localStorage.getItem('token');
    if (!token) return;

    try {
        const response = await fetch("http://localhost:3000/api/rentals", {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || "Error fetching rentals");
        }

        setRentals(data);
    } catch (err) {
        console.error("Rental fetch error:", err);
        setError(err.message);
    }
}


    function handleLogout() {
        localStorage.removeItem("token")
        setLogout(true)
        setTimeout(() => {
            navigate("/")
        }, 2000)
    }

    async function handleDelete() {
        const token = localStorage.getItem('token')

        if (!token) {
                setError("You are not logged in.")
                setLoading(false)
                return
            }
        
            if (!window.confirm("Do you really want to delete account?")) {
                return
            }
            
        try {
            setLoading(true)
            const response = await fetch("http://localhost:3000/api/users/profile", {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`}
            })
            const data = await response.json()

            if (!response.ok) {
                throw new Error(data.message || "Error to load profile")
            }

            setDeleted(true)

            localStorage.removeItem('token')
            setTimeout(() => {
                navigate("/")
            }, 2000)
        } catch (err) {
            setError(err.message)
        }
    }

    useEffect(() => {
        fetchProfile()
        fetchRentals()
    }, [])

    return (
        <div className="m-2">
            <div>
                {loading && <p className="text-2xl text-center mt-12">Loading profile...</p>}
                {error && <p className="text-2xl text-center mt-12">{error}</p>}
            </div> 
            <section className="mt-32 md:w-md mx-auto p-4 rounded-2xl bg-gray-800 text-white">
                {profile && (
                <>
                    <p><strong>Email: </strong>{profile.email}</p>
                    <p><strong>Birth Date: </strong>{profile.birthDate ? new Date(profile.birthDate).toLocaleDateString('pt') : 'N/A'}</p>
                    <Link to="/editProfile"><button  className="w-fit rounded-2xl bg-gray-200 text-black shadow-md py-1 px-4 mt-5 cursor-pointer transition duration-300 hover:bg-gray-300">Edit Informations</button></Link>
                    <button onClick={handleLogout}  className="w-fit rounded-2xl bg-gray-200 text-black shadow-md py-1 px-4 mt-5 mx-4 cursor-pointer transition duration-300 hover:bg-gray-300">Logout</button>
                    <button onClick={handleDelete}  className="w-fit rounded-2xl bg-red-600 text-white shadow-md py-1 px-4 mt-5 cursor-pointer transition duration-300 hover:bg-red-700">Delete Account</button>
                </>
                )}

                {logout && <p style={{color: 'orange'}} >You did logout</p>}
                {deleted && <p style={{color: 'orange'}} >You deleted your account</p>}
            </section>

            <section className="mt-10 md:w-md mx-auto p-4 rounded-2xl bg-gray-800 text-white">
                <h2 className="text-xl text-center mt-6 mb-2 font-medium">Your Rentals:</h2>
                {rentals.length === 0 ? (
                    <p className="text-center font-medium">No rentals found yet.</p>
                ) : (
                    <ul className="space-y-2 mx-auto flex flex-col justify-center">
                        {rentals.map((rental) => (
                            <li key={rental._id} className="border rounded p-2 mx-auto bg-gray-800 w-2xs">
                                <p><strong>Book:</strong> {rental.book?.title || 'Unknown'}</p>
                                <p><strong>Start:</strong> {new Date(rental.startDate).toLocaleDateString('pt-BR')}</p>
                                <p><strong>End:</strong> {new Date(rental.endDate).toLocaleDateString('pt-BR')}</p>
                            </li>
                        ))}
                    </ul>
                )}
            </section>
                        
        </div>
    )
}
