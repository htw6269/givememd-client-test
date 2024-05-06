/**생성된 readme파일 */

import { useEffect, useState } from "react";
import Repository from "./Repository";
import { Axios } from "../utils/CustomAxios";
import Histories from "./Histories";

const History = () => {
    const [data,setData] = useState([]);
    const [selectedRepository, setSelectedRepository] = useState(null); // 클릭한 리포지토리 이름을 저장할 state
    //const [readmeId,setReadmeId] = useState(null);
    const handleRepositoryClick = (repositoryName,readmeId) => {
        setSelectedRepository(repositoryName); // 클릭한 리포지토리 이름을 state에 저장
        localStorage.setItem("readmeId",readmeId);
        console.log(readmeId);
    };
    localStorage.setItem("repository",selectedRepository);
    console.log(selectedRepository);
    useEffect(()=>{
        const accessToken = localStorage.getItem("githubAccessToken");
        Axios.get("http://3.39.11.243:8080/api/readme/list",{
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        })
            .then((res)=>{
                console.log("history:",res);
                setData(res.data.repos);
            })
    },[])
    return (
        <>
                <div style={{ textAlign: 'center' }}>
                    {/* Repository 컴포넌트에 클릭 이벤트 핸들러를 전달 */}
                    <table style={{ display: 'flex', alignItems: 'center', margin: '0 300px', position: 'relative', height: '750px' }}>
                        <thead>
                            <tr>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.map((repository) =>
                                <Histories key={repository.id} readmeId={repository.readmeId} repository={repository} onClick={handleRepositoryClick}/>
                            )}
                        </tbody>
                    </table>
                </div>
                {/* Readme 컴포넌트에 선택된 repository 명을 props로 전달 */}
            </>
    )
}

export default History;
