import PropTypes from "prop-types";
import clsx from "clsx";
import Image from "next/image";

const RecuperarClave = ({ className, title }) => (
    <div className={clsx("social-share-media form-wrapper-one", className)}>
        <h6>{title}</h6>
        <p>Su contraseña sera enviada a su correo electrónico con el cual se registro en la plataforma.</p>
        <button type="button" className="another-login login-facebook">
            <span className="small-image">

            </span>
            <span>No comparta su información</span>
        </button>
        
        {/* 
        <button type="button" className="another-login login-facebook">
            <span className="small-image">
                <Image
                    src="/images/icons/google.png"
                    alt="google login"
                    width={26}
                    height={27}
                />
            </span>
            <span>Log in with Google</span>
        </button>*/}
    </div>
);

RecuperarClave.propTypes = {
    className: PropTypes.string,
    title: PropTypes.string.isRequired,
};
export default RecuperarClave;
