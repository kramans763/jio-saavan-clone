import React from 'react'
import Navbar from '../components/Navbar/Navbar';
import LeftSideNavbar from '../components/LeftSideNavbar/LeftSideNavbar';

import SongCategoryLink from '../components/SongCategoryLink/SongCategoryLink';
import SongPage from '../components/SongPage/SongPage';


const NewRealese = () => {
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
                 pageType="New Songs"
              />
        </div>

       
        
      </div>
    </div>
  )
}

export default NewRealese