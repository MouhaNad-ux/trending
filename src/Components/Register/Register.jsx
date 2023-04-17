import axios from 'axios'
import { useFormik } from 'formik'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import * as Yup from 'yup'

export default function Register() {

  const [error,setError]= useState('');
  const [loading,setLoading]=useState(false);
  const navigate = useNavigate();
  let validate = Yup.object({
    name:Yup.string().required("Name is required").min(3, 'minimum name 3 charcters long').max(15, 'maximum name 3 charcters long'),
    email:Yup.string().required("Email is required").email( "Email invalid"),
    password:Yup.string().required("Password is required").matches(/^[A-Z][a-z0-9]{5,10}$/, "Password must start with Capital letter followed by at least 5 charcters or numbers"),
    rePassword:Yup.string().required("Repassword is required").oneOf([Yup.ref('password')], "repassword dosen't match"),
    phone:Yup.string().required("Phone is required").matches(/^01[0125][0-9]{8}$/, "Invalid Phone Number"),
  })

  let formik = useFormik({
    initialValues:{
      name:"",
      email:"",
      password:"",
      rePassword:"",
      phone:"",
    },validationSchema:validate,
    onSubmit:sendRegisterData
  })


  async function sendRegisterData(values){
    setLoading(true);
    let {data} =await axios.post('https://route-ecommerce.onrender.com/api/v1/auth/signup',values).catch((err)=> {
      setError(err.response.data.errors.param +": "+ err.response.data.errors.msg);
      setLoading(false);
    })
    if(data.message === 'success'){
    // console.log(data.message);
      navigate('/login')
    setLoading(false);

    }
  }

  return (
    <div className='w-75 mx-auto py-5'>
      <h2>Register</h2> 
      <form onSubmit={formik.handleSubmit}>

      {error?<div className='alert alert-danger'>{error}</div>:""}


        <label htmlFor="name">Name</label>
        <input type="text" id='name' value={formik.values.name} name='name' onChange={formik.handleChange} onBlur={formik.handleBlur} className='form-control my-2'/>
        {formik.errors.name && formik.touched.name?<div className='alert alert-danger'>{formik.errors.name}</div>:"" }

        <label htmlFor="email">Email</label>
        <input type="email" id='email' value={formik.values.email} name='email' onChange={formik.handleChange} onBlur={formik.handleBlur} className='form-control my-2'/> 
        {formik.errors.email && formik.touched.email?<div className='alert alert-danger'>{formik.errors.email}</div>:"" }


        <label htmlFor="password">Password</label>
        <input type="password" id='password' value={formik.values.password} name='password' onChange={formik.handleChange} onBlur={formik.handleBlur} className='form-control my-2'/> 
        {formik.errors.password && formik.touched.password?<div className='alert alert-danger'>{formik.errors.password}</div>:"" }

        <label htmlFor="rePassword">rePassword</label>
        <input type="password" id='rePassword' value={formik.values.rePassword} name='rePassword' onChange={formik.handleChange} onBlur={formik.handleBlur} className='form-control my-2'/> 
        {formik.errors.rePassword && formik.touched.rePassword?<div className='alert alert-danger'>{formik.errors.rePassword}</div>:"" }

        <label htmlFor="phone">Phone</label>
        <input type="tel" id='phone' value={formik.values.phone} name='phone' onChange={formik.handleChange} onBlur={formik.handleBlur} className='form-control my-2'/> 
        {formik.errors.phone && formik.touched.phone?<div className='alert alert-danger'>{formik.errors.phone}</div>:"" }

        <button type='submit' className='btn btn-info'>{loading?<i className='fa fa-spinner fa-spin'></i>:"Register"}</button>
      </form>
    </div>
  )
}
