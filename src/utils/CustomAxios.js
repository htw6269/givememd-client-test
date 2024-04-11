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
   
    if (config.url === "/api/auth/reissue" || (status === 401&&error.response.data.message==="인증이 실패하였습니다." ) || config.sent) {
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      localStorage.removeItem('githubAccessToken');
      window.location.href = "/";
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
const getRefreshToken = async () => {
  const refreshToken = localStorage.getItem("refreshToken");

  const requestBody = {
    accessToken: localStorage.getItem("accessToken"),
    refreshToken: refreshToken
  };

  try {
    const response = await Axios.post("http://3.39.11.243:8080/api/auth/reissue", requestBody);
    console.log(response);
    
    const newAccessToken = response.data.result.accessToken;
    const newRefreshToken = response.data.result.refreshToken;

    localStorage.setItem("accessToken", newAccessToken);
    localStorage.setItem("refreshToken", newRefreshToken);
  } catch (error) {
    console.log("Token Reissue Fail : ", error);
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('githubAccessToken');
    // 에러 처리 또는 리디렉션 등 필요한 작업 수행
    window.location.href = "/";

  }
};


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
