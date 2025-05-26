import { useState } from "react"
import { Link, Navigate, useNavigate } from "react-router-dom"

export default function Register() {

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [birthDate, setBirthDate] = useState('')
    const [password, setPassword] = useState('')
    const [success, setSuccess] = useState(false)
    const [error, setError] = useState({})
    const [loading, setLoading] =useState(false)
    const navigate = useNavigate()

    async function createUser(newUser) {
            const response = await fetch("http://localhost:3000/api/users/register", {
                method: 'POST',
                headers: { 'Content-type': 'application/json' },
                body: JSON.stringify(newUser)
            })

            const data = await response.json()

            if (!response.ok) {
                throw new Error(data.message || 'Unknown error occurred')
            }

            return data
    }

    async function handleRegisterSubmit (e) {
        e.preventDefault()
        setLoading(true)

        const newUser = {name, email, birthDate,password}
        const validationErrors = validateUser(newUser)        

        if(Object.keys(validationErrors).length > 0) {
            setError(validationErrors)
            setLoading(false)
            return
        }

        try {
            await createUser(newUser)
            setSuccess(true)
            setError({})
            setName('')
            setEmail('')
            setBirthDate('')
            setPassword('')

            setTimeout(() => {
                navigate('/login')
            }, 2000)
            
        } catch (err) {
            console.error("Error creating user:", err)
            setError({general: err.message || "Something went wrong"})
        } finally {
            setLoading(false)
        }
    }

    function validateUser({name, email, birthDate, password}) {
        const newError = {}

        if (name.trim() === '') {
            newError.name = "Name is required"
        }

        if (email.trim() === '') {
            newError.email = "Email is required"
        } else if (!/\S+@\S+\.\S+/.test(email)) {
            newError.email = "Email is invalid, must have @ and ."
        }

        if (birthDate.trim() === '') {
            newError.birthDate = "Date of birth is required"
        } else if (!isAtLeast15YearsOld(birthDate)) {
             newError.birthDate = "You must be at least 15 years old.";
        }

        if (password.trim() === '') {
            newError.password = "Password is required"
        }

        return newError
    }

    function isAtLeast15YearsOld(date) {
        const birth = new Date(date);
        const today = new Date();

        const age = today.getFullYear() - birth.getFullYear();
        const m = today.getMonth() - birth.getMonth();
        const d = today.getDate() - birth.getDate();

        return age > 15 || (age === 15 && (m > 0 || (m === 0 && d >= 0)));
        }

    return (
        <div>
            <main  className="max-w-7xl p-2 mx-auto md:min-h-screen">
                <section className="md:w-md mx-auto p-4 rounded-2xl bg-gray-800 text-white mt-36">
                    <h1 className="font-medium text-4xl text-center">Register Now</h1>
                    <form onSubmit={handleRegisterSubmit} noValidate className="flex flex-col">
                        <label htmlFor="name" className="font-medium pb-1">Name</label>
                        <input type="text" name="name" id="name" placeholder="Enter your name" value={name} onChange={(e) => setName(e.target.value)}  className="py-2 px-1 border rounded-2xl"/>
                        {error.name && <p className="mt-2 font-bold">{error.name}</p>}

                        <label htmlFor="email" className="font-medium pt-3 pb-1">Email</label>
                        <input type="email" name="email" id="email" placeholder="Enter your email" value={email} onChange={(e) => setEmail(e.target.value)}  className="py-2 px-1 border rounded-2xl"/>
                        {error.email && <p className="mt-2 font-bold">{error.email}</p>}

                        <label htmlFor="birthDate" className="font-medium pt-3 pb-1">Date of Birth</label>
                        <input type="date" name="birthDate" id="birthDate" placeholder="Enter your birth date" value={birthDate} onChange={(e) => setBirthDate(e.target.value)}  className="py-2 px-1 border rounded-2xl"/>
                        {error.birthDate && <p className="mt-2 font-bold">{error.birthDate}</p>}

                        <label htmlFor="password" className="font-medium pt-3 pb-1">Password</label>
                        <input type="password" name="password" id="password" placeholder="Enter your password" value={password} onChange={(e) => setPassword(e.target.value)}  className="py-2 px-1 border rounded-2xl"/>
                        {error.password && <p className="mt-2 font-bold">{error.password}</p>}

                        <button type="submit" disabled={loading} className="w-fit rounded-2xl bg-gray-200 text-black shadow-md py-1 px-4 mt-5 cursor-pointer transition duration-300 hover:bg-gray-300">
                            {loading ? "Registering..." : "Register"}
                        </button>

                        {success && <p className="mt-3">User created successfully</p>}
                        {error.general && <p className="mt-3 text-red-500">{error.general}</p>}
                    </form>
                    <p className="mt-3">Already have an account? <Link to='/login' className="font-medium">Sign In</Link></p>
                </section>
                
            </main>
            
        </div>
    )
}