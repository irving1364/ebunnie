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


const RecuperarForm = ({ className }) => {

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

        var requestOptions = {
            method: 'POST',
            body: JSON.stringify({ 
                correo: e.correo,
           }),
          };

        fetch( process.env.url + "auth/recuperarPass", requestOptions)
            .then(response => {
                return response.json();
            })
            .then(json => {
                console.log(json);
                console.log(json.code);
                if(json.code == 200){
                    console.log(1);
                
                    toast("Hemos enviado su datos al correo, Redireccionaremos al Inicio de Sesión")

                    setTimeout(function(){
                        router.push('/login')
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
            <h4>Recuperar Contraseña </h4>
            <form onSubmit={handleSubmit(onSubmit)}>
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
                
                <Button type="submit" size="medium" className="mr--15">
                    Recuperar
                </Button>
             
                <Button path="/login" className="mt-10" color="primary-alta" size="medium">
                    Iniciar Sesión
                </Button>


            </form>
        </div>
    );
};

RecuperarForm.propTypes = {
    className: PropTypes.string,
};
export default RecuperarForm;
