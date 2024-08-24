import Countdown, { zeroPad } from "react-countdown";
import clsx from "clsx";
import PropTypes from "prop-types";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";

const CountdownTimer = ({ date, className, usuario }) => {
        
    const router = useRouter();
    
    const goAnuncio = () => {
        window.location.href = process.env.urlDominio + "anuncio/" + usuario;
    //    router.push('/anuncio/' + usuario)
    };


        return (
           
           
            <div className={clsx("countdownSuperior", className)}  onClick={goAnuncio}>
                <div className="">                    
                    {date == '4' &&    
                        <>
                            <Image
                                className="imagenContador"
                                src={"/images/iconos/start.png"}
                                width={500}
                                height={100}
                                >
                            </Image>
                        
                        </>
                    }
                    {date == '3' &&    
                        <>
                            <Image
                                className="imagenContador"
                                src={"/images/iconos/VIP.png"}
                                width={500}
                                height={100}
                                >
                            </Image>
                        </>
                    }  
                </div>
            </div>
        );
    
};

CountdownTimer.propTypes = {
    date: PropTypes.string.isRequired,
    className: PropTypes.string,
};

export default CountdownTimer;
