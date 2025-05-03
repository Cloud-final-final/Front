// Read the backend URL from environment variables provided by Vite
// VITE_BACKEND_URL needs to be set during the build process
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:8000"; // Default fallback

if (!import.meta.env.VITE_BACKEND_URL) {
  console.warn("VITE_BACKEND_URL is not set. Using default: http://localhost:8000");
}

export default BACKEND_URL;
