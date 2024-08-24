import SEO from "@components/seo";
import Wrapper from "@layout/wrapper";
import Header from "@layout/header/header-02";
import Footer from "@layout/footer/footer-02";
import TopBarArea from "@containers/top-bar";
import HeroArea from "@containers/hero/layout-08";
import TopSellerArea from "@containers/top-seller/layout-01";
import LiveExploreAreaPlanes from "@containers/live-explore/layout-04";
import CollectionArea from "@containers/collection/layout-02";
import ExploreProductArea from "@containers/explore-product/layout-09";
import ServiceArea from "@containers/services/layout-01";
import { normalizedData } from "@utils/methods";
import PropTypes from "prop-types";
import clsx from "clsx";

// Demo data
import homepageData from "../data/homepages/home-08.json";
import sellerData from "../data/sellers.json";
import productData from "../data/planes.json";
import collectionsData from "../data/collections.json";

import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import CreateNewArea from "@containers/create-new";
import CreateNewAreaPerfil from "@containers/create-new/perfil";

import TabContainer from "react-bootstrap/TabContainer";
import TabContent from "react-bootstrap/TabContent";
import TabPane from "react-bootstrap/TabPane";
import Nav from "react-bootstrap/Nav";
import CreateNewAreaCoordenada from "@containers/create-new/coordenada";
import CreateNewAreaSobreMi from "@containers/create-new/sobremi";
import CreateNewAreaLenguajes from "@containers/create-new/lenguajes";
import CreateNewAreaCiudades from "@containers/create-new/ciudades";
import { useLocalStorage } from "src/hooks/use-local-storage";
import { useEffect } from "react";

import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from 'next/navigation';
import CreateNewAreaVerificacion from "@containers/create-new/verificacion";
import CreateNewAreaGaleria from "@containers/create-new/galeria";
import CreateNewAreaServicios from "@containers/create-new/servicios";
import CreateNewAreaTarifa from "@containers/create-new/tarifas";

export async function getStaticProps() {
    return {
        props: {
            className: "home-sticky-pin sidebar-header position-relative",
        },
    };
}

const Home = () => {
    const [tipoUsuario, settipoUsuario] = useLocalStorage("tipo_usuario");
    const content = normalizedData(homepageData?.content || []);
    const router = useRouter()
   
    console.log(tipoUsuario)
    if(tipoUsuario === "1"){
        toast("Pagina no autorizada, lo redirijiremos")
        setTimeout(function(){
            router.push("/")
        }, 4000);
    }
    if(tipoUsuario === "3"){
        toast("Pagina no autorizada, lo redirijiremos")
        setTimeout(function(){
            router.push("/")
        }, 4000);
    }

    useEffect(() => {
        
        
      }, []);

    const liveAuctionData = productData
        .filter(
            (prod) =>
                prod?.auction_date && new Date() <= new Date(prod?.auction_date)
        )
        .sort(
            (a, b) =>
                Number(new Date(b.published_at)) -
                Number(new Date(a.published_at))
        )
        .slice(0, 4);
    return (
        <Wrapper>
            <SEO pageTitle="Perfil" />
            <Header />
            <main
                id="main-content"
                className="rn-nft-mid-wrapper nft-left-sidebar-nav pr--40 pr_sm--15"
            >

                <div className="list-item-1">
                    <TopBarArea />
                
                        <TabContainer defaultActiveKey="nav-perfil">
                        <div className="tab-wrapper-one">
                            <nav className="tab-button-one">
                                <Nav as="div" className="nav-tabs">
                                    <Nav.Link id={1} as="button" eventKey="nav-perfil">
                                        Datos básicos 
                                    </Nav.Link>
                                    <Nav.Link id={2} as="button" eventKey="nav-sobre">
                                        Sobre mi
                                    </Nav.Link>
                                    <Nav.Link id={3} as="button" eventKey="nav-idiomas">
                                        idiomas                    
                                    </Nav.Link>
                                    <Nav.Link id={4} as="button" eventKey="nav-ciudades">
                                        Ciudades Laborales
                                    </Nav.Link>
                                    <Nav.Link id={5} as="button" eventKey="nav-coordenadas">
                                        Datos de Contactos
                                    </Nav.Link>
                                    <Nav.Link id={6} as="button" eventKey="nav-servicios">
                                        Mis Servicios
                                    </Nav.Link>
                                    <Nav.Link id={7} as="button" eventKey="nav-tarifas">
                                        Mis Tarifas
                                    </Nav.Link>

                                </Nav>
                            </nav>
                            <TabContent className="rn-bid-content">
                                <TabPane id={1} eventKey="nav-perfil">
                                    <CreateNewAreaPerfil />
                                </TabPane>
                                <TabPane id={2} eventKey="nav-sobre">
                                    <CreateNewAreaSobreMi />
                                </TabPane>
                                <TabPane id={3} eventKey="nav-idiomas">
                                <CreateNewAreaLenguajes/>
                                </TabPane>
                                <TabPane id={4} eventKey="nav-ciudades">
                                    <CreateNewAreaCiudades />
                                </TabPane>
                                <TabPane id={5} eventKey="nav-coordenadas">
                                    <CreateNewAreaCoordenada />
                                </TabPane>
                                <TabPane id={6} eventKey="nav-servicios">
                                    <CreateNewAreaServicios />
                                </TabPane>
                                <TabPane id={7} eventKey="nav-tarifas">
                                    <CreateNewAreaTarifa />
                                </TabPane>
                            </TabContent>
                        </div>
                    </TabContainer>

        </div>

        <div className="list-item-2">
           <CreateNewAreaVerificacion />
        </div>

        <div className="list-item-3">
            <LiveExploreAreaPlanes
                data={{
                    ...content["live-explore-section"],
                    products: liveAuctionData,
                }}
            />
        </div>

        <div className="list-item-4">
            <CreateNewAreaGaleria
                data={{
                    ...content["live-explore-section"],
                    products: liveAuctionData,
                }}
            />
        </div>
        


        

{/*
                
                <LiveExploreArea
                    id="list-item-2"
                    data={{
                        ...content["live-explore-section"],
                        products: liveAuctionData,
                    }}
                />
                <CollectionArea
                    space={2}
                    data={{
                        ...content["collection-section"],
                        collections: collectionsData.slice(0, 4),
                    }}
                />
                <ExploreProductArea
                    id="list-item-3"
                    space={2}
                    data={{
                        ...content["explore-product-section"],
                        products: productData,
                    }}
                />
                <ServiceArea
                    id="list-item-4"
                    space={2}
                    data={content["service-section"]}
                />
                */} 
               </main>
            <Footer className="pr--40" />
        </Wrapper>
    );
};

export default Home;
