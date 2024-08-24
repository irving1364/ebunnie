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



const CreateNewAreaCoordenada = ({ className, space }) => {

    const [token, setToken] = useLocalStorage("tokens");
    const [showProductModal, setShowProductModal] = useState(false);
    const [selectedImage, setSelectedImage] = useState();
    const [hasImageError, setHasImageError] = useState(false);
    const [previewData, setPreviewData] = useState({});
    const [isLoad, setIsLoad] = useState(false); 

    const [paisList, setPaisList] = useState([]);
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
        const data = await fetch(process.env.url + "perfil/getPais")
        const result = await data.json();
        setPaisList(result.pais)

        

        console.log(paisList);
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

    // This function will be triggered when the file field change
    const imageChange = (e) => {
        if (e.target.files && e.target.files.length > 0) {
            setSelectedImage(e.target.files[0]);
        }
    };

    const sortHandler = ({ value }) => {
        setTipoUser(value);
        console.log(tipo_usuario);
    };

    const onSubmit = async (e) => {
        console.log(e)
        console.log(token)

        var requestOptions = {
            method: 'POST',
            body: JSON.stringify({
                token: token,
                cod_pais: e.codigo_pais, 
                telefono: e.telefono,
                whatsapp: e.whatsapp,
                telegram: e.telegram,
                user_telegram: e.user_telegram,
                llamada: e.llamada, 
                sms: e.sms,
                llamadas_desconocidas: e.llamadas_desconocidas 
           }),
          };

        fetch( process.env.url + "perfil/addPerfilCoordenada", requestOptions)
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
                                        <div className="col-md-6">
                                            <div className="input-box pb--20">
                                            <label
                                                    htmlFor="codigo_pais"
                                                    className="form-label"
                                                >
                                                    Codigo Pais
                                                </label>

                                                <select 



                                                   
                                                    name="codigo_pais" id="codigo_pais" aria-label="Default select example"
                                                    {...register("codigo_pais", {
                                                        required:
                                                            "Debe seleccionar un Codigo de Pais",
                                                    })}>
                                                    
                                                   
                                                    <option value="">Debe seleccionar una opcion</option>
                                                    {paisList?.map((pais) => (
                                                        <option key={pais.codigo} selected={perfilList.cod_pais == pais.codigo} value={pais.codigo}>{pais.fone} - {pais.iso3} </option>
                                                    ))};
                                                   
                                                    
                                                </select>
                                                {errors.codigo_pais && (
                                                    <ErrorText>
                                                        {errors.codigo_pais?.message}
                                                    </ErrorText>
                                                )}
                                            </div> 
                                        </div>

                                        
                                        <div className="col-md-6">
                                            <div className="input-box pb--20">
                                                <label
                                                    htmlFor="telefono"
                                                    className="form-label"
                                                >
                                                    Telefono
                                                </label>
                                                <input
                                                    id="telefono"
                                                    placeholder="Agrega tu numero telefonico"
                                                    defaultValue={perfilList.telefono}
                                                    {...register("telefono", {
                                                        pattern: {
                                                            value: /^[0-9]+$/,
                                                            message:
                                                                "Ingresa solo numeros",
                                                        },
                                                        required:
                                                            "Telefono es requerida",
                                                    })}
                                                />
                                                {errors.telefono && (
                                                    <ErrorText>
                                                        {errors.telefono?.message}
                                                    </ErrorText>
                                                )}
                                            </div>
                                        </div>


                                        
                                        <div className="col-md-6"> 
                                            <div className="input-box pb--20 rn-check-box mt-5">
                                                <input
                                                    defaultChecked={parseInt(perfilList.telegram)} 
                                                    className="rn-check-box-input"
                                                    type="checkbox"
                                                    id="telegram"
                                                    {...register("telegram", {
                                                    })}
                                                />
                                                <label
                                                    className="rn-check-box-label"
                                                    htmlFor="telegram"
                                                >
                                                    Tienes Telegram?
                                                </label>
                                            </div>
                                        </div> 



                                        
                                        <div className="col-md-6">
                                            <div className="input-box pb--20">
                                                <label
                                                    htmlFor="user_telegram"
                                                    className="form-label"
                                                >
                                                    Usuario de Telegram
                                                </label>
                                                <input
                                                    id="user_telegram"
                                                    placeholder="Agrega su Usuario de Telegram"
                                                    defaultValue={perfilList.user_telegram}
                                                    {...register("user_telegram", {
                                                    })}
                                                />
                                                {errors.user_telegram && (
                                                    <ErrorText>
                                                        {errors.user_telegram?.message}
                                                    </ErrorText>
                                                )}
                                            </div>
                                        </div>

                                        

                                        <div className="col-md-6"> 
                                            <div className="input-box pb--20 rn-check-box">
                                                <input
                                                    defaultChecked={parseInt(perfilList.llamada)} 
                                                    className="rn-check-box-input"
                                                    type="checkbox"
                                                    id="llamada"
                                                    {...register("llamada", {
                                                    })}
                                                />
                                                <label
                                                    className="rn-check-box-label"
                                                    htmlFor="llamada"
                                                >
                                                    Aceptas Llamadas?
                                                </label>
                                            </div>
                                        </div>

                                        <div className="col-md-6"> 
                                            <div className="input-box pb--20 rn-check-box">
                                                <input
                                                    defaultChecked={parseInt(perfilList.sms)} 
                                                    className="rn-check-box-input"
                                                    type="checkbox"
                                                    id="sms"
                                                    {...register("sms", {
                                                    })}
                                                />
                                                <label
                                                    className="rn-check-box-label"
                                                    htmlFor="sms"
                                                >
                                                    Aceptas SMS?
                                                </label>
                                            </div>
                                        </div> 

                                        <div className="col-md-6"> 
                                            <div className="input-box pb--20 rn-check-box ">
                                                <input
                                                    defaultChecked={parseInt(perfilList.whatsapp)} 
                                                    className="rn-check-box-input"
                                                    type="checkbox"
                                                    id="whatsapp"
                                                    {...register("whatsapp", {
                                                    })}
                                                />
                                                <label
                                                    className="rn-check-box-label"
                                                    htmlFor="whatsapp"
                                                >
                                                    Tienes Whatsapp?
                                                </label>
                                            </div>
                                        </div>


                                        <div className="col-md-6"> 
                                            <div className="input-box pb--20 rn-check-box">
                                                <input
                                                    defaultChecked={parseInt(perfilList.llamadas_desconocidas)} 
                                                    className="rn-check-box-input"
                                                    type="checkbox"
                                                    id="llamadas_desconocidas"
                                                    {...register("llamadas_desconocidas", {
                                                    })}
                                                />
                                                <label
                                                    className="rn-check-box-label"
                                                    htmlFor="llamadas_desconocidas"
                                                >
                                                    Aceptas Llamadas Desconocidas?
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

CreateNewAreaCoordenada.propTypes = {
    className: PropTypes.string,
    space: PropTypes.oneOf([1]),
};

CreateNewAreaCoordenada.defaultProps = {
    space: 1,
};

export default CreateNewAreaCoordenada;
