import axios from "axios";
import { useEffect } from "react";

const GithubRedirect = () =>{

    const code = new URL(window.location.href).searchParams.get("code");

    useEffect(()=>{
        console.log(code);
        axios.get("http://3.39.11.243:8080/api/auth/login?code="+code, { withCredentials: true })
            .then((res)=>{
                console.log(res.data.accessToken);
                console.log(res.data);
                //localStorage.setItem("githubAccessToken",res.data.result.githubAccessToken);
                localStorage.setItem("accessToken",res.data.accessToken);
                localStorage.setItem("refreshToken",res.data.refreshToken);
                window.location.href = "/mypage";
            })
    },[])
}

export default GithubRedirect;