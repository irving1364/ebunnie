import PropTypes from "prop-types";
import clsx from "clsx";
import RecuperarForm from "@components/recuperar-form";
import SocialAuth from "@components/social-auth";
import RecuperarClave from "@components/social-auth/recuperar";

const RecuperarArea = ({ className, space }) => (
    <div
        className={clsx(
            "login-area",
            space === 1 && "rn-section-gapTop",
            className
        )}
    >
        <div className="container">
            <div className="row g-5">
                <div className=" offset-2 col-lg-4 col-md-6 ml_md--0 ml_sm--0 col-sm-12">
                    <RecuperarForm />
                </div>
                <div className="col-lg-4 col-md-6 col-sm-12">
                    <RecuperarClave title="Recuerde que" />
                </div>
            </div>
        </div>
    </div>
);

RecuperarArea.propTypes = {
    className: PropTypes.string,
    space: PropTypes.oneOf([1]),
};

RecuperarArea.defaultProps = {
    space: 1,
};
export default RecuperarArea;
