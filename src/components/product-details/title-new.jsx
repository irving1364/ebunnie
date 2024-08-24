import PropTypes from "prop-types";
import clsx from "clsx";
import ShareDropdown from "../share-dropdown";
import { FaShare } from "react-icons/fa";

const ProductTitleNuevo = ({ className, title, usuario }) => (
    <div className={clsx("pd-title-area", className)}>
        <h4 className="title">{title}</h4>
        <div className="pd-react-area">
            <div className="heart-count">
                <FaShare />
                <span>Compartir</span>
            </div>
            {/*sirve para compartir  <div className="count">
                <ShareDropdown />
            </div>*/}
        </div>
    </div>
);

ProductTitleNuevo.propTypes = {
    className: PropTypes.string,
    title: PropTypes.string.isRequired,
    likeCount: PropTypes.number,
};

ProductTitleNuevo.defaultProps = {
    likeCount: 0,
};

export default ProductTitleNuevo;
