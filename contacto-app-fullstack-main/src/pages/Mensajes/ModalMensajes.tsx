import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { actualizarMensaje, crearMensaje } from "./mensajes.service";

interface Props {
  onClose: () => void;
  mensaje?: {
    id: number;
    contenido: string;
  };
}

interface MensajeForm {
  contenido: string;
}

export const ModalMensaje = ({ onClose, mensaje }: Props) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<MensajeForm>({
    defaultValues: {
      contenido: mensaje?.contenido || "",
    },
  });

  const onSubmit = async (data: MensajeForm) => {
    try {
      if (mensaje) {
        await actualizarMensaje(mensaje.id, data.contenido);
        toast.success("Mensaje actualizado", {
          position: "top-right",
          autoClose: 2000,
        });
      } else {
        await crearMensaje(data.contenido);
        toast.success("Mensaje creado", {
          position: "top-right",
          autoClose: 2000,
        });
      }
      reset();
      onClose();
    } catch (err) {
      toast.error("Error al guardar el mensaje");
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-md">
        <h3 className="text-lg font-bold mb-4">Agregar mensaje</h3>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <textarea
              rows={4}
              className="w-full border px-3 py-2 rounded-xl"
              placeholder="Escribe tu mensaje"
              {...register("contenido", { required: "Mensaje obligatorio" })}
            ></textarea>
            {errors.contenido && (
              <p className="text-red-500">{errors.contenido.message}</p>
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
              Guardar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
