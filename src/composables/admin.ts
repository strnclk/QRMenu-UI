import { api } from "boot/axios";
import { useRouter } from "vue-router";

export function adminAPIs() {
  const router = useRouter();

  const getCompany = async () => {
    try {
      let response = await api.get("/Admin/get-company", {
        headers: {
          "FuPiCo-Security": `Bearer ${localStorage.getItem("accessToken")}`,
        },
      });
      if (response.status === 200) {
        return response.data;
      } else {
        return response;
      }
    } catch (error: any) {
      let response = error.response;
      if (response && response.status === 401) {
        router.replace("/unauthorize");
        return { ok: "Error" };
      }
      if (response && response.status === 403) {
        router.replace("/is-not-auth");
        return { ok: "Error" };
      }
      return {
        errors: response
          ? response.data.errors.errors
          : ["An unexpected error occurred"],
      };
    }
  };
  const addOrUpdateCompany = async (companyDto: any) => {
    try {
      let response = await api.post("/Admin/update-company", companyDto, {
        headers: {
          "FuPiCo-Security": `Bearer ${localStorage.getItem("accessToken")}`,
          "Content-Type": "application/json",
        },
      });
      return response.status === 200 ? response.data : null;
    } catch (error: any) {
      const response = error.response;
      if (response && response.status === 401) {
        router.replace("/unauthorize");
        return { ok: "Error" };
      }
      if (response && response.status === 403) {
        router.replace("/is-not-auth");
        return { ok: "Error" };
      }
      return {
        errors: response
          ? response.data.errors.errors
          : ["An unexpected error occurred"],
      };
    }
  };
  const getFoodGroups = async () => {
    try {
      let response = await api.get("/Admin/get-food-groups", {
        headers: {
          "FuPiCo-Security": `Bearer ${localStorage.getItem("accessToken")}`,
        },
      });
      if (response.status === 200) {
        return response.data;
      } else {
        return response;
      }
    } catch (error: any) {
      const response = error.response;
      if (response && response.status === 401) {
        router.replace("/unauthorize");
        return { ok: "Error" };
      }
      if (response && response.status === 403) {
        router.replace("/is-not-auth");
        return { ok: "Error" };
      }
      return {
        errors: response
          ? response.data.errors.errors
          : ["An unexpected error occurred"],
      };
    }
  };

  const deleteFoodGroup = async (foodGroupId: number) => {
    try {
      let response = await api.delete(
        `/Admin/delete-food-group/${foodGroupId}`,
        {
          headers: {
            "FuPiCo-Security": `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );
      if (response.status === 200) {
        return response.data;
      } else {
        return response;
      }
    } catch (error: any) {
      const response = error.response;
      if (response && response.status === 401) {
        router.replace("/unauthorize");
        return { ok: "Error" };
      }
      if (response && response.status === 403) {
        router.replace("/is-not-auth");
        return { ok: "Error" };
      }
      return {
        errors: response
          ? response.data.errors.errors
          : ["An unexpected error occurred"],
      };
    }
  };

  const updateFoodGroup = async (id: number, data: any) => {
    try {
      let response = await api.put(`/Admin/update-food-group/${id}`, data, {
        headers: {
          "FuPiCo-Security": `Bearer ${localStorage.getItem("accessToken")}`,
          "Content-Type": "application/json",
        },
      });
      return response.status === 200 ? response.data : null;
    } catch (error: any) {
      console.error("Güncelleme hatası:", error);
      return null;
    }
  };

  const uploadImageAPI = async (file: File) => {
    try {
      const formData = new FormData();
      formData.append("image", file); // Backend 'image' parametresini bekliyor

      const response = await api.post("/Files/upload-image", formData, {
        headers: {
          "FuPiCo-Security": `Bearer ${localStorage.getItem("accessToken")}`,
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.status === 200) {
        console.log("Resim başarıyla yüklendi:", response.data);
        return response.data;
      } else {
        console.error("Resim yükleme hatası:", response);
      }
    } catch (error) {
      console.error("Resim yükleme hatası:", error);
    }
  };

  const getFoodsByFoodGroupId = async (foodGroupId: number) => {
    try {
      let response = await api.get(
        `/Admin/get-foods-by-food-group-id/${foodGroupId}`,
        {
          headers: {
            "FuPiCo-Security": `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );
      if (response.status === 200) {
        return response.data;
      } else {
        return response;
      }
    } catch (error: any) {
      const response = error.response;
      if (response && response.status === 401) {
        router.replace("/unauthorize");
        return { ok: "Error" };
      }
      if (response && response.status === 403) {
        router.replace("/is-not-auth");
        return { ok: "Error" };
      }
      if (response && response.status === 404) {
        // 404 durumunu handle etmek için null döndür
        return null;
      }
      return {
        errors: response
          ? response.data.errors.errors
          : ["An unexpected error occurred"],
      };
    }
  };

  const updateFood = async (id: number, data: any) => {
    try {
      let response = await api.put(`/Admin/update-food/${id}`, data, {
        headers: {
          "FuPiCo-Security": `Bearer ${localStorage.getItem("accessToken")}`,
          "Content-Type": "application/json",
        },
      });
      return response.status === 200 ? response.data : null;
    } catch (error: any) {
      console.error("Güncelleme hatası:", error);
      return null;
    }
  };

  const deleteFood = async (foodId: number) => {
    try {
      let response = await api.delete(`/Admin/delete-food/${foodId}`, {
        headers: {
          "FuPiCo-Security": `Bearer ${localStorage.getItem("accessToken")}`,
        },
      });
      return response.status === 200 ? response.data : null;
    } catch (error: any) {
      console.error("Silme hatası:", error);
      return null;
    }
  };
  const addFoodGroup = async (foodGroupDto: any) => {
    try {
      let response = await api.post("/Admin/add-food-group", foodGroupDto, {
        headers: {
          "FuPiCo-Security": `Bearer ${localStorage.getItem("accessToken")}`,
          "Content-Type": "application/json",
        },
      });
      return response.status === 200 ? response.data : null;
    } catch (error: any) {
      const response = error.response;
      if (response && response.status === 401) {
        router.replace("/unauthorize");
        return { ok: "Error" };
      }
      if (response && response.status === 403) {
        router.replace("/is-not-auth");
        return { ok: "Error" };
      }
      return {
        errors: response
          ? response.data.errors.errors
          : ["An unexpected error occurred"],
      };
    }
  };
  const addFood = async (foodDto: any) => {
    try {
      let response = await api.post("/Admin/add-food", foodDto, {
        headers: {
          "FuPiCo-Security": `Bearer ${localStorage.getItem("accessToken")}`,
          "Content-Type": "application/json",
        },
      });

      return response.status === 200 ? response.data : null;
    } catch (error: any) {
      const response = error.response;

      if (response && response.status === 401) {
        router.replace("/unauthorize"); // Yetkisiz hata, kullanıcıyı yetkilendirme sayfasına yönlendir
        return { ok: "Error" };
      }

      if (response && response.status === 403) {
        router.replace("/is-not-auth"); // Yetki reddedildiğinde yönlendirme
        return { ok: "Error" };
      }

      return {
        errors: response
          ? response.data.errors.errors // API'den dönen spesifik hata mesajları
          : ["An unexpected error occurred"], // Genel hata mesajı
      };
    }
  };

  return {
    getCompany,
    getFoodGroups,
    deleteFoodGroup,
    updateFoodGroup,
    uploadImageAPI,
    getFoodsByFoodGroupId,
    updateFood,
    deleteFood,
    addOrUpdateCompany,
    addFoodGroup,
    addFood,
  };
}
