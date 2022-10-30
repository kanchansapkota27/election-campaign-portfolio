import { Formik, Field, Form } from 'formik';
import client from '../api/client';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const municipalities=[
    'Bharatpur',
    'Ichchhakamana',
    'Kalika'
]
const wards={
    Bharatpur:[1,2,3,4,5,7,10,11,12,29],
    Ichchhakamana:[1,2,3,4,5,6,7],
    Kalika:[1,2,3,4,5,6,7,8,9,10]

}



const Contact = () => {





    const notifySuccess = () => toast.success("Thank you for letting us know support!");
    const notifyFailure = () => toast.error("Something went wrong. Please try again later.");

    const submitForm = async (values) => {
       console.log(values); 
       client.records.create('complains', values).then((resp) => {
            notifySuccess();
        }).catch((err) => {
            console.error(err)
            notifyFailure();
        });
      
    }


    return (
        <>
            <div className='w-fullz  px-3 py-2 flex items-center flex-col gap-2'>
                <div className='w-full p-4 bg-blue-500'>
                    <h1 className='text-2xl text-white font-bold'>
                        Contact Us
                    </h1>
                    <p className='text-white tracking-widest'>Let us know about your problems.</p>
                </div>
                <div className='w-full flex justify-center gap-3'>
                    <Formik initialValues={{
                        complainer: '',
                        contact_number: '',
                        ward:1,
                        municipality:municipalities[0],
                        locality:'',
                        complain:''
                    }}
                        onSubmit={(values, { resetForm }) => { submitForm(values); resetForm() }}
                    >
                        <div className='w-full md:w-2/3 lg:w-1/3 mt-5 mb-3 px-5 py-4 bg-blue-500 rounded'>
                            <ToastContainer />
                            <Form className='flex flex-col gap-3 w-full'>
                                <div className='flex flex-col gap-1'>
                                    <label className='text-white font-semibold' htmlFor='complainer'>Name</label>
                                    <Field className='p-2 rounded appearance-none' name='complainer' type='text' placeholder='Full Name' required />
                                </div>
                                <div className='flex flex-col gap-1'>
                                    <label className='text-white font-semibold' htmlFor='contact_number'>Phone</label>
                                    <Field className='p-2 rounded appearance-none' name='contact_number' type='tel' placeholder='Mobile Phone Number' />
                                </div>
                                <div className='flex flex-col gap-1'>
                                    <label className='text-white font-semibold' htmlFor='municipality'>Municipality</label>
                                    <Field className='p-2 rounded appearance-none' as='select' name='municipality'>
                                        {
                                            municipalities.map((option)=>(
                                                <option value={option}>{option}</option>
                                            ))
                                        }
                                    </Field>
                                </div>
                                <div className='flex flex-col gap-1'>
                                    <label className='text-white font-semibold' htmlFor='ward'>Ward Number</label>
                                    <Field className='p-2 rounded appearance-none' name='ward' type='number' placeholder='Ward Number' min={1} max={29}/>
                                </div>

                                <div className='flex flex-col gap-1'>
                                    <label className='text-white font-semibold' htmlFor='loaclity'>Locality</label>
                                    <Field className='p-2 rounded appearance-none' name='locality' type='text' placeholder='Local Address' required />
                                </div>

                                <div className='flex flex-col gap-1'>
                                    <label className='text-white font-semibold' htmlFor='complain'>Description</label>
                                    <Field as='textarea' className='p-2 rounded appearance-none' name='complain' type='text' placeholder='Problem Description' />
                                </div>
                                <div className='flex flex-col gap-1 mt-3'>
                                    <button type='submit' className='p-2 outline outline-1 outline-red-400 rounded bg-white text-blue-400 hover:text-white hover:bg-red-400 font-semibold'>Submit</button>
                                </div>
                            </Form>
                        </div>
                    </Formik>
                </div>
            </div>
        </>
    )
}

export default Contact