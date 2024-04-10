import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import GithubRedirect from './pages/GithubRedirect';
import MyPage from './pages/MyPage';
import Repositories from './pages/Repositories';
import RepositoryDetail from './pages/RepositoryDetail';
import Result from './pages/Result'
import { useEffect, useState } from 'react';

function App() {

  const [login,setLogin] = useState([]);

  useEffect(()=>{
    if(localStorage.getItem("accessToken")){
      setLogin(true);
    }else{
      setLogin(false);
    }
},[]);

  return (
      <BrowserRouter>
        <Routes>

          <Route path="/" element={<Home/>}></Route>
          <Route path="/result" element={<Result/>}></Route>
          <Route path="/redirect" element={<GithubRedirect/>}></Route>
          <Route path="/mypage" element={<MyPage/>}></Route>
          <Route path="/repositories" element={<Repositories/>}></Route>
          <Route path="/repository/:name" element={<RepositoryDetail/>}></Route>
        </Routes>
      </BrowserRouter>
  );
}

export default App;
