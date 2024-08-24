import PropTypes from "prop-types";
import Image from "next/image";
import Anchor from "@ui/anchor";

const UserLogDropdown = ({ onDisconnect, ethBalance }) => (
    <div className="icon-box">
        <Anchor path="/">
            <Image
                src="/images/icons/boy-avater.png"
                alt="Images"
                width={38}
                height={38}
            />
        </Anchor>
        <div className="rn-dropdown">
           
            
            <ul className="list-inner">
                <li>
                    <Anchor path="/login">Iniciar Sesión</Anchor>
                </li>
                <li>
                    <Anchor path="/registrarse">Registrarse</Anchor>
                </li>
                
            </ul>
        </div>
    </div>
);



export default UserLogDropdown;
