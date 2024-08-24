import SEO from "@components/seo";
import Wrapper from "@layout/wrapper";
import Header from "@layout/header/header-01";
import Footer from "@layout/footer/footer-01";
import HeroArea from "@containers/hero/layout-09";

import { normalizedData } from "@utils/methods";


import Breadcrumb from "@components/breadcrumb";
import ExploreProductArea from "@containers/explore-product/layout-01";

// Demo data
import homepageData from "../data/homepages/home-09.json";
import productData from "../data/products-02.json";
import { useEffect, useState } from "react";
import ExploreProductAreaHombres from "@containers/explore-product/layout-01/hombres";
import ExploreProductAreaPaquete from "@containers/explore-product/layout-01/paquetes";

export async function getStaticProps() {
    return { props: { className: "template-color-1" } };
}

const Verified = () => {
    const content = normalizedData(homepageData?.content || []);
    
    const [anuncios, setAnuncios] = useState([]);

    const liveAuctionData = productData.filter(
        (prod) =>
            prod?.auction_date && new Date() <= new Date(prod?.auction_date)
    );

    
    useEffect(() => {
        obtenerDatos();
      }, []);

    const obtenerDatos = async () => {

        const data = await fetch(process.env.url + "perfil/getAnunciosVerificadoAll")
        const result = await data.json();
        setAnuncios(result.anuncios)

    }    


    console.log(anuncios)

    return (
        <Wrapper>
            <SEO pageTitle="Inicio" />
            <Header />
            <main id="main-content">
                <HeroArea data={content["hero-section"]} />
                {anuncios.length > 0 ? (
                        <>
                    <ExploreProductAreaPaquete
                        data={{
                            section_title: {
                                title: "",
                            },
                            products: anuncios,
                        }}
                    />
                </>
                ): (
                    <p></p>
                )}
                        


            </main>
            <Footer />
        </Wrapper>
    );
};

export default Verified;
