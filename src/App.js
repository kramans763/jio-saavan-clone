import './App.css';
import { Route,Routes } from 'react-router-dom';
import Home from './Routes/Home';
import SignUpPage from './Routes/SignUpPage';
import NewRelease from './Routes/NewRelease';
import LoginPage from './Routes/LoginPage';
import MyProfile from './Routes/MyProfile';
import TopCharts from './Routes/TopCharts';
import TopPlayList from './Routes/TopPlayList';
import Podcast from './Routes/Podcast';
import Radio from './Routes/Radio';
import Artist from './Routes/Artist';
import MusicPlayer from './components/MusicPlayer/MusicPlayer';
import Search from './Routes/Search';
import Mood from './Routes/Mood';
import UnderConstruction from './Routes/UnderConstruction';
import Album from './Routes/Album';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<Home/>}></Route>
        <Route path='/signup' element={<SignUpPage/>}></Route>
        <Route path='/newrelease' element={<NewRelease/>}></Route>
        <Route path='/login' element={<LoginPage/>}></Route>
        <Route path='/songplay' element={<MusicPlayer/>}></Route>
        <Route path='/me' element={<MyProfile/>}></Route>
        <Route path='/charts' element={<TopCharts/>}></Route>
        <Route path='/playlist' element={<TopPlayList/>}></Route>
        <Route path='/podcast' element={<Podcast/>}></Route>
        <Route path='/radio' element={<Radio/>}></Route>
        <Route path='/artist' element={<Artist/>}></Route>
        <Route path='/mood' element={<Mood/>}></Route>
        <Route path='/underconstruction' element={<UnderConstruction/>}></Route>
        <Route path='/album' element={<Album/>}></Route>

      </Routes>
    
    </div>
  );
}

export default App;
