import { useReducer, useRef, useEffect, useState, useCallback } from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import SectionTitle from "@components/section-title/layout-02";
import Product from "@components/product/layout-01";
import ProductFilter from "@components/product-filter/layout-01";
import FilterButton from "@ui/filter-button";
import { slideToggle } from "@utils/methods";
import { SectionTitleType, ProductType } from "@utils/types";
import Pagination from "@components/pagination-02";
import { Range, getTrackBackground } from "react-range";
import Button from "@ui/button";



import NiceSelect from "@ui/nice-select";
import InputRange from "@ui/input-range";


function reducer(state, action) {
    switch (action.type) {
        case "SET_PRODUCTS":
            return { ...state, products: action.payload };
        default:
            return state;
    }
}


const STEP = 1;
const MIN = 18;
const MAX = 100;

const POSTS_PER_PAGE = 2;


const ExploreProductAreaPaquete = ({ className, space, data }) => {
    console.log(data);

    const [ anuncios, setAnuncios ] = useState(data)
    const [ search, setSearch ] = useState("")
    const [anunciosList, setAnunciosList] = useState([]);
    const [ciudadList, setCiudadList] = useState([]);
    const [etniaList, setEtniaList] = useState([]);
    const [colorCabelloList, setColorCabelloList] = useState([]);
    const [colorOjosList, setColorOjosList] = useState([]);
    const [values, setValues] = useState([18, 100]);

    
    const [ ciudadBuscar, setCiudadBuscar ] = useState("")
    const [ etniaBuscar, setEtniaBuscar ] = useState("")
    const [ colorCabello, setColorCabello ] = useState("")
    const [ colorOjos, setColorOjos ] = useState("")
    const [ edadRango, setEdadRango ] = useState("")
    const numberOfPages = Math.ceil(data.products.length / POSTS_PER_PAGE);

    useEffect(() => {
        setAnunciosList(data.products)
        
        
          
    }, []);

    const [state, dispatch] = useReducer(reducer, {
        filterToggle: false,
        products: data.products || [],
        allProducts: data.products || [],
    });

    const paginationHandler = (page) => {
        dispatch({ type: "SET_PAGE", payload: page });
        const start = (page - 1) * POSTS_PER_PAGE;
        dispatch({
            type: "SET_PRODUCTS",
            payload: data.products.slice(start, start + POSTS_PER_PAGE),
        });
        document
            .getElementById("explore-id");
    };
  

const obtenerDatos = async () => {
    
    
    const data2 = await fetch(process.env.url + "perfil/getCiudadFiltro")
    const result2 = await data2.json();
    console.log(result2.ciudades);
    setCiudadList(result2.ciudades)

  
}

//obtenerDatos();

const searcher = (e) => {
    setSearch(e.target.value)   
}

ciudadBuscar

const selectCiudad = (e) => {
    console.log(e)  
    setCiudadBuscar(e.value);
}

const selectEtnia = (e) => {
    console.log(e)  
    setEtniaBuscar(e.value);
}

const selectColorCabello = (e) => {
    console.log(e)  
    setColorCabello(e.value);
}

const selectColorOjos = (e) => {
    console.log(e)  
    setColorOjos(e.value);
}

const buscarEvento = () => {

    console.log(ciudadBuscar)

    
    var requestOptions = {
        method: 'POST',
        body: JSON.stringify({
            ciudad: ciudadBuscar, 
       }),
      };

    fetch( process.env.url + "perfil/getAnunciosHombresAllByCiudad", requestOptions)
        .then(response => {
            return response.json();
        })
        .then(json => {
            setAnunciosList(json.anuncios)
        })
        
        .catch(error => toast("Ocurrio un error"));
    
}
 

 //metodo de filtrado 2  
 const dataOrigin = data.products;
 const results = !search ? dataOrigin : dataOrigin.filter((dato)=>  dato.nombre.toLowerCase().includes(search.toLocaleLowerCase()))
 
    return (
        <div
            className={clsx(
                "rn-product-area",
                space === 1 && "rn-section-gapTop",
                className
            )}
        >
            <div className="container">
               
                <div className="row g-5">
                    {anunciosList.length > 0 ? (
                        <>
                            {anunciosList.slice(0, 1000).map((prod) => (
                                <div
                                    key={prod.cod}
                                    className="col-5 col-lg-4 col-md-6 col-sm-6 col-12"
                                >
                                    <Product
                                        overlay
                                        placeBid={!!data.placeBid}
                                        title={prod.nombre}                           
                                        paquete_activo={prod.paquete_activo}
                                        slug={prod.slug}
                                        latestBid={prod.latestBid}
                                        price={prod.price}
                                        likeCount={prod.likeCount}
                                        auction_date={prod.auction_date}
                                        image={process.env.urlArchivos + prod.fotografia_portada}
                                        authors={prod.authors}
                                        bitCount={prod.bitCount}
                                        usuario={prod.usuario}
                                    />
                                </div>
                            ))}
                        </>
                    ) : (
                        <p>No hay anuncios para mostrar</p>
                    )}



                </div>
            </div>
        </div>
    );
};



ExploreProductAreaPaquete.defaultProps = {
    space: 1,
};

export default ExploreProductAreaPaquete;
