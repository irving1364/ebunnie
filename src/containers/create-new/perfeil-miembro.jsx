/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import { useForm } from "react-hook-form";
import Button from "@ui/button";
import ProductModal from "@components/modals/product-modal";
import ErrorText from "@ui/error-text";
import { toast } from "react-toastify";
import { useLocalStorage } from "src/hooks/use-local-storage";
import Editor from 'react-simple-wysiwyg';

import InputRange from "@ui/input-range";

import { Range, getTrackBackground } from "react-range";
const STEP = 1;
const MIN = 18;
const MAX = 100;
const CreateNewAreaPerfilMiembro = ({ className, space }) => {

   
    const [values, setValues] = useState([18, 100]);
  
    const [token, setToken] = useLocalStorage("tokens");
    const [showProductModal, setShowProductModal] = useState(false);
    const [selectedImage, setSelectedImage] = useState();
    const [hasImageError, setHasImageError] = useState(false);
    const [previewData, setPreviewData] = useState({});
    const [isLoad, setIsLoad] = useState(false); 

    const [ciudadesList, setCiudadesList] = useState([]);
    const [tipoScortList, setTipoScortList] = useState([]);
    const [perfilList, setPerfilList] = useState([]);
    const [edad, setEdad] = useState();
    const [html, setHtml] = useState('');
  
    function onChange(e) {
        setHtml(e.target.value);
    }

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

      const priceHandler = (value) => {
        setEdad(value)
        //dispatch({ type: "SET_INPUTS", payload: { price: value } });
        console.log(edad);
    };

    const obtenerDatos = async () => {
        const data = await fetch(process.env.url + "perfil/getCiudades")
        const result = await data.json();
        setCiudadesList(result.ciudades)

        const data5 = await fetch(process.env.url + "perfil/getTipoScort")
        const result5 = await data5.json();
        setTipoScortList(result5.tipo_scort)


        var requestOptionsPerfil = {
            method: 'POST',
            body: JSON.stringify({
                token: localStorage.getItem("tokens")
            }),
            };

        const data6 = await fetch(process.env.url + "perfil/getPerfilMiembro", requestOptionsPerfil)
        const result6 = await data6.json();
        setPerfilList(result6.perfil)
        console.log(perfilList);
        setHtml(perfilList.sobre_mi);    
        //var min = parseInt(perfilList.edad_minima);
        //var max = parseInt(perfilList.edad_maxima);
      
        //setValues([min, max]);
      
        

        console.log(ciudadesList);
        console.log(perfilList);
        setIsLoad(true)
    }    

    const notify = () => toast("Your product has submitted");
    const handleProductModal = () => {
        setShowProductModal(false);
    };

 

    const onSubmit = async (e) => {
       
        console.log(values)

        var requestOptions = {
            method: 'POST',
            body: JSON.stringify({
                token: token,
                cod_ciudad: e.ciudad_base, 
                tipo_escort: e.tipo,
                edad_minima: values[0],
                edad_maxima: values[1],
                sobre_mi: html 
           }),
          };

        fetch( process.env.url + "perfil/addPerfilMiembro", requestOptions)
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
                                                    Ciudad de Interes 
                                                </label>

                                                <select                                                    
                                                    name="ciudad_base" id="ciudad_base" aria-label="Default select example"
                                                    {...register("ciudad_base", {
                                                        required:
                                                            "Debe seleccionar un Ciudad Base",
                                                    })}>
                                                    <option value="">Debe seleccionar una opcion</option>
                                                    {ciudadesList?.map((ciudad) => (
                                                        <option key={ciudad.cod} selected={perfilList.cod_ciudad == ciudad.cod} value={ciudad.cod}>{ciudad.ciudad}</option>
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
                                                    htmlFor="tipo"
                                                    className="form-label"
                                                >
                                                    Tipo de Escort de Preferencia
                                                </label>

                                                <select 
                                                    name="tipo" id="tipo" aria-label="Default select example"
                                                    {...register("tipo", {
                                                        required:
                                                            "Debe seleccionar un tipo de Escort",
                                                    })}>
                                                    
                                                   
                                                    <option value="">Debe seleccionar una opcion</option>
                                                    {tipoScortList?.map((tipo) => (
                                                        <option key={tipo.cod} selected={perfilList.tipo_escort == tipo.cod} value={tipo.cod}>{tipo.tipo_scort} </option>
                                                    ))};
                                                   
                                                    
                                                </select>
                                                {errors.tipo && (
                                                    <ErrorText>
                                                        {errors.tipo?.message}
                                                    </ErrorText>
                                                )}
                                            </div> 
                                        </div>
                                        
                                        
                                        
                                        <div className="col-md-4">
                                            <div className="input-box pb--20">
                                            <label
                                                    htmlFor="segunda_ciudad"
                                                    className="form-label"
                                                >
                                                    Rango de edad, de su interes.
                                                </label>

                                                <div className="price_filter s-filter clear mt-4">
                                                <Range
        values={values}
        step={STEP}
        min={MIN}
        max={MAX}
        onChange={(values) => setValues(values)}
        renderTrack={({ props, children }) => (
          <div
            onMouseDown={props.onMouseDown}
            onTouchStart={props.onTouchStart}
            style={{
              ...props.style,
              height: '36px',
              display: 'flex',
              width: '100%'
            }}
          >
            <div
              ref={props.ref}
              style={{
                height: '5px',
                width: '100%',
                borderRadius: '4px',
                background: getTrackBackground({
                  values,
                  colors: ['#ccc', '#548BF4', '#ccc'],
                  min: MIN,
                  max: MAX,
                }),
                alignSelf: 'center'
              }}
            >
              {children}
            </div>
          </div>
        )}
        renderThumb={({ index, props, isDragged }) => (
          <div
            {...props}
            style={{
              ...props.style,
              height: '14px',
              width: '14px',
              borderRadius: '4px',
              backgroundColor: '#FFF',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              boxShadow: '0px 2px 6px #AAA'
            }}
          >
            <div
              style={{
                position: 'absolute',
                top: '-28px',
                color: '#fff',
                fontWeight: 'bold',
                fontSize: '14px',
                fontFamily: 'Arial,Helvetica Neue,Helvetica,sans-serif',
                padding: '4px',
                borderRadius: '4px',
                backgroundColor: '#b69225'
              }}
            >
              {values[index].toFixed(1)}
            </div>
            <div
              style={{
                height: '16px',
                width: '5px',
                backgroundColor: isDragged ? '#b69225' : '#b69225'
              }}
            />
          </div>
        )}
      />
                                                </div>
                                                


                                            </div> 
                                        </div>


                                        <div className="col-md-12">
                                            <div className="input-box pb--20">
                                            <label
                                                    htmlFor="segunda_ciudad"
                                                    className="form-label"
                                                >
                                                    Breve reseña sobre usted
                                                </label>
                                                <Editor value={html} onChange={onChange} />                                               
                                               
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

CreateNewAreaPerfilMiembro.propTypes = {
    className: PropTypes.string,
    space: PropTypes.oneOf([1]),
};

CreateNewAreaPerfilMiembro.defaultProps = {
    space: 1,
};

export default CreateNewAreaPerfilMiembro;
