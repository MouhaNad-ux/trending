import axios from 'axios'
import { useFormik } from 'formik'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import * as Yup from 'yup'


export default function Login({saveUserData}) {

  const [error,setError]= useState('');
  const [loading,setLoading]=useState(false);
  const navigate = useNavigate();


  let validate = Yup.object({
    email:Yup.string().required("Email is required").email( "Email invalid"),
    password:Yup.string().required("Password is required").matches(/^[A-Z][a-z0-9]{5,10}$/, "Password must start with Capital letter followed by at least 5 charcters or numbers"),
  })

  let formik = useFormik({
    initialValues:{
      email:"",
      password:"",
    },validationSchema:validate,
    onSubmit:sendLoginData
  })


  async function sendLoginData(values){
    setLoading(true);
    let {data} =await axios.post('https://route-ecommerce.onrender.com/api/v1/auth/signin',values).catch((err)=> {
      setError(err.response.data.errors.param +": "+ err.response.data.message);
      setLoading(false);
    })
    // console.log(data);
    if(data.message === 'success'){
    localStorage.setItem("userToken",data.token)
    saveUserData( )
    navigate("/home")
    setLoading(false);

    }
  }

  return (
    <div className='w-75 mx-auto py-5'>
      <h2 className='text-info'>Login Now</h2> 
      <form onSubmit={formik.handleSubmit}>

      {error?<div className='alert alert-danger'>{error}</div>:""}




        <label htmlFor="email">Email</label>
        <input type="email" id='email' value={formik.values.email} name='email' onChange={formik.handleChange} onBlur={formik.handleBlur} className='form-control my-2'/> 
        {formik.errors.email && formik.touched.email?<div className='alert alert-danger'>{formik.errors.email}</div>:"" }


        <label htmlFor="password">Password</label>
        <input type="password" id='password' value={formik.values.password} name='password' onChange={formik.handleChange} onBlur={formik.handleBlur} className='form-control my-2'/> 
        {formik.errors.password && formik.touched.password?<div className='alert alert-danger'>{formik.errors.password}</div>:"" }



        <button type='submit' className='btn btn-info'>{loading?<i className='fa fa-spinner fa-spin'></i>:"Login"}</button>
      </form>
    </div>
  )
}
