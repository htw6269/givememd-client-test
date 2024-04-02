const GithubButton  = (props) => {
    const clientId = process.env.REACT_APP_CLIENT_ID;
    const redirectUrl = process.env.REACT_APP_REDIRECT_URL;
    const githubURL = `https://github.com/login/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectUrl}&prompt=select_account
    `
    const handleLogin = ()=>{
        window.location.href = githubURL
    }
    return (
        <div >
            <button onClick={handleLogin}>
                깃허브 로그인
            </button>
        </div>
    );
};

export default GithubButton;