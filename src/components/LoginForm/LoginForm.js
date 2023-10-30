import React, { useRef, useState } from 'react';
import "./LoginForm.css";
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';

const LoginForm = () => {

    const { register, handleSubmit, formState: { errors } } = useForm();
    const[inValidPassword,setInValidPassword]=useState(false);
    const navigate=useNavigate();
    

    const onSubmit = async (data) => {
      data.appType = 'music';
      try {
       const response = await fetch('https://academics.newtonschool.co/api/v1/user/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'projectId': 'f104bi07c490',
        },
        body: JSON.stringify(data),
      });
      if (response.ok) {
        const result = await response.json();
        const authToken = result.token;
        const userData=JSON.stringify(result.data)
        localStorage.setItem('authToken', authToken);
        localStorage.setItem('userData', userData);
        
        navigate("/");

      } else {
        setInValidPassword(true);
        console.error('Login failed',await response.text() );
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };
 
 

  return (
    <form className='login'  onSubmit={handleSubmit(onSubmit)}>
            <div className='accounts'>
            Don't have a JioSaavn account yet? <Link to="/signup"><button className='signup-from-loginpage-btn'>Sign Up</button></Link>
            </div>

            <div className='login-form'>
                <h1 className='welcome-text'>Welcome to JioSaavn.</h1>
                <p className='login-text' >Log in or sign up with your email.</p>
                <input type='email'
                       placeholder='Email address'
                       {...register("email", { required: true, pattern: /^\S+@\S+$/i })}
                 />
                 {errors.email && <p className='error-text'>Valid email is required.</p>}
                <input type='password' 
                       placeholder='Password'
                       {...register("password", { required: true })}
                       
                      
                />
                {errors.password && <p className='error-text'>Password is required.</p>}

                {inValidPassword?<p className='error-text' >Enter Valid Password</p>:''}
                <button className='login-btn'>Continue</button>
                <p className='para-text'><em>By selecting ‘Continue’, you agree to JioSaavn’s Terms of Service and Privacy Policy.</em></p>
        
            </div> 
          
     </form>  
  )
}

export default LoginForm