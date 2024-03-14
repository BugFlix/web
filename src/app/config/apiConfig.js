// import axios from "axios";

// const api = axios.create({
//   baseURL: "https://www.scrabler.com",
//   headers: {
//     "Content-Type": "application/json",
//   },
// });

// api.interceptors.request.use(
//   (config) => {
//     const accessToken = localStorage.getItem("accestoken");
//     if (accessToken) {
//       config.headers.Authorization = `Bearer ${accessToken}`;
//     }
//     return config;
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );

// let isRefreshing = false;

// api.interceptors.response.use(
//   async (response) => {
//     return response;
//   },
//   async (error) => {
//     const originalRequest = error.config;

//     if (
//       error.response.status === 401 &&
//       !originalRequest._retry &&
//       !isRefreshing
//     ) {
//       originalRequest._retry = true;
//       isRefreshing = true;

//       try {
//         const refreshToken = localStorage.getItem("refreshtoken");
//         console.log(refreshToken);
//         const response = await api.post("/api/v1/auths/reissue", {
//           headers: {
//             Authorization: `Bearer ${refreshToken}`,
//           },
//         });
//         console.log("refresh", refreshToken);
//         const newAccessToken = response.data.accessToken;
//         console.log("new", newAccessToken);
//         localStorage.setItem("accestoken", newAccessToken);

//         // Retry the original request with the new access token
//         originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
//         return api(originalRequest);
//       } catch (refreshError) {
//         console.error("Error refreshing token:", refreshError);
//         // Handle token refresh error (e.g., redirect to login page)
//       } finally {
//         isRefreshing = false;
//       }
//     }

//     return Promise.reject(error);
//   }
// );

// export default api;
import axios from "axios";

//토큰이 불필요한 경우
const api = axios.create({
  baseURL: `https://www.scrabler.com`,
  headers: {
    "Content-Type": "application/json",
  },
});
console.log("refresh", localStorage.getItem("refreshtoken"));
const requestData = {
  email: "sgky0511@naver.com",
  password: "ky4400",
};
//리프레시토큰 요청 api
function postRefreshToken() {
  console.log("hello");
  console.log("refresh", localStorage.getItem("refreshtoken"));
  console.log(requestData);
  const response = api.post("/api/v1/auths/reissue", requestData, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("refreshtoken")}`,
    },
  });
  console.log(response);
  return response;
}

//리프레시 토큰 구현
api.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const {
      config,
      response: { status },
    } = error;

    if (status === 401) {
      const originRequest = config;
      try {
        const tokenResponse = await postRefreshToken();
        const newAccessToken = tokenResponse.data.accessToken;
        console.log(newAccessToken);
        localStorage.setItem("accestoken", newAccessToken);
        axios.defaults.headers.common.Authorization = `Bearer ${newAccessToken}`;
        originRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return { originRequest };
      } catch (error) {
        window.location.replace("/");
      }
    }
    return Promise.reject(error);
  }
);
export default api;
