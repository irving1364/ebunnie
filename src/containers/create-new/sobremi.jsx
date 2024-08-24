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
import Editor from 'react-simple-wysiwyg';



const CreateNewAreaSobreMi = ({ className, space }) => {

    const [token, setToken] = useLocalStorage("tokens");
    const [showProductModal, setShowProductModal] = useState(false);
    const [selectedImage, setSelectedImage] = useState();
    const [hasImageError, setHasImageError] = useState(false);
    const [previewData, setPreviewData] = useState({});
    const [isLoad, setIsLoad] = useState(false); 

    const [sobreMi, setSobreMi] = useState([]);
    const [perfilList, setPerfilList] = useState([]);

    const [html, setHtml] = useState('');
  
    function onChange(e) {
        setHtml(e.target.value);
    }
    
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
        var requestOptionsPerfil = {
            method: 'POST',
            body: JSON.stringify({
                token: localStorage.getItem("tokens")
           }),
          };

        const data = await fetch(process.env.url + "perfil/getSobreMi", requestOptionsPerfil)
        const result = await data.json();
        setHtml(result.sobre_mi.sobre_mi)

        
        console.log(sobreMi);
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
        console.log(e)
        console.log(token)

        var requestOptions = {
            method: 'POST',
            body: JSON.stringify({
                token: token,
                sobre_mi: html, 
           }),
          };

        fetch( process.env.url + "perfil/addSobreMi", requestOptions)
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
                                        <div className="col-md-12">
                                            <div className="input-box pb--20">
                                            <h4
                                                    htmlFor="codigo_pais"
                                                    className="form-label"
                                                >
                                                    Información Sobre Mi
                                                </h4>
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

CreateNewAreaSobreMi.propTypes = {
    className: PropTypes.string,
    space: PropTypes.oneOf([1]),
};

CreateNewAreaSobreMi.defaultProps = {
    space: 1,
};

export default CreateNewAreaSobreMi;
