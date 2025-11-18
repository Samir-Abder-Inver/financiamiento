
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
      // Si el status no es 2xx, lanzamos un error
      const errorData = await response.json().catch(() => ({ message: response.statusText }));
      throw new Error(`Error en la petición: ${errorData.message || 'Error desconocido'}`);
    }

    // Si todo está bien, devolvemos los datos en formato JSON
    return await response.json();

  } catch (error) {
    console.error('Error en apiPost:', error);
    // Re-lanzamos el error para que el componente que llama pueda manejarlo
    throw error;
  }
};

/**
 * Obtiene la lista de autos basada en una inicial.
 * @param {number} initial - El monto inicial.
 * @returns {Promise<Array>}
 */
export const getCars = async (initial) => {
  console.log(`Obteniendo autos con inicial de ${initial}...`);
  return await apiPost('cars', { initial });
};

/**
 * Obtiene los planes de financiamiento para un auto específico.
 * @param {string} carId - El ID del auto.
 * @param {number} initial - El monto inicial.
 * @returns {Promise<Array>}
 */
export const getPlansByCar = async (carId, initial) => {
  console.log(`Obteniendo planes para el auto ${carId} con inicial de ${initial}...`);
  
  // Pasamos ambos valores en el cuerpo de la petición
  const plansResponse = await apiPost('plans', { carId, initial });
  
  console.log('Respuesta obtenida en getPlansByCar:', plansResponse);
  
  return plansResponse;
};
