import { useEffect } from "react";
import { Axios } from "../utils/CustomAxios";
import Repositories from "./Repositories";
import History from "./History";
const MyPage = () =>{
    /**
    const handleButton = ()=>{
        window.location.href = "/repositories";
    }
    */
    const logout = async()=>{
        const accessToken = localStorage.getItem("githubAccessToken")
        await Axios.post("http://localhost:8080/api/v1/auth/logout",{accessToken})
            .then((res)=>{
                console.log(res);
            })
            .catch(error=>{
                console.log(error);
            })

        localStorage.clear("accessToken");
        localStorage.clear("refreshToken");
        localStorage.clear("githubAccessToken");
        window.location.href = "/home";
    }

    useEffect(()=>{
        console.log("hello");
    },[]);

    return (
        <>
        <div style={{ display: 'flex', alignItems: 'center', marginRight: '20px' }}>
            <img src="logo.png" alt="환영합니다" style={{ width: '350px', marginTop: '50px', marginLeft: '50px' }} />
            <button onClick={logout} style={{ position: 'absolute', right: 100, marginTop: '50px', borderRadius: '10px', backgroundColor: '#E96D14', padding: '10px 20px', border: 'none',cursor:'pointer',color: 'white',fontSize: '20px' }}>
                Logout
            </button>
        </div>
        <div style={{ }}>
         <span style={{position: 'absolute', left:'300px', fontSize: '40px', textDecoration: 'underline #E96D14', textUnderlinePosition: 'under', fontWeight: 'bold', fontStyle: 'italic' }}>Repositories</span>
         <span style={{position: 'absolute', right:'300px', fontSize: '40px', textDecoration: 'underline #E96D14', textUnderlinePosition: 'under', fontWeight: 'bold', fontStyle: 'italic' }}>History</span>
        </div>
        <div>
            <Repositories></Repositories>
            <div style={{ position: 'absolute', top: '250px', bottom: '50px', left: '50%', width: '1px', background: 'black' }}></div>
            <History></History>
        </div>
        </>
    )
}

export default MyPage;
