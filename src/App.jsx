import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import authService from './appwrite/auth';
import { login, logout } from './store/authSlice';
import { Outlet } from 'react-router-dom';
import { Header, Footer } from './components';


const App = () => {
const [loading, setLoading] = useState(true);
const dispatch = useDispatch();

useEffect(() => {
  authService.getCurrentUser()
  .then((userData) =>{
    if(userData){
      dispatch(login({userData}))
    }
    else{
      dispatch(logout())
    }
  } ).finally(() => setLoading(false))
}, [dispatch])


  return !loading? (
    <div className='min-h-screen flex flex-wrap content-between bg-[#843618] dark:bg-gray-800'>
      <div className='w-full block'>
        <Header/>
        <main>
          <Outlet/>
          
        </main>
          <Footer/>
      </div>

    </div>

  ): null
}

export default App
