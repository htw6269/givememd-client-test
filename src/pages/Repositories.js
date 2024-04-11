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
                setData(res.data.repositories);
            })
    },[])
    
    return (
        <>
            <div style={{ textAlign: 'center' }}>
            <table style={{  display: 'flex', alignItems: 'center', margin: '0 300px', position: 'relative', height: '750px'  }}>
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
            </div>
        </>
    )
}

export default Repositories;