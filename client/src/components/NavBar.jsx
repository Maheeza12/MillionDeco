import React, { useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import { assets } from '../assets/assets'
import { useAppContext } from '../context/AppContext'
import toast from 'react-hot-toast'

const navbar = () => {
    const [open, setOpen] = React.useState(false)
    const {user,setUser,setShowUserLogin, navigate, searchQuery, setSearchQuery, getCartCount, axios} =useAppContext()
    
    const logout= async()=>{
        try {
            const {data} = await axios.get('/api/user/logout');
            if(data.success){
                toast.success(data.message)
                setUser(null);
                navigate('/')
            }else{
                toast.error(data.message)
            }                      
        } catch (error) {
            toast.error(error.message)            
        }
    }

    useEffect(()=>{
        if(searchQuery.length > 0){
            navigate("/products")
        }

    },[searchQuery])

    return (
        <nav className="flex items-center justify-between px-6 md:px-16 lg:px-24 xl:px-32 py-4 border-b-4 border-primary bg-black relative transition-all">

    <NavLink to='/' onClick={()=> setOpen(false)}>
        <img className="h-23" src={assets.logo} alt="logo" />
    </NavLink>

            {/* Desktop Menu */}
            <div className="hidden sm:flex items-center gap-8 text-white">
                <NavLink className="tracking-wide font-semibold text-lg" to='/'>Home</NavLink>
                <NavLink className="tracking-wide font-semibold text-lg" to='/products'>All products</NavLink>
                <NavLink className="tracking-wide font-semibold text-lg" to='/contact'>Contact</NavLink>

                <div className="hidden lg:flex items-center text-sm gap-2 border border-gray-300 px-3 rounded-full">
                    <input onChange={(e)=>setSearchQuery(e.target.value)} className="py-1.5 w-full bg-transparent outline-none placeholder-gray-500" type="text" placeholder="Search products" />
                    <img src={assets.search_icon} alt='search' className='w-4 h-4'/>
                </div>

                <div onClick={()=> navigate("/cart")} className="relative cursor-pointer">
                    <svg width="30" height="30" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M.583.583h2.333l1.564 7.81a1.17 1.17 0 0 0 1.166.94h5.67a1.17 1.17 0 0 0 1.167-.94l.933-4.893H3.5m2.333 8.75a.583.583 0 1 1-1.167 0 .583.583 0 0 1 1.167 0m6.417 0a.583.583 0 1 1-1.167 0 .583.583 0 0 1 1.167 0" stroke="#FFFFFF" stroke-linecap="round" stroke-linejoin="round" />
                    </svg>
                    <button className="absolute -top-2 -right-3 text-xs text-white bg-primary w-[24px] h-[24px] rounded-full">{getCartCount()}</button>
                </div>

               {!user?( <button onClick={()=> setShowUserLogin(true)} className="cursor-pointer px-8 py-2 bg-primary hover:bg-primary-dull transition text-white rounded-full">
                    Login
                </button>):
                (
                    <div className='relative group'>
                        <img src={assets.profile_icon} className='w-10 cursor-pointer' alt='profile' />
                        <ul className='hidden group-hover:block absolute top-10 right-0 bg-black shadow border border-gray-800 py-2.5 w-32 rounded-md text-sm z-40'>
                            <li onClick={() => navigate("/my-orders")} className='p-1.5 pl-3 hover:bg-primary/10 cursor-pointer'>My Orders</li>
                            <li onClick={logout} className='p-1.5 pl-3 hover:bg-primary/10 cursor-pointer'>Logout</li>
                        </ul>
                        </div>

                )}
            </div>

            <div className='flex items-center gap-6 sm:hidden'>
            <div onClick={()=> navigate("/cart")} className="relative cursor-pointer">
                    <svg width="30" height="30" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M.583.583h2.333l1.564 7.81a1.17 1.17 0 0 0 1.166.94h5.67a1.17 1.17 0 0 0 1.167-.94l.933-4.893H3.5m2.333 8.75a.583.583 0 1 1-1.167 0 .583.583 0 0 1 1.167 0m6.417 0a.583.583 0 1 1-1.167 0 .583.583 0 0 1 1.167 0" stroke="#FFFFFF" stroke-linecap="round" stroke-linejoin="round" />
                    </svg>
                    <button className="absolute -top-2 -right-3 text-xs text-white bg-primary w-[24px] h-[24px] rounded-full">{getCartCount()}</button>
                </div>
            <button onClick={() => setOpen(!open)} aria-label="Menu" className="">

                {/* Menu Icon SVG */}
                <img src={assets.menu_icon} alt='menu'/>
            </button>

            </div>


            {/* Mobile Menu */}
            { open && (
                <div className={`${open ? 'flex' : 'hidden'} absolute top-[60px] left-0 w-full bg-black shadow-md py-4 flex-col items-start gap-2 px-5 text-sm md:hidden text-white z-50`}>
                <NavLink to ='/' onClick={()=>setOpen(false)}>Home</NavLink>
                <NavLink to ='/products' onClick={()=>setOpen(false)}>All Products</NavLink>
                {user &&
                <NavLink to ='/products' onClick={()=>setOpen(false)}>My Orders</NavLink>
                }
                <NavLink to ='/' onClick={()=>setOpen(false)}>Contact</NavLink>

                {!user ?(
                    <button onClick={()=>{
                        setOpen(false);
                        setShowUserLogin(true)
                    }}className="cursor-pointer px-6 py-2 mt-2 bg-primary hover:bg-primary-dull transition text-white rounded-full text-sm">
                    Login
                </button>
                ):(<button onClick={logout} className="cursor-pointer px-6 py-2 mt-2 bg-primary hover:bg-primary-dull transition text-white rounded-full text-sm">
                    Logout
                </button>)}

                
            </div>
        )}

        </nav>
    )
}

export default navbar
