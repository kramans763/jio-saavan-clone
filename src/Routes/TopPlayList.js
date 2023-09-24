import React from 'react'
import Navbar from '../components/Navbar/Navbar'
import LeftSideNavbar from '../components/LeftSideNavbar/LeftSideNavbar'
import SongCategoryLink from '../components/SongCategoryLink/SongCategoryLink'
import SongPage from '../components/SongPage/SongPage'

const TopPlayList = () => {
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
           pageType="Top PlayList"
           />
      </div> 
    
    </div>
  </div>
  )
}

export default TopPlayList