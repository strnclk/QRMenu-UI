import { api } from 'boot/axios'
import { useRouter } from 'vue-router';


export function menu() {

  const router = useRouter();

  const getFoodGroupsAndFoodsByCompanyName = async (data:any) => {
   
    try {
        
       let response = await api.get(`/Menu/getFoodGroupsAndFoodsByCompanyName/${data}`)
       console.log("response -> ", response);

      if (response.status === 200) {
        return response.data;
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


  const addFoodGroup = async (data:any) => {
    try {
      let response = await api.post('/Menu/addFoodGroup', data, {
        headers: {
          'FuPiCo-Security': `Bearer ${localStorage.getItem('accessToken')}` 
        }
      });
      console.log('response', response);
      if (response.status === 200) {
        return null;
      } else {
        return response;
      }
    } catch (error:any) {
      let response = error.response;
  
      console.log(error);
  
      if (response && response.status === 401) {
        router.replace("/unauthorize");
        return { ok: "Error" };
      }
  
      if (response && response.status === 403) {
        router.replace("/is-not-auth");
        return { ok: "Error" };
      }
  
      return { errors: response ? response.data.errors.errors : ["An unexpected error occurred"] };
    }
  };
  

  const check2 = async (data:any) => {
   
    try {
        
       let response = await api.get(`/Menu/check2`)
       console.log("response -> ", response);

      if (response.status === 200) {
        return response.data;
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
  const getMenu = async (data:any) => {
   
    try {
        //data=9;
       let response = await api.get(`/Menu/getMenu/${data}`)
       console.log("response -> ", response);

      if (response.status === 200) {
        return response.data;
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

  const getCompanyByUserId = async () => {
   
    try {
       let response = await api.get(`/Menu/getCompanyByUserId/`)
       console.log("response -> ", response);

      if (response.status === 200) {
        //localStorage.setItem('companyInfo', response.data);
        return response.data;

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
    check2,
    getMenu,
    getCompanyByUserId,
    addFoodGroup


  }

}