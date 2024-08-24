import PropTypes from "prop-types";
import Image from "next/image";
import Anchor from "@ui/anchor";
import { useLocalStorage } from "src/hooks/use-local-storage";
import { setDescripcion, usePerfilStore } from "@utils/paqueteStore";
import { useEffect, useState } from "react";

const UserDropdown = ({ onDisconnect, ethBalance }) => {
    const [tipoUsuario, settipoUsuario] = useLocalStorage("tipo_usuario");
    const [usuario, setUsuario] = useLocalStorage("usuario");
    const [correo, setCorreo] = useLocalStorage("correo");
    const [perfilList, setPerfilList] = useState(undefined);

    console.log(onDisconnect)

    const text = usePerfilStore( state => state.descripncion_paquete);
    //console.log(text);

    useEffect(() => {
        obtenerDatosPerfil();
      }, []);

      const obtenerDatosPerfil = async () => {
        var requestOptionsPerfil = {
            method: 'POST',
            body: JSON.stringify({
                token: localStorage.getItem("tokens")
           }),
          };

        const data6 = await fetch(process.env.url + "perfil/getPerfil", requestOptionsPerfil)
        const result6 = await data6.json();
        setPerfilList(result6.perfil)
       
    }    

    if(perfilList){
    //    console.log('entras')
    //    console.log(perfilList.paquete_activo); 
        if(perfilList.paquete_activo == "1"){
            setDescripcion("BASIC");
        }
        if(perfilList.paquete_activo == "2"){
            setDescripcion("VERIFIED");
        }
        if(perfilList.paquete_activo == "3"){
            setDescripcion("VIP");
        }
        if(perfilList.paquete_activo == "4"){
            setDescripcion("STAR BUNNIE");
        }
    }
    //console.log(perfilList);
    
    return (
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
            <div className="rn-inner-top">
                <h4 className="title">
                    <Anchor path="/perfil">{usuario}</Anchor>
                </h4>
                <span>
                    <Anchor path="/perfil">{correo}</Anchor>
                </span>
                <span>
                
                </span>
            </div>
            
            <h6>{text}</h6>

            <ul className="list-inner ">
            
            
            {
                tipoUsuario ==='1' &&  <li className="--mt--10"><a href="/perfil-miembro">Perfil</a> </li>
            } 
            {
                tipoUsuario ==='2' && 
                    <>
                        <li><a href="/perfil">Perfil</a> 
                        </li>
                        <li><a href={"/anuncio/" + usuario}>Mi anuncio</a> 
                        </li>
                    </>
            } 
            {
                tipoUsuario ==='3' &&  <li><a href="/perfil-administrador">Perfil</a> </li>
            } 

              {/*   <li><Anchor path="/login">Cerrar</Anchor> </li>
               */}
                <li>
                    <a type="button" href={"/login"}>
                        Cerrar Sesión
                    </a>
                </li>
            </ul>
        </div>
    </div>
    )
};



export default UserDropdown;



/*
import PropTypes from "prop-types";
import Image from "next/image";
import Anchor from "@ui/anchor";
import { useLocalStorage } from "src/hooks/use-local-storage";

const UserDropdown = ({ onDisconnect, ethBalance }) => {
    
    const [usuario, setUsuario] = useLocalStorage("usuario");
    const [correo, setCorreo] = useLocalStorage("correo");


    <div className="icon-box"> 
        <Anchor path="/author">
            <Image
                src="/images/icons/boy-avater.png"
                alt="Images"
                width={38}
                height={38}
            />
        </Anchor>
        <div className="rn-dropdown">
            <div className="rn-inner-top">
                <h4 className="title">
                    <Anchor path="/product">usuario</Anchor>
                </h4>
                <span>
                    <Anchor path="/product">correo</Anchor>
                </span>
            </div>
            
           
            <ul className="list-inner">
                <li>
                    <Anchor path="/author">Perfil</Anchor>
                </li>
               
                <li>
                    <button type="button" onClick={onDisconnect}>
                        Cerrar Sesión
                    </button>
                </li>
            </ul>
        </div>
    </div>
};

UserDropdown.propTypes = {
    onDisconnect: PropTypes.func.isRequired,
    ethBalance: PropTypes.string,
};

export default UserDropdown;
*/