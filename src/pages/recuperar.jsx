import SEO from "@components/seo";
import Wrapper from "@layout/wrapper";
import Header from "@layout/header/header-01";
import Footer from "@layout/footer/footer-01";
import Breadcrumb from "@components/breadcrumb";
import RecuperarArea from "@containers/recuperar";



export async function getStaticProps() {
    return { props: { className: "template-color-1" } };
}

const Recuperar = () => (
    <Wrapper>
        <SEO pageTitle="Recuperar Contraseña" />
        <Header />
        <main id="main-content">
            <Breadcrumb pageTitle="Ubunnie" currentPage="Recuperar Contraseña" />
            <RecuperarArea />
        </main>
        <Footer />
    </Wrapper>
);

export default Recuperar;
