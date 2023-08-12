import React from 'react'
import Navabar from '../Components/Navabar'
import { inventoryData } from '../Data/Data'
import { useLocation, useNavigate } from 'react-router-dom'

const DashBoard = () => {
    const totalStock = inventoryData.map(ele => ele.stock).reduce((acc, val) => acc + val, 0)
    const totalDelivered = inventoryData.map(ele => ele.delivered).reduce((acc, val) => acc + val, 0)
    const lowStock = inventoryData.map(ele => ele.stock <= 10).reduce((acc, val) => acc + val, 0)
    const location = useLocation()

    const navigate = useNavigate()

    if (location.pathname == "/dashboard") {
        return (
            <div>
                <Navabar />
                <div className='w-96 mx-auto flex mt-20 justify-between'>
                    <div className='text-green shadow-2xl p-4 w-1/3 flex flex-col'>
                        <p className='text-green-800 font-bold'>{totalStock}</p>
                        <p className='font-bold'>Total Stock</p>
                    </div>
                    <div className='text-green shadow-2xl p-4 w-1/3 flex flex-col'>
                        <p className='text-yellow-600 font-bold'>{totalDelivered}</p>
                        <p>Total Delivered</p>
                    </div>

                    <div className='text-green shadow-2xl p-4 w-1/3 flex flex-col'>
                        <p className='text-red-600 font-bold '>{lowStock}</p>
                        <p className='font-bold'>Low Stock</p>
                    </div>


                </div>

            </div>
        )
    }
    else {
        return (
            <div>
                <Navabar />
                <div className='w-6/12 mx-auto flex mt-20 justify-between'>
                    <div className='text-green shadow-2xl p-4 w-40 font-bold h-20 bg-gray-200' onClick={()=>navigate("/products",{state:"Kitchen"})}>Kitchen </div>
                    <div className='text-green shadow-2xl p-4 w-40 font-bold h-20 bg-gray-200' onClick={()=>navigate("/products",{state:"Clothing"})}>Clothing</div>
                    <div className='text-green shadow-2xl p-4 w-40 font-bold h-20 bg-gray-200' onClick={()=>navigate("/products",{state:"Toys"})}>Toys</div>
                </div>

            </div>


        )

    }
}

export default DashBoard