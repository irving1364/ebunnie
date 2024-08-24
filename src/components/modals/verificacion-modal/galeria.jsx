import Button from "@ui/button";
import PropTypes from "prop-types";
import Modal from "react-bootstrap/Modal";

const VerificacionGaleriaModal = ({ show, handleModal, data }) => (
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
                <h5 className="title">REGLAS DE GALERÍA</h5>
                <div className="bid-content">
                    
                  <ul>
                    <li>Complete los “datos básicos” de su perfil para activar su cuenta con el plan “FREE”.</li>
                    <li>Suba al menos la foto de Portada para que su anuncio sea visible.</li>
                    <li> Dimensiones mínimas para fotos y videos:</li>
                    <ul>
                        <li><b>Formato Vertical:</b> 400x600 píxeles (recomendado) Similar al estilo de instagram</li>
                        <li><b>Formato Horizontal:</b> 500x375 píxeles (puede distorsionarse). Ten en cuenta que nuestra plataforma está optimizada para formatos verticales.</li>
                    </ul>
                  </ul>

                  <h6>RECOMENDACIONES:</h6>
                  <ul>
                    <li>No suba fotos con textos de odio, engañosos o fuera de temática.</li>
                    <li>Las fotos falsas marcarán su perfil como SOSPECHOSO e inactivo hasta que realice su verificación “VERIFIED 100%”.</li>
                    <li>Recomendamos subir fotos y videos en formato vertical, tus publicaciones se verán perfectas.</li>
                  </ul>
                 
                </div>
                <div className="bit-continue-button">
                 
                 
                </div>
            </div>
        </Modal.Body>
    </Modal>
);

VerificacionGaleriaModal.propTypes = {
    show: PropTypes.bool.isRequired,
    handleModal: PropTypes.func.isRequired,
    data: PropTypes.shape({
        image: PropTypes.shape({}),
        title: PropTypes.string,
    }),
};
export default VerificacionGaleriaModal;
