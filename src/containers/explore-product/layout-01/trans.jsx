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


const ExploreProductAreaTrans = ({ className, space, data }) => {
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
        obtenerDatos();
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
  /*  const itemsToFilter = [...data.products];
  
    const [state, dispatch] = useReducer(reducer, {
        filterToggle: true,
        products: data.products || [],
        allProducts: data.products || [],
        inputs: { price: [0, 100] },
    });
  
    const filterRef = useRef(null);
    const filterHandler = () => {
        dispatch({ type: "FILTER_TOGGLE" });
        if (!filterRef.current) return;
        slideToggle(filterRef.current);
    };

    const numberOfPages = Math.ceil(data.products.length / POSTS_PER_PAGE);
    console.log(state.allProducts);
    console.log(numberOfPages);

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

    const slectHandler = ({ value }, name) => {
        dispatch({ type: "SET_INPUTS", payload: { [name]: value } });
    };

    const priceHandler = (value) => {
        dispatch({ type: "SET_INPUTS", payload: { price: value } });
    };

    const sortHandler = ({ value }) => {
        const sortedProducts = state.products.sort((a, b) => {
            if (value === "most-liked") {
                return a.likeCount < b.likeCount ? 1 : -1;
            }
            return a.likeCount > b.likeCount ? 1 : -1;
        });
        dispatch({ type: "SET_PRODUCTS", payload: sortedProducts });
    };

    const filterMethods = (item, filterKey, value) => {
        if (value === "all") return false;
        let itemKey = filterKey;
        if (filterKey === "category") {
            itemKey = "categories";
        }
        
        
        if (Array.isArray(item[itemKey])) {
            return !item[itemKey].includes(value);
        }
        if (filterKey === "collection") {
            return item[itemKey].name !== value;
        }
        return item[itemKey] !== value;
    };

    const itemFilterHandler = useCallback(() => {
        let filteredItems = [];

        filteredItems = itemsToFilter.filter((item) => {
            // eslint-disable-next-line no-restricted-syntax
            for (const key in state.inputs) {
                if (filterMethods(item, key, state.inputs[key])) return false;
            }
            return true;
        });
        dispatch({ type: "SET_PRODUCTS", payload: filteredItems });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [state.inputs]);

    useEffect(() => {
        itemFilterHandler();
    }, [itemFilterHandler]);
*/

const obtenerDatos = async () => {
    
    
    const data2 = await fetch(process.env.url + "perfil/getCiudadFiltro")
    const result2 = await data2.json();
    console.log(result2.ciudades);
    setCiudadList(result2.ciudades)

    
    
/*
    const data3 = await fetch(process.env.url + "perfil/getEtniaFiltro")
    const result3 = await data3.json();set
    console.log(result3.etnia);
    setEtniaList(result3.etnia)
    console.log(etniaList);

    const data4 = await fetch(process.env.url + "perfil/getColorCabelloFiltro")
    const result4 = await data4.json();
    console.log(result4.cabello);
    setColorCabelloList(result4.cabello)

    const data5 = await fetch(process.env.url + "perfil/getColorOjosFiltro")
    const result5 = await data5.json();
    console.log(result5.ojos);
    setColorOjosList(result5.ojos)
    */
    
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

    fetch( process.env.url + "perfil/getAnunciosTransAllByCiudad", requestOptions)
        .then(response => {
            return response.json();
        })
        .then(json => {
            console.log(json);
            //data.products = json.anuncios;
//            const results = json.anuncios;
            setAnunciosList(json.anuncios)
        })
        
        .catch(error => toast("Ocurrio un error"));
    
}


//metodo de filtrado 1 
 /*  let results = []
 if(!search)
 {
     results = users
 }else{
      results = users.filter( (dato) =>
      dato.name.toLowerCase().includes(search.toLocaleLowerCase())
  )
 } */

 

 //metodo de filtrado 2   
 //console.log(anuncios);
 const dataOrigin = data.products;
 //console.log(dataOrigin);
 const results = !search ? dataOrigin : dataOrigin.filter((dato)=>  dato.nombre.toLowerCase().includes(search.toLocaleLowerCase()))
 //console.log(results);
    
    return (
        <div
            className={clsx(
                "rn-product-area",
                space === 1 && "rn-section-gapTop",
                className
            )}
        >
            <div className="container">
                {/*<div className="row mb--50 align-items-center">
                    <div className="col-lg-6 col-md-6 col-sm-6 col-12">
                        {data?.section_title && (
                            <SectionTitle
                                className="mb--0"
                                {...data.section_title}
                            />
                        )}
                    </div>
                    <div className="col-lg-6 col-md-6 col-sm-6 col-12 mt_mobile--15">
                        <input value={search} onChange={searcher} type="text" placeholder='Search' className='form-control'/>
                      
                   

                        <FilterButton
                            open={state.filterToggle}
                            onClick={filterHandler}
                    />
                    </div>
                </div>*/}
                <div className="row mb--10 align-items-center">
                    
                <div className="col-lg-2 col-md-6 col-sm-12 filter-select-option mt--0">
                        <h6 className="filter-leble">Ciudad</h6>
                        <NiceSelect
                            onChange={selectCiudad}
                            options={ciudadList}
                            placeholder="Selecciona"                        
                            name="etnia"
                        />
                    </div>
                    {/* 
                    <div className="col-lg-2 col-md-6 col-sm-12 filter-select-option mt--10">
                        <h6 className="filter-leble">Etnia</h6>
                        <NiceSelect
                            onChange={selectEtnia}
                            options={etniaList}
                            placeholder="Selecciona"                        
                            name="etnia"
                        />
                    </div>

                    <div className="col-lg-2 col-md-6 col-sm-12 filter-select-option mt--10">
                        <h6 className="filter-leble">Color de Ojos</h6>
                        <NiceSelect
                            options={colorOjosList}
                            placeholder="Selecciona"
                            name="ojos"
                            onChange={selectColorCabello}
                            
                        />
                    </div>

                    <div className="col-lg-2 col-md-6 col-sm-12 filter-select-option mt--10">
                        <h6 className="filter-leble">Color de Cabellos</h6>
                        <NiceSelect
                            options={colorCabelloList}
                            placeholder="Selecciona"
                            name="cabellos"
                            onChange={selectColorOjos}
                        />
                    </div>
                    
                    <div className="col-lg-2 col-md-6 col-sm-12 filter-select-option mt--10">
                        <div className="input-box ">
                        <h6 className="filter-leble pb--5">Rango de edad</h6>

                            <div className="price_filter s-filter clear mt-4">
                            <Range
                                values={values}
                                step={STEP}
                                min={MIN}
                                max={MAX}
                                onChange={(values) => setValues(values)}
                                renderTrack={({ props, children }) => (
                                <div
                                    onMouseDown={props.onMouseDown}
                                    onTouchStart={props.onTouchStart}
                                    style={{
                                    ...props.style,
                                    height: '36px',
                                    display: 'flex',
                                    width: '100%'
                                    }}
                                >
                                    <div
                                    ref={props.ref}
                                    style={{
                                        height: '5px',
                                        width: '100%',
                                        borderRadius: '4px',
                                        background: getTrackBackground({
                                        values,
                                        colors: ['#ccc', '#548BF4', '#ccc'],
                                        min: MIN,
                                        max: MAX,
                                        }),
                                        alignSelf: 'center'
                                    }}
                                    >
                                    {children}
                                    </div>
                                </div>
                                )}
                                renderThumb={({ index, props, isDragged }) => (
                                <div
                                    {...props}
                                    style={{
                                    ...props.style,
                                    height: '14px',
                                    width: '14px',
                                    borderRadius: '4px',
                                    backgroundColor: '#FFF',
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    boxShadow: '0px 2px 6px #AAA'
                                    }}
                                >
                                    <div
                                    style={{
                                        position: 'absolute',
                                        top: '-28px',
                                        color: '#fff',
                                        fontWeight: 'bold',
                                        fontSize: '14px',
                                        fontFamily: 'Arial,Helvetica Neue,Helvetica,sans-serif',
                                        padding: '4px',
                                        borderRadius: '4px',
                                        backgroundColor: '#b69225'
                                    }}
                                    >
                                    {values[index].toFixed(1)}
                                    </div>
                                    <div
                                    style={{
                                        height: '16px',
                                        width: '5px',
                                        backgroundColor: isDragged ? '#b69225' : '#b69225'
                                    }}
                                    />
                                </div>
                                )}
                            />
                            </div>
                    
                        </div>              
                    </div>*/}

                    <div className="col-lg-1">
                    </div>


                    <div className="col-lg-1 col-md-6 col-sm-12 filter-select-option mt-10">
                        <br /><br />
                        <div className="input-box">
                            <Button
                                
                                color="primary-alta"
                                fullwidth
                                type="button"
                                data-btn="preview"
                                onClick={buscarEvento}
                            >
                                Buscar
                            </Button>
                        </div>
                    </div>    



                </div>        




{/*
                <ProductFilter
                    ref={filterRef}
                    slectHandler={slectHandler}
                    sortHandler={sortHandler}
                    priceHandler={priceHandler}
                    inputs={state.inputs}
                />*/}
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



                {/**     {numberOfPages > 1 ? (
                        <Pagination
                            className="single-column-blog"
                            currentPage={2}
                            numberOfPages={numberOfPages}
                             onClick={paginationHandler} 
                        />
                    ) : null}*/}
                </div>
            </div>
        </div>
    );
};



ExploreProductAreaTrans.defaultProps = {
    space: 1,
};

export default ExploreProductAreaTrans;
