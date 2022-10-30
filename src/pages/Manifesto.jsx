import { useState, useEffect } from 'react'
import { Document, Page, pdfjs } from 'react-pdf';
import { Worker } from '@react-pdf-viewer/core';

// Import the styles
import DMainfesto from '../assets/pdf/manifestos/default.pdf'
import { buildFileURL } from '../utils/helpers';
import { AiOutlineDownload } from 'react-icons/ai'
import client from '../api/client';
import {apiurl} from '../api/data';
import ImageGallery from 'react-image-gallery';
import "react-image-gallery/styles/css/image-gallery.css";

pdfjs.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;
const Manifesto = () => {

    const [manifestoURL, setManifestoURL] = useState(DMainfesto);
    const [manifestImg, setManifestImg] = useState([]);
    const [numPages, setNumPages] = useState(null);
    const [pageNumber, setPageNumber] = useState(1);
    function onDocumentLoadSuccess({ numPages }) {
        setNumPages(numPages);
        setPageNumber(1);
    }

    function changePage(offset) {
        setPageNumber(prevPageNumber => prevPageNumber + offset);
    }

    function previousPage() {
        changePage(-1);
    }

    function nextPage() {
        changePage(1);
    } 
    const getData = async () => {

        const query = await client.records.getFullList('manifestoimg', 50, {
            sort: '-created'
        }).then((resp) => {
            const pageData = resp[0];
            console.log(pageData);
            const manifest = buildFileURL('manifestoimg', pageData?.id, pageData?.manifestpdf);
            const manifestImages = pageData?.image?.map((img) => {return buildFileURL('manifestoimg', pageData?.id, img)});
            console.log(manifestImages);
            setManifestImg(manifestImages);
            pageData?.manifestpdf &&setManifestoURL(manifest);
            console.log(manifestoURL)
            console.log(manifest);
        }).catch((err) => {
            console.error(err)
        })

    }


    useEffect(() => {
        getData();
        return () => {
        }
    }, [])


    return (
        <>
        <Worker workerUrl={`https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.15.349/pdf.worker.min.js`}>
            <div className='w-fullz  px-3 py-2 flex items-center flex-col gap-2'>
                <div className='w-full p-4 bg-blue-500'>
                    <h1 className='text-2xl text-white font-bold'>
                        Manifesto
                    </h1>
                    <p className='text-white tracking-widest'>Our vision for the coming years...</p>
                </div>
                <div className='w-full flex justify-center'>
                    <a href={manifestoURL} className='flex gap-2 py-1 px-3'>
                    <p className='text-blue-500'>Download Manifesto</p>
                    <AiOutlineDownload className='text-2xl text-blue-500' />
                    </a>

                </div>
                <div className='grid grid-cols-1 w-full md:w-2/3 lg:w-1/2 gap-2 divide-y-2 justify-center items-center'>
                    {
                        manifestImg?.map((img) => {
                            return (
                                <div className='w-full p-2 justify-center items-center'>
                                <img src={img} className='w-full h-full' />
                                </div>
                            )
                        })
                    }
                </div>
                <span className='mt-5'></span>
            </div>
            </Worker>
        </>
    )
}

export default Manifesto