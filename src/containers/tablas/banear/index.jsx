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
import { RiAdvertisementFill } from "react-icons/ri";
import { FaBan } from "react-icons/fa";
import { TbLockOpen } from "react-icons/tb";


import BanearVeriModal from "@components/modals/banear-modal";

const POSTS_PER_PAGE = 300;

const TablaBaneoArea = ({ className, space, data }) => {
    const [ranking, setRanking] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [showProductModal, setShowProductModal] = useState(false);
    const [showBidModal, setShowBidModal] = useState(false);
    const [itemSelect, setItemSelect] = useState([]);
    const [ search, setSearch ] = useState("")
    

    
    const numberOfPages = Math.ceil(data.users.length / POSTS_PER_PAGE);
    const paginationHandler = (page) => {
        setCurrentPage(page);
    };

    const searcher = (e) => {
        setSearch(e.target.value)   
    }

    const rankingHandler = useCallback(() => {
        const start = (currentPage - 1) * POSTS_PER_PAGE;
        setRanking(data.users.slice(start, start + POSTS_PER_PAGE));
    }, [currentPage, data.users]);

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

        const data6 = await fetch(process.env.url + "auth/getUsuariosBanear", requestOptionsPerfil)
        const result6 = await data6.json();
        
        data = result6.users;
        setRanking(result6.users)
        setCurrentPage();
       // const POSTS_PER_PAGE = 1;
        //const start = (currentPage - 1) * POSTS_PER_PAGE;
       

//        obtenerDatosPerfil();
    };


    const dataOrigin = data.users;
    //console.log(dataOrigin);
    const results = !search ? ranking : ranking.filter((dato)=>  dato.nombre.toLowerCase().includes(search.toLocaleLowerCase()))
    console.log(results);
    

    return (
        <div
            className={clsx(
                "rn-upcoming-area",
                space === 1 && "rn-section-gapTop",
                className
            )}
        >
            <div className="container">
                
               
                <div className="row mb--20 align-items-center">
                <h6>Usuarios para banear</h6>
                </div>


                <div className="row">
                     <div className="col-md-6"> 
                        <div className="input-box pb--20">    
                        <label
                                htmlFor="eslogan"
                                className="form-label"
                            >
                                Buscar
                            </label>
                            <input
                                id="eslogan" 
                                placeholder="Aqui puede buscar por nombre del Usuario"
                                value={search} onChange={searcher}
                            />
                        </div>
                    </div>  
                    <div className="col-12">
                    
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
                                            <span>Nombre</span>
                                        </th>
                                        <th>
                                            <span>Anuncio</span>
                                        </th>
                                        <th>
                                            <span>Banear</span>
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="ranking">
                                    
                                    {results?.map((item, index) => (
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
                                                <div className="product-wrapper d-flex align-items-center">
                                                    <span>
                                                    {item.nombre}
                                                    </span>
                                                </div>
                                            </td>
                                            
                                            <td>
                                              <p>  <a href={`/anuncio/`+ item. usuario} target="_blank"> <RiAdvertisementFill /></a></p>
                                            </td>

                                            <td>
                                                {item.activo != '2' &&
                                                    <p  onClick={(e) => setVal(item, e)} target="_blank"> <FaBan /></p>
                                                }
                                                {item.activo == '2' &&
                                                    <p  onClick={(e) => setVal(item, e)} target="_blank"> <TbLockOpen /></p>
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
            <BanearVeriModal  show={showBidModal} handleModal={handleBidModal} data={itemSelect}/>
        </div>
    
    );
};

TablaBaneoArea.propTypes = {
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
TablaBaneoArea.defaultProps = {
    space: 1,
};

export default TablaBaneoArea;
