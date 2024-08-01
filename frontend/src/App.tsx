import React, { useContext, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/Header';
import Login from './pages/Login';
import Posts from './pages/Posts';
import Signup from './pages/Signup';
import SinglePost from './pages/SinglePost';
import CreatePost from './pages/CreatePost';
import { AuthContext } from './providers/AuthProvider';

function App() {
  const location = useLocation();
  const hideHeader = location.pathname === '/login' || location.pathname === '/register';
  const { setAuthenticated, setUser } = useContext(AuthContext)
  useEffect(() => {
    if (localStorage.getItem("token") && localStorage.getItem('user')) {
      setAuthenticated(true)
      setUser(JSON.parse(localStorage.getItem('user') || ""))
    }
  }, [])
  return (
    <div className='w-full m-0 p-0'>
      {!hideHeader && <Header />}
      <Routes>
        <Route path='/' element={<Posts />} />
        <Route path='/posts/:postId' element={<SinglePost />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Signup />} />
        <Route path='/create-post' element={<CreatePost />} />
      </Routes>
    </div>
  );
}

export default App;
