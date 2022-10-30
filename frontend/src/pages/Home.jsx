import {useEffect,useState} from 'react'
import { buildFileURL } from '../utils/helpers';
import FallBackMain from '../assets/images/homepage/KBP-nobg.png'
import { heroSection } from '../data/homepage';
import NepalBg from '../assets/images/flag-nepal.jpg'
import client from '../api/client';


const Home = () => {
    
    //const client= new PocketBase(import.meta.env.VITE_POCKETBASE_URL);
    const [mainImage,setMainImage]=useState(FallBackMain);
    const [data, setData] = useState(heroSection);

    const getData=()=>{
        const query = client.records.getFullList('homeinfo',1,{
            sort: '-created'
        }).then((resp)=>{
            const pageData=resp[0];
            const img=buildFileURL('homeinfo',pageData?.id,pageData?.mainImage);
            setData(pageData)
            setMainImage(img)
        })

    }

    useEffect(() => {
        getData();
        console.log(data)
    }, [])


  return (
    <>
    <div className='w-full h-full grid grid-cols-1 md:gap-1 lg:grid-cols-2'>
        <div className='flex h-full items-end justify-center bg-homeBg bg-cover bg-blend-overlay overflow-clip bg-gray-700'>
            <img src={mainImage} className='md:w-auto bg-clip-content '/>
        </div>
        <div className='flex flex-col gap-2 justify-center items-center px-4 py-3'>
            <p className='text-lg md:text-4xl text-gray-500 self-start '>
                {data?.preMainText}
            </p>
            <h1 className='text-4xl prose prose-xl md:text-6xl'>
                {data?.mainText}
            </h1>
            <p className='text-lg'>
                {data?.postMainText}
            </p>
        </div>

    </div>
    </>
  )
}

export default Home