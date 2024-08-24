import PropTypes from "prop-types";
import Modal from "react-bootstrap/Modal";
import Button from "@ui/button";
import { useForm } from "react-hook-form";
import ErrorText from "@ui/error-text";
import { useLocalStorage } from "src/hooks/use-local-storage";
import { toast } from "react-toastify";
import { useRouter } from "next/router";

const AdvertenciaModal = ({ show, handleModal, data }) => {
    
    const [token, setToken] = useLocalStorage("tokens");
    const router = useRouter();
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm({
        mode: "onChange",
    });


    
    const onSubmit = async (e) => {
       
    }

    return(

    
    <Modal
        className="rn-popup-modal report-modal-wrapper"
        show={show}
        onHide={handleModal}
        centered
    >
        {show && (
            <button
                type="button"
                className="btn-close"
                aria-label="Close"
                onClick={handleModal}
            >
                <i className="feather-x" />
            </button>
        )}
        <Modal.Header className="report-modal-header">
            <h5 className="modal-title">Advertencia y Términos de Uso            </h5>
        </Modal.Header>
        <Modal.Body>
            <form action="#" onSubmit={handleSubmit(onSubmit)}>
            
            <h6>Advertencia Importante
            </h6>
            <p>
                Por favor, lea y acepte antes de continuar:
            </p>
            <ul>
                <li><b>Mayoría de Edad:</b>  Confirmo que tengo más de 18 años y que este sitio puede contener material explícito para adultos.</li>
            </ul>


            <p><b> Términos y Condiciones</b><br></br>
                He leído y acepto los Términos y Condiciones.
            </p>

            
            <p className="-mt-10"><b>Política de Cookies</b><br></br>

                Este sitio utiliza cookies para analizar el tráfico.

            </p>


            <div className="report-form-box">
              
                
                <div className="report-button">
                    <Button onClick={handleModal} size="medium" className="mr--10 w-auto">
                        Acepto
                    </Button>

                    <a href="https://google.com" size="medium" className="mr--10 w-auto" color="primary-alta">
                        NO, deseo salir
                    </a>
                    
                </div>
            </div>
            </form>
        </Modal.Body>
    </Modal>
    )
};

AdvertenciaModal.propTypes = {
    show: PropTypes.bool.isRequired,
    handleModal: PropTypes.func.isRequired,
};
export default AdvertenciaModal;
