import { useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFolder } from '@fortawesome/free-solid-svg-icons';

const Histories = ({readmeId,repository, onClick }) => {
    const detailUrl = `/edit`;
    console.log(readmeId);

    useEffect(() => {
        //console.log(repository);
    }, [])

    return (
        <tr style={{ background: '#f4f4f4', padding: '10px', borderRadius: '0px', Bottom: '10px', color:'#E96D14',boxShadow: ' 0 0 3px 1px', transition: 'box-shadow 0.5s' }}>
        <td>
            {/* 클릭 이벤트 핸들러 연결 */}
            <a href={detailUrl} style={{ fontSize: '24px', fontFamily: 'Arial, sans-serif', fontWeight: 'bold', textDecoration: 'none', color: '#333', lineHeight: '2.0', display: 'block' }} onClick={() => onClick(repository.name, readmeId)}>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <FontAwesomeIcon icon={faFolder} style={{ marginRight: '15px', marginLeft:'30px', color: '#E96D14' }} /> {/* 폴더 아이콘 */}
                    <span style={{ fontSize: '18px', fontWeight: 'bold', marginRight:'25px'}}>{repository.name}</span> {/* 리포지토리 이름 */}
                </div>
            </a>
        </td>
        </tr>
    )
}

export default Histories;
