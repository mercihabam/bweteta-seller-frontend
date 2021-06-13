import { useState } from "react";
import { useHistory } from "react-router";
import { AllProducts } from "./all";


function Products(){
    const [ active, setActive ] = useState("all");
    const history = useHistory();

    const categorys = [
        "Habillement",
        "Appareils electroniques",
        "Cosmetiques",
        "Accessoires"
    ]

    return(
        <div className="products">
            <div className="div-categorys">
                <div onClick={() =>setActive("all")} className={`category ${active === "all"? "active":null}`}>Tous les produits</div>
                {
                    categorys.map((category) =>(
                        <div onClick={() =>setActive(category)} className={`category ${active === category? "active":null}`}> {category} </div>
                    ))
                }
            </div>
            <div>
                <AllProducts />
            </div>
            <div className="btn-add-prod">
                <button onClick={() =>history.push("/product/add")} className="btn-add">Créer un produit</button>
            </div>
        </div>
    );
};

export default Products;