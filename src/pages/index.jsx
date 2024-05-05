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

export async function getStaticProps() {
    return { props: { className: "template-color-1" } };
}

const Home09 = () => {
    const content = normalizedData(homepageData?.content || []);
    const liveAuctionData = productData.filter(
        (prod) =>
            prod?.auction_date && new Date() <= new Date(prod?.auction_date)
    );
    return (
        <Wrapper>
            <SEO pageTitle="Ebunnie | Inicio" />
            <Header />
            <main id="main-content">
                <HeroArea data={content["hero-section"]} />


                <ExploreProductArea
                    data={{
                        section_title: {
                            title: "",
                        },
                        products: productData,
                    }}
                />


            </main>
            <Footer />
        </Wrapper>
    );
};

export default Home09;
