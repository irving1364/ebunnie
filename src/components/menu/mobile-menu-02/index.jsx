import PropTypes from "prop-types";
import { Offcanvas, OffcanvasHeader, OffcanvasBody } from "@ui/offcanvas";
import Logo from "@components/logo";
import { Link } from "react-scroll";
import { useRouter } from "next/router";

const MobileMenu = ({ isOpen, onClick, menu, logo }) => {
    const router = useRouter();
    
    const irInicio = () => {
        router.push({
            pathname: "/",
        });
    };
    return (
    <Offcanvas isOpen={isOpen} onClick={onClick}>
        <OffcanvasHeader onClick={onClick}>
            <Logo logo={logo} />
        </OffcanvasHeader>
        <OffcanvasBody>
            <nav>
                <ul className="mainmenu">
                    {menu?.map((nav) => (
                        <li id={nav.id} key={nav.id}>
                            <Link
                                activeClass="active"
                                className="nav-link smoth-animation"
                                href={`#${nav.path}`}
                                to={nav.path}
                                spy
                                smooth
                                offset={-50}
                                duration={500}
                                onClick={onClick}
                            >
                                {nav.text}
                            </Link>
                        </li>
                    ))}
                    <li id={100} key={100}>
                            <a
                                activeClass="active"
                                className="nav-link smoth-animation"
                                spy
                                smooth
                                offset={-50}
                                duration={500}
                                onClick={irInicio}
                            >
                                Inicio
                            </a>
                        </li>

                </ul>
            </nav>
        </OffcanvasBody>
    </Offcanvas>
)}

MobileMenu.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onClick: PropTypes.func.isRequired,
    menu: PropTypes.arrayOf(PropTypes.shape({})),
    logo: PropTypes.arrayOf(
        PropTypes.shape({
            src: PropTypes.string.isRequired,
            alt: PropTypes.string,
        })
    ),
};

export default MobileMenu;
