const API_URL = 'http://10.0.2.2:8080';
const PROTECTED_ROUTE = 'api'
export default {
  LOGIN_URL: `${API_URL}/login`,
  ENQUIRIES_URL: `${API_URL}/${PROTECTED_ROUTE}/enquiries`,
  CUSTOMERS_URL:  `${API_URL}/${PROTECTED_ROUTE}/customers`,
  TOKENS_URL : `${API_URL}/${PROTECTED_ROUTE}/tokens`,
  FEEDBACKS_URL : `${API_URL}/${PROTECTED_ROUTE}/feedbacks`,
  FILE_UPLOAD_URL : `${API_URL}/${PROTECTED_ROUTE}/upload-file`,
  APPOINTMENTS_URL : `${API_URL}/${PROTECTED_ROUTE}/appointments`,
  EMPLOYEES_URL : `${API_URL}/${PROTECTED_ROUTE}/users`,
  PAYMENTS_URL : `${API_URL}/${PROTECTED_ROUTE}/payments`,
};
