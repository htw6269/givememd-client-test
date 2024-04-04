import { useEffect } from "react";

const Repository = ({repository}) => {

    const detailUrl = `/repository/${repository.name}`;

    useEffect(()=>{
        console.log(repository);
    },[])

    return (
        <>
            <tr>
                <td><a href={detailUrl}>{repository.name}</a></td>
            </tr>
        </>
    )
}

export default Repository;