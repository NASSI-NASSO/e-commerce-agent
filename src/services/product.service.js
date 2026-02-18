import api from './api.service';

const SHEET_ID = import.meta.env.VITE_GOOGLE_SHEET_ID;

/**
 * Product Service
 * Fetches product data from Google Sheets via n8n or direct API if needed
 */
export const productService = {
    getProducts: async () => {
        try {
            // Using the n8n webhook defined in .env
            // This assumes the webhook is set up to return products from the specified sheet
            const response = await api.get('/products', {
                params: { sheetId: SHEET_ID }
            });
            return response;
        } catch (error) {
            console.error('Error fetching products:', error);
            throw error;
        }
    },

    getProductById: async (id) => {
        try {
            const response = await api.get(`/products/${id}`);
            return response;
        } catch (error) {
            console.error(`Error fetching product ${id}:`, error);
            throw error;
        }
    }
};

export default productService;
