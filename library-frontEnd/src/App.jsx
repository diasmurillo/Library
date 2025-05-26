import { Outlet } from "react-router-dom"
import NavBar from "./components/NavBar"
import Footer from "./components/Footer"

export default function App() {
  return (
    <div>
      <NavBar />
      <main className="bg-gray-300 min-h-screen pt-16">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}
