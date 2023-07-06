import { useSelector } from 'react-redux';
import Spinner from './component/spinner';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ProtectedPage from './component/protectedPage';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import NotFound from './component/notFound';
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
        <Route path="*" element={<NotFound />} />
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
