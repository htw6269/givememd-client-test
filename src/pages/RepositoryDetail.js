import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Axios } from "../utils/CustomAxios";

const RepositoryDetail = () => {
    const { name } = useParams();
    const [data, setData] = useState([]);
    const accessToken = localStorage.getItem("githubAccessToken");

    const handleClick = () => {
        const requestBody = {
            name: name
        };

        const config = {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        };

        Axios.post("http://3.39.11.243:8080/api/readme", requestBody, config)
            .then((res) => {
                console.log(res);
                //window.location.href = "/result";
            })
            .catch((error) => {
                console.error("Error creating file:", error);
                // 에러 처리
            });
    };

    return (
        <>
            <h1>{name}</h1>
            <button onClick={handleClick}>파일 생성</button>
        </>
    );
};

export default RepositoryDetail;
