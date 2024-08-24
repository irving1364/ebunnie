import PropTypes from "prop-types";
import clsx from "clsx";
import Button from "@ui/button";
import ErrorText from "@ui/error-text";
import { useRouter } from "next/router";


import { useForm } from "react-hook-form";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { useLocalStorage } from "src/hooks/use-local-storage";
import { useEffect } from "react";


const LoginForm = ({ className }) => {

    const [usuario, setUsuario] = useLocalStorage("usuario");
    const [tipo, setTipo] = useLocalStorage("tipo_usuario");
    const [correo, setCorreo] = useLocalStorage("correo");
    const [tokens, setTokens] = useLocalStorage("tokens");

    

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
    
            const form = new FormData();
            form.append("usuario", e.usuario);
            form.append("contrasena", e.contrasena);
    
    
            var requestOptions = {
                method: 'POST',
                body: JSON.stringify({ 
                    correo: e.usuario,
                    contrasena: e.contrasena,
               }),
              };
    
            fetch( process.env.url + "auth/login", requestOptions)
                .then(response => {
                    return response.json();
                })
                .then(json => {
                    console.log(json);
                    console.log(json.code);
                    if(json.code == 200){
                        console.log(1);
                        setUsuario(json.response.usuario);
                        setTipo(json.response.tipo_usuario);
                        setTokens(json.response.token);
                        setCorreo(json.response.correo);
                    
                        toast("Su logueo es exitoso, lo redireccionaremos")
    
                        setTimeout(function(){

                            router.push({
                                pathname: "/",
                            });
                
                        }, 4000);
                    }
                    if(json.code == 300){
                        console.log(2);
                        toast(json.response)
                       
                        
                    }
                                    
                })
                
                .catch(error => toast("Ocurrio un error"));
    
        }




    return (
        <div className={clsx("form-wrapper-one", className)}>
            <h4>Login </h4>
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
                    Iniciar Sesión
                </Button>
             
                <Button path="/registrate" className="mt-10" color="primary-alta" size="medium">
                    Registro
                </Button>

                <Button path="/recuperar" className="mt-4" color="primary-alta" size="small">
                    Olvidaste tu Contraseña?
                </Button>


            </form>
        </div>
    );
};

LoginForm.propTypes = {
    className: PropTypes.string,
};
export default LoginForm;
