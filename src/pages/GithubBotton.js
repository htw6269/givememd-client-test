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
            <img src="login2.png" alt="깃허브 로그인" onClick={handleLogin}     
            style={{
                    cursor: 'pointer',
                    width: '480px',
                    height: '85px',
                    marginBottom: '100px'
                }}/>
        </div>
    );
};

export default GithubButton;
