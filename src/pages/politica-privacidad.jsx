import SEO from "@components/seo";
import Wrapper from "@layout/wrapper";
import Header from "@layout/header/header-01";
import Footer from "@layout/footer/footer-01";
import Breadcrumb from "@components/breadcrumb";
import TermsAndConditionsArea from "@containers/terms-condition";
import PrivacyPolicyArea from "@containers/privacy-policy";

export async function getStaticProps() {
    return { props: { className: "template-color-1" } };
}

const politicaPrivacidad = () => (
    <Wrapper>
        <SEO pageTitle="Política & Privacidad" />
        <Header />
        <main id="main-content">
            <Breadcrumb
                pageTitle="Política & Privacidad"
                currentPage="Política & Privacidad"
            />
            <PrivacyPolicyArea />
        </main>
        <Footer />
    </Wrapper>
);

export default politicaPrivacidad;
