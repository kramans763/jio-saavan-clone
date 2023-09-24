import React from 'react'
import "./SignUpPage.css";
import avtar from "../Assets/aman.jpeg";
import SignUpForm from '../components/SignUpForm/SignUpForm';

const SignUpPage = () => {
  return (
    <div className='signup-container'>
        <div className='left-signup'>
            <div className='logo-container'>
              <img className="logo-img" src='https://www.apkvisit.com/wp-content/uploads/2022/09/jiosaavn-music-podcasts.png' alt='logo' />
              <p className='logo-name'>JioSaavn</p>
            </div>
            <div className='avatar-container'>
                <img className='avatar'src={avtar} alt='avtar'/>
                <h2 className='avatar-text'>All Your Music.</h2>
                <p className='avatar-text-style'><em>Anytime, anywhere.</em></p>
            </div>
        </div>
        <div className='right-signup'>
            <SignUpForm/>
        </div>
        
    </div>
  )
}

export default SignUpPage