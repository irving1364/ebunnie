import PropTypes from "prop-types";
import Modal from "react-bootstrap/Modal";
import Button from "@ui/button";
import { useForm } from "react-hook-form";
import ErrorText from "@ui/error-text";
import { useLocalStorage } from "src/hooks/use-local-storage";
import { toast } from "react-toastify";
import { useRouter } from "next/router";

const ProcesarActivatPlanModal = ({ show, handleModal, data }) => {
    
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
        var requestOptions = {
            method: 'POST',
            body: JSON.stringify({
                token: token,
                cod_usuario: data.cod,
                titulo: e.titulo
           }),
          };

        fetch( process.env.url + "plan/addPlanManual", requestOptions)
            .then(response => {
                return response.json();
            })
            .then(json => {
                console.log(json);
                if(json.code == 200){
                    toast(json.response)
                    handleModal();
                   
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
            <h5 className="modal-title">Procesar</h5>
        </Modal.Header>
        <Modal.Body>
            <form action="#" onSubmit={handleSubmit(onSubmit)}>
            <p>
                Asegurece de haber elegido el usuario correcto: <b>{data.usuario},</b> luego de procesar esta acción no se podrá revertir.
            </p>

            <div className="col-md-12">
                
                <div className="input-box pb--20">
                <label
                        htmlFor="codigo_pais"
                        className="form-label"
                    >
                        Plan a activarle al usuario
                    </label>

                    <select 
                        name="titulo" id="titulo" aria-label="Default select example"
                        {...register("titulo", {
                            required:
                                "Debe seleccionar un Codigo de Pais",
                        })}>
                        <option value="">Debe seleccionar una opcion</option>
                        <option value="VIP">VIP</option>
                        <option value="STAR BUNNIE">STAR BUNNIE</option>
                    </select>
                    {errors.titulo && (
                        <ErrorText>
                            {errors.titulo?.message}
                        </ErrorText>
                    )}
                </div> 
            </div>
            <div className="report-form-box">
              
                
                <div className="report-button">
                    <Button size="medium" className="mr--10 w-auto" type="submit">
                        Activar
                    </Button>
                    
                </div>
            </div>
            </form>
        </Modal.Body>
    </Modal>
    )
};

ProcesarActivatPlanModal.propTypes = {
    show: PropTypes.bool.isRequired,
    handleModal: PropTypes.func.isRequired,
};
export default ProcesarActivatPlanModal;
