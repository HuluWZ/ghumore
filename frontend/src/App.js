import { useSelector } from 'react-redux';
import Spinner from './component/spinner';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ProtectedPage from './component/protectedPage';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import NotFound from './component/notFound';
import ProfileModal from './component/ProfileModal';
import Profile from './pages/Profile/Profile';
import Search from './pages/Search';
function App() {
  const { loading }  = useSelector(state => state.loaders)
  return (
    <div>
      {loading && <Spinner/>}
      <BrowserRouter>
      <Routes>
        <Route path='/' element={<ProtectedPage><Home/> </ProtectedPage>}/>
        <Route path='/login' element={<ProtectedPage><Login/> </ProtectedPage>}/>
        <Route path='/register' element={<ProtectedPage><Register/> </ProtectedPage>}/>
        <Route path='/profile' element={<ProtectedPage><Profile/> </ProtectedPage>}/>
        <Route path='/search/:location?/:activity?' element={<ProtectedPage><Search/> </ProtectedPage>}/>
        <Route path="*" element={<ProtectedPage><NotFound /></ProtectedPage> } />
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
