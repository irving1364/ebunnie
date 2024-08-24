import PropTypes from "prop-types";
import Modal from "react-bootstrap/Modal";
import Button from "@ui/button";
import { useForm } from "react-hook-form";
import ErrorText from "@ui/error-text";
import { useLocalStorage } from "src/hooks/use-local-storage";
import { toast } from "react-toastify";
import { useRouter } from "next/router";

const ProcesarVeriModal = ({ show, handleModal, data }) => {
    
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
                cod: data.cod,
                cod_usuario: data.cod_usuario,
                status: e.status, 
                mensaje: e.mensaje
           }),
          };

        fetch( process.env.url + "perfil/updateVerificacion", requestOptions)
            .then(response => {
                return response.json();
            })
            .then(json => {
                console.log(json);
                if(json.code == 200){
                    toast(json.response)
                    handleModal();
                    window.location.replace('');
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
                Asegurece de haber revisado los documentos del usuario: {data.usuario},
                 y proceda a verificarla o denegar esta solicitud
            </p>

            <div className="col-md-12">
                
                <div className="input-box pb--20">
                <label
                        htmlFor="codigo_pais"
                        className="form-label"
                    >
                        Estatus
                    </label>

                    <select 
                        name="status" id="status" aria-label="Default select example"
                        {...register("status", {
                            required:
                                "Debe seleccionar un Codigo de Pais",
                        })}>
                        <option value="">Debe seleccionar una opcion</option>
                        <option value="2">Verificada</option>
                        <option value="3">Denegada</option>
                    </select>
                    {errors.status && (
                        <ErrorText>
                            {errors.status?.message}
                        </ErrorText>
                    )}
                </div> 
            </div>
            <div className="report-form-box">
                <h6 className="title">Mensaje</h6>
                <textarea name="mensaje" placeholder="Escribe el mensaje" 
                        {...register("mensaje", {
                        })}/>
                
                <div className="report-button">
                    <Button size="medium" className="mr--10 w-auto" type="submit">
                        Validar
                    </Button>
                    
                </div>
            </div>
            </form>
        </Modal.Body>
    </Modal>
    )
};

ProcesarVeriModal.propTypes = {
    show: PropTypes.bool.isRequired,
    handleModal: PropTypes.func.isRequired,
};
export default ProcesarVeriModal;
