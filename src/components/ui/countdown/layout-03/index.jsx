import Countdown, { zeroPad } from "react-countdown";
import clsx from "clsx";
import PropTypes from "prop-types";
import Button from "@ui/button";
import { useState } from "react";
import ProcesarCompraModal from "@components/modals/planes-modal";
import Image from "next/image";
import { useRouter } from "next/router";

const CountdownTimer = ({ date, propie, className, usuario }) => {

    const [showBidModal, setShowBidModal] = useState(false);

   
    const handleBidModal = () => {
        setShowBidModal((prev) => !prev);
    
    };   

    const router = useRouter();
    
    const goAnuncio = () => {
        window.location.href = process.env.urlDominio + "anuncio/" + usuario;
    //    router.push('/anuncio/' + usuario)
    };

    
        return (
            <>
                <div className={clsx("countdownInferior", className)} onClick={goAnuncio}>
                <div className="">
                    
                    {date == '2' &&    
                        <>
                            <Image
                                src={"/images/iconos/verified.png"}
                                width={100}
                                height={60}
                                >
                            </Image>
                        </>
                    }
                    {date == '4' &&    
                        <>
                            <Image
                                src={"/images/iconos/verified.png"}
                                width={100}
                                height={60}
                                >
                            </Image>
                        </>
                    }    
                    
                    
                
                </div>
                    
                    
                
                </div>
            </>
        );
};

CountdownTimer.propTypes = {
    date: PropTypes.string.isRequired,
    className: PropTypes.string,
};

export default CountdownTimer;
