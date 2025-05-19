import Cookies from "js-cookie";

// Usa la variable de entorno del .env
const API_URL = import.meta.env.VITE_API_URL + "/api";

const generateRubroPDF = async (ids) => {
  try {
    const token = Cookies.get("token");

    const response = await fetch(`${API_URL}/cv/generate`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
      body: JSON.stringify({ ids }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(errorText || "Error al generar el PDF");
    }

    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);
    window.open(url, "_blank"); 

  } catch (error) {
    console.error("Error al generar PDF del rubro:", error);
    throw error;
  }
};

const cvService = {
  generateRubroPDF,
};

export default cvService;