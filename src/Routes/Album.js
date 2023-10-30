import React from 'react'
import Navbar from '../components/Navbar/Navbar'
import LeftSideNavbar from '../components/LeftSideNavbar/LeftSideNavbar'
import SongCategoryLink from '../components/SongCategoryLink/SongCategoryLink'
import NavbarForMobile from '../components/Navbar/NavbarForMobile'
import SongPage from '../components/SongPage/SongPage'

const Album = () => {
  return (
    <div>
        <Navbar />
      <div className='hero'>
        <div className='left-sideNavbar'>
            <LeftSideNavbar />
        </div>

        <div className='main'>  
              <SongCategoryLink />
              <SongPage 
                 pageType="Albums"
                 currentPage={1}
                 
              />
        </div>
        
      </div>
      <div className='navbarForMobile'>
         <NavbarForMobile/>
      </div>
    </div>
  )
}

export default Album