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
        Axios.get("http://3.39.11.243:8080/api/readme/repos",requestBody)
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
                        <th></th>
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