    import { useEffect } from "react";

    const Repository = ({repository}) => {

        const detailUrl = `/repository/${repository.name}`;

        useEffect(()=>{
           //console.log(repository);
        },[])

        return (
            <>
                <tr>
                    <td>
                    <a href={detailUrl} style={{ fontSize: '20px', fontFamily: 'Arial, sans-serif', fontWeight: 'bold', textDecoration: 'none', color: '#333',lineHeight: '2.0'  }}>
                    {repository.name}
                    </a>
                    </td>
                </tr>
            </>
        )
    }

    export default Repository;