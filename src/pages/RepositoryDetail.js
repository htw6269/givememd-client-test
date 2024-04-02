import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Axios } from "../utils/CustomAxios";

const RepositoryDetail = () => {
    const {name} = useParams();
    const [data,setData] = useState([]);

    const accessToken = localStorage.getItem("githubAccessToken");

    const handleClick = ()=>{
        const requestBody = {
            "accessToken":accessToken,
            "url":data.url
        }
        Axios.post("http://localhost:8080/api/v1/github/file",requestBody)
            .then((res)=>{
                console.log(res);
            })

    }

    useEffect(()=>{
        const accessToken = localStorage.getItem("githubAccessToken");
        const requestBody = {
            "accessToken":accessToken,
            "name":name
        }
        Axios.post("http://localhost:8080/api/v1/github/repository",requestBody)
            .then((res)=>{
                console.log(res);
                setData(res.data.result);
            })
    },[])


    return (
        <>
            <h1>
                {name}
            </h1>
            <button onClick={handleClick}>파일 생성</button>
        </>
    )
}

export default RepositoryDetail;