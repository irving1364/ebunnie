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


const CreateNewAreaLenguajes = ({ className, space }) => {

    const [token, setToken] = useLocalStorage("tokens");
    const [showProductModal, setShowProductModal] = useState(false);
    const [selectedImage, setSelectedImage] = useState();
    const [hasImageError, setHasImageError] = useState(false);
    const [previewData, setPreviewData] = useState({});
    const [isLoad, setIsLoad] = useState(false); 

    const [lenguajeList, setlenguajeList] = useState([]);
    

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
      }, []);

    const obtenerDatos = async () => {
        var requestOptionsPerfil = {
            method: 'POST',
            body: JSON.stringify({
                token: localStorage.getItem("tokens")
           }),
          };

        const data = await fetch(process.env.url + "perfil/getLenguajes", requestOptionsPerfil)
        const result = await data.json();
        setlenguajeList(result.lenguajes)


        console.log(lenguajeList);
        console.log(result.lenguajes);
        setIsLoad(true)
    }  
   

    const handleProductModal = () => {
        setShowProductModal(false);
    };


    const onSubmit = async (e) => {
        console.log(e)
        console.log(token)

        var requestOptions = {
            method: 'POST',
            body: JSON.stringify({
                token: token,
                idioma: e.idioma, 
                nivel: e.nivel
           }),
          };

        fetch( process.env.url + "perfil/addlenguaje", requestOptions)
            .then(response => {
                return response.json();
            })
            .then(json => {
                console.log(json);
                if(json.code == 200){
                    obtenerDatos();
                    toast(json.response)
                    
                }
                if(json.code === 300){
                    toast(json.response)
                }
                
                
            })
            
            .catch(error => toast("Ocurrio un error"));
        }

        const onDeleteImagen = async (cod) => {
            console.log(token)
    
            var requestOptions = {
                method: 'POST',
                body: JSON.stringify({
                    token: token,
                    cod_lenguaje: cod
               }),
              };
    
            fetch( process.env.url + "perfil/deleteLenguaje", requestOptions)
                .then(response => {
                    return response.json();
                })
                .then(json => {
                    console.log(json);
                    if(json.code == 200){
                        obtenerDatos();
                        toast(json.response)
                        
                    }
                    if(json.code === 300){
                        toast(json.response)
                    }
                    
                    
                })
                
                .catch(error => toast("Ocurrio un error"));
            }
    


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
                                        <div className="col-md-6">
                                            <div className="input-box pb--20">
                                            <label
                                                    htmlFor="idioma"
                                                    className="form-label"
                                                >
                                                    Idioma
                                                </label>

                                                <select 
                                                    name="idioma" id="idioma" aria-label="Default select example"
                                                    {...register("idioma", {
                                                        required:
                                                            "Debe seleccionar un idioma",
                                                    })}>
                                                    
                                                   
                                                    <option value="">Debe seleccionar una opcion</option>
                                                   
                                                    <option value={'Español'}> {'Español'} </option>
                                                    <option value={'Inglés'}> {'Inglés'} </option>
                                                    <option value={' Portugués'}> {' Portugués'} </option>
                                                    <option value={'Mandarín'}> {'Mandarín'} </option>
                                                    <option value={'Francés'}> {'Francés'} </option>
                                                    <option value={'Árabe'}> {'Árabe'} </option>
                                                    <option value={'Ruso'}> {'Ruso'} </option>
                                                    <option value={'Alemán'}> {'Alemán'} </option>
                                                    <option value={'Japonés'}> {'Japonés'} </option>
                                                    <option value={'Otros'}> {'Otros'} </option>
 
                                                </select>
                                                {errors.idioma && (
                                                    <ErrorText>
                                                        {errors.idioma?.message}
                                                    </ErrorText>
                                                )}
                                            </div> 
                                        </div>

                                        
                                        


                                        <div className="col-md-6">
                                            <div className="input-box pb--20">
                                            <label
                                                    htmlFor="nivel"
                                                    className="form-label"
                                                >
                                                    Nivel
                                                </label>

                                                <select 
                                                    name="nivel" id="nivel" aria-label="Default select example"
                                                    {...register("nivel", {
                                                        required:
                                                            "Debe seleccionar un nivel",
                                                    })}>
                                                    
                                                   
                                                    <option value="">Debe seleccionar una opcion</option>
                                                   
                                                    <option value={'Basico'}> {'Basico'} </option>
                                                    <option value={'Promedio'}> {'Promedio'} </option>
                                                    <option value={' Alto'}> {' Alto'} </option>
                                                    <option value={'Nativo'}> {'Nativo'} </option>
 
                                                </select>
                                                {errors.nivel && (
                                                    <ErrorText>
                                                        {errors.nivel?.message}
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
                                    <h4>Mis Idiomas</h4>
                                </div>

                            <div className="box-table table-responsive">
                                <table className="table upcoming-projects">
                                    <thead>
                                        <tr>
                                            <th>
                                                <span>Codigo</span>
                                            </th>
                                            <th>
                                                <span>Idioma</span>
                                            </th>
                                            <th>
                                                <span>Nivel</span>
                                            </th>
                                            <th>
                                                <span>Eliminar</span>
                                            </th>
                                            
                                        </tr>
                                    </thead>
                                    <tbody>

                                    
                                    
                                        {lenguajeList?.map((item, i) => (
                                        
                                        <tr
                                                key={item.cod}
                                                className={i % 2 === 0 ? "color-light" : ""}
                                            >
                                                <td>
                                                    <span>{item.cod}</span>
                                                </td>
                                                <td>
                                                    <p>{item.lenguaje}</p>
                                                </td>
                                                <td>
                                                    <span >
                                                        {item.nivel}
                                                    </span>
                                                </td>
                                                <td>
                                                <span >
                                                        <MdDelete onClick={(event) => onDeleteImagen(item.cod, event)}/>
                                                    </span>
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

CreateNewAreaLenguajes.propTypes = {
    className: PropTypes.string,
    space: PropTypes.oneOf([1]),
};

CreateNewAreaLenguajes.defaultProps = {
    space: 1,
};

export default CreateNewAreaLenguajes;
