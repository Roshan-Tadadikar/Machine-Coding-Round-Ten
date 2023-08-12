import React from 'react'
import { useLocation } from 'react-router-dom'
import Navabar from '../Components/Navabar'

const SinglePage = () => {
    const location =useLocation()
    const value = location.state
  return (
    <div >
        <Navabar/>
    <div className='flex flex-col ml-80'>
        <h1 className='font-bold text-left'>{value.name}</h1>
        <img src={value.imageUrl} className='w-40 ' />
        <p className='text-left'><strong>Price:</strong>${value.price}</p>
        <p className='text-left'><strong>SKU:</strong>{value.sku}</p>
        <p className='text-left'><strong>Stock: </strong>{value.stock}</p>
        <p className='text-left'><strong>Supplier:</strong>{value.supplier}</p>
        <p className='text-left'><strong>Delivered:</strong>{value.delivered}</p>
        <p className='text-left'><strong>Description:</strong>{value.description}</p>
    </div>
    </div>
  )
}

export default SinglePage