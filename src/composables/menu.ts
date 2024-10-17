import { api } from 'boot/axios'
import { useRouter } from 'vue-router';


export function menu() {

  const router = useRouter();

  const getFoodGroupsAndFoodsByCompanyName = async (data:any) => {
   
    try {
        
       let response = await api.get(`/Menu/getFoodGroupsAndFoodsByCompanyName/${data}`)
       console.log("response -> ", response);

      if (response.status === 200) {
        return response.data.data;
      }

    } catch (error: any) {
      console.log("Hata:", error);
      if (error.response.status == 401) {

        router.replace("/unauthorize")
        return { ok: "Error" };
      }

      if (error.response.status === 403) {

        router.replace("/is-not-auth")
        return { ok: "Error" };
      }
      return { errors: error.response.data.errors.errors }
    }

  };


  return {
    getFoodGroupsAndFoodsByCompanyName,


  }

}