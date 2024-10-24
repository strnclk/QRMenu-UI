import { api } from "boot/axios";
import { useRouter } from "vue-router";

export function useLoginApi() {
  const router = useRouter();

  const isSignedIn = () => {
    return localStorage.getItem("accessToken") ? true : false;
  };
  const getAccessToken = () => {
    return localStorage.getItem("accessToken");
  };

  const login = async (data: any) => {
    try {
      let response = await api.post("/Login/login", data);
      console.log("response", response);
      if (response.status === 200) {
        localStorage.removeItem("userDetail");
        localStorage.setItem("accessToken", response.data.data);
        router.replace("/admin"); // login olunca yönlendirilecek sayfa

        return null;
      } else {
        return response;
      }
    } catch (error: any) {
      let response = error.response;

      console.log(error);

      if (response.status === 401) {
        router.replace("/unauthorize");
        return { ok: "Error" };
      }

      if (error.response.status === 403) {
        router.replace("/is-not-auth");
        return { ok: "Error" };
      }

      return { errors: error.response.data.errors.errors };
    }
  };
  const logout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("userDetail");
    router.replace("/login");
  };

  const isNotAuth = () => {
    router.replace("/is-not-auth");
  };

  return {
    login,
    logout,
    isSignedIn,
    getAccessToken,
    isNotAuth,
  };
}
