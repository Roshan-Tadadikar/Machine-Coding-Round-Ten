import React from 'react'
import { Link, useLocation } from "react-router-dom"

const Navabar = () => {
    const location = useLocation()
    return (
        <div>
            <aside  class="fixed top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0" aria-label="Sidebar">
                <div class="h-full px-3 py-4 overflow-y-auto bg-black">
                    <ul class="space-y-2 font-medium flex flex-col mt-20 justify-between">
                    <Link className="text-white p-4 " to="/">DashBoard</Link>
                    <Link className="text-white p-4 " to="/departments">Departments</Link>
                    <Link className="text-white p-4 " to="/products">Products</Link>
                    </ul>
                </div>
            </aside>
        </div>
    )
}

export default Navabar