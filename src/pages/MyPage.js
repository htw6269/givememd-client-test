import { useEffect } from "react";
import { Axios } from "../utils/CustomAxios";
import Repositories from "./Repositories";
import History from "./History";
const MyPage = () =>{
    const logout = async () => {
        try {
            const accessToken = localStorage.getItem("githubAccessToken");
            await Axios.delete("http://3.39.11.243:8080/api/auth", {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            });
            console.log("Logout successful");
            // Clear tokens from local storage
            localStorage.removeItem("accessToken");
            localStorage.removeItem("refreshToken");
            localStorage.removeItem("githubAccessToken");
            // Redirect to login page or any other desired location
            window.location.href = "/";
        } catch (error) {
            console.log("Logout failed:", error);
        }
    };
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
        <div style={{ display: 'flex', alignItems: 'center', margin: '0 300px', position: 'relative', height: '60px' }}>
            <span style={{position: 'absolute', left: 0, fontSize: '40px', textDecoration: 'underline #E96D14', textUnderlinePosition: 'under', fontWeight: 'bold', fontStyle: 'italic' }}>Repositories</span>
            <span style={{position: 'absolute', right: 0, fontSize: '40px', textDecoration: 'underline #E96D14', textUnderlinePosition: 'under', fontWeight: 'bold', fontStyle: 'italic' }}>History</span>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', position: 'relative' }}>
            <Repositories />
            <div class="vertical-line"></div>
            <History />
        </div>
        </>
    )
}          

export default MyPage;
