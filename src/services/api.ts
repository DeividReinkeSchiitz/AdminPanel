import axios from "axios";

const api = axios.create({ baseURL: "localhost:2999" });

export default api;
