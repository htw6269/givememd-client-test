import { useEffect, useState } from "react";
import Repository from "./Repository";
import { Axios } from "../utils/CustomAxios";


const Repositories = () => {
    const [data,setData] = useState([]);
    const [selectedRepository, setSelectedRepository] = useState(null); // 클릭한 리포지토리 이름을 저장할 state
    const handleRepositoryClick = (repositoryName) => {
        setSelectedRepository(repositoryName); // 클릭한 리포지토리 이름을 state에 저장
    };
    localStorage.setItem("repository",selectedRepository);
    console.log(selectedRepository);
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
                    {/* Repository 컴포넌트에 클릭 이벤트 핸들러를 전달 */}
                    <table style={{ display: 'flex', alignItems: 'center', margin: '0 270px', position: 'relative', borderCollapse: 'collapse' }}>
                        <thead>
                            <tr>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.map((repository) =>
                                <tr key={repository.id} style={{ padding: '50px' }}>
                                    <td>
                                        <Repository repository={repository} onClick={handleRepositoryClick} />
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
                {/* Readme 컴포넌트에 선택된 repository 명을 props로 전달 */}
            </>
        );
    }
    

    export default Repositories;
