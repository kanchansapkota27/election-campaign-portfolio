import {useState,useEffect} from 'react'
import KBP from '../assets/images/KBP.jpg'
import { buildFileURL } from '../utils/helpers';
import { AiOutlineTwitter, AiFillFacebook, AiFillMail, AiFillPhone } from 'react-icons/ai'
import {HiLocationMarker} from 'react-icons/hi'
import { FaWikipediaW } from 'react-icons/fa'
import { aboutSection } from '../data/homepage';
import client from '../api/client';

const About = () => {

    const [mainImage,setMainImage]=useState(KBP);
    const [data, setData] = useState('');

    const getData=()=>{
        const query = client.records.getFullList('about',1,{
            sort: '-created'
        }).then((resp)=>{
            const pageData=resp[0];
            const img=buildFileURL('about',pageData?.id,pageData?.image);
            setData(pageData);
            pageData?.image && setMainImage(img);
        })

    }

    useEffect(() => {
        getData();
        console.log(data)
    }, [])



    return (
        <>
            <div className='w-full px-3 py-2 flex items-center flex-col gap-2'>
                <div className='w-full p-4 bg-blue-500'>
                    <h1 className='text-2xl text-white font-bold'>
                        About
                    </h1>
                    <p className='text-white tracking-widest'>Know me and my life's story</p>
                </div>
                <div className='w-full h-full grid grid-cols-1 lg:grid-cols-5  justify-center items-center gap-3'>
                    <div className='col-span-2 h-full w-full flex justify-center p-2 bg-red-2 gap-2 bg-blue-100'>
                        <div className='flex flex-col items-center justify-center px-2 py-1 space-y-4 gap-4'>
                            <span>
                                {/* <a href=''>
                                <AiOutlineTwitter className='cursor-pointer hover:text-blue-500' size={24}/>
                                </a> */}
                            </span>
                            <span>
                                <a href='https://www.facebook.com/vote4krishnabhakta'>
                                    <AiFillFacebook className='cursor-pointer hover:text-blue-700' size={24} />
                                </a>
                            </span>
                            <span>
                                <a href='mailto:kbp3nepal@gmail.com'>
                                    <AiFillMail className='cursor-pointer hover:text-orange-500' size={24} />
                                </a>
                            </span>
                            <span>
                                <a href='tel:+91-9855055995'>
                                    <AiFillPhone className='cursor-pointer hover:text-emerald-500' size={24} />
                                </a>
                            </span>
                            <span>
                                <a href='https://en.wikipedia.org/w/index.php?title=Krishna_Bhakta_Pokhrel' target='_blank'>
                                    <FaWikipediaW className='cursor-pointer hover:text-gray-400' size={24} />
                                </a>
                            </span>
                            <span>
                                <a href='https://goo.gl/maps/vFLmNEWFfqKCCgai8' target='_blank'>
                                    <HiLocationMarker className='cursor-pointer hover:text-red-600' size={24} />
                                </a>
                            </span>
                        </div>
                        <img src={mainImage} className='w-2/3 rounded shadow-xl aspect-auto' />
                    </div>
                    <div className='col-span-3 h-full text-justify tracking-wider space-y-4 px-3'>
                        <div className='text-left mt-2'>
                        <h2 className='text-xl md:text-4xl font-montserrat font-semibold tracking-wide'>{data?.title}</h2>
                        <h3 className='text-base md:text-lg font-[500]'><i>{data?.subtitle}</i></h3>
                        </div>
                        <p >
                            {
                                data?.intro ? data?.intro : aboutSection?.introtext
                            }
                        </p>
                        <p>
                            {
                                data?.main ? data?.main : aboutSection?.maintext
                            }
                        </p>
                        <p>
                            {
                                data?.final ? data?.final : aboutSection?.finaltext
                            }
                        </p>
                        <p>
                            <p className='font-semibold '>Education and Credentials</p>
                            <p className='ml-2'><span className='font-[500]'>Bachelor's in Law: </span>Nepal Law Campus, Kathmandu, Nepal</p>
                        </p>
                    </div>

                </div>
            </div>
        </>
    )
}

export default About