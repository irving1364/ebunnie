import { useState, useEffect, useCallback } from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import Image from "next/image";
import Anchor from "@ui/anchor";
import Pagination from "@components/pagination-02";
import { IDType, ImageType } from "@utils/types";
import ProcesarVeriModal from "@components/modals/verificacion-modal/procesar";
import Button from "@ui/button";
import { FcProcess } from "react-icons/fc";

import { FaFileImage } from "react-icons/fa";
import { FaFileVideo } from "react-icons/fa";


const POSTS_PER_PAGE = 10;

const TablaVerificacionArea = ({ className, space, data }) => {
    const [ranking, setRanking] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [showProductModal, setShowProductModal] = useState(false);
    const [showBidModal, setShowBidModal] = useState(false);
    const [itemSelect, setItemSelect] = useState([]);
    
    
    const numberOfPages = Math.ceil(data.ranking.length / POSTS_PER_PAGE);
    const paginationHandler = (page) => {
        setCurrentPage(page);
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    const rankingHandler = useCallback(() => {
        const start = (currentPage - 1) * POSTS_PER_PAGE;
        setRanking(data.ranking.slice(start, start + POSTS_PER_PAGE));
    }, [currentPage, data.ranking]);

    useEffect(() => {
        rankingHandler();
    }, [currentPage, rankingHandler]);

    
    const setVal = (item, e) => {
        console.log(item)
        setItemSelect(item);
        console.log(itemSelect)
        handleBidModal();
    };
    
    const handleBidModal = async () => {
     
        setShowBidModal((prev) => !prev);


        var requestOptionsPerfil = {
            method: 'POST',
            body: JSON.stringify({
                token: localStorage.getItem("tokens")
            }),
        };

        const data6 = await fetch(process.env.url + "perfil/getVerificacionesAll", requestOptionsPerfil)
        const result6 = await data6.json();
        
        data = result6.verificaciones;
        setRanking(result6.verificaciones)
        setCurrentPage();
       // const POSTS_PER_PAGE = 1;
        //const start = (currentPage - 1) * POSTS_PER_PAGE;
       

//        obtenerDatosPerfil();
    };

    return (
        <div
            className={clsx(
                "rn-upcoming-area",
                space === 1 && "rn-section-gapTop",
                className
            )}
        >
            <div className="container">
                <div className="row">
                    <div className="col-12">
                    <h6>Verificaciones</h6>
                        <div className="box-table table-responsive">
                            <table className="table upcoming-projects">
                                <thead>
                                    <tr>
                                        <th>
                                            <span>Cod.</span>
                                        </th>
                                        <th>
                                            <span>Usuario</span>
                                        </th>
                                        <th>
                                            <span>Foto</span>
                                        </th>
                                        <th>
                                            <span>Foto</span>
                                        </th>
                                        <th>
                                            <span>Video</span>
                                        </th>
                                        <th>
                                            <span>Video</span>
                                        </th>
                                        <th>
                                            <span>Status</span>
                                        </th>
                                        <th>
                                            <span>Procesar</span>
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="ranking">
                                    
                                    {ranking?.map((item, index) => (
                                        <tr
                                            key={item.id}
                                            className={
                                                index % 2 === 0
                                                    ? "color-light"
                                                    : ""
                                            }
                                        >
                                            <td>
                                                <span>{index + 1}.</span>
                                            </td>
                                            <td>
                                                <div className="product-wrapper d-flex align-items-center">
                                                    <span>
                                                    {item.usuario}
                                                    </span>
                                                </div>
                                            </td>
                                            <td>
                                                <a href={'https://ubunnie.com/backendUbunnie/'+ item.foto_1 } target="_blank"> <FaFileImage /></a>
                                            </td>
                                            <td>
                                                <a href={'https://ubunnie.com/backendUbunnie/'+ item.foto_2 } target="_blank"> <FaFileImage /></a>
                                            </td>
                                            <td>
                                                <a href={'https://ubunnie.com/backendUbunnie/'+ item.video_1 } target="_blank"> <FaFileVideo /></a>
                                            </td>
                                            <td>
                                                {item.video_2 != '' &&
                                                    <a href={'https://ubunnie.com/backendUbunnie/'+ item.video_2 } target="_blank"> <FaFileVideo /></a>
                                                }

                                                {item.video_2 === "" &&
                                                    <p></p>
                                                }
                                              
                                            </td>
                                            <td>
                                                {item.status == '1' &&
                                                    <p>Enviada sin Procesar</p>
                                                }

                                                {item.status == '2' &&
                                                    <p>Procesada con Exito!</p>
                                                }

                                                {item.status == '3' &&
                                                    <p>Denegada</p>
                                                }
                                            </td>
                                            <td>
                                                {item.status == '1' &&
                                                    <p onClick={(e) => setVal(item, e)} >PROCESAR</p> 
                                                }

                                                {item.status == '2' &&
                                                    <p></p>
                                                }

                                                {item.status == '3' &&
                                                    <p></p>
                                                }
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        <Pagination
                            currentPage={currentPage}
                            numberOfPages={numberOfPages}
                            onClick={paginationHandler}
                        />
                    </div>
                </div>
            </div>
            <ProcesarVeriModal  show={showBidModal} handleModal={handleBidModal} data={itemSelect}/>
        </div>
    
    );
};

TablaVerificacionArea.propTypes = {
    className: PropTypes.string,
    space: PropTypes.oneOf([1]),
    data: PropTypes.shape({
        ranking: PropTypes.arrayOf(
            PropTypes.shape({
                id: IDType,
                product: PropTypes.shape({
                    title: PropTypes.string,
                    slug: PropTypes.string,
                    image: ImageType,
                }),
                volume: PropTypes.string,
                "24h%": PropTypes.shape({
                    charge: PropTypes.string,
                    status: PropTypes.oneOf(["-", "+"]),
                }),
                "7d%": PropTypes.shape({
                    charge: PropTypes.string,
                    status: PropTypes.oneOf(["-", "+"]),
                }),
                floor_price: PropTypes.string,
                owners: PropTypes.string,
                items: PropTypes.string,
            })
        ),
    }),
};
TablaVerificacionArea.defaultProps = {
    space: 1,
};

export default TablaVerificacionArea;
