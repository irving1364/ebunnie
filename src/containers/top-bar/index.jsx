/* eslint-disable no-console */
import { useEffect, useState } from "react";
import Web3 from "web3";
import SearchForm from "@components/search-form/layout-03";
import Anchor from "@ui/anchor";
import Button from "@ui/button";
import ColorSwitcher from "@components/color-switcher";
import BurgerButton from "@ui/burger-button";
import FlyoutSearchForm from "@components/search-form/layout-02";
import MobileMenu from "@components/menu/mobile-menu-02";
import UserDropdown from "@components/user-dropdown";
import { useOffcanvas, useFlyoutSearch } from "@hooks";
import { useLocalStorage } from "src/hooks/use-local-storage";

import UserLogDropdown from "@components/user-log-dropdown";

// Demo Data
import menuChica from "../../data/general/menu-02.json";
import menuAdministrador from "../../data/general/menu-05.json";

const TopBarArea = () => {
    const { search, searchHandler } = useFlyoutSearch();
    const { offcanvas, offcanvasHandler } = useOffcanvas();
    // const { authenticate, isAuthenticated } = useMoralis();
     console.log(useLocalStorage("usuario"))
    const [load, setLoad] = useState(false); 
    const [usuario, setUsuario] = useLocalStorage("usuario");
    const [tipo_usuario, setTipoUsuario] = useLocalStorage("tipo_usuario");
    
    const [logueado, setLogueado] = useState(false); 
    
    useEffect(() => {
        setLoad(true)
    }, []);

    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [ethBalance, setEthBalance] = useState("");

    const detectCurrentProvider = () => {
        let provider;
        if (window.ethereum) {
            provider = window.ethereum;
        } else if (window.web3) {
            provider = window.web3.currentProvider;
        } else {
            console.log(
                "Non-ethereum browser detected. You should install Metamask"
            );
        }
        return provider;
    };

    const onConnect = async () => {
        try {
            const currentProvider = detectCurrentProvider();
            if (currentProvider) {
                await currentProvider.request({
                    method: "eth_requestAccounts",
                });
                const web3 = new Web3(currentProvider);
                const userAccount = await web3.eth.getAccounts();
                const account = userAccount[0];
                const getEthBalance = await web3.eth.getBalance(account);
                setEthBalance(getEthBalance);
                setIsAuthenticated(true);
            }
        } catch (err) {
            console.log(err);
        }
    };

    const onDisconnect = () => {
        setIsAuthenticated(false);
    };




    if(load) {
        console.log(usuario);
        if(usuario == 'undefined'){
            setLogueado(true)         
        }
       
        
        console.log(logueado);
            return (
        <>
            <div className="rn-top-bar-area">
              
                <div className="contact-area">
              

                            {usuario && (
                                <div className="setting-option header-btn">
                                    <div className="icon-box">
                                        <Button
                                            color="primary-alta"
                                            className="connectBtn"
                                            size="small"
                                            onClick={onConnect}
                                        >
                                            ANÚNCIATE 
                                        </Button>
                                    </div>
                                </div>
                            )}
                            
                        
                        

                            {usuario != undefined  &&
                                <div className="setting-option rn-icon-list user-account">
                                    <UserDropdown onDisconnect={onDisconnect}
                                        ethBalance={ethBalance} />
                                </div>
                            }

                            {usuario === undefined &&
                                <div className="setting-option rn-icon-list user-account">
                                    <UserLogDropdown />
                                </div>
                            }


                    <div className="setting-option mobile-menu-bar ml--5 d-block d-lg-none">
                        <div className="hamberger icon-box">
                            <BurgerButton onClick={offcanvasHandler} />
                        </div>
                    </div>
                    <div
                        id="my_switcher"
                        className="my_switcher setting-option"
                    >
                        <ColorSwitcher />
                    </div>
                </div>
            </div>
            {tipo_usuario == "2" &&
                <MobileMenu
                    menu={menuChica}
                    isOpen={offcanvas}
                    onClick={offcanvasHandler}
                    logo={[
                        { src: "/logo.png" },
                        { src: "/logo-negro.png" },
                    ]}
                />
            }
            {tipo_usuario == "3" &&
                <MobileMenu
                    menu={menuAdministrador}
                    isOpen={offcanvas}
                    onClick={offcanvasHandler}
                    logo={[
                        { src: "/logo.png" },
                        { src: "/logo-negro.png" },
                    ]}
                />
            }
        </>
    )};
};

export default TopBarArea;
