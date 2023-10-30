import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import "./SignUpForm.css";
import { useForm } from 'react-hook-form';

const SignUpForm = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const[isRegistered,setIsRegistered]=useState(false);
  const navigate=useNavigate();

  const onSubmit = async (data) => {
    data.appType = 'music';
    try {
      const response = await fetch('https://academics.newtonschool.co/api/v1/user/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'projectId': 'f104bi07c490',
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
         alert("signup successfull");
        navigate("/login");

        console.log('Signup successful');
      } else {

        setIsRegistered(true);  
        console.error('Signup failed', await response.text());
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };


  return (
    
          <form className='signup' onSubmit={handleSubmit(onSubmit)}>
                <div className='accounts'>
                  Already have an account? <Link to="/login"><button className='login-from-signup-btn'>Login</button></Link>
                </div>

                <div className='signup-form'>
                    <h1 className='welcome-text'>Welcome to JioSaavn.</h1>
                    <p className='signup-text'>Sign up with your email address.</p>
                    <input
                         type="text"
                         placeholder="Name"
                         {...register("name", { required: true, pattern: /^[A-Za-z ]+$/ })}
                    />
                    {errors.name && <p className='error-text'>Name is required and should contain only letters.</p>}
                    <input type='email' 
                           placeholder='Email address'
                           {...register("email", { required: true, pattern: /^\S+@\S+$/i })}
                    />
                     {errors.email && <p className='error-text'>Valid email is required.</p>}

                    <input type='password'
                           placeholder='Password'
                           {...register("password", {
                            required: true,
                            minLength: 8,
                            pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/,
                          })}
                   />
                   {errors.password && <p className='error-text'>Password must be at least 8 characters long, contain at least one lowercase letter, one uppercase letter, one number and one special character.</p>}
                   {isRegistered?<p className='error-text'>User already exist.Please Login.</p>:''}
                  <button type='submit' className='signup-btn'>Continue</button>
                    <p className='para-text'><em>By selecting ‘Continue’, you agree to JioSaavn’s Terms of Service and Privacy Policy.</em></p>
                </div> 
              
         </form>  
  )
}

export default SignUpForm