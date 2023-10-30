import React from 'react'
import Navbar from '../components/Navbar/Navbar'
import LeftSideNavbar from '../components/LeftSideNavbar/LeftSideNavbar'
import SongCategoryLink from '../components/SongCategoryLink/SongCategoryLink'
import SongPage from '../components/SongPage/SongPage'
import NavbarForMobile from '../components/Navbar/NavbarForMobile'
import Footer from '../components/Footer/Footer'
const Artist = () => {
  return (
    <div>
    <Navbar />
    <div className='hero'>
      <div className='left-sideNavbar'>
        <LeftSideNavbar />
      </div>

      <div className='main'>  
          <SongCategoryLink /> 

          <div className='songs'>
             <SongPage
             pageType="Top Artists"
             currentPage={1}
             />
          </div>
          <Footer/>
      </div> 

    
    </div>
    <div className='navbarForMobile'>
         <NavbarForMobile/>
      </div>
  </div>
  )
}

export default Artist