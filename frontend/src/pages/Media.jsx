import { useState, useEffect, useMemo } from 'react'
import { date_to_nepali } from '../utils/helpers';
import client from '../api/client';
import { useLinkPreview } from "get-link-preview";



const LinkCard = ({ link }) => {
    const { getLinkPreviewData, loading, error, data } = useLinkPreview(link);
    return (
        loading ? <div className='p-2 rounded'>Loading...</div> :
            data ?
                <a href={link} class="w-full lg:w-2/3 p-3 ">
                    <div class="flex flex-col lg:flex-row rounded h-auto lg:h-42 border shadow-lg overflow-clip hover:shadow-blue-400 hover:shadow-md">
                        <img class="block w-full lg:w-48 flex-none bg-cover h-auto" src={data?.image}/>
                            <div class="bg-white rounded-b lg:rounded-b-none lg:rounded-r p-4 flex flex-col justify-between leading-normal w-full">
                                <div class="text-black font-bold text-xl mb-2 leading-tight">{data?.title}</div>
                                <p class="text-grey-darker line-clamp-2 text-base prose-xl">{data?.description}</p>
                            </div>
                    </div>
                </a> :
                <></>
    )
}


const Events = () => {

    const [events, setEvents] = useState([]);



    const getEvents = () => {
        const query = client.records.getFullList('news', 20, {
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
            <div className='w-full px-3 py-2 flex items-center flex-col gap-2'>
                <div className='w-full p-4 bg-blue-500'>
                    <h1 className='text-2xl text-white font-bold'>
                        Media
                    </h1>
                    <p className='text-white tracking-widest'>Recent news and events.</p>
                </div>
                <div className='w-full flex flex-wrap justify-center   gap-3 mt-3'>
                    {
                        events?.map((event) => {
                            return (
                                <LinkCard link={event?.link} />
                            )
                        })
                    }
                </div>
            </div>

        </>
    )
}

export default Events