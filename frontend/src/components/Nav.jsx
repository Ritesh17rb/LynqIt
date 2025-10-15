import React, { useEffect, useState } from 'react'
import { FaLocationDot } from "react-icons/fa6";
import { IoIosSearch } from "react-icons/io";
import { FiShoppingCart } from "react-icons/fi";
import { useDispatch, useSelector } from 'react-redux';
import { RxCross2 } from "react-icons/rx";
import axios from 'axios';
import { serverUrl } from '../App';
import { setSearchItems, setUserData } from '../redux/userSlice';
import { FaPlus } from "react-icons/fa6";
import { TbReceipt2 } from "react-icons/tb";
import { useNavigate } from 'react-router-dom';
function Nav() {
    const { userData, currentCity ,cartItems} = useSelector(state => state.user)
        const { myShopData} = useSelector(state => state.owner)
    const [showInfo, setShowInfo] = useState(false)
    const [showSearch, setShowSearch] = useState(false)
    const [query,setQuery]=useState("")
    const dispatch = useDispatch()
    const navigate=useNavigate()
    const handleLogOut = async () => {
        try {
            const result = await axios.get(`${serverUrl}/api/auth/signout`, { withCredentials: true })
            dispatch(setUserData(null))
        } catch (error) {
            console.log(error)
        }
    }

    const handleSearchItems=async () => {
      try {
        const result=await axios.get(`${serverUrl}/api/item/search-items?query=${query}&city=${currentCity}`,{withCredentials:true})
    dispatch(setSearchItems(result.data))
      } catch (error) {
        console.log(error)
      }
    }

    useEffect(()=>{
        if(query){
handleSearchItems()
        }else{
              dispatch(setSearchItems(null))
        }

    },[query])
    return (
        <div className='w-full h-[80px] flex items-center justify-between md:justify-center gap-[30px] px-[20px] fixed top-0 z-[9999] bg-white/95 backdrop-blur-md border-b border-gray-200 shadow-sm overflow-visible'>

            {showSearch && userData.role == "user" && <div className='w-[90%] h-[70px] bg-white shadow-xl rounded-2xl items-center gap-[20px] flex fixed top-[80px] left-[5%] md:hidden border border-gray-100'>
                <div className='flex items-center w-[30%] overflow-hidden gap-[10px] px-[10px] border-r-[2px] border-gray-200'>
                    <FaLocationDot size={25} className="text-indigo-600" />
                    <div className='w-[80%] truncate text-gray-600 font-medium'>{currentCity}</div>
                </div>
                <div className='w-[80%] flex items-center gap-[10px]'>
                    <IoIosSearch size={25} className='text-indigo-600' />
                    <input type="text" placeholder='search fashion items...' className='px-[10px] text-gray-700 outline-0 w-full font-medium' onChange={(e)=>setQuery(e.target.value)} value={query}/>
                </div>
            </div>}



            <h1 className='text-3xl font-bold mb-2 gradient-text'>LynQ</h1>
            {userData.role == "user" && <div className='md:w-[60%] lg:w-[40%] h-[70px] bg-white shadow-xl rounded-2xl items-center gap-[20px] hidden md:flex border border-gray-100'>
                <div className='flex items-center w-[30%] overflow-hidden gap-[10px] px-[10px] border-r-[2px] border-gray-200'>
                    <FaLocationDot size={25} className="text-indigo-600" />
                    <div className='w-[80%] truncate text-gray-600 font-medium'>{currentCity}</div>
                </div>
                <div className='w-[80%] flex items-center gap-[10px]'>
                    <IoIosSearch size={25} className='text-indigo-600' />
                    <input type="text" placeholder='search fashion items...' className='px-[10px] text-gray-700 outline-0 w-full font-medium' onChange={(e)=>setQuery(e.target.value)} value={query}/>
                </div>
            </div>}

            <div className='flex items-center gap-4'>
                {userData.role == "user" && (showSearch ? <RxCross2 size={25} className='text-indigo-600 md:hidden hover:bg-gray-100 p-2 rounded-full transition-colors' onClick={() => setShowSearch(false)} /> : <IoIosSearch size={25} className='text-indigo-600 md:hidden hover:bg-gray-100 p-2 rounded-full transition-colors' onClick={() => setShowSearch(true)} />)
                }
                {userData.role == "owner"? <>
                 {myShopData && <> <button className='hidden md:flex items-center gap-2 p-3 cursor-pointer rounded-xl bg-indigo-50 text-indigo-600 hover:bg-indigo-100 transition-colors font-medium' onClick={()=>navigate("/add-item")}>
                        <FaPlus size={18} />
                        <span>Add Item</span>
                    </button>
                      <button className='md:hidden flex items-center p-3 cursor-pointer rounded-xl bg-indigo-50 text-indigo-600 hover:bg-indigo-100 transition-colors' onClick={()=>navigate("/add-item")}>
                        <FaPlus size={18} />
                    </button></>}
                   
                    <div className='hidden md:flex items-center gap-2 cursor-pointer relative px-3 py-2 rounded-xl bg-indigo-50 text-indigo-600 hover:bg-indigo-100 transition-colors font-medium' onClick={()=>navigate("/my-orders")}>
                      <TbReceipt2 size={20}/>
                      <span>My Orders</span>
                      
                    </div>
                     <div className='md:hidden flex items-center gap-2 cursor-pointer relative px-3 py-2 rounded-xl bg-indigo-50 text-indigo-600 hover:bg-indigo-100 transition-colors font-medium' onClick={()=>navigate("/my-orders")}>
                      <TbReceipt2 size={20}/>
                      
                    </div>
                </>: (
                    <>
                 {userData.role=="user" &&    <div className='relative cursor-pointer p-2 hover:bg-gray-100 rounded-full transition-colors' onClick={()=>navigate("/cart")}>
                    <FiShoppingCart size={25} className='text-indigo-600' />
                    <span className='absolute right-[-6px] top-[-6px] bg-indigo-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold'>{cartItems.length}</span>
                </div>}   
           


                <button className='hidden md:block px-4 py-2 rounded-xl bg-indigo-50 text-indigo-600 hover:bg-indigo-100 transition-colors text-sm font-medium' onClick={()=>navigate("/my-orders")}>
                    My Orders
                </button>
                    </>
                )}



                <div className='w-[45px] h-[45px] rounded-full flex items-center justify-center bg-gradient-to-br from-indigo-500 to-purple-600 text-white text-[18px] shadow-lg font-semibold cursor-pointer hover:scale-105 transition-transform' onClick={() => setShowInfo(prev => !prev)}>
                    {userData?.fullName.slice(0, 1).toUpperCase()}
                </div>
                {showInfo && <div className={`fixed top-[85px] right-[10px] 
                    ${userData.role=="deliveryBoy"?"md:right-[20%] lg:right-[40%]":"md:right-[10%] lg:right-[25%]"} w-[200px] bg-white shadow-2xl rounded-2xl p-[20px] flex flex-col gap-[15px] z-[9999] border border-gray-100`}>
                    <div className='text-[18px] font-semibold text-gray-800'>{userData.fullName}</div>
                    {userData.role=="user" && <div className='md:hidden text-indigo-600 font-semibold cursor-pointer hover:bg-indigo-50 p-2 rounded-lg transition-colors' onClick={()=>navigate("/my-orders")}>My Orders</div>}
                    
                    <div className='text-red-600 font-semibold cursor-pointer hover:bg-red-50 p-2 rounded-lg transition-colors' onClick={handleLogOut}>Log Out</div>
                </div>}

            </div>
        </div>
    )
}


export default Nav
