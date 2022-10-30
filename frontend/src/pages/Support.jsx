import { useState, useEffect } from 'react'
import { Formik, Field, Form } from 'formik';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import client from '../api/client';

const Support = () => {



    const notifySuccess = () => toast.success("Thank you for your support!");
    const notifyFailure = () => toast.error("Something went wrong. Please try again later.");

    const submitForm = async (values) => {
       
        client.records.create('jointeam', values).then((resp) => {
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
                        Join The Team
                    </h1>
                    <p className='text-white tracking-widest'>Support our team as a volunteer.</p>
                </div>
                <div className='w-full flex justify-center gap-3'>
                    <Formik initialValues={{
                        name:'',
                        email:'',
                        phone:'',
                        address:'',
                    }}
                    onSubmit={(values,{resetForm})=>{submitForm(values);resetForm()}}
                    >
                    <div className='w-full md:w-2/3 lg:w-1/3 mt-5 mb-3 px-5 py-4 bg-blue-500 rounded'>
                    <ToastContainer/>
                    <Form className='flex flex-col gap-3 w-full'>
                        <div className='flex flex-col gap-1'>
                        <label className='text-white font-semibold' htmlFor='name'>Name</label>
                        <Field className='p-2 rounded appearance-none' name='name' type='text' placeholder='Full Name' required />
                        </div>
                        <div className='flex flex-col gap-1'>
                        <label className='text-white font-semibold' htmlFor='email'>Email</label>
                        <Field className='p-2 rounded appearance-none' name='email' type='email' placeholder='Contact Email' required />
                        </div>
                        <div className='flex flex-col gap-1'>
                        <label className='text-white font-semibold' htmlFor='phone'>Phone</label>
                        <Field className='p-2 rounded appearance-none' name='phone' type='tel' placeholder='Mobile Phone Number' required />
                        </div>
                        <div className='flex flex-col gap-1'>
                        <label className='text-white font-semibold' htmlFor='address'>Address</label>
                        <Field className='p-2 rounded appearance-none' name='address' type='text' placeholder='Full Address' required />
                        </div>
                        <div className='flex flex-col gap-1 mt-3'>
                            <button type='submit' className='p-2 outline outline-1 outline-red-400 rounded bg-white text-blue-400 hover:text-white hover:bg-red-400 font-semibold'>Join Us</button>
                        </div>
                    </Form>
                    </div>
                    </Formik>
                </div>
            </div>
        </>
    )
}

export default Support