import PropTypes from "prop-types";
import SEO from "@components/seo";
import Wrapper from "@layout/wrapper";
import Header from "@layout/header/header-01";
import Footer from "@layout/footer/footer-01";
import Breadcrumb from "@components/breadcrumb";
import ProductDetailsArea from "@containers/product-details";
import ProductArea from "@containers/product/layout-03";
import { shuffleArray } from "@utils/methods";

// demo data
import productData from "../../data/products.json";

const ProductDetails = ({ anuncio, recentViewProducts, relatedProducts, nombre }) => {
    console.log(anuncio);
    return(
    <Wrapper>
        <SEO pageTitle={nombre} />
        <Header />
        <main id="main-content">
            <Breadcrumb
                pageTitle={nombre}
                currentPage={nombre}
            />
            <ProductDetailsArea product={anuncio.anuncio[0]} servicios={anuncio.servicios} tarifas={anuncio.tarifas} />
           
        </main>
        <Footer />
    </Wrapper>
)};

export const getServerSideProps = async (context) => {

    var requestOptionsPerfil = {
        method: 'POST',
        body: JSON.stringify({
            usuario: context.query.slug
       }),
      };

    const data = await fetch(process.env.url + "perfil/getAnuncioByUsuario", requestOptionsPerfil);
    const result = await data.json();

    
    return {
        props: {
            anuncio: result,
            nombre: context.query.slug,
            className: "template-color-1",
        },
    };

};


export default ProductDetails;
