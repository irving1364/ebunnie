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
import { setDescripcion, usePerfilStore } from "@utils/paqueteStore";


const CreateNewAreaPerfil = ({ className, space }) => {

    const [token, setToken] = useLocalStorage("tokens");
    const [showProductModal, setShowProductModal] = useState(false);
    const [selectedImage, setSelectedImage] = useState();
    const [hasImageError, setHasImageError] = useState(false);
    const [previewData, setPreviewData] = useState({});
    const [isLoad, setIsLoad] = useState(false); 

    const [colorOjosList, setColorOjosList] = useState([]);
    const [colorPeloList, setcolorPeloList] = useState([]);
    const [etniaList, setEtniaList] = useState([]);
    const [nacionalidadList, setNacionalidadList] = useState([]);
    const [tipoScortList, setTipoScortList] = useState([]);
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

        const data = await fetch(process.env.url + "perfil/getColorOjos")
        const result = await data.json();
        setColorOjosList(result.color_ojos)


        const data2 = await fetch(process.env.url + "perfil/getColorPelos")
        const result2 = await data2.json();
        setcolorPeloList(result2.color_pelo)

        
        const data3 = await fetch(process.env.url + "perfil/getEtnia")
        const result3 = await data3.json();
        setEtniaList(result3.etnia)

        const data4 = await fetch(process.env.url + "perfil/getNacionalidad")
        const result4 = await data4.json();
        setNacionalidadList(result4.nacio)
        
        const data5 = await fetch(process.env.url + "perfil/getTipoScort")
        const result5 = await data5.json();
        setTipoScortList(result5.tipo_scort)

        console.log(colorOjosList);
        console.log(colorPeloList);
        console.log(etniaList);
        console.log(nacionalidadList);
        console.log(tipoScortList);
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
                nombre: e.nombre,
                cod_tipo_scort: e.tipo, 
                edad: e.edad,
                slogan: e.eslogan,
                cod_etnia: e.etnia,
                cod_nacionalidad: e.nacionalidad, 
                cod_color_pelo: e.color_pelo,
                longitud_pelo: e.longitud_pelo,
                cod_color_ojos: e.color_ojos, 
                talla_senos: e.talla_senos, 
                tipo_senos: e.tipo_senos, 
                talla: e.talla, 
                peso: e.peso, 
                miembro: e.miembro, 
                miembro_tamano: e.longitud_miembro,
                contextura: e.contextura,
                fuma: e.fuma,
                bebe: e.bebe,
                piercing: e.piercing,
                tatto: e.tatto
           }),
          };

        fetch( process.env.url + "perfil/addPerfil", requestOptions)
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
                                                    htmlFor="edad"
                                                    className="form-label"
                                                >
                                                    Nombre
                                                </label>
                                                <input
                                                    id="nombre"
                                                    placeholder="Agrega tu Nombre"
                                                    defaultValue={perfilList.nombre}
                                                    {...register("nombre", {
                                                        required:
                                                            "Su Nombre es requerida",
                                                    })}
                                                />
                                                {errors.nombre && (
                                                    <ErrorText>
                                                        {errors.nombre?.message}
                                                    </ErrorText>
                                                )}
                                            </div>
                                        </div>

                                        <div className="col-md-6">
                                            <div className="input-box pb--20">
                                            <label
                                                    htmlFor="tipo"
                                                    className="form-label"
                                                >
                                                    Tipo de Escort
                                                </label>

                                                <select                                                    
                                                    name="tipo" id="tipo" aria-label="Default select example"
                                                    {...register("tipo", {
                                                        required:
                                                            "Debe seleccionar un tipo de Escort",
                                                    })}>
                                                    
                                                    <option value="">Debe seleccionar una opcion</option>
                                                    {tipoScortList?.map((tipo) => (
                                                        <option key={tipo.cod} selected={perfilList.cod_tipo_scort == tipo.cod} value={tipo.cod}>{tipo.tipo_scort} </option>
                                                    ))};
                                                   
                                                    
                                                </select>
                                                {errors.tipo && (
                                                    <ErrorText>
                                                        {errors.tipo?.message}
                                                    </ErrorText>
                                                )}
                                            </div> 
                                        </div>

                                        
                                        <div className="col-md-6">
                                            <div className="input-box pb--20">
                                                <label
                                                    htmlFor="edad"
                                                    className="form-label"
                                                >
                                                    Edad
                                                </label>
                                                <input
                                                    id="edad"
                                                    placeholder="Agrega tu edad"
                                                    type="number"
                                                    defaultValue={perfilList.edad}
                                                    {...register("edad", {
                                                        pattern: {
                                                            value: /^[0-9]+$/,
                                                            
                                                            message:
                                                                "Ingresa solo numeros",
                                                            
                                                        },
                                                        required:
                                                            "Edad es requerida",
                                                        min: { value: 18, message: "El valor minimo permitido es 18" },
                                                        max: { value: 100, message: "El valor maximo permitido es 100" },    
                                                    })}
                                                />
                                                {errors.edad && (
                                                    <ErrorText>
                                                        {errors.edad?.message}
                                                    </ErrorText>
                                                )}
                                            </div>
                                        </div>


                                        <div className="col-md-6"> 
                                            <div className="input-box pb--20">    
                                            <label
                                                    htmlFor="eslogan"
                                                    className="form-label"
                                                >
                                                    Eslogan
                                                </label>
                                                <input
                                                    id="eslogan" defaultValue={perfilList.slogan}
                                                    placeholder="Agrega tu eslogan de preferencia`"
                                                    {...register("eslogan", {
                                                    })}
                                                />
                                               
                                            </div>
                                        </div>    



                                        <div className="col-md-6">
                                            <div className="input-box pb--20">
                                            <label
                                                    htmlFor="etnia"
                                                    className="form-label"
                                                >
                                                    Su de etnia
                                                </label>

                                                <select  name="etnia" id="etnia" aria-label="Default select example"
                                                    {...register("etnia", {
                                                        required:
                                                            "Debe seleccionar la etnia",
                                                    })}>
                                                    
                                                   
                                                    <option value="">Debe seleccionar una opcion</option>
                                                    {etniaList?.map((etnias) => (
                                                        <option selected={perfilList.cod_etnia == etnias.cod} value={etnias.cod}>{etnias.etnia} </option>
                                                    ))};
                                                    
                                                </select>
                                                {errors.etnia && (
                                                    <ErrorText>
                                                        {errors.etnia?.message}
                                                    </ErrorText>
                                                )}
                                            </div> 
                                        </div>

                                        <div className="col-md-6">
                                            <div className="input-box pb--20">
                                            <label
                                                    htmlFor="nacionalidad"
                                                    className="form-label"
                                                >
                                                    Su Nacionalidad
                                                </label>

                                                <select name="nacionalidad" id="nacionalidad" aria-label="Default select example"
                                                    {...register("nacionalidad", {
                                                        required:
                                                            "Debe seleccionar su Nacionalidad",
                                                    })}>
                                                    
                                                   
                                                    <option value="">Debe seleccionar una opcion</option>
                                                    {nacionalidadList?.map((nacionalidad) => (
                                                        <option selected={perfilList.cod_nacionalidad == nacionalidad.cod} value={nacionalidad.cod}>{nacionalidad.PAIS_NAC} - {nacionalidad.ISO_NAC} </option>
                                                    ))};
                                                    
                                                </select>
                                                {errors.nacionalidad && (
                                                    <ErrorText>
                                                        {errors.nacionalidad?.message}
                                                    </ErrorText>
                                                )}
                                            </div> 
                                        </div>

                                        <div className="col-md-4">
                                            <div className="input-box pb--20">
                                            <label
                                                    htmlFor="color_ojos"
                                                    className="form-label"
                                                >
                                                    Su color de ojos
                                                </label>

                                                <select className="input-box pb--20" name="color_ojos" id="color_ojos" aria-label="Default select example"
                                                    {...register("color_ojos", {
                                                        required:
                                                        "Color de ojos es requerida",
                                                    })}>
                                                    
                                                    <option value="">Debe seleccionar una opcion</option>
                                                    
                                                    {colorOjosList?.map((color_ojo) => (
                                                        <option selected={perfilList.cod_color_ojos == color_ojo.cod} value={color_ojo.cod}>{color_ojo.color} </option>
                                                    ))};
                                                </select>
                                                {errors.color_ojos && (
                                                    <ErrorText>
                                                        {errors.color_ojos?.message}
                                                    </ErrorText>
                                                )}
                                            </div> 
                                        </div>

                                        <div className="col-md-4">
                                            <div className="input-box pb--20">
                                            <label
                                                    htmlFor="color_pelo"
                                                    className="form-label"
                                                >
                                                    Su color de Cabello
                                                </label>

                                                <select name="color_pelo" id="color_pelo" aria-label="Default select example"
                                                    {...register("color_pelo", {
                                                        required:
                                                        "Color de cabello es requerida",
                                                    })}>
                                                    
                                                    <option value="">Debe seleccionar una opcion</option>
                                                    {colorPeloList?.map((color_pelo) => (
                                                        <option selected={perfilList.cod_color_pelo == color_pelo.cod} value={color_pelo.cod}>{color_pelo.color_pelo} </option>
                                                    ))};
                                                </select>
                                                {errors.color_pelo && (
                                                    <ErrorText>
                                                        {errors.color_pelo?.message}
                                                    </ErrorText>
                                                )}
                                            </div> 
                                        </div>


                                        <div className="col-md-4">
                                            <div className="input-box pb--20">
                                                <label
                                                    htmlFor="longitud_pelo"
                                                    className="form-label"
                                                >
                                                    Logintud de su Cabello (cm)
                                                </label>
                                                <input
                                                    id="longitud_pelo" defaultValue={perfilList.longitud_pelo}
                                                    placeholder="Ingrese la logintud de su Cabello"
                                                    {...register("longitud_pelo", {
                                                        pattern: {
                                                            value: /^[0-9]+$/,
                                                            message:
                                                                "Ingresa solo numeros",
                                                        }
                                                    })}
                                                />
                                                {errors.longitud_pelo && (
                                                    <ErrorText>
                                                        {errors.longitud_pelo?.message}
                                                    </ErrorText>
                                                )}
                                            </div>
                                        </div>

                                        
                                        
                                        <div className="col-md-4">
                                            <div className="input-box pb--20">
                                            <label
                                                    htmlFor="contextura"
                                                    className="form-label"
                                                >
                                                    Su Contextura
                                                </label>

                                                <select name="contextura" id="contextura" aria-label="Default select example"
                                                    {...register("contextura", {
                                                        
                                                    })}>
                                                    
                                                    <option value="">Debe seleccionar una opcion</option>
                                                    <option selected={perfilList.contextura == "1"} value="1">Delgada </option>
                                                    <option selected={perfilList.contextura == "2"} value="2">Media</option>
                                                    <option selected={perfilList.contextura == "3"} value="3">Gruesa</option>
                                                </select>
                                            </div> 
                                        </div>


                                        <div className="col-md-4">
                                            <div className="input-box pb--20">
                                                <label
                                                    htmlFor="talla"
                                                    className="form-label"
                                                >
                                                    Su Estatura (cm)
                                                </label>
                                                <input
                                                    id="talla" defaultValue={perfilList.talla}
                                                    placeholder="Ingrese su Estatura, solo numero"
                                                    {...register("talla", {
                                                        pattern: {
                                                            value: /^[0-9]+$/,
                                                            message:
                                                                "Ingresa solo numeros",
                                                        }
                                                    })}
                                                />
                                                {errors.talla && (
                                                    <ErrorText>
                                                        {errors.talla?.message}
                                                    </ErrorText>
                                                )}
                                            </div>
                                        </div>

                                        <div className="col-md-4">
                                            <div className="input-box pb--20">
                                                <label
                                                    htmlFor="peso"
                                                    className="form-label"
                                                >
                                                    Su Peso (kl)
                                                </label>
                                                <input
                                                    id="peso" defaultValue={perfilList.peso}
                                                    placeholder="Ingrese su Peso"
                                                    {...register("peso", {
                                                        pattern: {
                                                            value: /^[0-9]+$/,
                                                            message:
                                                                "Ingresa solo numeros",
                                                        }
                                                    })}
                                                />
                                                {errors.longitud_pelo && (
                                                    <ErrorText>
                                                        {errors.longitud_pelo?.message}
                                                    </ErrorText>
                                                )}
                                            </div>
                                        </div>





                                        
                                        <div className="col-md-6">
                                            <div className="input-box pb--20">
                                            <label
                                                    htmlFor="tipo_senos"
                                                    className="form-label"
                                                >
                                                    Tipo de Senos
                                                </label>

                                                <select name="tipo_senos" id="tipo_senos" aria-label="Default select example"
                                                    {...register("tipo_senos", {
                                                        
                                                    })}>
                                                   
                                                    <option value="">Debe seleccionar una opcion</option>
                                                    <option selected={perfilList.tipo_senos == "1"} value="1">Naturales</option>
                                                    <option selected={perfilList.tipo_senos == "2"} value="2">Operados</option>
                                                    <option selected={perfilList.tipo_senos == "0"} value="0">No aplica</option>
                                                </select>
                                            </div> 
                                        </div>

                                                                                
                                        <div className="col-md-6">
                                            <div className="input-box pb--20">
                                            <label
                                                    htmlFor="talla_senos"
                                                    className="form-label"
                                                >
                                                    Talla de Senos
                                                </label>

                                                <select name="talla_senos" id="tipo_talla_senossenos" aria-label="Default select example"
                                                    {...register("talla_senos", {
                                                        
                                                    })}>
                                                    
                                                    <option value="">Debe seleccionar una opcion</option>
                                                    <option selected={perfilList.talla_senos == "A"} value="A">A</option>
                                                    <option selected={perfilList.talla_senos == "B"} value="B">B</option>
                                                    <option selected={perfilList.talla_senos == "C"} value="C">C</option>
                                                    <option selected={perfilList.talla_senos == "D"} value="D">D</option>
                                                    <option selected={perfilList.talla_senos == "DD"} value="DD">DD</option>
                                                    <option selected={perfilList.talla_senos == "F"} value="F">F</option>
                                                    <option selected={perfilList.talla_senos == "FF"} value="FF">FF</option>
                                                    <option selected={perfilList.talla_senos == "G"} value="G">G</option>
                                                    <option selected={perfilList.talla_senos == "H"} value="H">H</option>
                                                    <option selected={perfilList.talla_senos == "J"} value="J">J</option>
                                                </select>
                                            </div> 
                                        </div>



                                        <div className="col-md-6">
                                            <div className="input-box pb--20">
                                            <label
                                                    htmlFor="fuma"
                                                    className="form-label"
                                                >
                                                    Usted Fuma?
                                                </label>

                                                <select name="fuma" id="fuma" aria-label="Default select example"
                                                    {...register("fuma", {                                                 
                                                    })}>
                                                    
                                                    <option value="">Debe seleccionar una opcion</option>
                                                    <option selected={perfilList.fuma == "1"} value="1">No </option>
                                                    <option selected={perfilList.fuma == "2"} value="2">Si</option>
                                                    <option selected={perfilList.fuma == "3"} value="3">Eventualmente</option>
                                                </select>
                                            </div> 
                                        </div>
                                        
                                        <div className="col-md-6">
                                            <div className="input-box pb--20">
                                            <label
                                                    htmlFor="bebe"
                                                    className="form-label"
                                                >
                                                    Usted Toma?
                                                </label>

                                                <select name="bebe" id="bebe" aria-label="Default select example"
                                                    {...register("bebe", {                                                 
                                                    })}>
                                                    
                                                    <option value="">Debe seleccionar una opcion</option>
                                                    <option selected={perfilList.bebe == "1"} value="1">No </option>
                                                    <option selected={perfilList.bebe == "2"} value="2">Si</option>
                                                    <option selected={perfilList.bebe == "3"} value="3">Eventualmente</option>
                                                </select>
                                            </div> 
                                        </div>

                                        
                                        <div className="col-md-6">
                                            <div className="input-box pb--20">
                                            <label
                                                    htmlFor="piercing"
                                                    className="form-label"
                                                >
                                                    Posees Piercing
                                                </label>

                                                <select name="piercing" id="piercing" aria-label="Default select example"
                                                    {...register("piercing", {                                                 
                                                    })}>
                                                    
                                                    <option value="">Debe seleccionar una opcion</option>
                                                    <option selected={perfilList.piercing == "1"} value="1">Si </option>
                                                    <option selected={perfilList.piercing == "2"} value="2">No</option>
                                                </select>
                                            </div> 
                                        </div>
                                        
                                        <div className="col-md-6">
                                            <div className="input-box pb--20">
                                            <label
                                                    htmlFor="tatto"
                                                    className="form-label"
                                                >
                                                    Posees Tattoos
                                                </label>

                                                <select name="tatto" id="tatto" aria-label="Default select example"
                                                    {...register("tatto", {                                                 
                                                    })}>
                                                    
                                                    <option value="">Debe seleccionar una opcion</option>
                                                    <option selected={perfilList.tatto == "1"} value="1">Si </option>
                                                    <option selected={perfilList.tatto == "2"} value="2">No</option>
                                                </select>
                                            </div> 
                                        </div>

                                        
                                        <div className="col-md-6">
                                            <div className="input-box pb--20">
                                            <label
                                                    htmlFor="miembro"
                                                    className="form-label"
                                                >
                                                    Posees Miembro
                                                </label>

                                                <select  name="miembro" id="miembro" aria-label="Default select example"
                                                    {...register("miembro", {
                                                        
                                                    })}>
                                                    
                                                    <option value="">Debe seleccionar una opcion</option>
                                                    <option selected={perfilList.miembro == "1"} value="1">Si </option>
                                                    <option selected={perfilList.miembro == "2"} value="2">No</option>
                                                </select>
                                            </div> 
                                        </div>


                                        <div className="col-md-6">
                                            <div className="input-box pb--20">
                                                <label
                                                    htmlFor="longitud_miembro"
                                                    className="form-label"
                                                >
                                                    Logintud de su Miembro
                                                </label>
                                                <input
                                                    id="longitud_miembro" defaultValue={perfilList.miembro_tamano}
                                                    placeholder="Ingrese la logintud de su Cabello"
                                                    {...register("longitud_miembro", {
                                                        pattern: {
                                                            value: /^[0-9]+$/,
                                                            message:
                                                                "Ingresa solo numeros",
                                                        }
                                                    })}
                                                />
                                                {errors.longitud_miembro && (
                                                    <ErrorText>
                                                        {errors.longitud_miembro?.message}
                                                    </ErrorText>
                                                )}
                                            </div>
                                        </div>
















                                        <div className="col-md-12 col-xl-4 mt_lg--15 mt_md--15 mt_sm--15">
                                            <div className="input-box">
                                                <Button type="submit" fullwidth>
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

CreateNewAreaPerfil.propTypes = {
    className: PropTypes.string,
    space: PropTypes.oneOf([1]),
};

CreateNewAreaPerfil.defaultProps = {
    space: 1,
};

export default CreateNewAreaPerfil;
