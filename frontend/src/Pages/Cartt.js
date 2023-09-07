import React, { useEffect, useState } from 'react'
import Navbar from '../Components/Navbar'
import Footer from '../Components/Footer'
// import "./registers.css";
import './profile.css'
import { Form, message, Input, Button } from 'antd'
import { useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { setLoader } from '../redux/loaderSlice'
import {
    RegisterUser,
    UpdateUserProfile,
    changePassword
} from '../apiCalls/users'
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'
import { logout } from '../redux/userSlice'
import { cancelBooking, deleteCart, getAllCart, getMyBookings } from '../apiCalls/booking'

const rules = [{}]

export default function Cart() {
    const { user } = useSelector(state => state.users)
    const [data, setData] = React.useState({
        name: '',
        email: '',
        address: '',
        city: ''
    })
    const [dataPassword, setDataPassword] = React.useState({
        oldPassword: '',
        newPassword: '',
        confirmPassword: ''
    })

    const handleCancelError = () => {
        toast.error('Canot cancel this booking now')
    }
    const handleCancelSuccess = () => {
        toast.success('successfuly Canceled!')
    }

    const [activeForm, setActiveForm] = useState('profile-detail-form')

    const handleChangeForm = formId => {
        console.log(' FORMD ID = ', formId)
        setActiveForm(formId)
        console.log(' FORM DATA ', activeForm)
    }

    const handlePasswordSubmit = async values => {
        // take data to submit
        console.log(values)
        if (values.newPassword !== values.confirmPassword) {
            message.error('New password and confirm password do not match')
            return
        }
        try {
            dispatch(setLoader(true))
            const response = await changePassword(
                values.oldPassword,
                values.newPassword
            )
            console.log(response, 'response passowrd change')
            dispatch(setLoader(false))
            if (response.success) {
                message.success(response.message)
            } else {
                throw new Error(response.error)
            }
        } catch (error) {
            message.error(error.message)
            console.log(error.message, 'error')
        }
    }

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [phone, setPhone] = useState('')



    const handleSuccess = () => {
        toast.success("deleted success");
    };


    const DeleteCart = async (id) => {
        console.log(id)
        try {
            dispatch(setLoader(true));
            const response = await deleteCart(id);
            console.log("comeon show me the response");

            dispatch(setLoader(false));
            if (response.success) {
                handleSuccess();
                message.success(response.message);
            } else {
                throw new Error(response.error);
            }
        } catch (error) {
            message.error(error.message);
        }
    };


    const [upcomingBooking, setUpcomingBooking] = useState([])
    const [currentPage, setCurrentPage] = useState(1)
    const [itemsPerPage] = useState(5)

    const indexOfLastItem = currentPage * itemsPerPage
    const indexOfFirstItem = indexOfLastItem - itemsPerPage
    const currentItems = upcomingBooking.slice(indexOfFirstItem, indexOfLastItem)

    const totalPages = Math.ceil(upcomingBooking.length / itemsPerPage)

    const handlePageChange = pageNumber => {
        setCurrentPage(pageNumber)
    }
    const getMyBooking = async () => {
        const token = localStorage.getItem('token') // Replace with how you store the authentication token

        try {
            const response = await getAllCart(token)
            if (response.success) {
                // setHistoryBooking(response["history"]);

                setUpcomingBooking(response['cart'])
                console.log("my booking history", response['cart']);
                // console.log("my booking upcoming", upcomingBooking);
            } else {
                throw new Error(response.error)
            }
        } catch (error) {
            message.error(error.message)
        }
    }
    const cancelBookings = async activity => {
        const id = activity._id
        const token = localStorage.getItem('token')
        try {
            dispatch(setLoader(true))
            const response = await cancelBooking(id, token)
            console.log('response if it canceled', response.message)
            dispatch(setLoader(false))
            if (response.success) {
                message.success(response.message)
                handleCancelSuccess()
                console.log(response.success)
            } else {
                console.log(response.error)
                handleCancelError()
            }
        } catch (error) {
            message.error(error.message)
        }
    }

    useEffect(() => {
        if (user) {
            setData({
                fullName: user.fullName || '',
                phone: user.phone || '',
                email: user.email || '',
                address: user.address || '',
                city: user.city || ''
            })
            setPhone(user.phoneNumber || '')
        }
    }, [user])
    getMyBooking()

    if (!user) {
        return null // or display a loading state
    }

    return (
        <div className="">
            <div className="header-contact-us mb-[-50px]   Poster w-[1920px] h-[400px] bg-[url(/public/image90@2x.png)] bg-cover bg-no-repeat bg-[top] font-lato">
                <div className="font-semibold  [text-shadow:0px_2px_3px_rgba(0,_0,_0,_0.25)]">
                    My Cart
                </div>
            </div>
            <div className=' w-screen' >
                <div
                    className=' 
                   px-10  h-[1000px] flex md:flex-row gap-4 flex-col'
                >
                    <div
                        className='  profile-form  md:w-[70%] 
                         w-[380px] h-[900px] md:m-[5rem] ml-[-25px]'
                        id='my-booking-form'

                    >
                        <h2 className=' text-[35px]'>{upcomingBooking.length} Items In Cart</h2>
                        {/* pc web view  */}
                        <div className='bookings  md:py-20px md:px-40px hidden md:block ml-[-40px] '>
                            {/* Add your code for the My Booking view form here (cloned from the profile detail form) */}
                            {/* code trial with a pagination */}
                            {currentItems.map(u => {
                                console.log('datas in u', u)
                                return (
                                    <div className='upcoming-booking' key={u.id}>
                                        <div className='single-book'>
                                            <div className='single-book-firstchild'>
                                                <span className='font-semibold flex'>
                                                    <img
                                                        className=' w-5 h-5 overflow-hidden shrink-0'
                                                        alt=''
                                                        src='/passport.svg'
                                                    />
                                                    Product
                                                </span>
                                                <span className='font-semibold inline-block font-medium text-orange-800'>
                                                    {u.activity.name}
                                                </span>
                                            </div>
                                            <div className='single-book-col'>
                                                <span className='font-semibold text-sm flex'>
                                                    <img
                                                        className=' w-5 h-5 overflow-hidden shrink-0'
                                                        alt=''
                                                        src='/date4.svg'
                                                    />
                                                    Duration  
                                                </span>
                                                <span>{u.activity.duration}</span>
                                            </div>
                                            <div className='single-book-col ml-2 mr-2'>
                                                <span className='font-semibold flex mr-4'>
                                                    <img
                                                        className=' w-5 h-5 overflow-hidden shrink-0'
                                                        alt=''
                                                        src='/location7.svg'
                                                    />
                                                    Location
                                                </span>
                                                <span>{u.activity.location.name}</span>
                                            </div>
                                            <div className='single-book-col'>
                                                <span className='font-semibold flex'>
                                                    <img
                                                        className=' w-5 h-5 overflow-hidden shrink-0'
                                                        alt=''
                                                        src='/table.svg'
                                                    />
                                                    Booking Status
                                                </span>
                                                <span>{u.status}</span>
                                            </div>
                                            <div className="single-book-col">
                                                <div className="rounded-md bg-darkslateblue-100 hover:cursor-pointer m-2 shadow-[0px_2px_6px_rgba(0,_0,_0,_0.14)] overflow-hidden flex flex-row py-[3px] px-3.5 items-center justify-center text-center text-sm text-white border-[1px] border-solid border-button-stroke">
                                                    <div
                                                        onClick={() => {
                                                            navigate("/select", {
                                                                state: { item: { ...u.activity } },
                                                            });
                                                        }}
                                                        className=""
                                                    >{`Book Now`}</div>
                                                </div>
                                                <div
                                                    onClick={() => {
                                                        DeleteCart(u._id);
                                                    }}
                                                    className="rounded-md bg-red-600 m-2 hover:cursor-pointer shadow-[0px_2px_6px_rgba(0,_0,_0,_0.14)] overflow-hidden flex flex-row md:py-[3px] px-12 items-center justify-center text-center text-sm text-white border-[1px] border-solid border-button-stroke"
                                                >
                                                    <div className="font-semibold">Delete</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })}

                            {/* Pagination */}
                            <div className='pagination flex flex-row gap-12 text-orange-500 ml-32 mt-12'>
                                {Array.from({ length: totalPages }, (_, i) => (
                                    <button
                                        key={i}
                                        onClick={() => handlePageChange(i + 1)}
                                        className={currentPage === i + 1 ? 'active' : ''}
                                    >
                                        {i + 1}
                                    </button>
                                ))}
                            </div>
                        </div>
                        {/* mobile view  */}
                        <div className='bookings  md:py-20px md:px-40px md:hidden ml-[-40px] '>
                            {/* Add your code for the My Booking view form here (cloned from the profile detail form) */}
                            {/* code trial with a pagination */}
                            {currentItems.map(u => {
                                return (
                                    <div className='upcoming-booking' key={u.id}>
                                        <div className='single-book'>
                                            <div className='single-book-col'>
                                                <span className='font-semibold flex'>
                                                    <img
                                                        className=' w-5 h-5 overflow-hidden shrink-0'
                                                        alt=''
                                                        src='/passport.svg'
                                                    />
                                                    Product
                                                </span>
                                                <span className='font-semibold inline-block font-medium text-orange-800'>
                                                    {u.activity.name}
                                                </span>
                                            </div>
                                            <div className='single-book-col'>
                                                <span className='font-semibold text-sm flex'>
                                                    <img
                                                        className=' w-5 h-5 overflow-hidden shrink-0'
                                                        alt=''
                                                        src='/date4.svg'
                                                    />
                                                    Duration
                                                </span>
                                                <span>{u.activity.duration}</span>
                                            </div>

                                            <div className="single-book-col">
                                                <div className="rounded-md bg-darkslateblue-100 hover:cursor-pointer m-2 shadow-[0px_2px_6px_rgba(0,_0,_0,_0.14)] overflow-hidden flex flex-row py-[3px] px-3.5 items-center justify-center text-center text-sm text-white border-[1px] border-solid border-button-stroke">
                                                    <div
                                                        onClick={() => {
                                                            navigate("/select", {
                                                                state: { item: { ...u.activity } },
                                                            });
                                                        }}
                                                        className=""
                                                    >{`Book Now`}</div>
                                                </div>
                                                <div
                                                    onClick={() => {
                                                        DeleteCart(u.activity._id);
                                                    }}
                                                    className="rounded-md bg-red-600 m-2 hover:cursor-pointer shadow-[0px_2px_6px_rgba(0,_0,_0,_0.14)] overflow-hidden flex flex-row md:py-[3px] px-12 items-center justify-center text-center text-sm text-white border-[1px] border-solid border-button-stroke"
                                                >
                                                    <div className="font-semibold">Delete</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })}

                            {/* Pagination */}
                            <div className='pagination flex flex-row gap-3 text-orange-500 ml-32 mt-12'>
                                {Array.from({ length: totalPages }, (_, i) => (
                                    <button
                                        key={i}
                                        onClick={() => handlePageChange(i + 1)}
                                        className={currentPage === i + 1 ? 'active' : ''}
                                    >
                                        {i + 1}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
