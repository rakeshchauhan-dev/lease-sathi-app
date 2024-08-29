const API_URL = 'http://10.0.2.2:8080';
const PROTECTED_ROUTE = 'api'
export default {
  LOGIN_URL: `${API_URL}/login`,
  ADD_ENQUIRY_URL: `${API_URL}/${PROTECTED_ROUTE}/enquiries`,
  CUSTOMERS_URL:  `${API_URL}/${PROTECTED_ROUTE}/customers`,

};
