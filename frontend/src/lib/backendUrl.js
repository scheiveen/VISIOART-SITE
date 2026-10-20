// Separado de api.js para o site público não precisar carregar o axios.
export const BACKEND_URL =
  process.env.NODE_ENV === "production"
    ? "https://visioart-backend.onrender.com"
    : process.env.REACT_APP_BACKEND_URL || "";
