import axios from 'axios';
import type { ContactoForm, ContactoRequest } from './contacto.types';

const API_URL = import.meta.env.VITE_API_URL;

export const obtenerContactos = async (): Promise<ContactoForm[]> => {
  const res = await axios.get(`${API_URL}/contacto`);
  return res.data;
};

export const crearContacto = async (data: ContactoRequest) => {
  await axios.post(`${API_URL}/contacto`, data);
};

export const editarContacto = async (id: number, data: ContactoRequest) => {
  await axios.put(`${API_URL}/contacto/${id}`, data);
};

export const eliminarContacto = async (id: number) => {
  await axios.delete(`${API_URL}/contacto/${id}`);
};