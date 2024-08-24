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
import { MdDeleteForever } from "react-icons/md";
import VerificacionGaleriaModal from "@components/modals/verificacion-modal/galeria";
import { setText, useBoundStore } from "@utils/usuarioStore";
import { CgDanger } from "react-icons/cg";


const CreateNewAreaGaleria = ({ className, space }) => {


    setText("tesxto nuevo");

    const text = useBoundStore( state => state.text);
    console.log(text);

    const [token, setToken] = useLocalStorage("tokens");
    const [showProductModal, setShowProductModal] = useState(false);
    const [selectedImage, setSelectedImage] = useState();
    const [hasImageError, setHasImageError] = useState(false);
    const [previewData, setPreviewData] = useState({});
    const [isLoad, setIsLoad] = useState(false); 
    const [showBidModal, setShowBidModal] = useState(false);
    const [galeria, setGaleria] = useState();
    const [direccion, setDireccion] = useState(process.env.urlArchivos)
    //const [direccion, setDireccion] = useState("https://ubunnie.com/backendUbunnie/");
    
    


    const [perfil, setPerfil] = useState();
    
    
    const [selectedPortada, setSelectedPortada] = useState(null);
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
        getGaleriaUser();
        
        
      }, []);




    const handleBidModal = () => {
        setShowBidModal((prev) => !prev);
  
    };
   
    const obtenerDatosPerfil = async () => {
        var requestOptionsPerfil = {
            method: 'POST',
            body: JSON.stringify({
                token: localStorage.getItem("tokens")
           }),
          };
        const data6 = await fetch(process.env.url + "perfil/getPerfil", requestOptionsPerfil)
        const result6 = await data6.json();
        setPerfil(result6.perfil)
        setIsLoad(true)
    }

    const getGaleriaUser = async () => {
        var requestOptionsPerfil = {
            method: 'POST',
            body: JSON.stringify({
                token: localStorage.getItem("tokens")
           }),
          };
        const data2 = await fetch(process.env.url + "galeria/getGaleria", requestOptionsPerfil)
        const result2 = await data2.json();    
        //setGaleria(result2.Galeria)
        if(result2.Galeria[0]){
            //console.log("si existe")
            setGaleria(result2.Galeria[0])
        }
        obtenerDatosPerfil();
        console.log(galeria);
    }
    
    



    const imageChangePortada = async (e) => {        
        console.log(e);
        if (e.target.files && e.target.files.length > 0) {
            
            if (e.target.files[0].size > 10e6) {
                toast("El archivo no cumple con el peso maximo de 10mb")
            }else{
                setSelectedPortada(e.target.files[0]);
                console.log(selectedPortada);
                toast("Su archivo se comenzara a enviar")


                try {

                  const formData = new FormData();
                  formData.append('imagen', e.target.files[0]);
                  formData.append('token', token);
                  
            
                  const response = await fetch(process.env.url + 'galeria/addArchivoPortada', {
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
                        getGaleriaUser();
    
                    }
                    if(data.code === 300){
                    console.log(data)
                        toast(data.response)
                    }
                  
                } catch (error) {
                  console.error('Error uploading file:', error);
                }



            }
        }
    };


    
    const deletePortada = async (imagenPortada, e) => {        
        console.log(imagenPortada);
            

        var requestOptions = {
            method: 'POST',
            body: JSON.stringify({
                token: token,
                imagenPortada: imagenPortada,
           }),
          };

        fetch( process.env.url + "galeria/deleteArchivoPortada", requestOptions)
            .then(response => {
                return response.json();
            })
            .then(json => {
                console.log(json);
                if(json.code == 200){
                    console.log(1);
                    getGaleriaUser();
                    toast(json.response)
                }
                if(json.code === 300){
                   console.log(json)
                    toast(json.response)
                }
            })
            
            .catch(error => toast("Ocurrio un error"));        

          
    };


    const addArchivoMultimedia_1 = async (e) => {        
        console.log(e);
        if (e.target.files && e.target.files.length > 0) {
            
            if (e.target.files[0].size > 10e6) {
                toast("El archivo no cumple con el peso maximo de 10mb")
            }else{
               
                toast("Su archivo se comenzara a enviar")


                try {

                  const formData = new FormData();
                  formData.append('archivo', e.target.files[0]);
                  formData.append('token', token);
                  
            
                  const response = await fetch(process.env.url + 'galeria/addArchivoMultimedia_1', {
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
                        getGaleriaUser();
    
                    }
                    if(data.code === 300){
                    console.log(data)
                        toast(data.response)
                    }
                  
                } catch (error) {
                  console.error('Error uploading file:', error);
                }



            }
        }
    };

    const addArchivoMultimedia_2 =  (e) => {        
        console.log(e);
        if (e.target.files && e.target.files.length > 0) {
            
            if (e.target.files[0].size > 10e6) {
                toast("El archivo no cumple con el peso maximo de 10mb")
            }else{
               
                toast("Su archivo se comenzara a enviar")
                peticionAddDinamica("2", e.target.files[0], "galeria/addArchivoMultimedia");
            }
        }
    };

    const addArchivoMultimedia_3 =  (e) => {        
        console.log(e);
        if (e.target.files && e.target.files.length > 0) {
            
            if (e.target.files[0].size > 10e6) {
                toast("El archivo no cumple con el peso maximo de 10mb")
            }else{
               
                toast("Su archivo se comenzara a enviar")
                peticionAddDinamica("3", e.target.files[0], "galeria/addArchivoMultimedia");
            }
        }
    };

    const addArchivoMultimedia_4 =  (e) => {        
        console.log(e);
        if (e.target.files && e.target.files.length > 0) {
            
            if (e.target.files[0].size > 10e6) {
                toast("El archivo no cumple con el peso maximo de 10mb")
            }else{
               
                toast("Su archivo se comenzara a enviar")
                peticionAddDinamica("4", e.target.files[0], "galeria/addArchivoMultimedia");
            }
        }
    };

    const addArchivoMultimedia_5 =  (e) => {        
        console.log(e);
        if (e.target.files && e.target.files.length > 0) {
            
            if (e.target.files[0].size > 10e6) {
                toast("El archivo no cumple con el peso maximo de 10mb")
            }else{
               
                toast("Su archivo se comenzara a enviar")
                peticionAddDinamica("5", e.target.files[0], "galeria/addArchivoMultimedia");
            }
        }
    };

    const addArchivoMultimedia_6 =  (e) => {        
        console.log(e);
        if (e.target.files && e.target.files.length > 0) {
            
            if (e.target.files[0].size > 10e6) {
                toast("El archivo no cumple con el peso maximo de 10mb")
            }else{
               
                toast("Su archivo se comenzara a enviar")
                peticionAddDinamica("6", e.target.files[0], "galeria/addArchivoMultimedia");
            }
        }
    };

    const addArchivoMultimedia_7 =  (e) => {        
        console.log(e);
        if (e.target.files && e.target.files.length > 0) {
            
            if (e.target.files[0].size > 10e6) {
                toast("El archivo no cumple con el peso maximo de 10mb")
            }else{
               
                toast("Su archivo se comenzara a enviar")
                peticionAddDinamica("7", e.target.files[0], "galeria/addArchivoMultimedia");
            }
        }
    };

    const addArchivoMultimedia_8 =  (e) => {        
        console.log(e);
        if (e.target.files && e.target.files.length > 0) {
            
            if (e.target.files[0].size > 10e6) {
                toast("El archivo no cumple con el peso maximo de 10mb")
            }else{
               
                toast("Su archivo se comenzara a enviar")
                peticionAddDinamica("8", e.target.files[0], "galeria/addArchivoMultimedia");
            }
        }
    };

    const addArchivoMultimedia_9 =  (e) => {        
        console.log(e);
        if (e.target.files && e.target.files.length > 0) {
            
            if (e.target.files[0].size > 10e6) {
                toast("El archivo no cumple con el peso maximo de 10mb")
            }else{
               
                toast("Su archivo se comenzara a enviar")
                peticionAddDinamica("9", e.target.files[0], "galeria/addArchivoMultimedia");
            }
        }
    };

    const addArchivoMultimedia_10 =  (e) => {        
        console.log(e);
        if (e.target.files && e.target.files.length > 0) {
            
            if (e.target.files[0].size > 10e6) {
                toast("El archivo no cumple con el peso maximo de 10mb")
            }else{
               
                toast("Su archivo se comenzara a enviar")
                peticionAddDinamica("10", e.target.files[0], "galeria/addArchivoMultimedia");
            }
        }
    };

    const addArchivoMultimedia_11 =  (e) => {        
        console.log(e);
        if (e.target.files && e.target.files.length > 0) {
            
            if (e.target.files[0].size > 10e6) {
                toast("El archivo no cumple con el peso maximo de 10mb")
            }else{
               
                toast("Su archivo se comenzara a enviar")
                peticionAddDinamica("11", e.target.files[0], "galeria/addArchivoMultimedia");
            }
        }
    };

    

    const peticionDeleteDinamica = async(opcion, archivo, e) => {
    
        var requestOptions = {
            method: 'POST',
            body: JSON.stringify({
                token: token,
                archivo: archivo,
                opcion: opcion,
           }),
          };

        fetch( process.env.url + "galeria/deleteMultimediaDinamica", requestOptions)
            .then(response => {
                return response.json();
            })
            .then(json => {
                console.log(json);
                if(json.code == 200){
                    console.log(1);
                    getGaleriaUser();
                    toast(json.response)
                }
                if(json.code === 300){
                   console.log(json)
                    toast(json.response)
                }
            })
            
            .catch(error => toast("Ocurrio un error"));      

    }    

    const peticionAddDinamica = async(opcion, archivo, ruta) => {
        try {

            const formData = new FormData();
            formData.append('archivo', archivo);
            formData.append('token', token);
            formData.append('opcion', opcion);
            
      
            const response = await fetch(process.env.url + ruta, {
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
                  setTimeout(() => {
                    getGaleriaUser();
                  }, 2000);  
                  

              }
              if(data.code === 300){
              console.log(data)
                  toast(data.response)
              }
            
          } catch (error) {
            console.error('Error uploading file:', error);
          }

    }

    
    const deleteMultimedia_1 = async (archivo, e) => {        
        console.log(archivo);
            

        var requestOptions = {
            method: 'POST',
            body: JSON.stringify({
                token: token,
                archivo: archivo,
           }),
          };

        fetch( process.env.url + "galeria/deleteMultimedia_1", requestOptions)
            .then(response => {
                return response.json();
            })
            .then(json => {
                console.log(json);
                if(json.code == 200){
                    console.log(1);
                    getGaleriaUser();
                    toast(json.response)
                }
                if(json.code === 300){
                   console.log(json)
                    toast(json.response)
                }
            })
            
            .catch(error => toast("Ocurrio un error"));        
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
                {/*<form action="#" onSubmit={handleSubmit(onSubmit)}>*/}
               
                    <div className="container">
                        <div className="row g-5">
                            <div className="col-lg-12">
                                <div className="form-wrapper-one">
                                    <div className="row">
                                        


            
                                        
                                        
                                    
                                        <div className="col-md-8">
                                            <h4>Maneja tu Galeria</h4>
                                        </div>

                                        <div className="col-md-4">
                                            <Button
                                            
                                                className=""
                                                onClick={handleBidModal}
                                            >
                                                Reglas de los archivos
                                            </Button>
                                        </div>
                                        
                                        <br />
                                        <br />
                                        <br />
                                        <br />

                                        <p className="pt--10 pb--10">
                                            <CgDanger />  Recuerde que debe tener como minimo la Foto de Portada para que tu perfil se active.
                                        </p>


                                         {!perfil.paquete_activo && (
                                            <h6 className="title mt--20">Usted debe hacer uso de la sección perfil y rellenar sus 
                                                datos basicos para poder crear su galeria.</h6>
                                        )}


                                        {perfil.paquete_activo == "1" &&
                                        <>
                                            
                                                <div className="col-md-3">
                                                    
                                                <div className="upload-area pb--20">
                                                    <div className="upload-formate mb--30">
                                                        <h6 className="title">Foto de Portada</h6>
                                                        <p className="formate">
                                                            Arrastre o elija su archivo para cargar
                                                        </p>
                                                    </div>

                                                    <div className="brows-file-wrapper">

                                                    {galeria.fotografia_portada == '' &&    
                                                        <>
                                                            <input
                                                                name="filePortada"
                                                                accept="image/*"
                                                                id="filePortada"
                                                                type="file"
                                                                className="inputfile"
                                                                data-multiple-caption="{count} files selected"
                                                                multiple={false}
                                                                onChange={imageChangePortada}
                                                            />
                                                           
                                                           
                                                            <label
                                                                htmlFor="filePortada"
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
                                                        </>
                                                    }
                                                    {galeria.fotografia_portada != '' &&     
                                                        <>
                                                           
                                                           <img
                                                                id="createfileImagePortada"
                                                                src={direccion + galeria.fotografia_portada}
                                                                alt=""
                                                                data-black-overlay="6"
                                                            />
                                                        
                                                        
                                                        <label
                                                            htmlFor="createfileImagePortada"
                                                            title="No File Choosen"
                                                            onClick={() => deletePortada(galeria.fotografia_portada)}
                                                       >
                                                            <h1><MdDeleteForever className="color-primary" /> </h1>
                                                            <span className="text-center">
                                                                Eliminar el archivo
                                                            </span>
                                                            
                                                        </label>

                                                        </>
                                                    }    
                                                        
                                                        
                                                    </div>
                                                    
                                                    
                                                </div>
                                            </div>



                                            <div className="col-md-3">
                                                    
                                                <div className="upload-area pb--20">
                                                    <div className="upload-formate mb--30">
                                                        <h6 className="title">Foto Complemento</h6>
                                                        <p className="formate">
                                                            Arrastre o elija su archivo para cargar
                                                        </p>
                                                    </div>

                                                    <div className="brows-file-wrapper">

                                                    {galeria.multimedia_1 == '' &&    
                                                        <>
                                                            <input
                                                                name="fileMulti1"
                                                                accept="image/*"
                                                                id="fileMulti1"
                                                                type="file"
                                                                className="inputfile"
                                                                data-multiple-caption="{count} files selected"
                                                                multiple={false}
                                                                onChange={addArchivoMultimedia_1}
                                                            />
                                                           
                                                           
                                                            <label
                                                                htmlFor="fileMulti1"
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
                                                        </>
                                                    }
                                                    {galeria.multimedia_1 != '' &&     
                                                        <>
                                                           
                                                           <img
                                                                id="multimedia_1"
                                                                src={direccion + galeria.multimedia_1}
                                                                alt=""
                                                                data-black-overlay="6"
                                                            />
                                                        
                                                        
                                                        <label
                                                            htmlFor="multimedia_1"
                                                            title="No File Choosen"
                                                            onClick={() => deleteMultimedia_1(galeria.multimedia_1)}
                                                       >
                                                            <h1><MdDeleteForever className="color-primary" /> </h1>
                                                            <span className="text-center">
                                                                Eliminar el archivo
                                                            </span>
                                                            
                                                        </label>

                                                        </>
                                                    }    
                                                        
                                                        
                                                    </div>
                                                    
                                                    
                                                </div>
                                            </div>

                                        </>
                                    }


                                    {perfil.paquete_activo == "2" &&
                                        <>
                                            
                                                <div className="col-md-3">
                                                    
                                                <div className="upload-area pb--20">
                                                    <div className="upload-formate mb--30">
                                                        <h6 className="title">Foto de Portada</h6>
                                                        <p className="formate">
                                                            Arrastre o elija su archivo para cargar
                                                        </p>
                                                    </div>

                                                    <div className="brows-file-wrapper">

                                                    {galeria.fotografia_portada == '' &&    
                                                        <>
                                                            <input
                                                                name="filePortada"
                                                                accept="image/*"
                                                                id="filePortada"
                                                                type="file"
                                                                className="inputfile"
                                                                data-multiple-caption="{count} files selected"
                                                                multiple={false}
                                                                onChange={imageChangePortada}
                                                            />
                                                           
                                                           
                                                            <label
                                                                htmlFor="filePortada"
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
                                                        </>
                                                    }
                                                    {galeria.fotografia_portada != '' &&     
                                                        <>
                                                           
                                                           <img
                                                                id="createfileImagePortada"
                                                                src={direccion + galeria.fotografia_portada}
                                                                alt=""
                                                                data-black-overlay="6"
                                                            />
                                                        
                                                        
                                                        <label
                                                            htmlFor="createfileImagePortada"
                                                            title="No File Choosen"
                                                            onClick={() => deletePortada(galeria.fotografia_portada)}
                                                       >
                                                            <h1><MdDeleteForever className="color-primary" /> </h1>
                                                            <span className="text-center">
                                                                Eliminar el archivo
                                                            </span>
                                                            
                                                        </label>

                                                        </>
                                                    }    
                                                        
                                                        
                                                    </div>
                                                    
                                                    
                                                </div>
                                            </div>



                                            <div className="col-md-3">
                                                    
                                                <div className="upload-area pb--20">
                                                    <div className="upload-formate mb--30">
                                                        <h6 className="title">Multimedia 1</h6>
                                                        <p className="formate">
                                                            Arrastre o elija su archivo para cargar
                                                        </p>
                                                    </div>

                                                    <div className="brows-file-wrapper">

                                                    {galeria.multimedia_1 == '' &&    
                                                        <>
                                                            <input
                                                                name="fileMulti1"
                                                                accept="image/*,video/*"
                                                                id="fileMulti1"
                                                                type="file"
                                                                className="inputfile"
                                                                data-multiple-caption="{count} files selected"
                                                                multiple={false}
                                                                onChange={addArchivoMultimedia_1}
                                                            />
                                                           
                                                           
                                                            <label
                                                                htmlFor="fileMulti1"
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
                                                        </>
                                                    }
                                                    {galeria.multimedia_1 != '' &&     
                                                        <>
                                                            {(galeria.multimedia_1.includes(".jpg") || galeria.multimedia_1.includes(".png") || galeria.multimedia_1.includes(".jpeg")) &&     
                                                            
                                                                
                                                            <>
                                                                <img
                                                                    id="multimedia_1"
                                                                    src={direccion + galeria.multimedia_1}
                                                                    alt=""
                                                                    data-black-overlay="6"
                                                                />
                                                                
                                                                <label
                                                                    htmlFor="multimedia_1"
                                                                    title="No File Choosen"
                                                                    onClick={() => deleteMultimedia_1(galeria.multimedia_1)}
                                                            >
                                                                    <h1><MdDeleteForever className="color-primary" /> </h1>
                                                                    <span className="text-center">
                                                                        Eliminar el archivo
                                                                    </span>
                                                                    
                                                                </label>
                                                            </>
                                                            }


                                                            {(galeria.multimedia_1.includes(".mp4") || galeria.multimedia_1.includes(".avi") || galeria.multimedia_1.includes(".WMV")) &&     
                                                            
                                                                
                                                                <>
                                                                   
                                                                       
                                                                    <video id="multimedia_1"  controls muted data-black-overlay="6">
                                                                        <source type="video/mp4" src={direccion + galeria.multimedia_1}></source>
                                                                    </video>

                                                                    
                                                                    
                                                                    <label
                                                                        htmlFor="multimedia_1"
                                                                        title="No File Choosen"
                                                                        
                                                                >
                                                                        <h1 onClick={() => deleteMultimedia_1(galeria.multimedia_1)}><MdDeleteForever className="color-primary" /> </h1>
                                                                        <span className="text-center">
                                                                            Eliminar el archivo
                                                                        </span>
                                                                        
                                                                    </label>
                                                                </>
                                                            }
                                                        </>    

                                                    }    
                                                        
                                                        
                                                    </div>
                                                    
                                                    
                                                </div>
                                            </div>


                                            <div className="col-md-3">
                                                    
                                                <div className="upload-area pb--20">
                                                    <div className="upload-formate mb--30">
                                                        <h6 className="title">Multimedia 2</h6>
                                                        <p className="formate">
                                                            Arrastre o elija su archivo para cargar
                                                        </p>
                                                    </div>

                                                    <div className="brows-file-wrapper">

                                                    {galeria.multimedia_2 == '' &&    
                                                        <>
                                                            <input
                                                                name="fileMulti2"
                                                                accept="image/*,video/*"
                                                                id="fileMulti2"
                                                                type="file"
                                                                className="inputfile"
                                                                data-multiple-caption="{count} files selected"
                                                                multiple={false}
                                                                onChange={addArchivoMultimedia_2}
                                                            />
                                                           
                                                           
                                                            <label
                                                                htmlFor="fileMulti2"
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
                                                        </>
                                                    }
                                                    {galeria.multimedia_2 != '' &&     
                                                        <>
                                                            {(galeria.multimedia_2.includes(".jpg") || galeria.multimedia_2.includes(".png") || galeria.multimedia_1.includes(".jpeg")) &&     
                                                            
                                                                
                                                            <>
                                                                <img
                                                                    id="multimedia_2"
                                                                    src={direccion + galeria.multimedia_2}
                                                                    alt=""
                                                                    data-black-overlay="6"
                                                                />
                                                                
                                                                <label
                                                                    htmlFor="multimedia_2"
                                                                    title="No File Choosen"
                                                                    onClick={() => peticionDeleteDinamica("2", galeria.multimedia_2)}
                                                            >
                                                                    <h1 ><MdDeleteForever className="color-primary" /> </h1>
                                                                    <span className="text-center">
                                                                        Eliminar el archivo
                                                                    </span>
                                                                    
                                                                </label>
                                                            </>
                                                            }


                                                            {galeria.multimedia_2.includes(".mp4")  &&     
                                                                <>
                                                                    <video id="multimedia_2"  controls muted data-black-overlay="6">
                                                                        <source type="video/mp4" src={direccion + galeria.multimedia_2}></source>
                                                                    </video>

                                                                    
                                                                    
                                                                    <label
                                                                        htmlFor="multimedia_2"
                                                                        title="No File Choosen"
                                                                        
                                                                >
                                                                        <h1 onClick={() => peticionDeleteDinamica("2", galeria.multimedia_2)}><MdDeleteForever className="color-primary" /> </h1>
                                                                        <span className="text-center">
                                                                            Eliminar el archivo
                                                                        </span>
                                                                        
                                                                    </label>
                                                                </>
                                                            }
                                                        </>    

                                                    }    
                                                    
                                                    </div>                                                    
                                                </div>
                                            </div>


                                            <div className="col-md-3">
                                                    
                                                <div className="upload-area pb--20">
                                                    <div className="upload-formate mb--30">
                                                        <h6 className="title">Multimedia 3</h6>
                                                        <p className="formate">
                                                            Arrastre o elija su archivo para cargar
                                                        </p>
                                                    </div>

                                                    <div className="brows-file-wrapper">

                                                    {galeria.multimedia_3 == '' &&    
                                                        <>
                                                            <input
                                                                name="fileMulti3"
                                                                accept="image/*,video/*"
                                                                id="fileMulti3"
                                                                type="file"
                                                                className="inputfile"
                                                                data-multiple-caption="{count} files selected"
                                                                multiple={false}
                                                                onChange={addArchivoMultimedia_3}
                                                            />
                                                           
                                                           
                                                            <label
                                                                htmlFor="fileMulti3"
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
                                                        </>
                                                    }
                                                    {galeria.multimedia_3 != '' &&     
                                                        <>
                                                            {(galeria.multimedia_3.includes(".jpg") || galeria.multimedia_3.includes(".png") || galeria.multimedia_3.includes(".jpeg")) &&     
                                                            
                                                                
                                                            <>
                                                                <img
                                                                    id="multimedia_3"
                                                                    src={direccion + galeria.multimedia_3}
                                                                    alt=""
                                                                    data-black-overlay="6"
                                                                />
                                                                
                                                                <label
                                                                    htmlFor="multimedia_3"
                                                                    title="No File Choosen"
                                                                    onClick={() => peticionDeleteDinamica("3", galeria.multimedia_3)}
                                                            >
                                                                    <h1 ><MdDeleteForever className="color-primary" /> </h1>
                                                                    <span className="text-center">
                                                                        Eliminar el archivo
                                                                    </span>
                                                                    
                                                                </label>
                                                            </>
                                                            }


                                                            {galeria.multimedia_3.includes(".mp4")  &&     
                                                                <>
                                                                    <video id="multimedia_3"  controls muted data-black-overlay="6">
                                                                        <source type="video/mp4" src={direccion + galeria.multimedia_3}></source>
                                                                    </video>

                                                                    
                                                                    
                                                                    <label
                                                                        htmlFor="multimedia_3"
                                                                        title="No File Choosen"
                                                                        
                                                                >
                                                                        <h1 onClick={() => peticionDeleteDinamica("3", galeria.multimedia_3)}><MdDeleteForever className="color-primary" /> </h1>
                                                                        <span className="text-center">
                                                                            Eliminar el archivo
                                                                        </span>
                                                                        
                                                                    </label>
                                                                </>
                                                            }
                                                        </>    

                                                    }    
                                                    
                                                    </div>                                                    
                                                </div>
                                            </div>




                                            <div className="col-md-3">
                                                    
                                                <div className="upload-area pb--20">
                                                    <div className="upload-formate mb--30">
                                                        <h6 className="title">Multimedia 4</h6>
                                                        <p className="formate">
                                                            Arrastre o elija su archivo para cargar
                                                        </p>
                                                    </div>

                                                    <div className="brows-file-wrapper">

                                                    {galeria.multimedia_4 == '' &&    
                                                        <>
                                                            <input
                                                                name="fileMulti4"
                                                                accept="image/*,video/*"
                                                                id="fileMulti4"
                                                                type="file"
                                                                className="inputfile"
                                                                data-multiple-caption="{count} files selected"
                                                                multiple={false}
                                                                onChange={addArchivoMultimedia_4}
                                                            />
                                                           
                                                           
                                                            <label
                                                                htmlFor="fileMulti4"
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
                                                        </>
                                                    }
                                                    {galeria.multimedia_4 != '' &&     
                                                        <>
                                                            {(galeria.multimedia_4.includes(".jpg") || galeria.multimedia_4.includes(".png") || galeria.multimedia_4.includes(".jpeg")) &&     
                                                            
                                                                
                                                            <>
                                                                <img
                                                                    id="multimedia_4"
                                                                    src={direccion + galeria.multimedia_4}
                                                                    alt=""
                                                                    data-black-overlay="6"
                                                                />
                                                                
                                                                <label
                                                                    htmlFor="multimedia_4"
                                                                    title="No File Choosen"
                                                                    onClick={() => peticionDeleteDinamica("4", galeria.multimedia_4)}
                                                            >
                                                                    <h1 ><MdDeleteForever className="color-primary" /> </h1>
                                                                    <span className="text-center">
                                                                        Eliminar el archivo
                                                                    </span>
                                                                    
                                                                </label>
                                                            </>
                                                            }


                                                            {galeria.multimedia_4.includes(".mp4")  &&     
                                                                <>
                                                                    <video id="multimedia_4"  controls muted data-black-overlay="6">
                                                                        <source type="video/mp4" src={direccion + galeria.multimedia_4}></source>
                                                                    </video>

                                                                    
                                                                    
                                                                    <label
                                                                        htmlFor="multimedia_4"
                                                                        title="No File Choosen"
                                                                        
                                                                >
                                                                        <h1 onClick={() => peticionDeleteDinamica("4", galeria.multimedia_4)}><MdDeleteForever className="color-primary" /> </h1>
                                                                        <span className="text-center">
                                                                            Eliminar el archivo
                                                                        </span>
                                                                        
                                                                    </label>
                                                                </>
                                                            }
                                                        </>    

                                                    }    
                                                    
                                                    </div>                                                    
                                                </div>
                                            </div>
                                        </>
                                    }





                                    {perfil.paquete_activo == "3" &&
                                        <>
                                            
                                                <div className="col-md-3">
                                                    
                                                <div className="upload-area pb--20">
                                                    <div className="upload-formate mb--30">
                                                        <h6 className="title">Foto de Portada</h6>
                                                        <p className="formate">
                                                            Arrastre o elija su archivo para cargar
                                                        </p>
                                                    </div>

                                                    <div className="brows-file-wrapper">

                                                    {galeria.fotografia_portada == '' &&    
                                                        <>
                                                            <input
                                                                name="filePortada"
                                                                accept="image/*"
                                                                id="filePortada"
                                                                type="file"
                                                                className="inputfile"
                                                                data-multiple-caption="{count} files selected"
                                                                multiple={false}
                                                                onChange={imageChangePortada}
                                                            />
                                                           
                                                           
                                                            <label
                                                                htmlFor="filePortada"
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
                                                        </>
                                                    }
                                                    {galeria.fotografia_portada != '' &&     
                                                        <>
                                                           
                                                           <img
                                                                id="createfileImagePortada"
                                                                src={direccion + galeria.fotografia_portada}
                                                                alt=""
                                                                data-black-overlay="6"
                                                            />
                                                        
                                                        
                                                        <label
                                                            htmlFor="createfileImagePortada"
                                                            title="No File Choosen"
                                                            onClick={() => deletePortada(galeria.fotografia_portada)}
                                                       >
                                                            <h1><MdDeleteForever className="color-primary" /> </h1>
                                                            <span className="text-center">
                                                                Eliminar el archivo
                                                            </span>
                                                            
                                                        </label>

                                                        </>
                                                    }    
                                                        
                                                        
                                                    </div>
                                                    
                                                    
                                                </div>
                                            </div>



                                            <div className="col-md-3">
                                                    
                                                <div className="upload-area pb--20">
                                                    <div className="upload-formate mb--30">
                                                        <h6 className="title">Multimedia 1</h6>
                                                        <p className="formate">
                                                            Arrastre o elija su archivo para cargar
                                                        </p>
                                                    </div>

                                                    <div className="brows-file-wrapper">

                                                    {galeria.multimedia_1 == '' &&    
                                                        <>
                                                            <input
                                                                name="fileMulti1"
                                                                accept="image/*,video/*"
                                                                id="fileMulti1"
                                                                type="file"
                                                                className="inputfile"
                                                                data-multiple-caption="{count} files selected"
                                                                multiple={false}
                                                                onChange={addArchivoMultimedia_1}
                                                            />
                                                           
                                                           
                                                            <label
                                                                htmlFor="fileMulti1"
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
                                                        </>
                                                    }
                                                    {galeria.multimedia_1 != '' &&     
                                                        <>
                                                            {(galeria.multimedia_1.includes(".jpg") || galeria.multimedia_1.includes(".png") || galeria.multimedia_1.includes(".jpeg")) &&     
                                                            
                                                                
                                                            <>
                                                                <img
                                                                    id="multimedia_1"
                                                                    src={direccion + galeria.multimedia_1}
                                                                    alt=""
                                                                    data-black-overlay="6"
                                                                />
                                                                
                                                                <label
                                                                    htmlFor="multimedia_1"
                                                                    title="No File Choosen"
                                                                    onClick={() => deleteMultimedia_1(galeria.multimedia_1)}
                                                            >
                                                                    <h1><MdDeleteForever className="color-primary" /> </h1>
                                                                    <span className="text-center">
                                                                        Eliminar el archivo
                                                                    </span>
                                                                    
                                                                </label>
                                                            </>
                                                            }


                                                            {(galeria.multimedia_1.includes(".mp4") || galeria.multimedia_1.includes(".avi") || galeria.multimedia_1.includes(".WMV")) &&     
                                                            
                                                                
                                                                <>
                                                                   
                                                                       
                                                                    <video id="multimedia_1"  controls muted data-black-overlay="6">
                                                                        <source type="video/mp4" src={direccion + galeria.multimedia_1}></source>
                                                                    </video>

                                                                    
                                                                    
                                                                    <label
                                                                        htmlFor="multimedia_1"
                                                                        title="No File Choosen"
                                                                        
                                                                >
                                                                        <h1 onClick={() => deleteMultimedia_1(galeria.multimedia_1)}><MdDeleteForever className="color-primary" /> </h1>
                                                                        <span className="text-center">
                                                                            Eliminar el archivo
                                                                        </span>
                                                                        
                                                                    </label>
                                                                </>
                                                            }
                                                        </>    

                                                    }    
                                                        
                                                        
                                                    </div>
                                                    
                                                    
                                                </div>
                                            </div>


                                            <div className="col-md-3">
                                                    
                                                <div className="upload-area pb--20">
                                                    <div className="upload-formate mb--30">
                                                        <h6 className="title">Multimedia 2</h6>
                                                        <p className="formate">
                                                            Arrastre o elija su archivo para cargar
                                                        </p>
                                                    </div>

                                                    <div className="brows-file-wrapper">

                                                    {galeria.multimedia_2 == '' &&    
                                                        <>
                                                            <input
                                                                name="fileMulti2"
                                                                accept="image/*,video/*"
                                                                id="fileMulti2"
                                                                type="file"
                                                                className="inputfile"
                                                                data-multiple-caption="{count} files selected"
                                                                multiple={false}
                                                                onChange={addArchivoMultimedia_2}
                                                            />
                                                           
                                                           
                                                            <label
                                                                htmlFor="fileMulti2"
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
                                                        </>
                                                    }
                                                    {galeria.multimedia_2 != '' &&     
                                                        <>
                                                            {(galeria.multimedia_2.includes(".jpg") || galeria.multimedia_2.includes(".png") || galeria.multimedia_1.includes(".jpeg")) &&     
                                                            
                                                                
                                                            <>
                                                                <img
                                                                    id="multimedia_2"
                                                                    src={direccion + galeria.multimedia_2}
                                                                    alt=""
                                                                    data-black-overlay="6"
                                                                />
                                                                
                                                                <label
                                                                    htmlFor="multimedia_2"
                                                                    title="No File Choosen"
                                                                    onClick={() => peticionDeleteDinamica("2", galeria.multimedia_2)}
                                                            >
                                                                    <h1 ><MdDeleteForever className="color-primary" /> </h1>
                                                                    <span className="text-center">
                                                                        Eliminar el archivo
                                                                    </span>
                                                                    
                                                                </label>
                                                            </>
                                                            }


                                                            {galeria.multimedia_2.includes(".mp4")  &&     
                                                                <>
                                                                    <video id="multimedia_2"  controls muted data-black-overlay="6">
                                                                        <source type="video/mp4" src={direccion + galeria.multimedia_2}></source>
                                                                    </video>

                                                                    
                                                                    
                                                                    <label
                                                                        htmlFor="multimedia_2"
                                                                        title="No File Choosen"
                                                                        
                                                                >
                                                                        <h1 onClick={() => peticionDeleteDinamica("2", galeria.multimedia_2)}><MdDeleteForever className="color-primary" /> </h1>
                                                                        <span className="text-center">
                                                                            Eliminar el archivo
                                                                        </span>
                                                                        
                                                                    </label>
                                                                </>
                                                            }
                                                        </>    

                                                    }    
                                                    
                                                    </div>                                                    
                                                </div>
                                            </div>


                                            <div className="col-md-3">
                                                    
                                                <div className="upload-area pb--20">
                                                    <div className="upload-formate mb--30">
                                                        <h6 className="title">Multimedia 3</h6>
                                                        <p className="formate">
                                                            Arrastre o elija su archivo para cargar
                                                        </p>
                                                    </div>

                                                    <div className="brows-file-wrapper">

                                                    {galeria.multimedia_3 == '' &&    
                                                        <>
                                                            <input
                                                                name="fileMulti3"
                                                                accept="image/*,video/*"
                                                                id="fileMulti3"
                                                                type="file"
                                                                className="inputfile"
                                                                data-multiple-caption="{count} files selected"
                                                                multiple={false}
                                                                onChange={addArchivoMultimedia_3}
                                                            />
                                                           
                                                           
                                                            <label
                                                                htmlFor="fileMulti3"
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
                                                        </>
                                                    }
                                                    {galeria.multimedia_3 != '' &&     
                                                        <>
                                                            {(galeria.multimedia_3.includes(".jpg") || galeria.multimedia_3.includes(".png") || galeria.multimedia_3.includes(".jpeg")) &&     
                                                            
                                                                
                                                            <>
                                                                <img
                                                                    id="multimedia_3"
                                                                    src={direccion + galeria.multimedia_3}
                                                                    alt=""
                                                                    data-black-overlay="6"
                                                                />
                                                                
                                                                <label
                                                                    htmlFor="multimedia_3"
                                                                    title="No File Choosen"
                                                                    onClick={() => peticionDeleteDinamica("3", galeria.multimedia_3)}
                                                            >
                                                                    <h1 ><MdDeleteForever className="color-primary" /> </h1>
                                                                    <span className="text-center">
                                                                        Eliminar el archivo
                                                                    </span>
                                                                    
                                                                </label>
                                                            </>
                                                            }


                                                            {galeria.multimedia_3.includes(".mp4")  &&     
                                                                <>
                                                                    <video id="multimedia_3"  controls muted data-black-overlay="6">
                                                                        <source type="video/mp4" src={direccion + galeria.multimedia_3}></source>
                                                                    </video>

                                                                    
                                                                    
                                                                    <label
                                                                        htmlFor="multimedia_3"
                                                                        title="No File Choosen"
                                                                        
                                                                >
                                                                        <h1 onClick={() => peticionDeleteDinamica("3", galeria.multimedia_3)}><MdDeleteForever className="color-primary" /> </h1>
                                                                        <span className="text-center">
                                                                            Eliminar el archivo
                                                                        </span>
                                                                        
                                                                    </label>
                                                                </>
                                                            }
                                                        </>    

                                                    }    
                                                    
                                                    </div>                                                    
                                                </div>
                                            </div>




                                            <div className="col-md-3">
                                                    
                                                <div className="upload-area pb--20">
                                                    <div className="upload-formate mb--30">
                                                        <h6 className="title">Multimedia 4</h6>
                                                        <p className="formate">
                                                            Arrastre o elija su archivo para cargar
                                                        </p>
                                                    </div>

                                                    <div className="brows-file-wrapper">

                                                    {galeria.multimedia_4 == '' &&    
                                                        <>
                                                            <input
                                                                name="fileMulti4"
                                                                accept="image/*,video/*"
                                                                id="fileMulti4"
                                                                type="file"
                                                                className="inputfile"
                                                                data-multiple-caption="{count} files selected"
                                                                multiple={false}
                                                                onChange={addArchivoMultimedia_4}
                                                            />
                                                           
                                                           
                                                            <label
                                                                htmlFor="fileMulti4"
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
                                                        </>
                                                    }
                                                    {galeria.multimedia_4 != '' &&     
                                                        <>
                                                            {(galeria.multimedia_4.includes(".jpg") || galeria.multimedia_4.includes(".png") || galeria.multimedia_4.includes(".jpeg")) &&     
                                                            
                                                                
                                                            <>
                                                                <img
                                                                    id="multimedia_4"
                                                                    src={direccion + galeria.multimedia_4}
                                                                    alt=""
                                                                    data-black-overlay="6"
                                                                />
                                                                
                                                                <label
                                                                    htmlFor="multimedia_4"
                                                                    title="No File Choosen"
                                                                    onClick={() => peticionDeleteDinamica("4", galeria.multimedia_4)}
                                                            >
                                                                    <h1 ><MdDeleteForever className="color-primary" /> </h1>
                                                                    <span className="text-center">
                                                                        Eliminar el archivo
                                                                    </span>
                                                                    
                                                                </label>
                                                            </>
                                                            }


                                                            {galeria.multimedia_4.includes(".mp4")  &&     
                                                                <>
                                                                    <video id="multimedia_4"  controls muted data-black-overlay="6">
                                                                        <source type="video/mp4" src={direccion + galeria.multimedia_4}></source>
                                                                    </video>

                                                                    
                                                                    
                                                                    <label
                                                                        htmlFor="multimedia_4"
                                                                        title="No File Choosen"
                                                                        
                                                                >
                                                                        <h1 onClick={() => peticionDeleteDinamica("4", galeria.multimedia_4)}><MdDeleteForever className="color-primary" /> </h1>
                                                                        <span className="text-center">
                                                                            Eliminar el archivo
                                                                        </span>
                                                                        
                                                                    </label>
                                                                </>
                                                            }
                                                        </>    

                                                    }    
                                                    
                                                    </div>                                                    
                                                </div>
                                            </div>


                                            <div className="col-md-3">
                                                    
                                                <div className="upload-area pb--20">
                                                    <div className="upload-formate mb--30">
                                                        <h6 className="title">Multimedia 5</h6>
                                                        <p className="formate">
                                                            Arrastre o elija su archivo para cargar
                                                        </p>
                                                    </div>

                                                    <div className="brows-file-wrapper">

                                                    {galeria.multimedia_5 == '' &&    
                                                        <>
                                                            <input
                                                                name="fileMulti5"
                                                                accept="image/*,video/*"
                                                                id="fileMulti5"
                                                                type="file"
                                                                className="inputfile"
                                                                data-multiple-caption="{count} files selected"
                                                                multiple={false}
                                                                onChange={addArchivoMultimedia_5}
                                                            />
                                                           
                                                           
                                                            <label
                                                                htmlFor="fileMulti5"
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
                                                        </>
                                                    }
                                                    {galeria.multimedia_5 != '' &&     
                                                        <>
                                                            {(galeria.multimedia_5.includes(".jpg") || galeria.multimedia_5.includes(".png") || galeria.multimedia_5.includes(".jpeg")) &&     
                                                            
                                                                
                                                            <>
                                                                <img
                                                                    id="multimedia_5"
                                                                    src={direccion + galeria.multimedia_5}
                                                                    alt=""
                                                                    data-black-overlay="6"
                                                                />
                                                                
                                                                <label
                                                                    htmlFor="multimedia_5"
                                                                    title="No File Choosen"
                                                                    onClick={() => peticionDeleteDinamica("5", galeria.multimedia_5)}
                                                            >
                                                                    <h1 ><MdDeleteForever className="color-primary" /> </h1>
                                                                    <span className="text-center">
                                                                        Eliminar el archivo
                                                                    </span>
                                                                    
                                                                </label>
                                                            </>
                                                            }


                                                            {galeria.multimedia_5.includes(".mp4")  &&     
                                                                <>
                                                                    <video id="multimedia_5"  controls muted data-black-overlay="6">
                                                                        <source type="video/mp4" src={direccion + galeria.multimedia_5}></source>
                                                                    </video>

                                                                    
                                                                    
                                                                    <label
                                                                        htmlFor="multimedia_5"
                                                                        title="No File Choosen"
                                                                        
                                                                >
                                                                        <h1 onClick={() => peticionDeleteDinamica("5", galeria.multimedia_5)}><MdDeleteForever className="color-primary" /> </h1>
                                                                        <span className="text-center">
                                                                            Eliminar el archivo
                                                                        </span>
                                                                        
                                                                    </label>
                                                                </>
                                                            }
                                                        </>    

                                                    }    
                                                    
                                                    </div>                                                    
                                                </div>
                                            </div>

                                            <div className="col-md-3">
                                                    
                                                <div className="upload-area pb--20">
                                                    <div className="upload-formate mb--30">
                                                        <h6 className="title">Multimedia 6</h6>
                                                        <p className="formate">
                                                            Arrastre o elija su archivo para cargar
                                                        </p>
                                                    </div>

                                                    <div className="brows-file-wrapper">

                                                    {galeria.multimedia_6 == '' &&    
                                                        <>
                                                            <input
                                                                name="fileMulti6"
                                                                accept="image/*,video/*"
                                                                id="fileMulti6"
                                                                type="file"
                                                                className="inputfile"
                                                                data-multiple-caption="{count} files selected"
                                                                multiple={false}
                                                                onChange={addArchivoMultimedia_6}
                                                            />
                                                           
                                                           
                                                            <label
                                                                htmlFor="fileMulti6"
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
                                                        </>
                                                    }
                                                    {galeria.multimedia_6 != '' &&     
                                                        <>
                                                            {(galeria.multimedia_6.includes(".jpg") || galeria.multimedia_6.includes(".png") || galeria.multimedia_6.includes(".jpeg")) &&     
                                                            
                                                                
                                                            <>
                                                                <img
                                                                    id="multimedia_6"
                                                                    src={direccion + galeria.multimedia_6}
                                                                    alt=""
                                                                    data-black-overlay="6"
                                                                />
                                                                
                                                                <label
                                                                    htmlFor="multimedia_6"
                                                                    title="No File Choosen"
                                                                    onClick={() => peticionDeleteDinamica("6", galeria.multimedia_6)}
                                                            >
                                                                    <h1 ><MdDeleteForever className="color-primary" /> </h1>
                                                                    <span className="text-center">
                                                                        Eliminar el archivo
                                                                    </span>
                                                                    
                                                                </label>
                                                            </>
                                                            }


                                                            {galeria.multimedia_6.includes(".mp4")  &&     
                                                                <>
                                                                    <video id="multimedia_6"  controls muted data-black-overlay="6">
                                                                        <source type="video/mp4" src={direccion + galeria.multimedia_6}></source>
                                                                    </video>

                                                                    
                                                                    
                                                                    <label
                                                                        htmlFor="multimedia_6"
                                                                        title="No File Choosen"
                                                                        
                                                                >
                                                                        <h1 onClick={() => peticionDeleteDinamica("6", galeria.multimedia_6)}><MdDeleteForever className="color-primary" /> </h1>
                                                                        <span className="text-center">
                                                                            Eliminar el archivo
                                                                        </span>
                                                                        
                                                                    </label>
                                                                </>
                                                            }
                                                        </>    

                                                    }    
                                                    
                                                    </div>                                                    
                                                </div>
                                            </div>



                                            <div className="col-md-3">
                                                    
                                                <div className="upload-area pb--20">
                                                    <div className="upload-formate mb--30">
                                                        <h6 className="title">Multimedia 7</h6>
                                                        <p className="formate">
                                                            Arrastre o elija su archivo para cargar
                                                        </p>
                                                    </div>

                                                    <div className="brows-file-wrapper">

                                                    {galeria.multimedia_7 == '' &&    
                                                        <>
                                                            <input
                                                                name="fileMulti7"
                                                                accept="image/*,video/*"
                                                                id="fileMulti7"
                                                                type="file"
                                                                className="inputfile"
                                                                data-multiple-caption="{count} files selected"
                                                                multiple={false}
                                                                onChange={addArchivoMultimedia_7}
                                                            />
                                                           
                                                           
                                                            <label
                                                                htmlFor="fileMulti7"
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
                                                        </>
                                                    }
                                                    {galeria.multimedia_7 != '' &&     
                                                        <>
                                                            {(galeria.multimedia_7.includes(".jpg") || galeria.multimedia_7.includes(".png") || galeria.multimedia_7.includes(".jpeg")) &&     
                                                            
                                                                
                                                            <>
                                                                <img
                                                                    id="multimedia_7"
                                                                    src={direccion + galeria.multimedia_7}
                                                                    alt=""
                                                                    data-black-overlay="6"
                                                                />
                                                                
                                                                <label
                                                                    htmlFor="multimedia_7"
                                                                    title="No File Choosen"
                                                                    onClick={() => peticionDeleteDinamica("7", galeria.multimedia_7)}
                                                            >
                                                                    <h1 ><MdDeleteForever className="color-primary" /> </h1>
                                                                    <span className="text-center">
                                                                        Eliminar el archivo
                                                                    </span>
                                                                    
                                                                </label>
                                                            </>
                                                            }


                                                            {galeria.multimedia_7.includes(".mp4")  &&     
                                                                <>
                                                                    <video id="multimedia_7"  controls muted data-black-overlay="6">
                                                                        <source type="video/mp4" src={direccion + galeria.multimedia_7}></source>
                                                                    </video>

                                                                    
                                                                    
                                                                    <label
                                                                        htmlFor="multimedia_7"
                                                                        title="No File Choosen"
                                                                        
                                                                >
                                                                        <h1 onClick={() => peticionDeleteDinamica("7", galeria.multimedia_7)}><MdDeleteForever className="color-primary" /> </h1>
                                                                        <span className="text-center">
                                                                            Eliminar el archivo
                                                                        </span>
                                                                        
                                                                    </label>
                                                                </>
                                                            }
                                                        </>    

                                                    }    
                                                    
                                                    </div>                                                    
                                                </div>
                                            </div>



                                            <div className="col-md-3">
                                                    
                                                <div className="upload-area pb--20">
                                                    <div className="upload-formate mb--30">
                                                        <h6 className="title">Multimedia 8</h6>
                                                        <p className="formate">
                                                            Arrastre o elija su archivo para cargar
                                                        </p>
                                                    </div>

                                                    <div className="brows-file-wrapper">

                                                    {galeria.multimedia_8 == '' &&    
                                                        <>
                                                            <input
                                                                name="fileMulti8"
                                                                accept="image/*,video/*"
                                                                id="fileMulti8"
                                                                type="file"
                                                                className="inputfile"
                                                                data-multiple-caption="{count} files selected"
                                                                multiple={false}
                                                                onChange={addArchivoMultimedia_8}
                                                            />
                                                           
                                                           
                                                            <label
                                                                htmlFor="fileMulti8"
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
                                                        </>
                                                    }
                                                    {galeria.multimedia_8 != '' &&     
                                                        <>
                                                            {(galeria.multimedia_8.includes(".jpg") || galeria.multimedia_8.includes(".png") || galeria.multimedia_8.includes(".jpeg")) &&     
                                                            
                                                                
                                                            <>
                                                                <img
                                                                    id="multimedia_8"
                                                                    src={direccion + galeria.multimedia_8}
                                                                    alt=""
                                                                    data-black-overlay="6"
                                                                />
                                                                
                                                                <label
                                                                    htmlFor="multimedia_8"
                                                                    title="No File Choosen"
                                                                    onClick={() => peticionDeleteDinamica("8", galeria.multimedia_8)}
                                                            >
                                                                    <h1 ><MdDeleteForever className="color-primary" /> </h1>
                                                                    <span className="text-center">
                                                                        Eliminar el archivo
                                                                    </span>
                                                                    
                                                                </label>
                                                            </>
                                                            }


                                                            {galeria.multimedia_8.includes(".mp4")  &&     
                                                                <>
                                                                    <video id="multimedia_8"  controls muted data-black-overlay="6">
                                                                        <source type="video/mp4" src={direccion + galeria.multimedia_8}></source>
                                                                    </video>

                                                                    
                                                                    
                                                                    <label
                                                                        htmlFor="multimedia_8"
                                                                        title="No File Choosen"
                                                                        
                                                                >
                                                                        <h1 onClick={() => peticionDeleteDinamica("8", galeria.multimedia_8)}><MdDeleteForever className="color-primary" /> </h1>
                                                                        <span className="text-center">
                                                                            Eliminar el archivo
                                                                        </span>
                                                                        
                                                                    </label>
                                                                </>
                                                            }
                                                        </>    

                                                    }    
                                                    
                                                    </div>                                                    
                                                </div>
                                            </div>                                                

                                      

                                        </>
                                    }







                                    {perfil.paquete_activo == "4" &&
                                        <>
                                            
                                                <div className="col-md-3">
                                                    
                                                <div className="upload-area pb--20">
                                                    <div className="upload-formate mb--30">
                                                        <h6 className="title">Foto de Portada</h6>
                                                        <p className="formate">
                                                            Arrastre o elija su archivo para cargar
                                                        </p>
                                                    </div>

                                                    <div className="brows-file-wrapper">

                                                    {galeria.fotografia_portada == '' &&    
                                                        <>
                                                            <input
                                                                name="filePortada"
                                                                accept="image/*"
                                                                id="filePortada"
                                                                type="file"
                                                                className="inputfile"
                                                                data-multiple-caption="{count} files selected"
                                                                multiple={false}
                                                                onChange={imageChangePortada}
                                                            />
                                                           
                                                           
                                                            <label
                                                                htmlFor="filePortada"
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
                                                        </>
                                                    }
                                                    {galeria.fotografia_portada != '' &&     
                                                        <>
                                                           
                                                           <img
                                                                id="createfileImagePortada"
                                                                src={direccion + galeria.fotografia_portada}
                                                                alt=""
                                                                data-black-overlay="6"
                                                            />
                                                        
                                                        
                                                        <label
                                                            htmlFor="createfileImagePortada"
                                                            title="No File Choosen"
                                                            onClick={() => deletePortada(galeria.fotografia_portada)}
                                                       >
                                                            <h1><MdDeleteForever className="color-primary" /> </h1>
                                                            <span className="text-center">
                                                                Eliminar el archivo
                                                            </span>
                                                            
                                                        </label>

                                                        </>
                                                    }    
                                                        
                                                        
                                                    </div>
                                                    
                                                    
                                                </div>
                                            </div>



                                            <div className="col-md-3">
                                                    
                                                <div className="upload-area pb--20">
                                                    <div className="upload-formate mb--30">
                                                        <h6 className="title">Multimedia 1</h6>
                                                        <p className="formate">
                                                            Arrastre o elija su archivo para cargar
                                                        </p>
                                                    </div>

                                                    <div className="brows-file-wrapper">

                                                    {galeria.multimedia_1 == '' &&    
                                                        <>
                                                            <input
                                                                name="fileMulti1"
                                                                accept="image/*,video/*"
                                                                id="fileMulti1"
                                                                type="file"
                                                                className="inputfile"
                                                                data-multiple-caption="{count} files selected"
                                                                multiple={false}
                                                                onChange={addArchivoMultimedia_1}
                                                            />
                                                           
                                                           
                                                            <label
                                                                htmlFor="fileMulti1"
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
                                                        </>
                                                    }
                                                    {galeria.multimedia_1 != '' &&     
                                                        <>
                                                            {(galeria.multimedia_1.includes(".jpg") || galeria.multimedia_1.includes(".png") || galeria.multimedia_1.includes(".jpeg")) &&     
                                                            
                                                                
                                                            <>
                                                                <img
                                                                    id="multimedia_1"
                                                                    src={direccion + galeria.multimedia_1}
                                                                    alt=""
                                                                    data-black-overlay="6"
                                                                />
                                                                
                                                                <label
                                                                    htmlFor="multimedia_1"
                                                                    title="No File Choosen"
                                                                    onClick={() => deleteMultimedia_1(galeria.multimedia_1)}
                                                            >
                                                                    <h1><MdDeleteForever className="color-primary" /> </h1>
                                                                    <span className="text-center">
                                                                        Eliminar el archivo
                                                                    </span>
                                                                    
                                                                </label>
                                                            </>
                                                            }


                                                            {(galeria.multimedia_1.includes(".mp4") || galeria.multimedia_1.includes(".avi") || galeria.multimedia_1.includes(".WMV")) &&     
                                                            
                                                                
                                                                <>
                                                                   
                                                                       
                                                                    <video id="multimedia_1"  controls muted data-black-overlay="6">
                                                                        <source type="video/mp4" src={direccion + galeria.multimedia_1}></source>
                                                                    </video>

                                                                    
                                                                    
                                                                    <label
                                                                        htmlFor="multimedia_1"
                                                                        title="No File Choosen"
                                                                        
                                                                >
                                                                        <h1 onClick={() => deleteMultimedia_1(galeria.multimedia_1)}><MdDeleteForever className="color-primary" /> </h1>
                                                                        <span className="text-center">
                                                                            Eliminar el archivo
                                                                        </span>
                                                                        
                                                                    </label>
                                                                </>
                                                            }
                                                        </>    

                                                    }    
                                                        
                                                        
                                                    </div>
                                                    
                                                    
                                                </div>
                                            </div>


                                            <div className="col-md-3">
                                                    
                                                <div className="upload-area pb--20">
                                                    <div className="upload-formate mb--30">
                                                        <h6 className="title">Multimedia 2</h6>
                                                        <p className="formate">
                                                            Arrastre o elija su archivo para cargar
                                                        </p>
                                                    </div>

                                                    <div className="brows-file-wrapper">

                                                    {galeria.multimedia_2 == '' &&    
                                                        <>
                                                            <input
                                                                name="fileMulti2"
                                                                accept="image/*,video/*"
                                                                id="fileMulti2"
                                                                type="file"
                                                                className="inputfile"
                                                                data-multiple-caption="{count} files selected"
                                                                multiple={false}
                                                                onChange={addArchivoMultimedia_2}
                                                            />
                                                           
                                                           
                                                            <label
                                                                htmlFor="fileMulti2"
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
                                                        </>
                                                    }
                                                    {galeria.multimedia_2 != '' &&     
                                                        <>
                                                            {(galeria.multimedia_2.includes(".jpg") || galeria.multimedia_2.includes(".png") || galeria.multimedia_1.includes(".jpeg")) &&     
                                                            
                                                                
                                                            <>
                                                                <img
                                                                    id="multimedia_2"
                                                                    src={direccion + galeria.multimedia_2}
                                                                    alt=""
                                                                    data-black-overlay="6"
                                                                />
                                                                
                                                                <label
                                                                    htmlFor="multimedia_2"
                                                                    title="No File Choosen"
                                                                    onClick={() => peticionDeleteDinamica("2", galeria.multimedia_2)}
                                                            >
                                                                    <h1 ><MdDeleteForever className="color-primary" /> </h1>
                                                                    <span className="text-center">
                                                                        Eliminar el archivo
                                                                    </span>
                                                                    
                                                                </label>
                                                            </>
                                                            }


                                                            {galeria.multimedia_2.includes(".mp4")  &&     
                                                                <>
                                                                    <video id="multimedia_2"  controls muted data-black-overlay="6">
                                                                        <source type="video/mp4" src={direccion + galeria.multimedia_2}></source>
                                                                    </video>

                                                                    
                                                                    
                                                                    <label
                                                                        htmlFor="multimedia_2"
                                                                        title="No File Choosen"
                                                                        
                                                                >
                                                                        <h1 onClick={() => peticionDeleteDinamica("2", galeria.multimedia_2)}><MdDeleteForever className="color-primary" /> </h1>
                                                                        <span className="text-center">
                                                                            Eliminar el archivo
                                                                        </span>
                                                                        
                                                                    </label>
                                                                </>
                                                            }
                                                        </>    

                                                    }    
                                                    
                                                    </div>                                                    
                                                </div>
                                            </div>


                                            <div className="col-md-3">
                                                    
                                                <div className="upload-area pb--20">
                                                    <div className="upload-formate mb--30">
                                                        <h6 className="title">Multimedia 3</h6>
                                                        <p className="formate">
                                                            Arrastre o elija su archivo para cargar
                                                        </p>
                                                    </div>

                                                    <div className="brows-file-wrapper">

                                                    {galeria.multimedia_3 == '' &&    
                                                        <>
                                                            <input
                                                                name="fileMulti3"
                                                                accept="image/*,video/*"
                                                                id="fileMulti3"
                                                                type="file"
                                                                className="inputfile"
                                                                data-multiple-caption="{count} files selected"
                                                                multiple={false}
                                                                onChange={addArchivoMultimedia_3}
                                                            />
                                                           
                                                           
                                                            <label
                                                                htmlFor="fileMulti3"
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
                                                        </>
                                                    }
                                                    {galeria.multimedia_3 != '' &&     
                                                        <>
                                                            {(galeria.multimedia_3.includes(".jpg") || galeria.multimedia_3.includes(".png") || galeria.multimedia_3.includes(".jpeg")) &&     
                                                            
                                                                
                                                            <>
                                                                <img
                                                                    id="multimedia_3"
                                                                    src={direccion + galeria.multimedia_3}
                                                                    alt=""
                                                                    data-black-overlay="6"
                                                                />
                                                                
                                                                <label
                                                                    htmlFor="multimedia_3"
                                                                    title="No File Choosen"
                                                                    onClick={() => peticionDeleteDinamica("3", galeria.multimedia_3)}
                                                            >
                                                                    <h1 ><MdDeleteForever className="color-primary" /> </h1>
                                                                    <span className="text-center">
                                                                        Eliminar el archivo
                                                                    </span>
                                                                    
                                                                </label>
                                                            </>
                                                            }


                                                            {galeria.multimedia_3.includes(".mp4")  &&     
                                                                <>
                                                                    <video id="multimedia_3"  controls muted data-black-overlay="6">
                                                                        <source type="video/mp4" src={direccion + galeria.multimedia_3}></source>
                                                                    </video>

                                                                    
                                                                    
                                                                    <label
                                                                        htmlFor="multimedia_3"
                                                                        title="No File Choosen"
                                                                        
                                                                >
                                                                        <h1 onClick={() => peticionDeleteDinamica("3", galeria.multimedia_3)}><MdDeleteForever className="color-primary" /> </h1>
                                                                        <span className="text-center">
                                                                            Eliminar el archivo
                                                                        </span>
                                                                        
                                                                    </label>
                                                                </>
                                                            }
                                                        </>    

                                                    }    
                                                    
                                                    </div>                                                    
                                                </div>
                                            </div>




                                            <div className="col-md-3">
                                                    
                                                <div className="upload-area pb--20">
                                                    <div className="upload-formate mb--30">
                                                        <h6 className="title">Multimedia 4</h6>
                                                        <p className="formate">
                                                            Arrastre o elija su archivo para cargar
                                                        </p>
                                                    </div>

                                                    <div className="brows-file-wrapper">

                                                    {galeria.multimedia_4 == '' &&    
                                                        <>
                                                            <input
                                                                name="fileMulti4"
                                                                accept="image/*,video/*"
                                                                id="fileMulti4"
                                                                type="file"
                                                                className="inputfile"
                                                                data-multiple-caption="{count} files selected"
                                                                multiple={false}
                                                                onChange={addArchivoMultimedia_4}
                                                            />
                                                           
                                                           
                                                            <label
                                                                htmlFor="fileMulti4"
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
                                                        </>
                                                    }
                                                    {galeria.multimedia_4 != '' &&     
                                                        <>
                                                            {(galeria.multimedia_4.includes(".jpg") || galeria.multimedia_4.includes(".png") || galeria.multimedia_4.includes(".jpeg")) &&     
                                                            
                                                                
                                                            <>
                                                                <img
                                                                    id="multimedia_4"
                                                                    src={direccion + galeria.multimedia_4}
                                                                    alt=""
                                                                    data-black-overlay="6"
                                                                />
                                                                
                                                                <label
                                                                    htmlFor="multimedia_4"
                                                                    title="No File Choosen"
                                                                    onClick={() => peticionDeleteDinamica("4", galeria.multimedia_4)}
                                                            >
                                                                    <h1 ><MdDeleteForever className="color-primary" /> </h1>
                                                                    <span className="text-center">
                                                                        Eliminar el archivo
                                                                    </span>
                                                                    
                                                                </label>
                                                            </>
                                                            }


                                                            {galeria.multimedia_4.includes(".mp4")  &&     
                                                                <>
                                                                    <video id="multimedia_4"  controls muted data-black-overlay="6">
                                                                        <source type="video/mp4" src={direccion + galeria.multimedia_4}></source>
                                                                    </video>

                                                                    
                                                                    
                                                                    <label
                                                                        htmlFor="multimedia_4"
                                                                        title="No File Choosen"
                                                                        
                                                                >
                                                                        <h1 onClick={() => peticionDeleteDinamica("4", galeria.multimedia_4)}><MdDeleteForever className="color-primary" /> </h1>
                                                                        <span className="text-center">
                                                                            Eliminar el archivo
                                                                        </span>
                                                                        
                                                                    </label>
                                                                </>
                                                            }
                                                        </>    

                                                    }    
                                                    
                                                    </div>                                                    
                                                </div>
                                            </div>


                                            <div className="col-md-3">
                                                    
                                                <div className="upload-area pb--20">
                                                    <div className="upload-formate mb--30">
                                                        <h6 className="title">Multimedia 5</h6>
                                                        <p className="formate">
                                                            Arrastre o elija su archivo para cargar
                                                        </p>
                                                    </div>

                                                    <div className="brows-file-wrapper">

                                                    {galeria.multimedia_5 == '' &&    
                                                        <>
                                                            <input
                                                                name="fileMulti5"
                                                                accept="image/*,video/*"
                                                                id="fileMulti5"
                                                                type="file"
                                                                className="inputfile"
                                                                data-multiple-caption="{count} files selected"
                                                                multiple={false}
                                                                onChange={addArchivoMultimedia_5}
                                                            />
                                                           
                                                           
                                                            <label
                                                                htmlFor="fileMulti5"
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
                                                        </>
                                                    }
                                                    {galeria.multimedia_5 != '' &&     
                                                        <>
                                                            {(galeria.multimedia_5.includes(".jpg") || galeria.multimedia_5.includes(".png") || galeria.multimedia_5.includes(".jpeg")) &&     
                                                            
                                                                
                                                            <>
                                                                <img
                                                                    id="multimedia_5"
                                                                    src={direccion + galeria.multimedia_5}
                                                                    alt=""
                                                                    data-black-overlay="6"
                                                                />
                                                                
                                                                <label
                                                                    htmlFor="multimedia_5"
                                                                    title="No File Choosen"
                                                                    onClick={() => peticionDeleteDinamica("5", galeria.multimedia_5)}
                                                            >
                                                                    <h1 ><MdDeleteForever className="color-primary" /> </h1>
                                                                    <span className="text-center">
                                                                        Eliminar el archivo
                                                                    </span>
                                                                    
                                                                </label>
                                                            </>
                                                            }


                                                            {galeria.multimedia_5.includes(".mp4")  &&     
                                                                <>
                                                                    <video id="multimedia_5"  controls muted data-black-overlay="6">
                                                                        <source type="video/mp4" src={direccion + galeria.multimedia_5}></source>
                                                                    </video>

                                                                    
                                                                    
                                                                    <label
                                                                        htmlFor="multimedia_5"
                                                                        title="No File Choosen"
                                                                        
                                                                >
                                                                        <h1 onClick={() => peticionDeleteDinamica("5", galeria.multimedia_5)}><MdDeleteForever className="color-primary" /> </h1>
                                                                        <span className="text-center">
                                                                            Eliminar el archivo
                                                                        </span>
                                                                        
                                                                    </label>
                                                                </>
                                                            }
                                                        </>    

                                                    }    
                                                    
                                                    </div>                                                    
                                                </div>
                                            </div>

                                            <div className="col-md-3">
                                                    
                                                <div className="upload-area pb--20">
                                                    <div className="upload-formate mb--30">
                                                        <h6 className="title">Multimedia 6</h6>
                                                        <p className="formate">
                                                            Arrastre o elija su archivo para cargar
                                                        </p>
                                                    </div>

                                                    <div className="brows-file-wrapper">

                                                    {galeria.multimedia_6 == '' &&    
                                                        <>
                                                            <input
                                                                name="fileMulti6"
                                                                accept="image/*,video/*"
                                                                id="fileMulti6"
                                                                type="file"
                                                                className="inputfile"
                                                                data-multiple-caption="{count} files selected"
                                                                multiple={false}
                                                                onChange={addArchivoMultimedia_6}
                                                            />
                                                           
                                                           
                                                            <label
                                                                htmlFor="fileMulti6"
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
                                                        </>
                                                    }
                                                    {galeria.multimedia_6 != '' &&     
                                                        <>
                                                            {(galeria.multimedia_6.includes(".jpg") || galeria.multimedia_6.includes(".png") || galeria.multimedia_6.includes(".jpeg")) &&     
                                                            
                                                                
                                                            <>
                                                                <img
                                                                    id="multimedia_6"
                                                                    src={direccion + galeria.multimedia_6}
                                                                    alt=""
                                                                    data-black-overlay="6"
                                                                />
                                                                
                                                                <label
                                                                    htmlFor="multimedia_6"
                                                                    title="No File Choosen"
                                                                    onClick={() => peticionDeleteDinamica("6", galeria.multimedia_6)}
                                                            >
                                                                    <h1 ><MdDeleteForever className="color-primary" /> </h1>
                                                                    <span className="text-center">
                                                                        Eliminar el archivo
                                                                    </span>
                                                                    
                                                                </label>
                                                            </>
                                                            }


                                                            {galeria.multimedia_6.includes(".mp4")  &&     
                                                                <>
                                                                    <video id="multimedia_6"  controls muted data-black-overlay="6">
                                                                        <source type="video/mp4" src={direccion + galeria.multimedia_6}></source>
                                                                    </video>

                                                                    
                                                                    
                                                                    <label
                                                                        htmlFor="multimedia_6"
                                                                        title="No File Choosen"
                                                                        
                                                                >
                                                                        <h1 onClick={() => peticionDeleteDinamica("6", galeria.multimedia_6)}><MdDeleteForever className="color-primary" /> </h1>
                                                                        <span className="text-center">
                                                                            Eliminar el archivo
                                                                        </span>
                                                                        
                                                                    </label>
                                                                </>
                                                            }
                                                        </>    

                                                    }    
                                                    
                                                    </div>                                                    
                                                </div>
                                            </div>



                                            <div className="col-md-3">
                                                    
                                                <div className="upload-area pb--20">
                                                    <div className="upload-formate mb--30">
                                                        <h6 className="title">Multimedia 7</h6>
                                                        <p className="formate">
                                                            Arrastre o elija su archivo para cargar
                                                        </p>
                                                    </div>

                                                    <div className="brows-file-wrapper">

                                                    {galeria.multimedia_7 == '' &&    
                                                        <>
                                                            <input
                                                                name="fileMulti7"
                                                                accept="image/*,video/*"
                                                                id="fileMulti7"
                                                                type="file"
                                                                className="inputfile"
                                                                data-multiple-caption="{count} files selected"
                                                                multiple={false}
                                                                onChange={addArchivoMultimedia_7}
                                                            />
                                                           
                                                           
                                                            <label
                                                                htmlFor="fileMulti7"
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
                                                        </>
                                                    }
                                                    {galeria.multimedia_7 != '' &&     
                                                        <>
                                                            {(galeria.multimedia_7.includes(".jpg") || galeria.multimedia_7.includes(".png") || galeria.multimedia_7.includes(".jpeg")) &&     
                                                            
                                                                
                                                            <>
                                                                <img
                                                                    id="multimedia_7"
                                                                    src={direccion + galeria.multimedia_7}
                                                                    alt=""
                                                                    data-black-overlay="6"
                                                                />
                                                                
                                                                <label
                                                                    htmlFor="multimedia_7"
                                                                    title="No File Choosen"
                                                                    onClick={() => peticionDeleteDinamica("7", galeria.multimedia_7)}
                                                            >
                                                                    <h1 ><MdDeleteForever className="color-primary" /> </h1>
                                                                    <span className="text-center">
                                                                        Eliminar el archivo
                                                                    </span>
                                                                    
                                                                </label>
                                                            </>
                                                            }


                                                            {galeria.multimedia_7.includes(".mp4")  &&     
                                                                <>
                                                                    <video id="multimedia_7"  controls muted data-black-overlay="6">
                                                                        <source type="video/mp4" src={direccion + galeria.multimedia_7}></source>
                                                                    </video>

                                                                    
                                                                    
                                                                    <label
                                                                        htmlFor="multimedia_7"
                                                                        title="No File Choosen"
                                                                        
                                                                >
                                                                        <h1 onClick={() => peticionDeleteDinamica("7", galeria.multimedia_7)}><MdDeleteForever className="color-primary" /> </h1>
                                                                        <span className="text-center">
                                                                            Eliminar el archivo
                                                                        </span>
                                                                        
                                                                    </label>
                                                                </>
                                                            }
                                                        </>    

                                                    }    
                                                    
                                                    </div>                                                    
                                                </div>
                                            </div>



                                            <div className="col-md-3">
                                                    
                                                <div className="upload-area pb--20">
                                                    <div className="upload-formate mb--30">
                                                        <h6 className="title">Multimedia 8</h6>
                                                        <p className="formate">
                                                            Arrastre o elija su archivo para cargar
                                                        </p>
                                                    </div>

                                                    <div className="brows-file-wrapper">

                                                    {galeria.multimedia_8 == '' &&    
                                                        <>
                                                            <input
                                                                name="fileMulti8"
                                                                accept="image/*,video/*"
                                                                id="fileMulti8"
                                                                type="file"
                                                                className="inputfile"
                                                                data-multiple-caption="{count} files selected"
                                                                multiple={false}
                                                                onChange={addArchivoMultimedia_8}
                                                            />
                                                           
                                                           
                                                            <label
                                                                htmlFor="fileMulti8"
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
                                                        </>
                                                    }
                                                    {galeria.multimedia_8 != '' &&     
                                                        <>
                                                            {(galeria.multimedia_8.includes(".jpg") || galeria.multimedia_8.includes(".png") || galeria.multimedia_8.includes(".jpeg")) &&     
                                                            
                                                                
                                                            <>
                                                                <img
                                                                    id="multimedia_8"
                                                                    src={direccion + galeria.multimedia_8}
                                                                    alt=""
                                                                    data-black-overlay="6"
                                                                />
                                                                
                                                                <label
                                                                    htmlFor="multimedia_8"
                                                                    title="No File Choosen"
                                                                    onClick={() => peticionDeleteDinamica("8", galeria.multimedia_8)}
                                                            >
                                                                    <h1 ><MdDeleteForever className="color-primary" /> </h1>
                                                                    <span className="text-center">
                                                                        Eliminar el archivo
                                                                    </span>
                                                                    
                                                                </label>
                                                            </>
                                                            }


                                                            {galeria.multimedia_8.includes(".mp4")  &&     
                                                                <>
                                                                    <video id="multimedia_8"  controls muted data-black-overlay="6">
                                                                        <source type="video/mp4" src={direccion + galeria.multimedia_8}></source>
                                                                    </video>

                                                                    
                                                                    
                                                                    <label
                                                                        htmlFor="multimedia_8"
                                                                        title="No File Choosen"
                                                                        
                                                                >
                                                                        <h1 onClick={() => peticionDeleteDinamica("8", galeria.multimedia_8)}><MdDeleteForever className="color-primary" /> </h1>
                                                                        <span className="text-center">
                                                                            Eliminar el archivo
                                                                        </span>
                                                                        
                                                                    </label>
                                                                </>
                                                            }
                                                        </>    

                                                    }    
                                                    
                                                    </div>                                                    
                                                </div>
                                            </div>                                                





                                            <div className="col-md-3">
                                                    
                                                <div className="upload-area pb--20">
                                                    <div className="upload-formate mb--30">
                                                        <h6 className="title">Multimedia 9</h6>
                                                        <p className="formate">
                                                            Arrastre o elija su archivo para cargar
                                                        </p>
                                                    </div>

                                                    <div className="brows-file-wrapper">

                                                    {galeria.multimedia_9 == '' &&    
                                                        <>
                                                            <input
                                                                name="fileMulti9"
                                                                accept="image/*,video/*"
                                                                id="fileMulti9"
                                                                type="file"
                                                                className="inputfile"
                                                                data-multiple-caption="{count} files selected"
                                                                multiple={false}
                                                                onChange={addArchivoMultimedia_9}
                                                            />
                                                           
                                                           
                                                            <label
                                                                htmlFor="fileMulti9"
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
                                                        </>
                                                    }
                                                    {galeria.multimedia_9 != '' &&     
                                                        <>
                                                            {(galeria.multimedia_9.includes(".jpg") || galeria.multimedia_9.includes(".png") || galeria.multimedia_9.includes(".jpeg")) &&     
                                                            
                                                                
                                                            <>
                                                                <img
                                                                    id="multimedia_9"
                                                                    src={direccion + galeria.multimedia_9}
                                                                    alt=""
                                                                    data-black-overlay="6"
                                                                />
                                                                
                                                                <label
                                                                    htmlFor="multimedia_9"
                                                                    title="No File Choosen"
                                                                    onClick={() => peticionDeleteDinamica("9", galeria.multimedia_9)}
                                                            >
                                                                    <h1 ><MdDeleteForever className="color-primary" /> </h1>
                                                                    <span className="text-center">
                                                                        Eliminar el archivo
                                                                    </span>
                                                                    
                                                                </label>
                                                            </>
                                                            }


                                                            {galeria.multimedia_9.includes(".mp4")  &&     
                                                                <>
                                                                    <video id="multimedia_9"  controls muted data-black-overlay="6">
                                                                        <source type="video/mp4" src={direccion + galeria.multimedia_9}></source>
                                                                    </video>

                                                                    
                                                                    
                                                                    <label
                                                                        htmlFor="multimedia_9"
                                                                        title="No File Choosen"
                                                                        
                                                                >
                                                                        <h1 onClick={() => peticionDeleteDinamica("9", galeria.multimedia_9)}><MdDeleteForever className="color-primary" /> </h1>
                                                                        <span className="text-center">
                                                                            Eliminar el archivo
                                                                        </span>
                                                                        
                                                                    </label>
                                                                </>
                                                            }
                                                        </>    

                                                    }    
                                                    
                                                    </div>                                                    
                                                </div>
                                            </div>          




                                            <div className="col-md-3">
                                                    
                                                <div className="upload-area pb--20">
                                                    <div className="upload-formate mb--30">
                                                        <h6 className="title">Multimedia 10</h6>
                                                        <p className="formate">
                                                            Arrastre o elija su archivo para cargar
                                                        </p>
                                                    </div>

                                                    <div className="brows-file-wrapper">

                                                    {galeria.multimedia_10 == '' &&    
                                                        <>
                                                            <input
                                                                name="fileMulti10"
                                                                accept="image/*,video/*"
                                                                id="fileMulti10"
                                                                type="file"
                                                                className="inputfile"
                                                                data-multiple-caption="{count} files selected"
                                                                multiple={false}
                                                                onChange={addArchivoMultimedia_10}
                                                            />
                                                           
                                                           
                                                            <label
                                                                htmlFor="fileMulti10"
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
                                                        </>
                                                    }
                                                    {galeria.multimedia_10 != '' &&     
                                                        <>
                                                            {(galeria.multimedia_10.includes(".jpg") || galeria.multimedia_10.includes(".png") || galeria.multimedia_10.includes(".jpeg")) &&     
                                                            
                                                                
                                                            <>
                                                                <img
                                                                    id="multimedia_10"
                                                                    src={direccion + galeria.multimedia_10}
                                                                    alt=""
                                                                    data-black-overlay="6"
                                                                />
                                                                
                                                                <label
                                                                    htmlFor="multimedia_10"
                                                                    title="No File Choosen"
                                                                    onClick={() => peticionDeleteDinamica("10", galeria.multimedia_10)}
                                                            >
                                                                    <h1 ><MdDeleteForever className="color-primary" /> </h1>
                                                                    <span className="text-center">
                                                                        Eliminar el archivo
                                                                    </span>
                                                                    
                                                                </label>
                                                            </>
                                                            }


                                                            {galeria.multimedia_10.includes(".mp4")  &&     
                                                                <>
                                                                    <video id="multimedia_10"  controls muted data-black-overlay="6">
                                                                        <source type="video/mp4" src={direccion + galeria.multimedia_10}></source>
                                                                    </video>

                                                                    
                                                                    
                                                                    <label
                                                                        htmlFor="multimedia_10"
                                                                        title="No File Choosen"
                                                                        
                                                                >
                                                                        <h1 onClick={() => peticionDeleteDinamica("10", galeria.multimedia_10)}><MdDeleteForever className="color-primary" /> </h1>
                                                                        <span className="text-center">
                                                                            Eliminar el archivo
                                                                        </span>
                                                                        
                                                                    </label>
                                                                </>
                                                            }
                                                        </>    

                                                    }    
                                                    
                                                    </div>                                                    
                                                </div>
                                            </div>          





                                            <div className="col-md-3">
                                                    
                                                <div className="upload-area pb--20">
                                                    <div className="upload-formate mb--30">
                                                        <h6 className="title">Multimedia 11</h6>
                                                        <p className="formate">
                                                            Arrastre o elija su archivo para cargar
                                                        </p>
                                                    </div>

                                                    <div className="brows-file-wrapper">

                                                    {galeria.multimedia_11 == '' &&    
                                                        <>
                                                            <input
                                                                name="fileMulti11"
                                                                accept="image/*,video/*"
                                                                id="fileMulti11"
                                                                type="file"
                                                                className="inputfile"
                                                                data-multiple-caption="{count} files selected"
                                                                multiple={false}
                                                                onChange={addArchivoMultimedia_11}
                                                            />
                                                           
                                                           
                                                            <label
                                                                htmlFor="fileMulti11"
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
                                                        </>
                                                    }
                                                    {galeria.multimedia_11 != '' &&     
                                                        <>
                                                            {(galeria.multimedia_11.includes(".jpg") || galeria.multimedia_11.includes(".png") || galeria.multimedia_11.includes(".jpeg")) &&     
                                                            
                                                                
                                                            <>
                                                                <img
                                                                    id="multimedia_11"
                                                                    src={direccion + galeria.multimedia_11}
                                                                    alt=""
                                                                    data-black-overlay="6"
                                                                />
                                                                
                                                                <label
                                                                    htmlFor="multimedia_11"
                                                                    title="No File Choosen"
                                                                    onClick={() => peticionDeleteDinamica("11", galeria.multimedia_11)}
                                                            >
                                                                    <h1 ><MdDeleteForever className="color-primary" /> </h1>
                                                                    <span className="text-center">
                                                                        Eliminar el archivo
                                                                    </span>
                                                                    
                                                                </label>
                                                            </>
                                                            }


                                                            {galeria.multimedia_11.includes(".mp4")  &&     
                                                                <>
                                                                    <video id="multimedia_11"  controls muted data-black-overlay="6">
                                                                        <source type="video/mp4" src={direccion + galeria.multimedia_11}></source>
                                                                    </video>

                                                                    
                                                                    
                                                                    <label
                                                                        htmlFor="multimedia_11"
                                                                        title="No File Choosen"
                                                                        
                                                                >
                                                                        <h1 onClick={() => peticionDeleteDinamica("11", galeria.multimedia_11)}><MdDeleteForever className="color-primary" /> </h1>
                                                                        <span className="text-center">
                                                                            Eliminar el archivo
                                                                        </span>
                                                                        
                                                                    </label>
                                                                </>
                                                            }
                                                        </>    

                                                    }    
                                                    
                                                    </div>                                                    
                                                </div>
                                            </div>          





                                        </>
                                    }
                                        
                                        
                                        
                                      
                                      

                                        
                                    </div>
                                </div>
                            </div>
                         
                         
                        </div>
                    </div>
        
        

                
                




            </div>
            
            <VerificacionGaleriaModal show={showBidModal} handleModal={handleBidModal} />
        </>
    );
    };
};

CreateNewAreaGaleria.propTypes = {
    className: PropTypes.string,
    space: PropTypes.oneOf([1]),
};

CreateNewAreaGaleria.defaultProps = {
    space: 1,
};

export default CreateNewAreaGaleria;
