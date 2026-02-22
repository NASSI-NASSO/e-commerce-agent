import api from './api.service';

const chatService = {
    /**
     * Send a message to the n8n bargaining workflow
     * @param {string} message - User message
     * @param {Object} product - Product being bargained for
     * @param {Array} history - Previous messages for context
     * @returns {Promise} - Response from the agent
     */
    sendMessage: async (message, product, history = []) => {
        try {
            const payload = {
                message,
                product: product ? {
                    id: product.id,
                    name: product.name,
                    price: product.price,
                    category: product.category
                } : null,
                history,
                timestamp: new Date().toISOString()
            };

            // Use the full URL if needed, but since api has baseURL set:
            return await api.post('', payload);
        } catch (error) {
            console.error('Error sending message to n8n:', error);
            throw error;
        }
    }
};

export default chatService;
