import { useForm } from "react-hook-form";
import { crearContacto, editarContacto } from "./contacto.service";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import type { ContactoRequest, ContactoForm } from "./contacto.types";

interface Props {
  onClose: () => void;
  contacto?: ContactoForm | null;
}

export const ModalContacto = ({ onClose, contacto }: Props) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactoRequest>({
    defaultValues: contacto
      ? {
          nombre: contacto.nombre,
          correo: contacto.correo,
          mensaje: contacto.mensaje,
        }
      : {
          nombre: "",
          correo: "",
          mensaje: "",
        },
  });

  const onSubmit = async (data: ContactoRequest) => {
    try {
      if (contacto && contacto.id) {
        await editarContacto(contacto.id, data);
        toast.success("Contacto actualizado correctamente", {
          position: "top-right",
          autoClose: 4000,
        });
      } else {
        await crearContacto(data);
        toast.success("Mensaje enviado correctamente", {
          position: "top-right",
          autoClose: 4000,
        });
      }
      reset(); 
      onClose();
    } catch (err) {
      toast.error("Error al guardar el mensaje", {
        position: "top-right",
        autoClose: 5000,
      });
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-md">
        <h3 className="text-lg font-bold mb-4">
          {contacto ? "Editar mensaje" : "Agregar mensaje"}
        </h3>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block font-medium mb-1" htmlFor="nombre">
              Nombre:
            </label>
            <input
              className="w-full px-3 py-2 border rounded-xl"
              id="nombre"
              {...register("nombre", { required: "El nombre es obligatorio" })}
            />
            {errors.nombre && (
              <p className="text-red-500">{errors.nombre.message}</p>
            )}
          </div>

          <div>
            <label className="block font-medium mb-1" htmlFor="correo">
              Correo electrónico:
            </label>
            <input
              type="email"
              className="w-full px-3 py-2 border rounded-xl"
              id="correo"
              {...register("correo", {
                required: "El correo es obligatorio",
                pattern: {
                  value: /^\S+@\S+$/i,
                  message: "Correo no válido",
                },
              })}
            />
            {errors.correo && (
              <p className="text-red-500">{errors.correo.message}</p>
            )}
          </div>

          <div>
            <label className="block font-medium mb-1" htmlFor="mensaje">
              Mensaje:
            </label>
            <textarea
              className="w-full px-3 py--2 border rounded-xl"
              rows={4}
              id="mensaje"
              {...register("mensaje", {
                required: "El mensaje es obligatorio",
              })}
            ></textarea>
            {errors.mensaje && (
              <p className="text-red-500">{errors.mensaje.message}</p>
            )}
          </div>

          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-red-600 text-white rounded-xl hover:bg-red-700"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700"
            >
              {contacto ? "Actualizar" : "Guardar"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};