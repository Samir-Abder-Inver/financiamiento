/**
 * Parsea un string de moneda con formato "$13.184,50" a un número flotante.
 * Elimina el símbolo $, los puntos de miles y reemplaza la coma decimal por punto.
 * @param {string|number} value - El valor a parsear.
 * @returns {number} El valor numérico.
 */
export const parseCurrency = (value) => {
    if (typeof value === 'number') return value;
    if (!value) return 0;

    // Formato esperado: "$13.184,50"
    // 1. Eliminar todo lo que no sea número o coma
    // 2. Reemplazar coma por punto
    // 3. Convertir a número

    // Eliminamos puntos de miles (13.184 -> 13184) y símbolo $
    const cleanString = value.replace(/\./g, '').replace(/[^0-9,]/g, '');

    // Reemplazamos la coma decimal por punto (13184,50 -> 13184.50)
    const dotString = cleanString.replace(',', '.');

    return parseFloat(dotString);
};
