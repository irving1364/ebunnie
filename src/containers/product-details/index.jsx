import PropTypes from "prop-types";
import clsx from "clsx";
import Sticky from "@ui/sticky";
import Button from "@ui/button";
import GalleryTab from "@components/product-details/gallery-tab";
import ProductTitle from "@components/product-details/title";
import ProductCategory from "@components/product-details/category";
import ProductCollection from "@components/product-details/collection";
import BidTab from "@components/product-details/bid-tab";
import PlaceBet from "@components/product-details/place-bet";
import { ImageType } from "@utils/types";
import { useState, useEffect } from "react";
import { MdDeleteForever } from "react-icons/md";
import VerImagenModal from "@components/modals/galeria/";
import Image from "next/image";
import ProductTitleNuevo from "@components/product-details/title-new";
import { FaPhone } from "react-icons/fa6";
import { FaWhatsapp } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { FaCheck } from "react-icons/fa";
import { AiOutlineClose } from "react-icons/ai";


// Demo Image

const ProductDetailsArea = ({ space, className, product, servicios, tarifas }) => {
    
    console.log(product)
    const [data, setData] = useState(product);
    const [serviciosList, setDataServicios] = useState(servicios);
    const [tarifasList, setDataTarifas] = useState(tarifas);
    const [direccion, setDireccion] = useState(process.env.urlArchivos);
    console.log(direccion)
    const [isLoad, setIsLoad] = useState(false); 
    const [archivoSelect, setArchivoSelect] = useState(""); 
    
    const [showBidModal, setShowBidModal] = useState(false);
    
    useEffect(() => {
        setIsLoad(true);
      }, []);

      
    const handleBidModal = (te) => {
        console.log(te);
        setArchivoSelect(te);
        setShowBidModal((prev) => !prev);
    };

    console.log(data)
    
    

    if (data ) {
        
        if(data.activo == "2"){
            return(
                <div
                    className={clsx(
                        "product-details-area",
                        space === 1 && "rn-section-gapTop",
                        className
                    )}
                >
                    <div className="container">
                        <div className="row g-5"></div>
                            <h4> Este usuario por no cumplir con nuestos términos y politicas ha sido baneado 
                                de nuestra aplicación. </h4>

                    </div>
                </div>
            )
        }else{
        
        return(
        <>    
        <div
            className={clsx(
                "product-details-area",
                space === 1 && "rn-section-gapTop",
                className
            )}
        >
            <div className="container">
                <div className="row g-5">

                <h1>
                    {data.nombre}
                    {data.paquete_activo == '4' &&    
                        <>
                            <Image
                                src={"/images/iconos/start.png"}
                                width={100}
                                height={100}
                                >
                            </Image>
                        </>
                    }    
                    {data.paquete_activo == '3' &&    
                        <>
                            <Image
                                src={"/images/iconos/VIP.png"}
                                width={100}
                                height={100}
                                >
                            </Image>
                        </>
                    }
                    {data.paquete_activo == '2' &&    
                        <>
                            <Image
                                src={"/images/iconos/verified.png"}
                                width={100}
                                height={100}
                                >
                            </Image>
                        </>
                    }  
                    
                       
                    
                
                </h1>
                

                {data.paquete_activo == "1" &&
                        <>
                            {data.fotografia_portada != '' && 
                            <div className="col-md-3">
                                <div className="upload-area-galeria pb--20">
                                    <div className="brows-file-wrapper2">

                                        
                                        <>
                                        <img
                                                id="createfileImagePortada"
                                                src={direccion + data.fotografia_portada}
                                                alt=""
                                                data-black-overlay="6"
                                            />
                                        <label
                                            htmlFor="createfileImagePortada"
                                            title="No File Choosen"
                                            onClick={() => handleBidModal(direccion + data.fotografia_portada)}
                                    >    
                                        </label>
                                        </>
                                    
                                    </div>
                                </div>
                            </div>
                            }   

                            {data.multimedia_1 != '' &&    
                                    <>
                            <div className="col-md-3">
                                <div className="upload-area-galeria pb--20">
                                    <div className="brows-file-wrapper2">   
                                    {data.multimedia_1 != '' &&     
                                        <>
                                            {(data.multimedia_1.includes(".jpg") || data.multimedia_1.includes(".png") || data.multimedia_1.includes(".jpeg")) &&     
                                              
                                            <>
                                                <img
                                                    id="multimedia_1"
                                                    src={direccion + data.multimedia_1}
                                                    alt=""
                                                    data-black-overlay="6"
                                                />
                                                
                                                <label
                                                    htmlFor="multimedia_1"
                                                    title="Ver"
                                                    onClick={() => handleBidModal(direccion + data.multimedia_1)}
                                            >       
                                                </label>
                                            </>
                                            }
                                            {(data.multimedia_1.includes(".mp4") || data.multimedia_1.includes(".avi") || data.multimedia_1.includes(".WMV")) &&     
                                            
                                                <>
                                                    <video id="multimedia_1"  controls muted data-black-overlay="6">
                                                        <source type="video/mp4" src={direccion + data.multimedia_1}></source>
                                                    </video>

                                                    <label
                                                        htmlFor="multimedia_1"
                                                        title="No File Choosen"
                                                        onClick={() => handleBidModal(direccion + data.multimedia_1)}
                                                > 
                                                    </label>
                                                </>
                                            }
                                        </>    

                                    }    
                                    </div>
                                </div>
                            </div>
                            </>
                            }
                        </>
                    }


                {data.paquete_activo == "2" &&
                        <>
                            {data.fotografia_portada != '' && 
                            <div className="col-md-3">
                                <div className="upload-area-galeria pb--20">
                                    <div className="brows-file-wrapper2">

                                        
                                        <>
                                        <img
                                                id="createfileImagePortada"
                                                src={direccion + data.fotografia_portada}
                                                alt=""
                                                data-black-overlay="6"
                                            />
                                        <label
                                            htmlFor="createfileImagePortada"
                                            title="No File Choosen"
                                            onClick={() => handleBidModal(direccion + data.fotografia_portada)}
                                    >    
                                        </label>
                                        </>
                                    
                                    </div>
                                </div>
                            </div>
                            }   

                            {data.multimedia_1 != '' &&    
                                    <>
                            <div className="col-md-3">
                                <div className="upload-area-galeria pb--20">
                                    <div className="brows-file-wrapper2">   
                                    {data.multimedia_1 != '' &&     
                                        <>
                                            {(data.multimedia_1.includes(".jpg") || data.multimedia_1.includes(".png") || data.multimedia_1.includes(".jpeg")) &&     
                                              
                                            <>
                                                <img
                                                    id="multimedia_1"
                                                    src={direccion + data.multimedia_1}
                                                    alt=""
                                                    data-black-overlay="6"
                                                />
                                                
                                                <label
                                                    htmlFor="multimedia_1"
                                                    title="Ver"
                                                    onClick={() => handleBidModal(direccion + data.multimedia_1)}
                                            >       
                                                </label>
                                            </>
                                            }
                                            {(data.multimedia_1.includes(".mp4") || data.multimedia_1.includes(".avi") || data.multimedia_1.includes(".WMV")) &&     
                                            
                                                <>
                                                    <video id="multimedia_1"  controls muted data-black-overlay="6">
                                                        <source type="video/mp4" src={direccion + data.multimedia_1}></source>
                                                    </video>

                                                    <label
                                                        htmlFor="multimedia_1"
                                                        title="No File Choosen"
                                                        onClick={() => handleBidModal(direccion + data.multimedia_1)}
                                                > 
                                                    </label>
                                                </>
                                            }
                                        </>    

                                    }    
                                    </div>
                                </div>
                            </div>
                            </>
                            }
                            
                            {data.multimedia_2 != '' &&     
                            
                            <div className="col-md-3">
                                    
                                <div className="upload-area-galeria pb--20">
                                    <div className="brows-file-wrapper2">
                                    
                                            {(data.multimedia_2.includes(".jpg") || data.multimedia_2.includes(".png") || data.multimedia_1.includes(".jpeg")) &&     
                                            
                                                
                                            <>
                                                <img
                                                    id="multimedia_2"
                                                    src={direccion + data.multimedia_2}
                                                    alt=""
                                                    data-black-overlay="6"
                                                />
                                                
                                                <label
                                                    htmlFor="multimedia_2"
                                                    title="No File Choosen"
                                                    onClick={() => handleBidModal(direccion + data.multimedia_2)}
                                            >       
                                                </label>
                                            </>
                                            }


                                            {data.multimedia_2.includes(".mp4")  &&     
                                                <>
                                                    <video id="multimedia_2"  controls muted data-black-overlay="6">
                                                        <source type="video/mp4" src={direccion + data.multimedia_2}></source>
                                                    </video>
       
                                                    <label
                                                        htmlFor="multimedia_2"
                                                        title="No File Choosen"
                                                        onClick={() => handleBidModal(direccion + data.multimedia_2)}
                                                >
                                                        
                                                    </label>
                                                </>
                                               

                                    }    
                                    
                                    </div>                                                    
                                </div>
                            </div>
                            }
                             

                             {data.multimedia_3 != '' &&     
                        
                            <div className="col-md-3">
                                
                                    <div className="brows-file-wrapper2">
                                    
                                            {(data.multimedia_3.includes(".jpg") || data.multimedia_3.includes(".png") || data.multimedia_3.includes(".jpeg")) &&     
                                                
                                            <>
                                                <img
                                                    id="multimedia_3"
                                                    src={direccion + data.multimedia_3}
                                                    alt=""
                                                    data-black-overlay="6"
                                                />
                                                
                                                <label
                                                    htmlFor="multimedia_3"
                                                    title="No File Choosen"
                                                    onClick={() => handleBidModal(direccion + data.multimedia_3)}
                                            > 
                                                </label>
                                            </>
                                            }


                                            {data.multimedia_3.includes(".mp4")  &&     
                                                <>
                                                    <video id="multimedia_3"  controls muted data-black-overlay="6">
                                                        <source type="video/mp4" src={direccion + data.multimedia_3}></source>
                                                    </video>
                                                    <label
                                                        htmlFor="multimedia_3"
                                                        title="No File Choosen"
                                                        onClick={() => handleBidModal(direccion + data.multimedia_3)}       
                                                >
                                                        
                                                    </label>
                                                </>
                                            }
                                            

                                        
                                    
                                    </div>                                                    
                                </div>
                                }


                            {data.multimedia_4 != '' &&
                            <div className="col-md-3">
                                <div className="upload-area-galeria pb--20">
                                    <div className="brows-file-wrapper2">
                                            {(data.multimedia_4.includes(".jpg") || data.multimedia_4.includes(".png") || data.multimedia_4.includes(".jpeg")) &&     
                                            <>
                                                <img
                                                    id="multimedia_4"
                                                    src={direccion + data.multimedia_4}
                                                    alt=""
                                                    data-black-overlay="6"
                                                />
                                                
                                                <label
                                                    htmlFor="multimedia_4"
                                                    title="No File Choosen"
                                                    onClick={() => handleBidModal(direccion + data.multimedia_4)}
                                            >
                                                </label>
                                            </>
                                            }
                                            {data.multimedia_4.includes(".mp4")  &&     
                                                <>
                                                    <video id="multimedia_4"  controls muted data-black-overlay="6">
                                                        <source type="video/mp4" src={direccion + data.multimedia_4}></source>
                                                    </video>       
                                                    <label
                                                        htmlFor="multimedia_4"
                                                        title="No File Choosen"
                                                        onClick={() => handleBidModal(direccion + data.multimedia_4)} 
                                                >
                                                    </label>
                                                </>
                                            }
                                    </div>                                                    
                                </div>
                            </div>
                            }

                        </>
                    }



                {data.paquete_activo == "3" &&
                        <>
                            {data.fotografia_portada != '' && 
                            <div className="col-md-3">
                                <div className="upload-area-galeria pb--20">
                                    <div className="brows-file-wrapper2">

                                        
                                        <>
                                        <img
                                                id="createfileImagePortada"
                                                src={direccion + data.fotografia_portada}
                                                alt=""
                                                data-black-overlay="6"
                                            />
                                        <label
                                            htmlFor="createfileImagePortada"
                                            title="No File Choosen"
                                            onClick={() => handleBidModal(direccion + data.fotografia_portada)}
                                    >    
                                        </label>
                                        </>
                                    
                                    </div>
                                </div>
                            </div>
                            }   

                            {data.multimedia_1 != '' &&    
                                    <>
                            <div className="col-md-3">
                                <div className="upload-area-galeria pb--20">
                                    <div className="brows-file-wrapper2">   
                                    {data.multimedia_1 != '' &&     
                                        <>
                                            {(data.multimedia_1.includes(".jpg") || data.multimedia_1.includes(".png") || data.multimedia_1.includes(".jpeg")) &&     
                                              
                                            <>
                                                <img
                                                    id="multimedia_1"
                                                    src={direccion + data.multimedia_1}
                                                    alt=""
                                                    data-black-overlay="6"
                                                />
                                                
                                                <label
                                                    htmlFor="multimedia_1"
                                                    title="Ver"
                                                    onClick={() => handleBidModal(direccion + data.multimedia_1)}
                                            >       
                                                </label>
                                            </>
                                            }
                                            {(data.multimedia_1.includes(".mp4") || data.multimedia_1.includes(".avi") || data.multimedia_1.includes(".WMV")) &&     
                                            
                                                <>
                                                    <video id="multimedia_1"  controls muted data-black-overlay="6">
                                                        <source type="video/mp4" src={direccion + data.multimedia_1}></source>
                                                    </video>

                                                    <label
                                                        htmlFor="multimedia_1"
                                                        title="No File Choosen"
                                                        onClick={() => handleBidModal(direccion + data.multimedia_1)}
                                                > 
                                                    </label>
                                                </>
                                            }
                                        </>    

                                    }    
                                    </div>
                                </div>
                            </div>
                            </>
                            }
                            
                            {data.multimedia_2 != '' &&     
                            
                            <div className="col-md-3">
                                    
                                <div className="upload-area-galeria pb--20">
                                    <div className="brows-file-wrapper2">
                                    
                                            {(data.multimedia_2.includes(".jpg") || data.multimedia_2.includes(".png") || data.multimedia_1.includes(".jpeg")) &&     
                                            
                                                
                                            <>
                                                <img
                                                    id="multimedia_2"
                                                    src={direccion + data.multimedia_2}
                                                    alt=""
                                                    data-black-overlay="6"
                                                />
                                                
                                                <label
                                                    htmlFor="multimedia_2"
                                                    title="No File Choosen"
                                                    onClick={() => handleBidModal(direccion + data.multimedia_2)}
                                            >       
                                                </label>
                                            </>
                                            }


                                            {data.multimedia_2.includes(".mp4")  &&     
                                                <>
                                                    <video id="multimedia_2"  controls muted data-black-overlay="6">
                                                        <source type="video/mp4" src={direccion + data.multimedia_2}></source>
                                                    </video>
       
                                                    <label
                                                        htmlFor="multimedia_2"
                                                        title="No File Choosen"
                                                        onClick={() => handleBidModal(direccion + data.multimedia_2)}
                                                >
                                                        
                                                    </label>
                                                </>
                                               

                                    }    
                                    
                                    </div>                                                    
                                </div>
                            </div>
                            }
                             

                             {data.multimedia_3 != '' &&     
                        
                            <div className="col-md-3">
                                
                                    <div className="brows-file-wrapper2">
                                    
                                            {(data.multimedia_3.includes(".jpg") || data.multimedia_3.includes(".png") || data.multimedia_3.includes(".jpeg")) &&     
                                                
                                            <>
                                                <img
                                                    id="multimedia_3"
                                                    src={direccion + data.multimedia_3}
                                                    alt=""
                                                    data-black-overlay="6"
                                                />
                                                
                                                <label
                                                    htmlFor="multimedia_3"
                                                    title="No File Choosen"
                                                    onClick={() => handleBidModal(direccion + data.multimedia_3)}
                                            > 
                                                </label>
                                            </>
                                            }


                                            {data.multimedia_3.includes(".mp4")  &&     
                                                <>
                                                    <video id="multimedia_3"  controls muted data-black-overlay="6">
                                                        <source type="video/mp4" src={direccion + data.multimedia_3}></source>
                                                    </video>
                                                    <label
                                                        htmlFor="multimedia_3"
                                                        title="No File Choosen"
                                                        onClick={() => handleBidModal(direccion + data.multimedia_3)}       
                                                >
                                                        
                                                    </label>
                                                </>
                                            }
                                            

                                        
                                    
                                    </div>                                                    
                                </div>
                                }


                            {data.multimedia_4 != '' &&
                            <div className="col-md-3">
                                <div className="upload-area-galeria pb--20">
                                    <div className="brows-file-wrapper2">
                                            {(data.multimedia_4.includes(".jpg") || data.multimedia_4.includes(".png") || data.multimedia_4.includes(".jpeg")) &&     
                                            <>
                                                <img
                                                    id="multimedia_4"
                                                    src={direccion + data.multimedia_4}
                                                    alt=""
                                                    data-black-overlay="6"
                                                />
                                                
                                                <label
                                                    htmlFor="multimedia_4"
                                                    title="No File Choosen"
                                                    onClick={() => handleBidModal(direccion + data.multimedia_4)}
                                            >
                                                </label>
                                            </>
                                            }
                                            {data.multimedia_4.includes(".mp4")  &&     
                                                <>
                                                    <video id="multimedia_4"  controls muted data-black-overlay="6">
                                                        <source type="video/mp4" src={direccion + data.multimedia_4}></source>
                                                    </video>       
                                                    <label
                                                        htmlFor="multimedia_4"
                                                        title="No File Choosen"
                                                        onClick={() => handleBidModal(direccion + data.multimedia_4)} 
                                                >
                                                    </label>
                                                </>
                                            }
                                    </div>                                                    
                                </div>
                            </div>
                            }

                            {data.multimedia_5 != '' &&
                            <div className="col-md-3">
                                <div className="upload-area-galeria pb--20">
                                    <div className="brows-file-wrapper2">
                                           {(data.multimedia_5.includes(".jpg") || data.multimedia_5.includes(".png") || data.multimedia_5.includes(".jpeg")) &&     
                                            <>
                                                <img
                                                    id="multimedia_5"
                                                    src={direccion + data.multimedia_5}
                                                    alt=""
                                                    data-black-overlay="6"
                                                />
                                                
                                                <label
                                                    htmlFor="multimedia_5"
                                                    title="No File Choosen"
                                                    onClick={() => handleBidModal(direccion + data.multimedia_5)}
                                            >       
                                                </label>
                                            </>
                                            }
                                            {data.multimedia_5.includes(".mp4")  &&     
                                                <>
                                                    <video id="multimedia_5"  controls muted data-black-overlay="6">
                                                        <source type="video/mp4" src={direccion + data.multimedia_5}></source>
                                                    </video>                       
                                                    <label
                                                        htmlFor="multimedia_5"
                                                        title="No File Choosen"
                                                        onClick={() => handleBidModal(direccion + data.multimedia_5)}  
                                                >
                                                        
                                                    </label>
                                                </>
                                            }
                                    </div>                                                    
                                </div>
                            </div>
                            }

                            {data.multimedia_6 != '' &&     
                            <div className="col-md-3">
                                <div className="upload-area-galeria pb--20">
                                    <div className="brows-file-wrapper2">
                                            {(data.multimedia_6.includes(".jpg") || data.multimedia_6.includes(".png") || data.multimedia_6.includes(".jpeg")) &&     
                                            <>
                                                <img
                                                    id="multimedia_6"
                                                    src={direccion + data.multimedia_6}
                                                    alt=""
                                                    data-black-overlay="6"
                                                />
                                                <label
                                                    htmlFor="multimedia_6"
                                                    title="No File Choosen"
                                                    onClick={() => handleBidModal(direccion + data.multimedia_6)}
                                            >
                                                </label>
                                            </>
                                            }
                                            {data.multimedia_6.includes(".mp4")  &&     
                                                <>
                                                    <video id="multimedia_6"  controls muted data-black-overlay="6">
                                                        <source type="video/mp4" src={direccion + data.multimedia_6}></source>
                                                    </video>

                                                    <label
                                                        htmlFor="multimedia_6"
                                                        title="No File Choosen"
                                                        onClick={() => handleBidModal(direccion + data.multimedia_6)} 
                                                >
                                                    </label>
                                                </>
                                            }       
                                    </div>                                                    
                                </div>
                            </div>
                            }


                            {data.multimedia_7 != '' &&   
                            <div className="col-md-3">
                                <div className="upload-area-galeria pb--20">
                                    <div className="brows-file-wrapper2">
                                        
                                            {(data.multimedia_7.includes(".jpg") || data.multimedia_7.includes(".png") || data.multimedia_7.includes(".jpeg")) &&     
                                            
                                                
                                            <>
                                                <img
                                                    id="multimedia_7"
                                                    src={direccion + data.multimedia_7}
                                                    alt=""
                                                    data-black-overlay="6"
                                                />
                                                
                                                <label
                                                    htmlFor="multimedia_7"
                                                    title="No File Choosen"
                                                    onClick={() => handleBidModal(direccion + data.multimedia_7)}
                                            >       
                                                </label>
                                            </>
                                            }
                                            {data.multimedia_7.includes(".mp4")  &&     
                                                <>
                                                    <video id="multimedia_7"  controls muted data-black-overlay="6">
                                                        <source type="video/mp4" src={direccion + data.multimedia_7}></source>
                                                    </video>
   
                                                    <label
                                                        htmlFor="multimedia_7"
                                                        title="No File Choosen"
                                                        onClick={() => handleBidModal(direccion + data.multimedia_7)}       
                                                >
                                                    </label>
                                                </>
                                            }
                                    </div>                                                    
                                </div>
                            </div>
                            }


                            {data.multimedia_8 != '' &&     
                            <div className="col-md-3">
                                <div className="upload-area-galeria pb--20">
                                    <div className="brows-file-wrapper2">
                                            {(data.multimedia_8.includes(".jpg") || data.multimedia_8.includes(".png") || data.multimedia_8.includes(".jpeg")) &&     
                                            <>
                                                <img
                                                    id="multimedia_8"
                                                    src={direccion + data.multimedia_8}
                                                    alt=""
                                                    data-black-overlay="6"
                                                />
                                                
                                                <label
                                                    htmlFor="multimedia_8"
                                                    title="No File Choosen"
                                                    onClick={() => handleBidModal(direccion + data.multimedia_8)}
                                            >
                                                </label>
                                            </>
                                            }

                                            {data.multimedia_8.includes(".mp4")  &&     
                                                <>
                                                    <video id="multimedia_8"  controls muted data-black-overlay="6">
                                                        <source type="video/mp4" src={direccion + data.multimedia_8}></source>
                                                    </video>

                                                    <label
                                                        htmlFor="multimedia_8"
                                                        title="No File Choosen"
                                                        onClick={() => handleBidModal(direccion + data.multimedia_8)}  
                                                >
                                                    </label>
                                                </>
                                            }
                                    </div>                                                    
                                </div>
                            </div>                                                
                            }

                        </>
                    }


                    {data.paquete_activo == "4" &&
                        <>
                            {data.fotografia_portada != '' && 
                            <div className="col-md-3">
                                <div className="upload-area-galeria pb--20">
                                    <div className="brows-file-wrapper2">

                                        
                                        <>
                                        <img
                                                id="createfileImagePortada"
                                                src={direccion + data.fotografia_portada}
                                                alt=""
                                                data-black-overlay="6"
                                            />
                                        <label
                                            htmlFor="createfileImagePortada"
                                            title="No File Choosen"
                                            onClick={() => handleBidModal(direccion + data.fotografia_portada)}
                                    >    
                                        </label>
                                        </>
                                    
                                    </div>
                                </div>
                            </div>
                            }   

                            {data.multimedia_1 != '' &&    
                                    <>
                            <div className="col-md-3">
                                <div className="upload-area-galeria pb--20">
                                    <div className="brows-file-wrapper2">   
                                    {data.multimedia_1 != '' &&     
                                        <>
                                            {(data.multimedia_1.includes(".jpg") || data.multimedia_1.includes(".png") || data.multimedia_1.includes(".jpeg")) &&     
                                              
                                            <>
                                                <img
                                                    id="multimedia_1"
                                                    src={direccion + data.multimedia_1}
                                                    alt=""
                                                    data-black-overlay="6"
                                                />
                                                
                                                <label
                                                    htmlFor="multimedia_1"
                                                    title="Ver"
                                                    onClick={() => handleBidModal(direccion + data.multimedia_1)}
                                            >       
                                                </label>
                                            </>
                                            }
                                            {(data.multimedia_1.includes(".mp4") || data.multimedia_1.includes(".avi") || data.multimedia_1.includes(".WMV")) &&     
                                            
                                                <>
                                                    <video id="multimedia_1"  controls muted data-black-overlay="6">
                                                        <source type="video/mp4" src={direccion + data.multimedia_1}></source>
                                                    </video>

                                                    <label
                                                        htmlFor="multimedia_1"
                                                        title="No File Choosen"
                                                        onClick={() => handleBidModal(direccion + data.multimedia_1)}
                                                > 
                                                    </label>
                                                </>
                                            }
                                        </>    

                                    }    
                                    </div>
                                </div>
                            </div>
                            </>
                            }
                            
                            {data.multimedia_2 != '' &&     
                            
                            <div className="col-md-3">
                                    
                                <div className="upload-area-galeria pb--20">
                                    <div className="brows-file-wrapper2">
                                    
                                            {(data.multimedia_2.includes(".jpg") || data.multimedia_2.includes(".png") || data.multimedia_1.includes(".jpeg")) &&     
                                            
                                                
                                            <>
                                                <img
                                                    id="multimedia_2"
                                                    src={direccion + data.multimedia_2}
                                                    alt=""
                                                    data-black-overlay="6"
                                                />
                                                
                                                <label
                                                    htmlFor="multimedia_2"
                                                    title="No File Choosen"
                                                    onClick={() => handleBidModal(direccion + data.multimedia_2)}
                                            >       
                                                </label>
                                            </>
                                            }


                                            {data.multimedia_2.includes(".mp4")  &&     
                                                <>
                                                    <video id="multimedia_2"  controls muted data-black-overlay="6">
                                                        <source type="video/mp4" src={direccion + data.multimedia_2}></source>
                                                    </video>
       
                                                    <label
                                                        htmlFor="multimedia_2"
                                                        title="No File Choosen"
                                                        onClick={() => handleBidModal(direccion + data.multimedia_2)}
                                                >
                                                        
                                                    </label>
                                                </>
                                               

                                    }    
                                    
                                    </div>                                                    
                                </div>
                            </div>
                            }
                             

                             {data.multimedia_3 != '' &&     
                        
                            <div className="col-md-3">
                                
                                    <div className="brows-file-wrapper2">
                                    
                                            {(data.multimedia_3.includes(".jpg") || data.multimedia_3.includes(".png") || data.multimedia_3.includes(".jpeg")) &&     
                                                
                                            <>
                                                <img
                                                    id="multimedia_3"
                                                    src={direccion + data.multimedia_3}
                                                    alt=""
                                                    data-black-overlay="6"
                                                />
                                                
                                                <label
                                                    htmlFor="multimedia_3"
                                                    title="No File Choosen"
                                                    onClick={() => handleBidModal(direccion + data.multimedia_3)}
                                            > 
                                                </label>
                                            </>
                                            }


                                            {data.multimedia_3.includes(".mp4")  &&     
                                                <>
                                                    <video id="multimedia_3"  controls muted data-black-overlay="6">
                                                        <source type="video/mp4" src={direccion + data.multimedia_3}></source>
                                                    </video>
                                                    <label
                                                        htmlFor="multimedia_3"
                                                        title="No File Choosen"
                                                        onClick={() => handleBidModal(direccion + data.multimedia_3)}       
                                                >
                                                        
                                                    </label>
                                                </>
                                            }
                                            

                                        
                                    
                                    </div>                                                    
                                </div>
                                }


                            {data.multimedia_4 != '' &&
                            <div className="col-md-3">
                                <div className="upload-area-galeria pb--20">
                                    <div className="brows-file-wrapper2">
                                            {(data.multimedia_4.includes(".jpg") || data.multimedia_4.includes(".png") || data.multimedia_4.includes(".jpeg")) &&     
                                            <>
                                                <img
                                                    id="multimedia_4"
                                                    src={direccion + data.multimedia_4}
                                                    alt=""
                                                    data-black-overlay="6"
                                                />
                                                
                                                <label
                                                    htmlFor="multimedia_4"
                                                    title="No File Choosen"
                                                    onClick={() => handleBidModal(direccion + data.multimedia_4)}
                                            >
                                                </label>
                                            </>
                                            }
                                            {data.multimedia_4.includes(".mp4")  &&     
                                                <>
                                                    <video id="multimedia_4"  controls muted data-black-overlay="6">
                                                        <source type="video/mp4" src={direccion + data.multimedia_4}></source>
                                                    </video>       
                                                    <label
                                                        htmlFor="multimedia_4"
                                                        title="No File Choosen"
                                                        onClick={() => handleBidModal(direccion + data.multimedia_4)} 
                                                >
                                                    </label>
                                                </>
                                            }
                                    </div>                                                    
                                </div>
                            </div>
                            }

                            {data.multimedia_5 != '' &&
                            <div className="col-md-3">
                                <div className="upload-area-galeria pb--20">
                                    <div className="brows-file-wrapper2">
                                           {(data.multimedia_5.includes(".jpg") || data.multimedia_5.includes(".png") || data.multimedia_5.includes(".jpeg")) &&     
                                            <>
                                                <img
                                                    id="multimedia_5"
                                                    src={direccion + data.multimedia_5}
                                                    alt=""
                                                    data-black-overlay="6"
                                                />
                                                
                                                <label
                                                    htmlFor="multimedia_5"
                                                    title="No File Choosen"
                                                    onClick={() => handleBidModal(direccion + data.multimedia_5)}
                                            >       
                                                </label>
                                            </>
                                            }
                                            {data.multimedia_5.includes(".mp4")  &&     
                                                <>
                                                    <video id="multimedia_5"  controls muted data-black-overlay="6">
                                                        <source type="video/mp4" src={direccion + data.multimedia_5}></source>
                                                    </video>                       
                                                    <label
                                                        htmlFor="multimedia_5"
                                                        title="No File Choosen"
                                                        onClick={() => handleBidModal(direccion + data.multimedia_5)}  
                                                >
                                                        
                                                    </label>
                                                </>
                                            }
                                    </div>                                                    
                                </div>
                            </div>
                            }

                            {data.multimedia_6 != '' &&     
                            <div className="col-md-3">
                                <div className="upload-area-galeria pb--20">
                                    <div className="brows-file-wrapper2">
                                            {(data.multimedia_6.includes(".jpg") || data.multimedia_6.includes(".png") || data.multimedia_6.includes(".jpeg")) &&     
                                            <>
                                                <img
                                                    id="multimedia_6"
                                                    src={direccion + data.multimedia_6}
                                                    alt=""
                                                    data-black-overlay="6"
                                                />
                                                <label
                                                    htmlFor="multimedia_6"
                                                    title="No File Choosen"
                                                    onClick={() => handleBidModal(direccion + data.multimedia_6)}
                                            >
                                                </label>
                                            </>
                                            }
                                            {data.multimedia_6.includes(".mp4")  &&     
                                                <>
                                                    <video id="multimedia_6"  controls muted data-black-overlay="6">
                                                        <source type="video/mp4" src={direccion + data.multimedia_6}></source>
                                                    </video>

                                                    <label
                                                        htmlFor="multimedia_6"
                                                        title="No File Choosen"
                                                        onClick={() => handleBidModal(direccion + data.multimedia_6)} 
                                                >
                                                    </label>
                                                </>
                                            }       
                                    </div>                                                    
                                </div>
                            </div>
                            }


                            {data.multimedia_7 != '' &&   
                            <div className="col-md-3">
                                <div className="upload-area-galeria pb--20">
                                    <div className="brows-file-wrapper2">
                                        
                                            {(data.multimedia_7.includes(".jpg") || data.multimedia_7.includes(".png") || data.multimedia_7.includes(".jpeg")) &&     
                                            
                                                
                                            <>
                                                <img
                                                    id="multimedia_7"
                                                    src={direccion + data.multimedia_7}
                                                    alt=""
                                                    data-black-overlay="6"
                                                />
                                                
                                                <label
                                                    htmlFor="multimedia_7"
                                                    title="No File Choosen"
                                                    onClick={() => handleBidModal(direccion + data.multimedia_7)}
                                            >       
                                                </label>
                                            </>
                                            }
                                            {data.multimedia_7.includes(".mp4")  &&     
                                                <>
                                                    <video id="multimedia_7"  controls muted data-black-overlay="6">
                                                        <source type="video/mp4" src={direccion + data.multimedia_7}></source>
                                                    </video>
   
                                                    <label
                                                        htmlFor="multimedia_7"
                                                        title="No File Choosen"
                                                        onClick={() => handleBidModal(direccion + data.multimedia_7)}       
                                                >
                                                    </label>
                                                </>
                                            }
                                    </div>                                                    
                                </div>
                            </div>
                            }


                            {data.multimedia_8 != '' &&     
                            <div className="col-md-3">
                                <div className="upload-area-galeria pb--20">
                                    <div className="brows-file-wrapper2">
                                            {(data.multimedia_8.includes(".jpg") || data.multimedia_8.includes(".png") || data.multimedia_8.includes(".jpeg")) &&     
                                            <>
                                                <img
                                                    id="multimedia_8"
                                                    src={direccion + data.multimedia_8}
                                                    alt=""
                                                    data-black-overlay="6"
                                                />
                                                
                                                <label
                                                    htmlFor="multimedia_8"
                                                    title="No File Choosen"
                                                    onClick={() => handleBidModal(direccion + data.multimedia_8)}
                                            >
                                                </label>
                                            </>
                                            }

                                            {data.multimedia_8.includes(".mp4")  &&     
                                                <>
                                                    <video id="multimedia_8"  controls muted data-black-overlay="6">
                                                        <source type="video/mp4" src={direccion + data.multimedia_8}></source>
                                                    </video>

                                                    <label
                                                        htmlFor="multimedia_8"
                                                        title="No File Choosen"
                                                        onClick={() => handleBidModal(direccion + data.multimedia_8)}  
                                                >
                                                    </label>
                                                </>
                                            }
                                    </div>                                                    
                                </div>
                            </div>                                                
                            }



                            {data.multimedia_9 != '' &&     
                            <div className="col-md-3">
                                <div className="upload-area-galeria pb--20">
                                    <div className="brows-file-wrapper2">
                                            {(data.multimedia_9.includes(".jpg") || data.multimedia_9.includes(".png") || data.multimedia_9.includes(".jpeg")) &&     
                                            <>
                                                <img
                                                    id="multimedia_9"
                                                    src={direccion + data.multimedia_9}
                                                    alt=""
                                                    data-black-overlay="6"
                                                />
                                                <label
                                                    htmlFor="multimedia_9"
                                                    title="No File Choosen"
                                                    onClick={() => handleBidModal(direccion + data.multimedia_9)}
                                            >       
                                                </label>
                                            </>
                                            }
                                            {data.multimedia_9.includes(".mp4")  &&     
                                                <>
                                                    <video id="multimedia_9"  controls muted data-black-overlay="6">
                                                        <source type="video/mp4" src={direccion + data.multimedia_9}></source>
                                                    </video>

                                                    <label
                                                        htmlFor="multimedia_9"
                                                        title="No File Choosen"
                                                        onClick={() => handleBidModal(direccion + data.multimedia_9)}
                                                >
                                                        
                                                    </label>
                                                </>
                                            }
                                    </div>                                                    
                                </div>
                            </div>  
                            }        

                            {data.multimedia_10 != '' &&
                            <div className="col-md-3">
                                <div className="upload-area-galeria pb--20">
                                    <div className="brows-file-wrapper2">
                                            {(data.multimedia_10.includes(".jpg") || data.multimedia_10.includes(".png") || data.multimedia_10.includes(".jpeg")) &&     
                                            <>
                                                <img
                                                    id="multimedia_10"
                                                    src={direccion + data.multimedia_10}
                                                    alt=""
                                                    data-black-overlay="6"
                                                />
                                                
                                                <label
                                                    htmlFor="multimedia_10"
                                                    title="No File Choosen"
                                                    onClick={() => handleBidModal(direccion + data.multimedia_10)}
                                            >       
                                                </label>
                                            </>
                                            }
                                            {data.multimedia_10.includes(".mp4")  &&     
                                                <>
                                                    <video id="multimedia_10"  controls muted data-black-overlay="6">
                                                        <source type="video/mp4" src={direccion + data.multimedia_10}></source>
                                                    </video>
                                                    <label
                                                        htmlFor="multimedia_10"
                                                        title="No File Choosen"
                                                        onClick={() => handleBidModal(direccion + data.multimedia_10)}       
                                                >
                                                        
                                                    </label>
                                                </>
                                            }
                                    </div>                                                    
                                </div>
                            </div>          
                            }

                            {data.multimedia_11 != '' &&
                            <div className="col-md-3">
                                <div className="upload-area-galeria pb--20">
                                    <div className="brows-file-wrapper2">
                                            {(data.multimedia_11.includes(".jpg") || data.multimedia_11.includes(".png") || data.multimedia_11.includes(".jpeg")) &&     
                                            <>
                                                <img
                                                    id="multimedia_11"
                                                    src={direccion + data.multimedia_11}
                                                    alt=""
                                                    data-black-overlay="6"
                                                />
                                                <label
                                                    htmlFor="multimedia_11"
                                                    title="No File Choosen"
                                                    onClick={() => handleBidModal(direccion + data.multimedia_11)}
                                            >       
                                                </label>
                                            </>
                                            }
                                            {data.multimedia_11.includes(".mp4")  &&     
                                                <>
                                                    <video id="multimedia_11"  controls muted data-black-overlay="6">
                                                        <source type="video/mp4" src={direccion + data.multimedia_11}></source>
                                                    </video>
       
                                                    <label
                                                        htmlFor="multimedia_11"
                                                        title="No File Choosen"
                                                        onClick={() => handleBidModal(direccion + data.multimedia_11)} 
                                                >
                                                    </label>
                                                </>
                                            }
                                    </div>                                                    
                                </div>
                            </div>          
                            }
                        </>
                    }
                    </div>


                    <div className="col-lg-2 col-md-2 col-sm-6 mt_md--50 mt_sm--60">

                    </div>

                    <div className="col-lg-8 col-md-8 mt_md--50 mt_sm--60">

                    </div>

                    
                    <div className="col-lg-2 col-md-2 mt_md--50 mt_sm--60">

                    </div>



                    <div className="col-lg-12 col-md-12 col-sm-12 mt_md--50 mt_sm--60">
                        <div className="rn-pd-content-area">
                            <ProductTitleNuevo
                                title={data.ciudad_1}
                                usuario={data.usuario}
                            />
                            <span className="bid">
                                ID: {data.cod}{" "}
                                <span className="price">
                                    
                                </span>
                            </span>
                            <h3 className="title-name mt--10">Sobre mi</h3>
                            <div dangerouslySetInnerHTML={{ __html: data.sobre_mi }}></div>

                            <br />                    
                            <p className="inline">
                             
                            {data.llamada != '0' &&
                             <a href={"tel:" + data.fone + data.telefono} target="__blank">  <FaPhone className="fs-1" /> </a>
                            }  
                                +{data.fone} {data.telefono}
                            {data.whatsapp != '0' &&     
                             <a href={"https://api.whatsapp.com/send?phone=" + data.fone + data.telefono + "&text=Hola%20,quiero%20ponerme%20en%20contacto%20con%20usted,%20por%20sus%20servicios."}  target="__blank"><FaWhatsapp className="fs-1" /> </a> 
                            }
                             </p>
                            
                            <div className="row">

                                <div className="col-md-3 mt_md--10 mt_sm--60 mb--10">
                                    <h6 className="color-primary">Nacionalidad:</h6>
                                    <p className="">{data.gentilicio}</p>
                                </div>

                                <div className="col-md-3 mt_md--10 mt_sm--60 mb--10">
                                    <h6 className="color-primary">Edad:</h6>
                                    <p className="">{data.edad}</p>
                                </div>

                                <div className="col-md-3 mt_md--10 mt_sm--60 mb--10">
                                    <h6 className="color-primary">Ojos:</h6>
                                    <p className="">{data.color}</p>
                                </div>

                                <div className="col-md-3 mt_md--10 mt_sm--60 mb--10">
                                    <h6 className="color-primary">Contextura:</h6>
                                    {data.contextura == '1' &&
                                        <p className="">Delgada</p>
                                    }
                                    {data.contextura == '2' &&
                                        <p className="">Media</p>
                                    }
                                    {data.contextura == '3' &&
                                        <p className="">Gruesa</p>
                                    }

                                </div>


                                
                                <div className="col-md-3 mt_md--10 mt_sm--60 mb--10">
                                    <h6 className="color-primary">Altura:</h6>
                                    <p className="-mt--10">{data.talla}</p>
                                </div>

                                <div className="col-md-3 mt_md--10 mt_sm--60 mb--10">
                                    <h6 className="color-primary">Etnia:</h6>
                                    <p className="-mt--10">{data.etnia}</p>
                                </div>

                                <div className="col-md-3 mt_md--10 mt_sm--60 mb--10">
                                    <h6 className="color-primary">Cabello:</h6>
                                    <p className="-mt--10">{data.color_pelo}</p>
                                </div>

                                <div className="col-md-3 mt_md--10 mt_sm--60 mb--10">
                                    <h6 className="color-primary">Bebe:</h6>
                                    {data.bebe == '1' &&
                                        <p className="-mt--10">No</p>
                                    }
                                    {data.bebe == '2' &&
                                        <p className="-mt--10">Si</p>
                                    }
                                    {data.bebe == '3' &&
                                        <p className="-mt--10">Eventualmente</p>
                                    }
                                    
                                </div>





                                <div className="col-md-3 mt_md--10 mt_sm--60 mb--10">
                                    <h6 className="color-primary">Peso:</h6>
                                    <p className="-mt--10">{data.peso}</p>
                                </div>

                                <div className="col-md-3 mt_md--10 mt_sm--60 mb--10">
                                    <h6 className="color-primary">Fuma:</h6>
                                    {data.fuma == '1' &&
                                        <p className="-mt--10">No</p>
                                    }
                                    {data.fuma == '2' &&
                                        <p className="-mt--10">Si</p>
                                    }
                                    {data.fuma == '3' &&
                                        <p className="-mt--10">Eventualmente</p>
                                    }
                                </div>

                                <div className="col-md-3 mt_md--10 mt_sm--60 mb--10">
                                    <h6 className="color-primary">Tattos & Piercing</h6>
                                    <p>
                                    {data.tatto == '1' &&
                                        "Si"
                                    }
                                    {data.tatto == '2' &&
                                        "No"
                                    }
                                    /
                                    {data.fuma == '1' &&
                                        "Si"
                                    }
                                    {data.fuma == '2' &&
                                        "No"
                                    }
                                    </p>
                                </div>
                                {data.miembro == '1' &&
                                    <div className="col-md-3 mt_md--10 mt_sm--60 mb--10">
                                        <h6 className="color-primary">Posee Miembro:</h6>
                                        <p>
                                        {data.miembro == '1' &&
                                            "Si"
                                        }
                                        {data.miembro == '2' &&
                                            "No"
                                        }
                                        </p>
                                    </div>
                                }

                                    

                                {data.miembro_tamano != '' &&
                                    <div className="col-md-3 mt_md--10 mt_sm--60 mb--10">
                                        <h6 className="color-primary">Tamaño Miembro:</h6>
                                        <p>
                                            {data.miembro_tamano}
                                        </p>
                                    </div>
                                }



                            </div>     


                            <br /><br />

                        <div className="row">    
                           
                            <div className="col-md-6 col-sm-12 mt--20">
                                <div className="table-title-area d-flex">
                                    <h6 className="color-primary">Mis Servicios</h6>
                                </div>

                            <div className="box-table table-responsive">
                                <table className="table upcoming-projects">
                                    <thead>
                                        <tr>
                                            <th>
                                                <span>Servicio</span>
                                            </th>
                                            <th>
                                                <span>Incluido</span>
                                            </th>
                                            <th>
                                                <span>Precio</span>
                                            </th>
                                            
                                        </tr>
                                    </thead>
                                    <tbody>

                                    
                                            
                                        {serviciosList?.map((item, i) => (
                                        
                                        <tr
                                                key={item.cod}
                                                className={i % 2 === 0 ? "color-light" : ""}
                                            >
                                                <td>
                                                    <p>{item.servicio}</p>
                                                </td>
                                                <td>
                                                    <span >
                                                        {item.incluido == '1' &&
                                                            <>
                                                               <h6> <FaCheck className="color-primary" /></h6>
                                                            </>
                                                        }
                                                        {item.incluido != '1' &&
                                                            <>
                                                                <h6> <AiOutlineClose className="color-danger" /></h6>
                                                            </>
                                                        }
                                                    </span>
                                                </td>
                                                <td>
                                                    <span >
                                                        {item.precio == 0 &&
                                                            <>
                                                            </>
                                                        }
                                                        {item.precio != '0' &&
                                                            <>
                                                                {item.precio} bs
                                                            </>
                                                        }
                                                    </span>
                                                </td>


                                            
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                            </div>


                            
                            <div className="col-md-6 col-sm-12 mt--20">
                                <div className="table-title-area d-flex">
                                    <h6 className="color-primary">Mis Tarifas</h6>
                                </div>

                            <div className="box-table table-responsive">
                                <table className="table upcoming-projects">
                                    <thead>
                                        <tr>
                                            <th>
                                                <span>Tarifa</span>
                                            </th>
                                            <th>
                                                <span>Visita</span>
                                            </th>
                                            <th>
                                                <span>Salida</span>
                                            </th>
                                            
                                        </tr>
                                    </thead>
                                    <tbody>

                                    
                                            
                                        {tarifasList?.map((item, i) => (
                                        
                                        <tr
                                                key={item.cod}
                                                className={i % 2 === 0 ? "color-light" : ""}
                                            >
                                                <td>
                                                    <p>{item.tarifa}</p>
                                                </td>
                                                <td>
                                                    <span >
                                                        {item.visita == '' &&
                                                            <>
                                                               <h6> <AiOutlineClose className="color-danger" /></h6>
                                                            </>
                                                        }
                                                        {item.visita != '' &&
                                                            <>
                                                                {item.visita} bs
                                                            </>
                                                        }
                                                    </span>
                                                </td>
                                                <td>
                                                    <span >
                                                        {item.salida == '' &&
                                                            <>
                                                               <h6> <AiOutlineClose className="color-danger" /></h6>
                                                            </>
                                                        }
                                                        {item.salida != '' &&
                                                            <>
                                                                {item.salida} bs
                                                            </>
                                                        }
                                                    </span>
                                                </td>


                                            
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                            </div>

                        </div>
                            

                            {/*
                            <div className="catagory-collection">
                                <ProductCategory owner={data.owner} />
                                <ProductCollection
                                    collection={data.collection}
                                />
                            </div>
                            <Button color="primary-alta" path="#">
                                Unlockable content included
                            </Button>
                            <div className="rn-bid-details">
                                <BidTab
                                    bids={product?.bids}
                                    owner={data.owner}
                                    properties={product?.properties}
                                    tags={product?.tags}
                                    history={product?.history}
                                />
                                <PlaceBet
                                    highest_bid={data.highest_bid}
                                    auction_date={product?.auction_date}
                                />
        </div>*/}
                        </div>
                    </div>
                </div>
            </div>

            
            <VerImagenModal show={showBidModal} handleModal={handleBidModal} data={archivoSelect} />
        </>    
        )
        }} else {
            return (
                <div
                    className={clsx(
                        "product-details-area",
                        space === 1 && "rn-section-gapTop",
                        className
                    )}
                >
                    <div className="container">
                        <div className="row g-5"></div>
                            <h4> Querido usuario, debe completar datos importante para activar su perfil,
                            Por favor complete su Perfil, Sobre Mi, Datos te Contacto y Ciudad Laboral. </h4>

                    </div>
                </div>
            
            )
        }
    };

ProductDetailsArea.propTypes = {
    space: PropTypes.oneOf([1, 2]),
    className: PropTypes.string,
    product: PropTypes.shape({
        title: PropTypes.string.isRequired,
        likeCount: PropTypes.number,
        price: PropTypes.shape({
            amount: PropTypes.number.isRequired,
            currency: PropTypes.string.isRequired,
        }).isRequired,
        owner: PropTypes.shape({}),
        collection: PropTypes.shape({}),
        bids: PropTypes.arrayOf(PropTypes.shape({})),
        properties: PropTypes.arrayOf(PropTypes.shape({})),
        tags: PropTypes.arrayOf(PropTypes.shape({})),
        history: PropTypes.arrayOf(PropTypes.shape({})),
        highest_bid: PropTypes.shape({}),
        auction_date: PropTypes.string,
        images: PropTypes.arrayOf(ImageType),
    }),
};

ProductDetailsArea.defaultProps = {
    space: 1,
};

export default ProductDetailsArea;
