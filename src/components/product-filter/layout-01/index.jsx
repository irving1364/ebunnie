import { forwardRef } from "react";
import PropTypes from "prop-types";
import NiceSelect from "@ui/nice-select";
import InputRange from "@ui/input-range";

const ProductFilter = forwardRef(
    ({ slectHandler, sortHandler, priceHandler, inputs }, ref) => (
        <div className="default-exp-wrapper default-exp-expand" ref={ref}>
            <div className="inner">
                <div className="filter-select-option">
                    <h6 className="filter-leble">Con Experiencia</h6>
                    <NiceSelect
                        options={[
                            { value: "Poca", text: "Poca" },
                            { value: "Media", text: "Media" },
                        ]}
                        placeholder="Selecciona"
                        onChange={sortHandler}
                        name="like"
                    />
                </div>
                <div className="filter-select-option">
                    <h6 className="filter-leble">Etnia</h6>
                    <NiceSelect
                        options={[
                            { value: "all", text: "Catira" },
                            { value: "art", text: "Morena" },
                            { value: "music", text: "Trigeña" },
                        ]}
                        placeholder="Category"
                        onChange={slectHandler}
                        name="category"
                    />
                </div>
                <div className="filter-select-option">
                    <h6 className="filter-leble">Edad</h6>
                    <NiceSelect
                        options={[
                            { value: "all", text: "18-25" },
                            { value: "Art Decco", text: "25-30" },
                            {
                                value: "BoredApeYachtClub",
                                text: "30-40",
                            },
                            {
                                value: "MutantApeYachtClub",
                                text: "40+",
                            }
                        ]}
                        placeholder="Collections"
                        onChange={slectHandler}
                        name="collection"
                    />
                </div>

                <div className="filter-select-option">
                    <h6 className="filter-leble">Nacionalidad</h6>
                    <NiceSelect
                        options={[
                            { value: "all", text: "Venezolana" },
                            { value: "fixed-price", text: "Colombiana" },
                            { value: "timed-auction", text: "Argentina" }

                        ]}
                        placeholder="Sale type"
                        onChange={slectHandler}
                        name="sale_type"
                    />
                </div>
                <div className="filter-select-option">
                    <h6 className="filter-leble">Precio Rango</h6>
                    <div className="price_filter s-filter clear">
                        <form action="#" method="GET">
                            <InputRange
                                values={inputs.price}
                                onChange={priceHandler}
                            />
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
);

ProductFilter.displayName = "ProductFilter";

ProductFilter.propTypes = {
    slectHandler: PropTypes.func,
    sortHandler: PropTypes.func,
    priceHandler: PropTypes.func,
    inputs: PropTypes.shape({
        price: PropTypes.arrayOf(PropTypes.number),
    }),
};

export default ProductFilter;
