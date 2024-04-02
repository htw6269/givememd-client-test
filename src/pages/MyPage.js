import { useEffect } from "react";
import { Axios } from "../utils/CustomAxios";

const MyPage = () =>{
    const handleButton = ()=>{
        window.location.href = "/repositories";
    }

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
        <h1>MyPage</h1>
        <div>
            <button onClick={handleButton}>
                리포지토리 목록
            </button>
            <button onClick={logout}>
                로그아웃
            </button>
        </div>
        </>
    )
}

export default MyPage;