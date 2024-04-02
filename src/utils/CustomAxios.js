import axios from "axios";

export const Axios = axios.create({
    headers: {
      "Content-Type": "application/json",
    },
    withCredentials: true,
  });
  
Axios.interceptors.request.use((config) => {
  const token = localStorage.getItem("accessToken");
  if (config.headers !== undefined) {
    if (token !== null) {
      config.headers.Authorization = "Bearer " + token;
    }
  }
  return config;
}); 

Axios.interceptors.response.use(
  (response) => response,
  async (error) => {
    console.log("first request");
    console.log(error);
    const { config, response: { status } } = error;
   
    if (config.url === "/api/auth/v1/reissue" || (status === 401&&error.response.data.message==="인증이 실패하였습니다." ) || config.sent) {
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      localStorage.removeItem('githubAccessToken');
      window.location.href = "/home";
      return Promise.reject(error);
    }
    config.sent = true;
    await getRefreshToken();

    const accessToken = localStorage.getItem("accessToken");

    if (accessToken) {
      config.headers.Authorization = "Bearer " + accessToken;
    }
    return Axios(config);
 }
);

const getRefreshToken = async() => {
  const refreshToken = localStorage.getItem("refreshToken");
 
  await Axios.post("http://localhost:8080/api/v1/auth/reissue",{refreshToken})
    .then((res) => {
      console.log(res);
      const response = res.data;
      const newAccessToken = response.result.accessToken;
      const newRefreshToken = response.result.refreshToken;
      localStorage.setItem("accessToken", newAccessToken);
      localStorage.setItem("refreshToken", newRefreshToken);
    })
    .catch((e) => {
      console.log(e);
      //const dispatch = useDispatch();
      //const navigate = useNavigate();
      console.log("Token Reissue Fail : " + e);
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      localStorage.removeItem('githubAccessToken');
      //dispatch(remove_userInfo());
      window.location.href = "/home";
    });
}


export const refreshTokenAxios = axios.create({
  withCredentials: true,
});

refreshTokenAxios.interceptors.request.use((config) => {
  const token = localStorage.getItem("accessToken");
  if (config.headers !== undefined) {
    if (token !== null) {
      config.headers.Authorization = "Bearer " + token;
    }
  }
  return config;
});
