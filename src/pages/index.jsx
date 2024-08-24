import SEO from "@components/seo";
import Wrapper from "@layout/wrapper";
import Header from "@layout/header/header-01";
import Footer from "@layout/footer/footer-01";
import HeroArea from "@containers/hero/layout-09";
import React from "react";
import { useRef } from 'react';

import { normalizedData } from "@utils/methods";

import ExploreProductArea from "@containers/explore-product/layout-01";

// Demo data
import homepageData from "../data/homepages/home-09.json";
import productData from "../data/products-02.json";
import { useEffect, useState } from "react";
import AdvertenciaModal from "@components/modals/advertencia-model";
import { useLocalStorage } from "src/hooks/use-local-storage";

export async function getStaticProps() {
    return { props: { className: "template-color-1" } };
}

const Home09 = () => {
    const content = normalizedData(homepageData?.content || []);
    const [showBidModal, setShowBidModal] = useState(false);
    const [anuncios, setAnuncios] = useState([]);
    const [tipoUsuario, settipoUsuario] = useLocalStorage("tipo_usuario");
    const [mayorEdad, setMayorEdad] = useLocalStorage("mayorEdad");
    const [isLoad, setIsLoad] = useState(false); 
    const [loadComponentByPage,setPageArr]=useState([]);
    
    
    const liveAuctionData = productData.filter(
        (prod) =>
            prod?.auction_date && new Date() <= new Date(prod?.auction_date)
    );

    

    
    
    useEffect(() => {
        obtenerDatos();
        
           

           /* if(mayorEdad){
                //   setShowBidModal(true)
                setShowBidModal(true)
           }else{
            setShowBidModal(false)
           }  */
        
      }, []);

    const obtenerDatos = async () => {

        const data = await fetch(process.env.url + "perfil/getAnunciosMujeresAll")
        const result = await data.json();
        setAnuncios(result.anuncios)

        setIsLoad(true)

        setTimeout(function() {
        
            console.log(mayorEdad)
            console.log(localStorage.getItem("mayorEdad"))
        
            if (localStorage.getItem("mayorEdad") === "true") {
                setShowBidModal(false)
            } else {
                setShowBidModal(true)
            }

        }, 1000);
       
    }    


    const handleBidModal = async () => {
        if(mayorEdad == false){
            setMayorEdad(true)
        }
        if(mayorEdad == undefined){
            setMayorEdad(true)
        }
        setShowBidModal((prev) => !prev);
    };

    
    const handleBidModalNueva = async () => {
        setShowBidModal((prev) => !prev);
    };




    /*
    if(tipoUsuario != "undefined" || tipoUsuario != "null" ){
        alert(mayorEdad) 
       if(mayorEdad != "undefined" || mayorEdad != "null"){
      
         setShowBidModal((prev) => !prev);
       }  
     }*/



    if (isLoad) { 
        
        
     



       




        return (
            <Wrapper>
                <SEO pageTitle="Inicio" />
                <Header />
                <main id="main-content">
                    <HeroArea data={content["hero-section"]} />
                    {anuncios.length > 0 ? (
                            <>
                        <ExploreProductArea
                            data={{
                                section_title: {
                                    title: "",
                                },
                                products: anuncios,
                            }}
                        />
                        
                    
                        <AdvertenciaModal id="ventana"  show={showBidModal} handleModal={handleBidModal}  />
                    </>
                    ): (
                        <p></p>
                    )}
                            


                </main>
                <Footer />
            </Wrapper>
        );
    }    
    };

export default Home09;
