import PropTypes from "prop-types";
import Modal from "react-bootstrap/Modal";
import Button from "@ui/button";
import { useForm } from "react-hook-form";
import ErrorText from "@ui/error-text";
import { useLocalStorage } from "src/hooks/use-local-storage";
import { toast } from "react-toastify";
import { useRouter } from "next/router";

const VerImagenModal = ({ show, handleModal, data }) => {
    
    console.log(data)

    const [token, setToken] = useLocalStorage("tokens");
    const router = useRouter();

    console.log(typeof data) // number

    if( typeof data != "object") {

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
        
        <Modal.Body>
            
        {data && 
            <>

            {(data.includes(".jpg") || data.includes(".png") || data.includes(".jpeg")) &&     
                <>
                    <img
                        width={400} height={500}
                        id="multimedia_1"
                        src={data}
                        alt=""
                        data-black-overlay="6"
                    />                   
                </>
                }

                {(data.includes(".mp4") || data.includes(".avi") || data.includes(".WMV")) &&     
                    <>
                        <video id="multimedia_1"  controls muted data-black-overlay="6" width={400} height={500}>
                            <source type="video/mp4" src={data}></source>
                        </video>
                    </>
                }
                </>
        }

        </Modal.Body>
    </Modal>
    )}
};

VerImagenModal.propTypes = {
    show: PropTypes.bool.isRequired,
    handleModal: PropTypes.func.isRequired,
};
export default VerImagenModal;
