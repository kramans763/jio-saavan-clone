// import React, { useEffect, useState } from 'react'
// import "./Search.css";
// import SongPage from '../components/SongPage/SongPage';
// import { useLocation } from 'react-router-dom';
// const Search = () => {
//   const location = useLocation();
//   const { searchValue } = location.state || {};
//   console.log("serchhhhhhhh", searchValue);
    
//     const [searchResult, setSearchResult] = useState([]);
    
//     const handleSearch = () => {
//         fetch(`https://academics.newtonschool.co/api/v1/music/song?filter={"title":"${searchValue}"}`, {
//           headers: {
//             'projectID': 'f104bi07c490'
//           }
//         })
//           .then(response => response.json())
//           .then(data => {
//             console.log("search result", data);
//             setSearchResult(data);
          
//           })
//           .catch(error => {
//             console.error('Error fetching data: ', error);
//           });
//       };
//   useEffect(()=>{
//     handleSearch();
//   },[searchValue])

   

//   return (
//     <div>
        
          
//     </div>
//   )
// }

// export default Search