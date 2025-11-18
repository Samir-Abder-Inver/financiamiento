
// En una aplicación real, la URL base de la API vendría de una variable de entorno.
const API_BASE_URL = 'https://n8n.maxcodex.com/webhook/gwmFinanciamiento'; 

/**
 * Obtiene la lista de autos desde la API.
 * @param {number} initial - El valor inicial para filtrar los autos.
 * @returns {Promise<Array>} - Una promesa que resuelve a un array de autos.
 */
export const getCars = async (initial) => {
  try {
    console.log("prueba")
    const response = await fetch(`${API_BASE_URL}/cars`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ initial }),
    });
    console.log(response)
    if (!response.ok) {
      throw new Error(`Error en la petición: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("No se pudieron obtener los autos:", error);
    // Relanzamos el error para que el componente que llama pueda manejarlo.
    throw error;
  }
};
