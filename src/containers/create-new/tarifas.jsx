/* eslint-disable @next/next/no-img-element */
import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import { useForm } from "react-hook-form";
import Button from "@ui/button";
import ProductModal from "@components/modals/product-modal";
import ErrorText from "@ui/error-text";
import { toast } from "react-toastify";
import { useLocalStorage } from "src/hooks/use-local-storage";
import { MdDelete } from "react-icons/md";
import { FaCheck } from "react-icons/fa";
import { AiOutlineClose } from "react-icons/ai";


const CreateNewAreaTarifa = ({ className, space }) => {

    const [token, setToken] = useLocalStorage("tokens");
    const [showProductModal, setShowProductModal] = useState(false);
    const [selectedImage, setSelectedImage] = useState();
    const [hasImageError, setHasImageError] = useState(false);
    const [previewData, setPreviewData] = useState({});
    const [isLoad, setIsLoad] = useState(false); 
    const [incluido, setIncluido] = useState(true); 

    const [serviciosList, setServiciosList] = useState([]);
    
    const [tarifasUsuarioList, setServiciosTarifasList] = useState([]);
    

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm({
        mode: "onChange",
    });

    useEffect(() => {
        obtenerDatos();
        obtenerDatosServicos();
      }, []);

    const obtenerDatos = async () => {
        var requestOptionsPerfil = {
            method: 'POST',
            body: JSON.stringify({
                token: localStorage.getItem("tokens")
           }),
          };

        const data = await fetch(process.env.url + "perfil/getServicios", requestOptionsPerfil)
        const result = await data.json();
        setServiciosList(result.servicios)

        setIsLoad(true)
    }  

    const obtenerDatosServicos = async () => {
        var requestOptionsPerfil = {
            method: 'POST',
            body: JSON.stringify({
                token: localStorage.getItem("tokens")
           }),
          };

        const data = await fetch(process.env.url + "perfil/getTarifasUsuario", requestOptionsPerfil)
        const result = await data.json();

        setServiciosTarifasList(result.tarifas)


        setIsLoad(true)
    }  
   

    const handleProductModal = () => {
        setShowProductModal(false);
    };

    const onDeleteServicio = async (cod) => {
        console.log(token)

        var requestOptions = {
            method: 'POST',
            body: JSON.stringify({
                token: token,
                cod_tarifa: cod
           }),
          };

        fetch( process.env.url + "perfil/deleteTarifaUsuario", requestOptions)
            .then(response => {
                return response.json();
            })
            .then(json => {
                console.log(json);
                if(json.code == 200){
                    obtenerDatosServicos();
                    toast(json.response)
                    
                }
                if(json.code === 300){
                    toast(json.response)
                }
                
                
            })
            
            .catch(error => toast("Ocurrio un error"));
        }

    const onSubmit = async (e) => {
        console.log(e)
        console.log(token)
        
        var requestOptions = {
            method: 'POST',
            body: JSON.stringify({
                token: token,
                tarifa: e.tarifa, 
                visita: e.visita, 
                salida: e.salida
           }),
          };
          
        fetch( process.env.url + "perfil/addTarifaUsuario", requestOptions)
            .then(response => {
                return response.json();
            })
            .then(json => {
                console.log(json);
                if(json.code == 200){
                    obtenerDatosServicos();
                    toast(json.response)
                    
                }
                if(json.code === 300){
                    console.log(2000);
                    toast(json.response.mensaje)
                }
                
            })
            
            .catch(error => toast("Ocurrio un error"));
        
        }


            const handleChange = (e) => {
            
                {incluido == true &&
                    setIncluido(false);
                }

                {incluido == false &&
                    setIncluido(true);
                }
            
                //    setIncluido(e.target);
            };


if (isLoad) {
    return (
        <>
            <div
                className={clsx(
                    "create-area",
                    space === 1 && "mt-5",
                    className
                )}
            >
                <form action="#" onSubmit={handleSubmit(onSubmit)}>
                    <div className="container">
                        <div className="row g-5">
                            <div className="col-lg-12">
                                <div className="form-wrapper-one">
                                    <div className="row">
                                       
                                       
                                    <div className="col-md-4">
                                            <div className="input-box pb--20">
                                            <label
                                                    htmlFor="tarifa"
                                                    className="form-label"
                                                >
                                                    Tarifa
                                                </label>

                                               
                                                    <input
                                                        type="text"
                                                        id="tarifa" 
                                                        placeholder="Ingrese la tarifa`"
                                                       
                                                        {...register("tarifa", {
                                                        })}
                                                    />
                                                
                                                {errors.tarifa && (
                                                    <ErrorText>
                                                        {errors.tarifa?.message}
                                                    </ErrorText>
                                                )}
                                            </div> 
                                        </div>

                                        


                                        <div className="col-md-4">
                                            <div className="input-box pb--20">
                                            <label
                                                    htmlFor="visita"
                                                    className="form-label"
                                                >
                                                    Visita
                                                </label>

                                               
                                                    <input
                                                        type="number"
                                                        id="visita" 
                                                        placeholder="Monto númerico`"
                                                       
                                                        {...register("visita", {
                                                        })}
                                                    />
                                                
                                                {errors.visita && (
                                                    <ErrorText>
                                                        {errors.visita?.message}
                                                    </ErrorText>
                                                )}
                                            </div> 
                                        </div>
                                        

                                        <div className="col-md-4">
                                            <div className="input-box pb--20">
                                            <label
                                                    htmlFor="salida"
                                                    className="form-label"
                                                >
                                                    Salida
                                                </label>

                                               
                                                    <input
                                                        type="number"
                                                        id="precio" 
                                                        placeholder="Monto númerico`"
                                                       
                                                        {...register("salida", {
                                                        })}
                                                    />
                                                
                                                {errors.salida && (
                                                    <ErrorText>
                                                        {errors.salida?.message}
                                                    </ErrorText>
                                                )}
                                            </div> 
                                        </div>
                                        


                                        <div className="col-md-12 col-xl-4">
                                            <div className="input-box">
                                                <Button
                                                    color="primary-alta"
                                                    fullwidth
                                                    type="submit"
                                                    data-btn="preview"
                                                >
                                                    Guardar
                                                </Button>
                                            </div>
                                        </div>





                            <div className="col-12 mt-5">
                                <div className="table-title-area d-flex">
                                    <h4>Mis Servicios</h4>
                                </div>

                            <div className="box-table table-responsive">
                                <table className="table upcoming-projects">
                                    <thead>
                                        <tr>
                                            <th>
                                                <span>Codigo</span>
                                            </th>
                                            <th>
                                                <span>Servicio</span>
                                            </th>
                                            <th>
                                                <span>Incluido</span>
                                            </th>
                                            <th>
                                                <span>Precio</span>
                                            </th>
                                            <th>
                                                <span>Eliminar</span>
                                            </th>
                                            
                                        </tr>
                                    </thead>
                                    <tbody>

                                    
                                            
                                        {tarifasUsuarioList?.map((item, i) => (
                                        
                                        <tr
                                                key={item.cod}
                                                className={i % 2 === 0 ? "color-light" : ""}
                                            >
                                                <td>
                                                    <span>{item.cod}</span>
                                                </td>
                                                <td>
                                                    <p>{item.tarifa}</p>
                                                </td>
                                                <td>
                                                    <span >
                                                        <p>{item.visita} bs</p>
                                                    </span>
                                                </td>
                                                <td>
                                                    <span >
                                                        {item.salida} bs
                                                    </span>
                                                </td>
                                                <td>
                                                <a >
                                                        <MdDelete onClick={(event) => onDeleteServicio(item.cod, event)}/>
                                                    </a>
                                                </td>


                                            
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>





                                        
                                    </div>
                                </div>
                            </div>
                         
                         
                        </div>
                    </div>
                </form>
            </div>
            {showProductModal && (
                <ProductModal
                    show={showProductModal}
                    handleModal={handleProductModal}
                    data={previewData}
                />
            )}
        </>
    );
    };
};

CreateNewAreaTarifa.propTypes = {
    className: PropTypes.string,
    space: PropTypes.oneOf([1]),
};

CreateNewAreaTarifa.defaultProps = {
    space: 1,
};

export default CreateNewAreaTarifa;
