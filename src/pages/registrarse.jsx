import SEO from "@components/seo";
import Wrapper from "@layout/wrapper";
import Header from "@layout/header/header-01";
import Footer from "@layout/footer/footer-01";
import Breadcrumb from "@components/breadcrumb";
import RegistroArea from "@containers/registro";



export async function getStaticProps() {
    return { props: { className: "template-color-1" } };
}

const Registrarse = () => (
    <Wrapper>
        <SEO pageTitle="Registrarse" />
        <Header />
        <main id="main-content">
            <Breadcrumb pageTitle="Ubunnie" currentPage="Registrarse" />
            <RegistroArea />
        </main>
        <Footer />
    </Wrapper>
);

export default Registrarse;
