import {useState,useEffect} from 'react'
import PocketBase from 'pocketbase/cjs';
import {HiOutlineLocationMarker} from 'react-icons/hi'
import {BsCalendarDate,BsClock} from 'react-icons/bs'
import { date_to_nepali } from '../utils/helpers';
import client from '../api/client';


const Events = () => {

    const [events,setEvents]=useState([]);


    const processDate = (date) => {
        const rawdate=new Date(date);
        const conv=date_to_nepali(rawdate);
        return conv;
       
    }

    const getEvents=()=>{
        const query = client.records.getFullList('events', 50, {
            sort: '-date'
        }).then((resp) => {
            const pageData = resp;
            setEvents(pageData);
        }).catch((err) => {
            console.error(err)
        })
    }

    useEffect(() => {
        getEvents();
        return () => {
        }
    }, [])



    return (
        <>
            <div className='w-fullz  px-3 py-2 flex items-center flex-col gap-2'>
                <div className='w-full p-4 bg-blue-500'>
                    <h1 className='text-2xl text-white font-bold'>
                        Events
                    </h1>
                    <p className='text-white tracking-widest'>Upcoming and completed campaign events.</p>
                </div>
                <div className='w-full flex justify-center gap-3 mt-3'>
                    {
                        events?.map((event)=>{
                            return(
                                <div className='w-full lg:w-2/3 gap-3 rounded p-2 bg-white shadow-md flex border-l-4 border-blue-500'>
                                    <div className='w-full flex flex-col h-full justify-center  space-y-2'>
                                        <h1 className='text-base font-semibold'>{event?.title}</h1>
                                        <p className='text-sm prose-slate line-clamp-6 md:line-clamp-4 text-justify'>{event?.description}</p>
                                        <span className='flex flex-wrap space-x-3'>
                                            <HiOutlineLocationMarker className='text-xl text-blue-500' />
                                            <p className='text-sm'>{event?.location}</p>
                                        </span>
                                        <span className='flex flex-wrap space-x-3 md:hidden'>
                                            <BsCalendarDate className='text-xl text-blue-500' />
                                            <p className='text-sm'>{processDate(event?.date).formattedDate}</p>
                                        </span>
                                        <span className='flex flex-wrap space-x-3 '>
                                            <BsClock className='text-xl text-blue-500' />
                                            <p className='text-sm'>{event?.time}</p>
                                        </span>


                                    </div>
                                    <div className='p-1 hidden md:flex ml-2 flex-col justify-center items-center bg-red-400 px-4 overflow-clip'>
                                            <h2 className='font-bold text-lg text-white'>{processDate(event?.date).dayname}</h2>
                                            <h2 className='font-bold text-lg text-white'>{processDate(event?.date).day}</h2>
                                            <h2 className='font-bold whitespace-nowrap text-lg text-white'>{processDate(event?.date).monthname}</h2>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
            </div>

        </>
    )
}

export default Events