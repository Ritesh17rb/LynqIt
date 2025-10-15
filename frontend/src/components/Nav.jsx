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
import { HiMenu, HiX } from "react-icons/hi";
function Nav() {
    const { userData, currentCity ,cartItems} = useSelector(state => state.user)
        const { myShopData} = useSelector(state => state.owner)
    const [showInfo, setShowInfo] = useState(false)
    const [showSearch, setShowSearch] = useState(false)
    const [query,setQuery]=useState("")
    const [isMenuOpen, setIsMenuOpen] = useState(false)
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
        <div className='w-full h-[80px] flex items-center justify-between px-[20px] fixed top-0 z-[9999] bg-gradient-to-r from-white via-gray-50 to-white backdrop-blur-lg border-b border-gray-200 shadow-lg overflow-visible'>
            {/* Mobile Menu Button */}
            <button
                className='md:hidden p-2 rounded-lg bg-indigo-50 text-indigo-600 hover:bg-indigo-100 transition-all duration-300 hover:scale-105'
                onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
                {isMenuOpen ? <HiX size={24} /> : <HiMenu size={24} />}
            </button>

            {/* Logo */}
            <h1 className='text-3xl font-bold gradient-text hover:scale-105 transition-transform duration-300 cursor-pointer' onClick={() => navigate('/')}>
                LynQt
            </h1>

            {/* Desktop Search Bar for Users */}
            {userData.role === "user" && (
                <div className='hidden md:flex w-[50%] lg:w-[40%] h-[70px] bg-white shadow-xl rounded-2xl items-center gap-[20px] border border-gray-100 hover:shadow-2xl transition-shadow duration-300'>
                    <div className='flex items-center w-[30%] overflow-hidden gap-[10px] px-[10px] border-r-[2px] border-gray-200'>
                        <FaLocationDot size={25} className="text-indigo-600" />
                        <div className='w-[80%] truncate text-gray-600 font-medium'>{currentCity}</div>
                    </div>
                    <div className='w-[80%] flex items-center gap-[10px]'>
                        <IoIosSearch size={25} className='text-indigo-600' />
                        <input
                            type="text"
                            placeholder='Search fashion items...'
                            className='px-[10px] text-gray-700 outline-0 w-full font-medium focus:ring-2 focus:ring-indigo-300 rounded-md transition-all'
                            onChange={(e) => setQuery(e.target.value)}
                            value={query}
                        />
                    </div>
                </div>
            )}

            {/* Desktop Actions */}
            <div className='hidden md:flex items-center gap-4'>
                {userData.role === "owner" ? (
                    <>
                        {myShopData && (
                            <button className='flex items-center gap-2 p-3 cursor-pointer rounded-xl bg-gradient-to-r from-indigo-50 to-purple-50 text-indigo-600 hover:from-indigo-100 hover:to-purple-100 transition-all duration-300 font-medium hover:scale-105' onClick={() => navigate("/add-item")}>
                                <FaPlus size={18} />
                                <span>Add Item</span>
                            </button>
                        )}
                        <div className='flex items-center gap-2 cursor-pointer relative px-3 py-2 rounded-xl bg-gradient-to-r from-indigo-50 to-purple-50 text-indigo-600 hover:from-indigo-100 hover:to-purple-100 transition-all duration-300 font-medium hover:scale-105' onClick={() => navigate("/my-orders")}>
                            <TbReceipt2 size={20} />
                            <span>My Orders</span>
                        </div>
                    </>
                ) : (
                    <>
                        {userData.role === "user" && (
                            <div className='relative cursor-pointer p-2 hover:bg-gray-100 rounded-full transition-all duration-300 hover:scale-110' onClick={() => navigate("/cart")}>
                                <FiShoppingCart size={25} className='text-indigo-600' />
                                <span className='absolute right-[-6px] top-[-6px] bg-gradient-to-r from-indigo-500 to-purple-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold shadow-lg'>{cartItems.length}</span>
                            </div>
                        )}
                        <button className='px-4 py-2 rounded-xl bg-gradient-to-r from-indigo-50 to-purple-50 text-indigo-600 hover:from-indigo-100 hover:to-purple-100 transition-all duration-300 text-sm font-medium hover:scale-105' onClick={() => navigate("/my-orders")}>
                            My Orders
                        </button>
                    </>
                )}

                <div className='w-[45px] h-[45px] rounded-full flex items-center justify-center bg-gradient-to-br from-indigo-500 to-purple-600 text-white text-[18px] shadow-lg font-semibold cursor-pointer hover:scale-110 transition-all duration-300' onClick={() => navigate('/profile')}>
                    {userData?.fullName.slice(0, 1).toUpperCase()}
                </div>
            </div>

            {/* Mobile Actions */}
            <div className='md:hidden flex items-center gap-2'>
                {userData.role === "user" && (
                    showSearch ? (
                        <RxCross2 size={25} className='text-indigo-600 hover:bg-gray-100 p-2 rounded-full transition-all duration-300 hover:scale-105' onClick={() => setShowSearch(false)} />
                    ) : (
                        <IoIosSearch size={25} className='text-indigo-600 hover:bg-gray-100 p-2 rounded-full transition-all duration-300 hover:scale-105' onClick={() => setShowSearch(true)} />
                    )
                )}
                {userData.role === "owner" && myShopData && (
                    <button className='p-2 rounded-lg bg-indigo-50 text-indigo-600 hover:bg-indigo-100 transition-all duration-300 hover:scale-105' onClick={() => navigate("/add-item")}>
                        <FaPlus size={18} />
                    </button>
                )}
                <div className='w-[40px] h-[40px] rounded-full flex items-center justify-center bg-gradient-to-br from-indigo-500 to-purple-600 text-white text-[16px] shadow-lg font-semibold cursor-pointer hover:scale-110 transition-all duration-300' onClick={() => navigate('/profile')}>
                    {userData?.fullName.slice(0, 1).toUpperCase()}
                </div>
            </div>

            {/* Mobile Menu Overlay */}
            {isMenuOpen && (
                <div className='md:hidden fixed top-[80px] left-0 w-full bg-white shadow-2xl border-t border-gray-200 z-[9998] animate-slide-down'>
                    <div className='flex flex-col p-4 gap-4'>
                        {userData.role === "owner" && (
                            <div className='flex items-center gap-2 cursor-pointer px-3 py-2 rounded-xl bg-indigo-50 text-indigo-600 hover:bg-indigo-100 transition-all duration-300' onClick={() => { navigate("/my-orders"); setIsMenuOpen(false); }}>
                                <TbReceipt2 size={20} />
                                <span>My Orders</span>
                            </div>
                        )}
                        {userData.role === "user" && (
                            <button className='px-4 py-2 rounded-xl bg-indigo-50 text-indigo-600 hover:bg-indigo-100 transition-all duration-300 text-sm font-medium' onClick={() => { navigate("/my-orders"); setIsMenuOpen(false); }}>
                                My Orders
                            </button>
                        )}
                        <div className='text-red-600 font-semibold cursor-pointer hover:bg-red-50 p-2 rounded-lg transition-all duration-300' onClick={handleLogOut}>
                            Log Out
                        </div>
                    </div>
                </div>
            )}

            {/* Mobile Search Bar */}
            {showSearch && userData.role === "user" && (
                <div className='w-[90%] h-[70px] bg-white shadow-xl rounded-2xl items-center gap-[20px] flex fixed top-[80px] left-[5%] md:hidden border border-gray-100 animate-slide-down'>
                    <div className='flex items-center w-[30%] overflow-hidden gap-[10px] px-[10px] border-r-[2px] border-gray-200'>
                        <FaLocationDot size={25} className="text-indigo-600" />
                        <div className='w-[80%] truncate text-gray-600 font-medium'>{currentCity}</div>
                    </div>
                    <div className='w-[80%] flex items-center gap-[10px]'>
                        <IoIosSearch size={25} className='text-indigo-600' />
                        <input
                            type="text"
                            placeholder='Search fashion items...'
                            className='px-[10px] text-gray-700 outline-0 w-full font-medium focus:ring-2 focus:ring-indigo-300 rounded-md transition-all'
                            onChange={(e) => setQuery(e.target.value)}
                            value={query}
                        />
                    </div>
                </div>
            )}

            {/* User Info Dropdown */}
            {showInfo && (
                <div className={`fixed top-[85px] right-[10px] ${userData.role === "deliveryBoy" ? "md:right-[20%] lg:right-[40%]" : "md:right-[10%] lg:right-[25%]"} w-[200px] bg-white shadow-2xl rounded-2xl p-[20px] flex flex-col gap-[15px] z-[9999] border border-gray-100 animate-fade-in`}>
                    <div className='text-[18px] font-semibold text-gray-800'>{userData.fullName}</div>
                    {userData.role === "user" && (
                        <div className='md:hidden text-indigo-600 font-semibold cursor-pointer hover:bg-indigo-50 p-2 rounded-lg transition-all duration-300' onClick={() => { navigate("/my-orders"); setShowInfo(false); }}>
                            My Orders
                        </div>
                    )}
                    <div className='text-red-600 font-semibold cursor-pointer hover:bg-red-50 p-2 rounded-lg transition-all duration-300' onClick={handleLogOut}>
                        Log Out
                    </div>
                </div>
            )}
        </div>
    )
}


export default Nav
