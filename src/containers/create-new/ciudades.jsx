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



const CreateNewAreaCiudades = ({ className, space }) => {

    const [token, setToken] = useLocalStorage("tokens");
    const [showProductModal, setShowProductModal] = useState(false);
    const [selectedImage, setSelectedImage] = useState();
    const [hasImageError, setHasImageError] = useState(false);
    const [previewData, setPreviewData] = useState({});
    const [isLoad, setIsLoad] = useState(false); 

    const [ciudadesList, setCiudadesList] = useState([]);
    const [perfilList, setPerfilList] = useState([]);
    
    console.log(token)


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
        obtenerDatosPerfil();
      }, []);

    const obtenerDatos = async () => {
        const data = await fetch(process.env.url + "perfil/getCiudades")
        const result = await data.json();
        setCiudadesList(result.ciudades)
        
        console.log(ciudadesList);
        setIsLoad(true)
    }   
    
    
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
        console.log(perfilList);
    }

    const notify = () => toast("Your product has submitted");
    const handleProductModal = () => {
        setShowProductModal(false);
    };

 

    const onSubmit = async (e) => {
       
        var requestOptions = {
            method: 'POST',
            body: JSON.stringify({
                token: token,
                cod_primera_ciudad: e.ciudad_base, 
                cod_segunda_ciudad: e.primera_ciudad,
                cod_tercera_ciudad: e.segunda_ciudad,
                disponibilidad: e.disponibilidad 
           }),
          };

        fetch( process.env.url + "perfil/addPerfilCiudades", requestOptions)
            .then(response => {
                return response.json();
            })
            .then(json => {
                console.log(json);
                if(json.code == 200){
                    console.log(1);

                    toast(json.response)
                    
                }
                if(json.code === 300){
                   console.log(json)
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
                                        <div className="col-md-4">
                                            <div className="input-box pb--20">
                                            <label
                                                    htmlFor="codigo_pais"
                                                    className="form-label"
                                                >
                                                    Ciudad Laboral Actual
                                                </label>

                                                <select                                                    
                                                    name="ciudad_base" id="ciudad_base" aria-label="Default select example"
                                                    {...register("ciudad_base", {
                                                        required:
                                                            "Debe seleccionar un Ciudad Base",
                                                    })}>
                                                    <option value="">Debe seleccionar una opcion</option>
                                                    {ciudadesList?.map((ciudad) => (
                                                        <option key={ciudad.cod} selected={perfilList.cod_primera_ciudad == ciudad.cod} value={ciudad.cod}>{ciudad.ciudad}</option>
                                                    ))};
                                                   
                                                    
                                                </select>
                                                {errors.ciudad_base && (
                                                    <ErrorText>
                                                        {errors.ciudad_base?.message}
                                                    </ErrorText>
                                                )}
                                            </div> 
                                        </div>

                                        <div className="col-md-4">
                                            <div className="input-box pb--20">
                                            <label
                                                    htmlFor="primera_ciudad"
                                                >
                                                    Primera Ciudad laboral (opcional)
                                                </label>

                                                <select                                                    
                                                    name="primera_ciudad" id="primera_ciudad" aria-label="Default select example"
                                                    {...register("primera_ciudad", {
                                                     
                                                    })}>
                                                    
                                                   
                                                    <option value="">Debe seleccionar una opcion</option>
                                                    {ciudadesList?.map((ciudad) => (
                                                        <option key={ciudad.cod} selected={perfilList.cod_segunda_ciudad == ciudad.cod} value={ciudad.cod}>{ciudad.ciudad}</option>
                                                    ))};
                                                   
                                                    
                                                </select>
                                               
                                            </div> 
                                        </div>
                                        
                                        
                                        
                                        <div className="col-md-4">
                                            <div className="input-box pb--20">
                                            <label
                                                    htmlFor="segunda_ciudad"
                                                    className="form-label"
                                                >
                                                    Segunda Ciudad Laboral (Opcional)
                                                </label>

                                                <select                                                    
                                                    name="segunda_ciudad" id="segunda_ciudad" aria-label="Default select example"
                                                    {...register("segunda_ciudad", {
                                                    })}>
                                                    
                                                   
                                                    <option value="">Debe seleccionar una opcion</option>
                                                    {ciudadesList?.map((ciudad) => (
                                                        <option key={ciudad.cod} selected={perfilList.cod_tercera_ciudad == ciudad.cod} value={ciudad.cod}>{ciudad.ciudad}</option>
                                                    ))};
                                                   
                                                    
                                                </select>
                                            </div> 
                                        </div>


                                        <div className="col-md-4"> 
                                            <div className="input-box pb--20 rn-check-box">
                                                <input
                                                    defaultChecked={parseInt(perfilList.disponibilidad)} 
                                                    className="rn-check-box-input"
                                                    type="checkbox"
                                                    id="disponibilidad"
                                                    {...register("disponibilidad", {
                                                    })}
                                                />
                                                <label
                                                    className="rn-check-box-label"
                                                    htmlFor="disponibilidad"
                                                >
                                                    Disponibilidad de Viajar
                                                </label>
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

CreateNewAreaCiudades.propTypes = {
    className: PropTypes.string,
    space: PropTypes.oneOf([1]),
};

CreateNewAreaCiudades.defaultProps = {
    space: 1,
};

export default CreateNewAreaCiudades;
