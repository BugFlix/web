import axios from "axios";
const api = axios.create({
  baseURL: "http://3.34.222.165:8080",
  headers: {
    "Content-Type": "application/json",
  },
});

//가로채기
api.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem("accestoken");
    console.log(accessToken);
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

//가로채기
api.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const response = await api.post("/api/v1/auths/reissue", null, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("refreshtoken")}`,
          },
        });

        const newAccessToken = response.data.accessToken;
        localStorage.setItem("accestoken", newAccessToken);

        // Console log to check if the new access token is retrieved successfully
        console.log("New Access Token:", newAccessToken);

        // Retry the original request with the new access token
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return axios(originalRequest);
      } catch (refreshError) {
        // Log the error when refreshing the token
        console.error("Error refreshing token:", refreshError);

        // Redirect to login page or handle the error accordingly
        console.log("Refresh token expired. Redirect to login page.");

        // Clear tokens and redirect to login page
        localStorage.removeItem("accesstoken");
        localStorage.removeItem("refreshtoken");
        window.location.href = "/login"; // Redirect to your login page
      }
    }

    return Promise.reject(error);
  }
);

export default api;
