import SEO from "@components/seo";
import Wrapper from "@layout/wrapper";
import Header from "@layout/header/header-03";
import Footer from "@layout/footer/footer-02";
import TopBarArea from "@containers/top-bar";
import HeroArea from "@containers/hero/layout-08";
import TopSellerArea from "@containers/top-seller/layout-01";
import LiveExploreArea from "@containers/live-explore/layout-03";
import CollectionArea from "@containers/collection/layout-02";
import ExploreProductArea from "@containers/explore-product/layout-09";
import ServiceArea from "@containers/services/layout-01";
import { normalizedData } from "@utils/methods";
import PropTypes from "prop-types";
import clsx from "clsx";

// Demo data
import homepageData from "../data/homepages/home-08.json";
import sellerData from "../data/sellers.json";
import productData from "../data/products-02.json";
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
import CreateNewAreaPerfilMiembro from "@containers/create-new/perfeil-miembro";

export async function getStaticProps() {
    return {
        props: {
            className: "home-sticky-pin sidebar-header position-relative",
        },
    };
}

const PerfilMiembro = () => {
    const [tipoUsuario, settipoUsuario] = useLocalStorage("tipo_usuario");
    const content = normalizedData(homepageData?.content || []);
    const router = useRouter()
   
    if(tipoUsuario === "2"){
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
                    
                </div>

                <TabContainer defaultActiveKey="nav-home">
            <div className="tab-wrapper-one">
                <nav className="tab-button-one">
                    <Nav as="div" className="nav-tabs">
                        <Nav.Link id={1} as="button" eventKey="nav-perfil">
                        Datos básicos 
                        </Nav.Link>


                    </Nav>
                </nav>
                <TabContent className="rn-bid-content">
                    <TabPane id={1} eventKey="nav-perfil">
                        <CreateNewAreaPerfilMiembro />
                    </TabPane>
                    <TabPane id={2} eventKey="nav-sobre">
                    </TabPane>
                    <TabPane id={3} eventKey="nav-idiomas">

                    </TabPane>
                    <TabPane id={4} eventKey="nav-ciudades">
                    </TabPane>
                    <TabPane id={5} eventKey="nav-coordenadas">
                    </TabPane>
                </TabContent>
            </div>
        </TabContainer>



{/*
                <div className="list-item-1">
                    <TopBarArea />
                    <HeroArea data={content["hero-section"]} />
                </div>
                <TopSellerArea
                    space={3}
                    data={{
                        ...content["top-sller-section"],
                        sellers: sellerData,
                    }}
                />
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

export default PerfilMiembro;
