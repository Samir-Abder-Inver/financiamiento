
// La URL base de la API. En una app real, vendría de variables de entorno.
const API_BASE_URL = 'https://n8n.maxcodex.com/webhook/gwmFinanciamiento';

/**
 * Función genérica para realizar peticiones POST a la API.
 * Abstrae la configuración común como el método, headers y manejo de errores.
 * @param {string} endpoint - El endpoint de la API (ej. 'cars', 'plans').
 * @param {object} body - El cuerpo de la petición.
 * @returns {Promise<any>} - Una promesa que resuelve con los datos de la respuesta.
 */
const apiPost = async (endpoint, body) => {
  try {
    const response = await fetch(`${API_BASE_URL}/${endpoint}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ message: 'No se pudo leer el cuerpo del error' }));
      throw new Error(`Error ${response.status}: ${errorData.message || response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error(`Error en la petición a '${endpoint}':`, error);
    throw error; // Relanzamos para que el componente que llama pueda manejarlo.
  }
};

/**
 * Obtiene la lista de autos desde la API.
 * @param {number} initial - El valor inicial para filtrar los autos.
 * @returns {Promise<Array>}
 */
export const getCars = (initial) => {
  console.log("Obteniendo autos...");
  // Corregido: el endpoint correcto es 'cars'
  return apiPost('cars', { initial });
};

/**
 * Obtiene los planes de financiamiento para un auto específico.
 * @param {string} carId - El ID del auto.
 * @returns {Promise<Array>}
 */
export const getPlansByCar = async (carId) => { // 1. Función async
  console.log(`Obteniendo planes para el auto ${carId}...`);
  
  // 2. Esperamos la respuesta de apiPost
  const plansResponse = await apiPost('plans', { carId });
  
  // 3. ¡Aquí puedes hacer console.log de la respuesta!
  console.log('Respuesta obtenida en getPlansByCar:', plansResponse);
  
  // 4. Devolvemos la respuesta para que otros componentes la usen.
  return plansResponse;
};
