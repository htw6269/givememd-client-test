import { useEffect, useState } from "react";
import Repository from "./Repository";
import { Axios } from "../utils/CustomAxios";

const Repositories = () =>{

    const [data,setData] = useState([]);

    useEffect(()=>{
        const accessToken = localStorage.getItem("githubAccessToken");
        const requestBody = {
            "accessToken":accessToken
        }
        Axios.post("http://localhost:8080/api/v1/github/repositories",requestBody)
            .then((res)=>{
                console.log(res);
                setData(res.data.result.list);
            })
    },[])
    
    return (
        <>
            <table>
                <thead>
                    <tr>
                        <th>리포지토리명</th>
                        <th>url</th>
                    </tr>
                </thead>
                <tbody>
                {data.map((repository)=>
                    <Repository repository={repository}/>
                )}
                </tbody>
                
            </table>
        </>
    )
}

export default Repositories;