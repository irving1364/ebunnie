import Button from "@ui/button";
import PropTypes from "prop-types";
import Modal from "react-bootstrap/Modal";

const VerificacionModal = ({ show, handleModal, data }) => (
    <Modal
        className="rn-popup-modal "
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
        <Modal.Body>
            <div className="placebid-form-box">
                <h5 className="title">REGLAS DE VERIFICACIÓN</h5>
                <div className="bid-content">
                    <div className="bid-content-top">
                       <p className="small">Complete el proceso de verificación para aumentar sus visitas de perfil y llamadas telefónicas. Su foto de perfil recibirá un sello de "VERIFIED", asegurando a otros usuarios su autenticidad.
</p>
                    </div>
                    <br />
                  <h6>Pasos para la verificación:</h6>
                  <ul>
                    <li>Enviar dos fotos: una de perfil y otra tipo selfie mostrando su rostro y sosteniendo un papel con el texto "UBUNNIE - 2024/09/14".</li>
                    <li>Adjuntar un video de máximo 5 segundos de cuerpo completo, preferentemente girando, mencionando que es una persona real.</li>
                  </ul>

                  <h6>Rechazo de solicitudes:</h6>
                  <ul>
                    <li>Fotografías o videos con demasiados filtros o ediciones.</li>
                    <li>Contenido generado con inteligencia artificial.</li>
                  </ul>
                    <p className="small">En caso de rechazo, se notificará y podrá presentar un documento de identidad o seguir las instrucciones enviadas a su número de teléfono. Asegúrese de que sus fotos y videos estén bien iluminados y visibles para evitar rechazo.</p>
                
                    <h6>Tiempos y notificaciones:</h6>
                  <ul>
                    <li>Permítanos 24 horas para completar el proceso de verificación. Si no recibe su insignia, su solicitud fue rechazada.</li>
                    <li>No solicitamos fotos ni videos por WhatsApp; las notificaciones serán enviadas a través del sitio web oficial</li>
                    <li>No solicitamos fotos de cédula de identidad ni pasaporte, excepto si se necesita verificar su identidad tras un rechazo.</li>
                  </ul>
                
                  <p className="small">Nuestra prioridad es mantener la privacidad de sus datos personales.</p>
                </div>
                <div className="bit-continue-button">
                 
                 
                </div>
            </div>
        </Modal.Body>
    </Modal>
);

VerificacionModal.propTypes = {
    show: PropTypes.bool.isRequired,
    handleModal: PropTypes.func.isRequired,
    data: PropTypes.shape({
        image: PropTypes.shape({}),
        title: PropTypes.string,
    }),
};
export default VerificacionModal;
