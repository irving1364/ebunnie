import SEO from "@components/seo";
import Wrapper from "@layout/wrapper";
import Header from "@layout/header/header-01";
import Footer from "@layout/footer/footer-01";
import Breadcrumb from "@components/breadcrumb";
import TermsAndConditionsArea from "@containers/terms-condition";
import ContactArea from "@containers/contacto";

export async function getStaticProps() {
    return { props: { className: "template-color-1" } };
}

const TermsAndConditions = () => (
    <Wrapper>
        <SEO pageTitle="Contacto" />
        <Header />
        <main id="main-content">
            <Breadcrumb
                pageTitle="Contacto"
                currentPage="Contacto"
            />
            <ContactArea />
        </main>
        <Footer />
    </Wrapper>
);

export default TermsAndConditions;
