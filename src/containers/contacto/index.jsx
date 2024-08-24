import PropTypes from "prop-types";
import clsx from "clsx";
import Button from "@ui/button";

const ContactArea = ({ className, space }) => (
    <div
        className={clsx(
            "rn-privacy-policy-area",
            space === 1 && "rn-section-gapTop",
            className
        )}
    >
        <div className="container">
            <div className="row mb_dec--50">
                <div className="offset-lg-2 col-lg-8 ">
                    <div className="privacy-wrapper">
                        
                        <h4 className="text-center">Contacto</h4>

                        <br />
                        <br />
                        <h5>Consultas sobre Uso Ilícito de Datos</h5>
                        <p>Si tiene alguna consulta relacionada con el uso indebido de sus datos personales, email, quejas o preguntas generales sobre nuestro sitio web por favor envíe un correo electrónico a: contact@ubunnies.com</p>
                        <p>Estamos comprometidos a proteger su privacidad y a brindarle el soporte necesario para cualquier inquietud que pueda tener.</p>
                        <h5>Asistencia Técnica</h5>
                        <p>Para asistencia técnica, por favor diríjase a: support@ubunnies.com                        </p>


                    </div>
                </div>
            </div>
            <div className="row mt--50">
                <div className="offset-lg-2 col-lg-8">
                   
                </div>
            </div>
        </div>
    </div>
);

ContactArea.propTypes = {
    className: PropTypes.string,
    space: PropTypes.oneOf([1]),
};
ContactArea.defaultProps = {
    space: 1,
};

export default ContactArea;
