import axios from "axios";
import type { LoginForm } from "./login.types";

interface LoginResponse {
  ok: boolean;
  usuario: {
    nombre: string;
    email: string;
  };
}

export const loginUsuario = async (data: LoginForm): Promise<LoginResponse> => {
  const API_URL = import.meta.env.VITE_API_URL;
  const res = await axios.post<LoginResponse>(`${API_URL}/login`, data);
  return res.data;
};