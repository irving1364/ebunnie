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
import Anchor from "@ui/anchor";

import VerificacionModal from "@components/modals/verificacion-modal";
import { setDescripcion, usePerfilStore } from "@utils/paqueteStore";


const CreateNewAreaVerificacion = ({ className, space }) => {

    const [token, setToken] = useLocalStorage("tokens");
    const [showProductModal, setShowProductModal] = useState(false);
    const [selectedImage, setSelectedImage] = useState();
    const [hasImageError, setHasImageError] = useState(false);
    const [previewData, setPreviewData] = useState({});
    const [isLoad, setIsLoad] = useState(false); 
    const [showBidModal, setShowBidModal] = useState(false);
    
    const [paisList, setPaisList] = useState([]);
    const [verificacionesList, setVerificacionesList] = useState([]);
    
    
    const [selectedFile1, setSelectedFile1] = useState(null);
    const [selectedFile2, setSelectedFile2] = useState(null);
    const [selectedFile3, setSelectedFile3] = useState(null);
    const [selectedFile4, setSelectedFile4] = useState(null);
    

    console.log(token)


    const {
        register,
        formState: { errors },
        reset,
    } = useForm({
        mode: "onChange",
    });

    useEffect(() => {
        obtenerDatosPerfil();
      }, []);




    const handleBidModal = () => {
        setShowBidModal((prev) => !prev);
  
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
    
        

        if (!selectedFile1 && !selectedFile2 && !selectedFile3) {
          toast('Debe seleccionar 2 imagenes y un video');
          return;
        }
    
        toast("Se comenzará el envio de sus archivos")

        try {

            console.log(setSelectedFile1);

          const formData = new FormData();
          formData.append('foto1', selectedFile1);
          formData.append('foto2', selectedFile2);
          formData.append('video1', selectedFile3);
          formData.append('video2', selectedFile4);
          
          formData.append('token', token);
          
    
          const response = await fetch(process.env.url + 'perfil/addVerificacion', {
            method: 'POST',
            body: formData
          });
    
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
    
          const data = await response.json();
          if(data.code == 200){
                console.log(1);

                toast(data.response)
                obtenerDatosPerfil();
            }
            if(data.code === 300){
            console.log(data)
                toast(data.response)
            }
          
        } catch (error) {
          console.error('Error uploading file:', error);
        }
      };
   

    const obtenerDatosPerfil = async () => {
        var requestOptionsPerfil = {
            method: 'POST',
            body: JSON.stringify({
                token: localStorage.getItem("tokens")
           }),
          };

        const data6 = await fetch(process.env.url + "perfil/getVerificaciones", requestOptionsPerfil)
        const result6 = await data6.json();
        setVerificacionesList(result6.verificaciones)
        setIsLoad(true)
        console.log(verificacionesList);
    }

    const notify = () => toast("Your product has submitted");
    const handleProductModal = () => {
        setShowProductModal(false);
    };

    // This function will be triggered when the file field change
    const imageChange = (e) => {
        console.log(e);
        if (e.target.files && e.target.files.length > 0) {
            
            if (e.target.files[0].size > 10e6) {
                toast("El archivo no cumple con el peso maximo de 2mb")
            }else{
                setSelectedFile1(e.target.files[0]);
                console.log(selectedFile1);
            }
        }
    };

    const imageChange2 = (e) => {
        console.log(e);
        if (e.target.files && e.target.files.length > 0) {

            if (e.target.files[0].size > 10e6) {
                toast("El archivo no cumple con el peso maximo de 2mb")
            }else{
                setSelectedFile2(e.target.files[0]);
            }
        }
    };


    const imageChange3 = (e) => {
        console.log(e);
        if (e.target.files && e.target.files.length > 0) {

            if (e.target.files[0].size > 10e6) {
                toast("El archivo no cumple con el peso maximo de 10mb")
            }else{
                setSelectedFile3(e.target.files[0]);
            }
        }
    };


    const imageChange4 = (e) => {
        console.log(e);
        if (e.target.files && e.target.files.length > 0) {

            if (e.target.files[0].size > 10e6) {
                toast("El archivo no cumple con el peso maximo de 10mb")
            }else{
                setSelectedFile4(e.target.files[0]);
            }
        }
    };




    const sortHandler = ({ value }) => {
        setTipoUser(value);
        console.log(tipo_usuario);
    };

    const onSubmit = async (e) => {
        console.log(e)
        console.log(selectedImage)



        
    

        var formData=new FormData();
        formData.append('file',selectedImage);
        formData.append('nombre', 'texto');


        console.log(formData)

        var requestOptions = {
            
            method: 'POST',
            body: formData,
            redirect: "follow"
          };

        

        fetch( process.env.url + "perfil/addVerificacion", requestOptions)
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
                {/*<form action="#" onSubmit={handleSubmit(onSubmit)}>*/}
                <form onSubmit={handleSubmit}>
                    <div className="container">
                        <div className="row g-5">
                            <div className="col-lg-12">
                                <div className="form-wrapper-one">
                                    <div className="row">
                                        


            
                                        
                                        
                                    
                                        <div className="col-md-8">
                                            <h4>Formulario de Verificación</h4>
                                        </div>

                                        <div className="col-md-4">
                                            <Button
                                            
                                                className=""
                                                onClick={handleBidModal}
                                            >
                                                Reglas de Verificacón
                                            </Button>
                                        </div>
                                        
                                        <br />
                                        <br />
                                        <br />
                                        <br />


                                        <div className="col-md-6">
                                            
                                            <div className="upload-area pb--20">
                                                <div className="upload-formate mb--30">
                                                    <h6 className="title">Primera Foto</h6>
                                                    <p className="formate">
                                                        
Arrastre o elija su archivo para cargar
                                                    </p>
                                                </div>

                                                <div className="brows-file-wrapper">
                                                    <input
                                                        name="file"
                                                        accept="image/*"
                                                        id="file"
                                                        type="file"
                                                        className="inputfile"
                                                        data-multiple-caption="{count} files selected"
                                                        multiple={false}
                                                        onChange={imageChange}
                                                    />
                                                    {selectedFile1 && (
                                                        <img
                                                            id="createfileImage"
                                                            src={URL.createObjectURL(
                                                                selectedFile1
                                                            )}
                                                            alt=""
                                                            data-black-overlay="6"
                                                        />
                                                    )}

                                                    <label
                                                        htmlFor="file"
                                                        title="No File Choosen"
                                                    >
                                                        <i className="feather-upload" />
                                                        <span className="text-center">
                                                            Selecciona tu Foto
                                                        </span>
                                                        <p className="text-center mt--10">
                                                            PNG, GIF, WEBP, JPG.{" "}
                                                            <br /> Max 10mb.
                                                        </p>
                                                    </label>
                                                </div>
                                                {hasImageError && !selectedImage && (
                                                    <ErrorText>Image is required</ErrorText>
                                                )}
                                            </div>
                                        </div>

                                        <div className="col-md-6">
                                            
                                            <div className="upload-area pb--20">
                                                <div className="upload-formate mb--30">
                                                    <h6 className="title">Segunda Foto</h6>
                                                    <p className="formate">
                                                        
Arrastre o elija su archivo para cargar
                                                    </p>
                                                </div>

                                                <div className="brows-file-wrapper">
                                                    <input
                                                        name="file2"
                                                        id="file2"
                                                        accept="image/*"
                                                        type="file"
                                                        className="inputfile"
                                                        data-multiple-caption="{count} files selected"
                                                        multiple
                                                        onChange={imageChange2}
                                                    />
                                                    {selectedFile2 && (
                                                        <img
                                                            id="createfileImage"
                                                            src={URL.createObjectURL(
                                                                selectedFile2
                                                            )}
                                                            alt=""
                                                            data-black-overlay="6"
                                                        />
                                                    )}

                                                    <label
                                                        htmlFor="file2"
                                                        title="No File Choosen"
                                                    >
                                                        <i className="feather-upload" />
                                                        <span className="text-center">
                                                            Escoge un archivo
                                                        </span>
                                                        <p className="text-center mt--10">
                                                            PNG, GIF, WEBP, JPG.{" "}
                                                            <br /> Max 10MB.
                                                        </p>
                                                    </label>
                                                </div>
                                                {hasImageError && !selectedImage && (
                                                    <ErrorText>Image is required</ErrorText>
                                                )}
                                            </div>
                                        </div>

                                        <div className="col-md-6">
                                            
                                            <div className="upload-area pb--20">
                                                <div className="upload-formate mb--30">
                                                    <h6 className="title">Video</h6>
                                                    <p className="formate">
                                                        
Arrastre o elija su archivo para cargar
                                                    </p>
                                                </div>

                                                <div className="brows-file-wrapper">
                                                    <input type="file" id="file3"
                                                     accept="video/*" 
                                                     onChange={imageChange3} />
                                                    {selectedFile3 && (
                                                        <div
                                                            id="createfileImage"
                                                            
                                                            alt=""
                                                            data-black-overlay="6"
                                                        > Se selecciono el video correctamente</div>
                                                    )}

                                                    <label
                                                        htmlFor="file3"
                                                        title="No File Choosen"
                                                    >
                                                        <i className="feather-upload" />
                                                        <span className="text-center">
                                                            Escoge un archivo
                                                        </span>
                                                        <p className="text-center mt--10">
                                                             MP4, AVI, OTROS.{" "}
                                                            <br /> Max 10Mb.
                                                        </p>
                                                    </label>
                                                </div>
                                                {hasImageError && !selectedImage && (
                                                    <ErrorText>Image is required</ErrorText>
                                                )}
                                            </div>
                                        </div>

                                        <div className="col-md-6">
                                            
                                            <div className="upload-area pb--20">
                                                <div className="upload-formate mb--30">
                                                    <h6 className="title">Opcional</h6>
                                                    <p className="formate">
                                                        
Arrastre o elija su archivo para cargar
                                                    </p>
                                                </div>

                                                <div className="brows-file-wrapper">
                                                    <input
                                                        name="file4"
                                                        id="file4"
                                                        accept="video/mp4,video/x-m4v,video/*"
                                                        type="file"
                                                        className="inputfile"
                                                        onChange={imageChange4}
                                                    />
                                                    {selectedFile4 && (
                                                        <div
                                                            id="createfileImage"
                                                            className="color-primary"
                                                            alt=""
                                                            data-black-overlay="6"
                                                        > Se selecciono el video correctamente</div>
                                                    )}

                                                    <label
                                                        htmlFor="file4"
                                                        title="No File Choosen"
                                                    >
                                                        <i className="feather-upload" />
                                                        <span className="text-center">
                                                            Escoge un archivo
                                                        </span>
                                                        <p className="text-center mt--10">
                                                        MP4, AVI, OTROS.{" "}
                                                            <br /> Max 10Mb.
                                                        </p>
                                                    </label>
                                                </div>
                                                {hasImageError && !selectedImage && (
                                                    <ErrorText>Image is required</ErrorText>
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

                                        
                                    </div>
                                </div>
                            </div>
                         
                         
                        </div>
                    </div>
                </form>


                
                <div className="col-12 mt-5">
                        <div className="table-title-area d-flex">
                        <h4>Mis Solicitudes de Verificacion</h4>
                    </div>

                    <div className="box-table table-responsive">
                      
                        <table className="table upcoming-projects">
                            <thead>
                                <tr>
                                    <th>
                                        <span>Codigo</span>
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
                                        <span>Mensaje</span>
                                    </th>
                                </tr>
                            </thead>
                            <tbody>

                            
                            
                                {verificacionesList?.map((item, i) => (
                                
                                <tr
                                        key={item.cod}
                                        className={i % 2 === 0 ? "color-light" : ""}
                                    >
                                        <td>
                                            <span>{item.cod}</span>
                                        </td>
                                        <td>
                                           <a href={'https://ubunnie.com/backendUbunnie/'+ item.foto_1 } target="_blank"> Link</a>
                                        </td>
                                        <td>
                                            <a href={'https://ubunnie.com/backendUbunnie/'+ item.foto_2 } target="_blank"> Link</a>
                                        </td>
                                        <td>
                                            <a href={'https://ubunnie.com/backendUbunnie/'+ item.video_1 } target="_blank"> Link</a>
                                        </td>
                                        <td>

                                            {item.video_2 != '' &&
                                                <a href={'https://ubunnie.com/backendUbunnie/'+ item.video_2 } target="_blank"> Link</a>
                                            }

                                            {item.video_2 === "" &&
                                                <p>No cargo un archivo</p>
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
                                            <span >
                                                {item.mensaje}
                                            </span>
                                        </td>
                                        <td>
                                        <span >
                                         
                                            </span>
                                        </td>


                                    
                                    </tr>
                                ))}
                            </tbody>
                        </table>

                    </div>
                </div>





            </div>
            
            <VerificacionModal show={showBidModal} handleModal={handleBidModal} />
        </>
    );
    };
};

CreateNewAreaVerificacion.propTypes = {
    className: PropTypes.string,
    space: PropTypes.oneOf([1]),
};

CreateNewAreaVerificacion.defaultProps = {
    space: 1,
};

export default CreateNewAreaVerificacion;
