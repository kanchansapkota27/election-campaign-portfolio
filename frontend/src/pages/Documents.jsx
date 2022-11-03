import { useState, useEffect } from 'react'
import { Document, Page, pdfjs } from 'react-pdf';

// Import the styles
import { buildFileURL } from '../utils/helpers';
import { AiOutlineDownload } from 'react-icons/ai'
import client from '../api/client';
import { apiurl } from '../api/data';

pdfjs.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;
const Documents = () => {

    const [currdocURL, setcurrdocURL] = useState('');
    const [docs, setDocsData] = useState([]);
    const [numPages, setNumPages] = useState(null);
    const [pageNumber, setPageNumber] = useState(1);

    const getTitleFromURL = (url) => {
        const item = docs.find(elem => elem.url === url);
        return item?.title;
    }

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

        const query = await client.records.getFullList('documents', 50, {
            sort: '-created'
        }).then((resp) => {
            const docsData = resp;
            const mappedData = docsData.map((doc) => { return { title: doc?.title, url: buildFileURL('documents', doc?.id, doc?.file) } });
            setDocsData(mappedData);
            setcurrdocURL(mappedData[0]?.url);
            console.log(mappedData);
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
            <div className='w-fullz  px-3 py-2 flex items-center flex-col gap-2'>
                <div className='w-full p-4 bg-blue-500'>
                    <h1 className='text-2xl text-white font-bold'>
                        Documents
                    </h1>
                    <p className='text-white tracking-widest'>Browse through our documnets.</p>
                </div>
                <div className='my-2 flex w-full p-2 bg-red-200 gap-3 items-center'>
                    <label htmlFor='document' className='font-semibold'>Documents</label>
                    <select name='document' className='p-2 shadow-sm outline outline-1 rounded' onChange={e => { console.log(e); setcurrdocURL(e.target.value) }}>
                        {
                            docs.map((doc) => {
                                return <option value={doc?.url}>{doc?.title}</option>
                            })
                        }
                    </select>
                </div>

                <div className='w-full flex justify-center'>
                    <a href={currdocURL && currdocURL} className='flex gap-2 py-1 px-3'>
                        <p className='text-blue-500'>Download</p>
                        <AiOutlineDownload className='text-2xl text-blue-500' />
                    </a>

                </div>
                <div className='grid grid-cols-1 w-full md:w-2/3 lg:w-1/2 gap-2 divide-y-2 justify-center items-center'>
                    <div className='w-full shadow-md p-2 gap-4 flex justify-center items-center max-h-full'>
                        <button onClick={previousPage} disabled={pageNumber <= 1} className='shadow-md p-2'>{'<<'}</button>
                        <p className='shadow-sm w-full p-2 text-center'>Page {pageNumber || (numPages ? 1 : '--')} of {numPages || '--'}</p>
                        <button onClick={nextPage} disabled={pageNumber >= numPages} className='shadow-md p-2'>{'>>'}</button>
                    </div>

                    <Document file={currdocURL} onLoadSuccess={onDocumentLoadSuccess} className='w-full flex justify-center outline outline-1'>
                        <Page pageNumber={pageNumber} />
                    </Document>
                    <div className='w-full shadow-md p-2 gap-4 flex justify-center items-center'>
                        <button onClick={previousPage} disabled={pageNumber <= 1} className='shadow-md p-2'>{'<<'}</button>
                        <p className='shadow-sm w-full p-2 text-center'>Page {pageNumber || (numPages ? 1 : '--')} of {numPages || '--'}</p>
                        <button onClick={nextPage} disabled={pageNumber >= numPages} className='shadow-md p-2'>{'>>'}</button>
                    </div>

                </div>
                <span className='mt-5'></span>
            </div>
        </>
    )
}

export default Documents;