
import React, { useEffect, useReducer, useState } from 'react'
import Navabar from '../Components/Navabar'
import { inventoryData } from '../Data/Data'
import { useLocation } from 'react-router-dom'

const Products = () => {
    let prevFilter = "All"
    let counter = 20
    const [flag, setFlag] = useState(false)
    const location = useLocation()
    const handleReducerData = (state, action) => {
        switch (action.type) {
            case "filter_by_type":
                console.log("clicked")
                return { ...state, data: state.unAlteredData.filter(ele => ele.department == action.payload) }
            case "All":
                return { ...state, data: state.unAlteredData }
            case "low_stock":
                console.log("filtered data==>" + state.data.filter(ele => ele.stock <= 10))
                return { ...state, data: state.data.filter(ele => ele.stock <= 10) }
            case "set_data":
                return { ...state, data: action.payload }
            case "open_modal":
                return { ...state, open: true }
            case "close_modal":
                return { ...state, open: false }
            case "set_new_item":
                console.log("new Daata==>" + JSON.stringify(action.payload))
                return { ...state, data: [...state.data, ...action.payload] }

        }
    }

    const [state, dispatch] = useReducer(handleReducerData, { data: inventoryData, unAlteredData: inventoryData, open: false })

    const handleFilter = (value) => {
        if (value == "All") {
            dispatch({ type: "All" })
        } else {
            prevFilter = value
            dispatch({ type: "filter_by_type", payload: value })
        }
    }

    const handleChecbox = (event) => {
        if (event.target.checked) {
            dispatch({ type: "low_stock" })
        } else {
            if (prevFilter == "All") {
                dispatch({ type: "All" })
            } else {
                dispatch({ type: "filter_by_type", payload: prevFilter })
            }
        }
    }

    const sortByName = (val) => {
        let newData
        if (val == "Name") {
            newData = state.data.sort((a, b) => a.name - b.name)
        } else if (val == "Price") {
            newData = state.data.sort((a, b) => a.price - b.price)
        } else {
            newData = state.data.sort((a, b) => a.stock - b.stock)
        }


        dispatch({ type: "set_data", payload: newData })
        console.log("data====>" + JSON.stringify(newData))
    }

    const addProduct = (e) => {
        e.preventDefault()
        counter++;
        const prod = {
            id: counter,
            department: document.getElementById("ncategory").value,
            name: document.getElementById("nname").value,
            description: document.getElementById("ndescription").value,
            price: document.getElementById("nprice").value,
            stock: document.getElementById("nstock").value,
            sku: document.getElementById("nsku").value,
            supplier: document.getElementById("nsupplier").value,
            delivered: document.getElementById("ndelivered").value,
            imageUrl: document.getElementById("nimage").value,
        }

        // dispatch({ type: "set_new_item", payload: prod })
        if (localStorage.getItem("arr") == undefined) {
            const newArr = [prod]
            localStorage.setItem("arr", JSON.stringify(newArr))
        } else {
            const existArray  = localStorage.getItem("arr")
            const arr =existArray.concat(prod)
            localStorage.setItem("arr", JSON.stringify(arr))
        }
        dispatch({ type: "set_new_item", payload: prod })
        dispatch({ type: "close_modal" })
    }

    useEffect(() => {
        const data = localStorage.getItem("arr")
        if (data != undefined) {
            const newData = JSON.parse(data)
            console.log("new Array==>" + JSON.stringify(newData))
            dispatch({ type: "set_new_item", payload: newData })
        }
        if (location.state != undefined) {
            const mySelect = document.getElementById('select');

            for (const option of mySelect.options) {
                if (option.value === location.state) {
                    option.selected = true;
                } else {
                    option.selected = false;
                }
            }

            dispatch({type:"filter_by_type", payload:location.state})
            prevFilter=location.state
        }

    }, [])

    return (
        <div>
            <Navabar />
            <div className='ml-80 '>
                <div className='flex p-4 justify-between'>
                    <p className='font-bold text-xl'>Producs</p>
                    <p className='font-bold w-20 border p-2'>
                        <select onChange={(e) => handleFilter(e.target.value)} id="select">
                            <option value="All" >All Departments</option>
                            <option value="Kitchen" >Kitchen</option>
                            <option value="Clothing">Clothing</option>
                            <option value="Toys"    >Toys</option>
                        </select>
                    </p>
                    <p className='p-2'>
                        <input type='checkbox' onChange={(e) => handleChecbox(e)} />
                        <lable className='font-bold ml-2'
                        >Low stock</lable>
                    </p>
                    <p>
                        <select className='font-bold w-20 border p-1 mt-2' onChange={(e) => sortByName(e.target.value)}>
                            <option>Name</option>
                            <option>Price</option>
                            <option>Stock</option>
                        </select>
                    </p>
                    <p>
                        <button className='text-xl p-2 bg-blue-700 rounded text-white'
                            onClick={() => dispatch({ type: "open_modal" })}
                        >New</button>
                    </p>
                </div>

                <div>
                    <div class=" w-full mx-auto overflow-auto mt-10">
                        <table class="table-auto w-full text-left whitespace-no-wrap">
                            <thead>
                                <tr>
                                    <th class="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100 rounded-tl rounded-bl">Image</th>
                                    <th class="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100">Name</th>
                                    <th class="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100">Description</th>
                                    <th class="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100">Price</th>
                                    <th class="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100">Stock</th>
                                    <th class="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100">Supplier</th>
                                    <th class="w-10 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100 rounded-tr rounded-br"></th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    state?.data?.map(ele =>
                                        <tr>
                                            <td class="px-4 py-3"><img src={ele.imageUrl} className='w-40' /></td>
                                            <td class="px-4 py-3">{ele.name}</td>
                                            <td class="px-4 py-3">{ele.description}</td>
                                            <td class="px-4 py-3 text-lg text-gray-900">${ele.price}</td>
                                            <td class="w-10 text-center">
                                                {ele.stock}
                                            </td>
                                            <td class="w-10 text-center">
                                                {ele.supplier}
                                            </td>
                                        </tr>
                                    )
                                }
                            </tbody>
                        </table>
                    </div>

                </div>


                <div class={state.open ? "fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50" : "hidden"}>
                    <div class="bg-white rounded-lg p-6 max-w-md w-full max-h-screen overflow-y-auto">
                        <h2 class="text-xl font-semibold mb-4">Add Product</h2>
                        <form>
                            <div class="mb-4">
                                <label class="block font-medium mb-1" for="category">Category</label>
                                <select class="w-full border border-gray-300 px-3 py-2 rounded focus:outline-none focus:border-blue-500" id="ncategory" name="category">
                                    <option value="Kitchen">Kitchen</option>
                                    <option value="Toys">Toys</option>
                                    <option value="Clothing">Clothing</option>
                                </select>
                            </div>
                            <div class="mb-4">
                                <label class="block font-medium mb-1" for="name">Name</label>
                                <input class="w-full border border-gray-300 px-3 py-2 rounded focus:outline-none focus:border-blue-500" type="text" id="nname" name="name" />
                            </div>
                            <div class="mb-4">
                                <label class="block font-medium mb-1" for="description">Description</label>
                                <textarea class="w-full border border-gray-300 px-3 py-2 rounded focus:outline-none focus:border-blue-500" id="ndescription" name="description"></textarea>
                            </div>
                            <div class="mb-4">
                                <label class="block font-medium mb-1" for="price">Price</label>
                                <input class="w-full border border-gray-300 px-3 py-2 rounded focus:outline-none focus:border-blue-500" type="text" id="nprice" name="price" />
                            </div>
                            <div class="mb-4">
                                <label class="block font-medium mb-1" for="stock">Stock</label>
                                <input class="w-full border border-gray-300 px-3 py-2 rounded focus:outline-none focus:border-blue-500" type="text" id="nstock" name="stock" />
                            </div>
                            <div class="mb-4">
                                <label class="block font-medium mb-1" for="supplier">Supplier</label>
                                <input class="w-full border border-gray-300 px-3 py-2 rounded focus:outline-none focus:border-blue-500" type="text" id="nsupplier" name="supplier" />
                            </div>
                            <div class="mb-4">
                                <label class="block font-medium mb-1" for="supplier">SKU</label>
                                <input class="w-full border border-gray-300 px-3 py-2 rounded focus:outline-none focus:border-blue-500" type="text" id="nsku" name="supplier" />
                            </div>
                            <div class="mb-4">
                                <label class="block font-medium mb-1" for="delivered">Delivered</label>
                                <input class="w-full border border-gray-300 px-3 py-2 rounded focus:outline-none focus:border-blue-500" type="text" id="ndelivered" name="delivered" />
                            </div>
                            <div class="mb-4">
                                <label class="block font-medium mb-1" for="image">Image URL</label>
                                <input class="w-full border border-gray-300 px-3 py-2 rounded focus:outline-none focus:border-blue-500" type="text" id="nimage" name="image" />
                            </div>
                            <div class="flex justify-end mt-6">
                                <button class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none" type="submit"
                                    onClick={(e) => addProduct(e)}
                                >Add Product</button>
                                <button class="px-4 py-2 ml-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400 focus:outline-none" type="button"
                                    onClick={() => dispatch({ type: "close_modal" })}
                                >Close</button>
                            </div>
                        </form>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default Products