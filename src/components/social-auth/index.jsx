import PropTypes from "prop-types";
import clsx from "clsx";
import Image from "next/image";

const SocialAuth = ({ className, title }) => (
    <div className={clsx("social-share-media form-wrapper-one", className)}>
        <h6>{title}</h6>
        <p>Somos un sitio web para adultos y por ende debemos cumplir con reglas para poder ser legales.</p>
        <button type="button" className="another-login login-facebook">
            <span className="small-image">

            </span>
            <span>No permitimos menores de edad</span>
        </button>
        <button type="button" className="another-login login-facebook">
            <span className="small-image">

            </span>
            <span>No a la violencia</span>
        </button>
        <button type="button" className="another-login login-facebook">
            <span className="small-image">

            </span>
            <span>No a la discriminación</span>
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

SocialAuth.propTypes = {
    className: PropTypes.string,
    title: PropTypes.string.isRequired,
};
export default SocialAuth;
