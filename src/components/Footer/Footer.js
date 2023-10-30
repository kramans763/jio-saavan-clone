import React from 'react'
import "./Footer.css"
const Footer = () => {
  return (
    <div className='footer'>
        <div className='footer-left'>
            <p>© 2023 Saavn Media Limited All rights reserved.</p>
        </div>
        <div className='footer-right'>
            <p>Follow us</p>
            <a href='https://www.facebook.com/JioSaavn'><i class="fa-brands fa-facebook"></i></a>
            <a href='https://twitter.com/JioSaavn'><i class="fa-brands fa-twitter"></i></a>
            <a href='https://www.youtube.com/c/JioSaavn'><i class="fa-brands fa-youtube"></i></a>
            <a href='https://www.instagram.com/jiosaavn/'><i class="fa-brands fa-instagram"></i></a>
            <a href='https://www.linkedin.com/company/jio-saavn/'><i class="fa-brands fa-linkedin"></i></a>
        </div>
    </div>
  )
}

export default Footer