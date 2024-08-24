import PropTypes from "prop-types";
import Modal from "react-bootstrap/Modal";
import Button from "@ui/button";
import { useForm } from "react-hook-form";
import ErrorText from "@ui/error-text";
import { useLocalStorage } from "src/hooks/use-local-storage";
import { toast } from "react-toastify";
import { useRouter } from "next/router";

const ProcesarCompraModal = ({ show, handleModal, titulo, propie }) => {
    
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

    console.log(titulo)
    console.log(propie)
    
    const onSubmit = async (e) => {
     
        var requestOptions = {
            method: 'POST',
            body: JSON.stringify({
                token: token,
                titulo: titulo,
           }),
          };

        fetch( process.env.url + "Plan/addPlan", requestOptions)
            .then(response => {
                return response.json();
            })
            .then(json => {
                console.log(json);
                if(json.code == 200){
                    toast(json.response)
                    handleModal();
                    //window.location.replace('');
                }
                if(json.code === 300){
                    toast(json.response)
                }
            })            
            .catch(error => toast("Ocurrio un error"));
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
            <h5 className="modal-title">Procesar compra de Plan</h5>
        </Modal.Header>
        <Modal.Body>
            <form action="#" onSubmit={handleSubmit(onSubmit)}>
            <p>
                Asegurece de haber revisado los requisitos y benificio del plan seleccionado: <b>{titulo}</b>,
                 y proceda a adquirlo
            </p>

            <div className="col-md-12">
                
            <ul className="">
                {propie?.map((prope) => (
                        <li className="">{prope.value}</li>
                    
                ))}
            </ul>
                 
            </div>


            <div className="report-form-box">
                <div className="report-button">
                    <Button size="medium" className="mr--10 w-auto" type="submit">
                        Adquirir
                    </Button>
                    
                </div>
            </div>
            </form>
        </Modal.Body>
    </Modal>
    )
};

ProcesarCompraModal.propTypes = {
    show: PropTypes.bool.isRequired,
    handleModal: PropTypes.func.isRequired,
};
export default ProcesarCompraModal;