import GithubButton from "./GithubBotton";

const Home = ({login}) => {
    return (
        <div style={{
            display: 'flex', // Flexbox 레이아웃 사용
            flexDirection: 'column', // 아이템들을 세로로 나열
            alignItems: 'center', // 가로 방향에서 가운데 정렬
            justifyContent: 'space-around', // 아이템들 사이에 공간을 균등하게 배분
            height: '100vh', // 컨테이너의 높이를 뷰포트 높이의 100%로 설정
        }}>
            <img src="logo.png" alt="환영합니다" style={{width: '600px', height: '200px', top:'500px'}} />
            <div style={{ display: 'flex', justifyContent: 'center'}}>
                <GithubButton/>
            </div>
        </div>
    )
}

export default Home;