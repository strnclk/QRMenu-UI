import { api } from "boot/axios";

export async function uploadImageAPI(file: File) {
  if (!file) {
    console.error("Dosya bulunamadı.");
    return;
  }

  const formData = new FormData();
  formData.append("image", file); // Backend'de 'image' parametresini bekliyor

  try {
    const response = await api.post("/Files/upload-image", formData, {
      headers: {
        "FuPiCo-Security": `Bearer ${localStorage.getItem("accessToken")}`,
        // 'Content-Type' manuel ayarlanmıyor, axios bunu otomatik yapıyor
      },
    });

    if (response.status === 200) {
      console.log("Resim başarıyla yüklendi:", response.data);
      return response.data;
    } else {
      console.error("Yükleme hatası:", response);
    }
  } catch (error: any) {
    console.error("Resim yükleme hatası:", error);
  }
}
