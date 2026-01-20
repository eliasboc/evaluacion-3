import { useRouter } from "next/navigation";
import { ArrowLeftIcon } from "@heroicons/react/20/solid";

export const ModalAdmin: React.FC = () => {
  const router = useRouter();
  return (
    <>
      <input type="checkbox" id="my_modal_6" className="modal-toggle" checked={true} />
      <div className="modal" role="dialog">
        <div className="modal-box">
          <h3 className="text-lg font-bold text-center">🚫 Advertencia</h3>
          <p className="py-4 text-center font-semibold">¡Solo el administrador puede crear eventos!</p>
          <div className="modal-action justify-center">
            <label htmlFor="my_modal_6" className="btn" onClick={() => router.back()}>
              <ArrowLeftIcon className="w-5 h-5 mr-2" />
              Regresar
            </label>
          </div>
        </div>
      </div>
    </>
  );
};
