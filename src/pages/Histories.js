import { useEffect } from "react";

const Histories = ({readmeId,repository, onClick }) => {
    const detailUrl = `/edit`;
    console.log(readmeId);

    useEffect(() => {
        //console.log(repository);
    }, [])

    return (
        <tr>
            <td>
                {/* 클릭 이벤트 핸들러 연결 */}
                <a href={detailUrl} style={{ fontSize: '20px', fontFamily: 'Arial, sans-serif', fontWeight: 'bold', textDecoration: 'none', color: '#333', lineHeight: '2.0' }} onClick={() => onClick(repository.name,readmeId)}>
                    {repository.name}
                </a>
            </td>
        </tr>
    )
}

export default Histories;
