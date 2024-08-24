import PropTypes from "prop-types";
import clsx from "clsx";
import Button from "@ui/button";
import ErrorText from "@ui/error-text";


import { useForm } from "react-hook-form";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { useLocalStorage } from "src/hooks/use-local-storage";
import { useEffect, useState } from "react";
import NiceSelect from "@ui/nice-select";
import { useRouter } from "next/router";

const RegistroForm = ({ className }) => {

    const [usuario, setUsuario] = useLocalStorage("usuario");
    const [tipo, setTipo] = useLocalStorage("tipo_usuario");
    const [correo, setCorreo] = useLocalStorage("correo");
    const [tokens, setTokens] = useLocalStorage("tokens");
    const [tipo_usuario, setTipoUser] = useState('');

    
  useEffect(()=>{
    localStorage.removeItem("usuario");
    localStorage.removeItem("tipo_usuario");
    localStorage.removeItem("correo");
    localStorage.removeItem("tokens");
  },[]);


    const handleIncrement = () => {
      setCount((prevCount) => prevCount + 1);
    };

    const router = useRouter();

    

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        mode: "onChange",
    });

    const sortHandler = ({ value }) => {
        setTipoUser(value);
        console.log(tipo_usuario);
    };

    /*    const onSubmit = (data, e) => {
            e.preventDefault();
            // eslint-disable-next-line no-console
            console.log(data);
            router.push({
                pathname: "/",
            });
        };*/

   


    const onSubmit = async (e) => {
        console.log(e)



        var requestOptions = {
            method: 'POST',
            body: JSON.stringify({
                usuario: e.usuario, 
                correo: e.correo,
                contrasena: e.contrasena,
                tipo_usuario: tipo_usuario,
           }),
          };

        fetch( process.env.url + "auth/registrarUsuario", requestOptions)
            .then(response => {
                return response.json();
            })
            .then(json => {
                console.log(json);
                if(json.code == 200){
                    console.log(1);

                    toast(json.response.mensaje)
                    setTimeout(function(){
                        router.push('/login')
                    }, 4000);
                    
                }
                if(json.code === 300){
                   console.log(json)
                    toast(json.response.mensaje)
                }
                
                
            })
            
            .catch(error => toast("Ocurrio un error"));

        //        toast("Se envio su información");
        /*
         setTimeout(function () {
             window.location.href = "/";
         }, 4000);
 */
    }





    return (
        <div className={clsx("form-wrapper-one", className)}>
            <h4>Registro </h4>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="mb-5">
                    <label htmlFor="exampleInputEmail1" className="form-label">
                        Usuario
                    </label>

                    <input
                        id="Usuario"
                        type="text"
                        {...register("usuario", {
                            required: "Usuario es requerido",
                        })}
                    />
                    {errors.usuario && (
                        <ErrorText>{errors.usuario?.message}</ErrorText>
                    )}

                </div>
                <div className="mb-5">
                    <label htmlFor="contact-email" className="form-label">
                        Correo
                    </label>
                    <input
                        name="contact-email"
                        type="email"
                        {...register("correo", {
                            required: "Correo es requerido",
                            pattern: {
                                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                                message: "El correo es invalido",
                            },
                        })}
                    />
                    {errors.correo && (
                        <ErrorText>{errors.correo?.message}</ErrorText>
                    )}
                </div>
                <div className="mb-5">
                    <label
                        htmlFor="exampleInputPassword1"
                        className="form-label"
                    >
                        Contraseña
                    </label>

                    <input
                        id="Contrasena"
                        type="password"
                        {...register("contrasena", {
                            required: "Contraseña es requerido",
                        })}
                    />
                    {errors.contrasena && (
                        <ErrorText>{errors.contrasena?.message}</ErrorText>
                    )}
                </div>

                <div className="mb-5">

                  <div className="filter-select-option">

                
                <h6 className="filter-leble">Tipo de usuario</h6>
                <NiceSelect
                    options={[
                        { value: "1", text: "Miembro" },
                        { value: "2", text: "Scort" },
                    ]}
                    placeholder="Tipo de usuario"
                    onChange={sortHandler}
                    
                    name="tipo"

               />

                {tipo_usuario === ''  &&
                    <ErrorText>Debes seleccionar un tipo de Usuario </ErrorText>
                }

                
                
            </div>  
                

                </div>


                {/* 
                <div className="mb-5 rn-check-box">
                    <input
                        type="checkbox"
                        className="rn-check-box-input"
                        id="exampleCheck1"
                        {...register("exampleCheck1")}
                    />
                    <label
                        className="rn-check-box-label"
                        htmlFor="exampleCheck1"
                    >
                        Remember me leter
                    </label>
                </div>*/}
                <Button type="submit" size="medium" className="mr--15">
                Registro
                </Button>
             
                <Button path="/login" className="mt-10" color="primary-alta" size="medium">
                    Iniciar Sesión
                </Button>


            </form>
        </div>
    );
};

RegistroForm.propTypes = {
    className: PropTypes.string,
};
export default RegistroForm;
