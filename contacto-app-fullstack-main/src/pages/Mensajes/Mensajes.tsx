import { useEffect, useState } from "react";
import { FiEdit, FiPlus, FiTrash2 } from "react-icons/fi";
import { ModalMensaje } from "./ModalMensajes";
import type { Mensaje } from "./mensajes.types";
import { eliminarMensaje, obtenerMensajes } from "./mensajes.service";
import { toast, ToastContainer } from "react-toastify";
import Swal from "sweetalert2";

export const Mensajes = () => {
  const [mensajes, setMensajes] = useState<Mensaje[]>([]);
  const [mostrarModal, setMostrarModal] = useState(false);
  const [mensajeEditando, setMensajeEditando] = useState<Mensaje | undefined>();

  const cargarMensajes = async () => {
    try {
      const data = await obtenerMensajes();
      setMensajes(data);
    } catch (error) {
      console.error("Error al obtener los mensajes:", error);
    }
  };

  const abrirModal = (mensaje?: Mensaje) => {
    setMensajeEditando(mensaje);
    setMostrarModal(true);
  };

  const cerrarModal = () => {
    setMensajeEditando(undefined);
    setMostrarModal(false);
    cargarMensajes();
  };

  const confirmarEliminacion = async (id: number) => {
    const result = await Swal.fire({
      title: "¿Está seguro de eliminar?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Aceptar",
      cancelButtonText: "Cancelar",

    });

    if (result.isConfirmed) {
      await eliminarMensaje(id);
      toast.success("Mensaje eliminado", {
        position: "top-right",
        autoClose: 1000,
      });
      cargarMensajes();
    }
  };

  useEffect(() => {
    cargarMensajes();
  }, []);

  return (
    <div className="max-w-4xl mx-auto px-4">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-4">
        <h2 className="text-xl sm:text-2xl font-bold text-gray-800">
          Mensajes
        </h2>
        <button
          onClick={() => abrirModal()}
          className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-xl hover:bg-green-700 transition"
        >
          <FiPlus className="text-lg" />
          <span className="text-sm sm:text-base">Agregar</span>
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full table-auto border bg-white border-gray-300 mt-4 rounded-xl shadow">
          <thead>
            <tr className="bg-gray-100">
              <th className="text-left px-4 py-2">ID</th>
              <th className="text-left px-4 py-2">Contenido</th>
              <th className="p-2 text-center">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {mensajes.map((m) => (
              <tr key={m.id} className="border-t border-gray-200">
                <td className="px-4 py-2">{m.id}</td>
                <td className="px-4 py-2">{m.contenido}</td>
                <td className="p-2 flex justify-center gap-3">
                  <button
                    onClick={() => abrirModal(m)}
                    className="text-blue-600 hover:text-blue-800"
                  >
                    <FiEdit />
                  </button>
                  <button
                    onClick={() => confirmarEliminacion(m.id)}
                    className="text-red-600 hover:text-red-800"
                  >
                    <FiTrash2 />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {mostrarModal && (
        <ModalMensaje
          onClose={cerrarModal}
          mensaje={mensajeEditando ?? undefined}
        />
      )}

      <ToastContainer />
    </div>
  );
};
