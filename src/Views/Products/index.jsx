import { useState } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router";
import { AllProducts } from "./all";
import { Skeleton, Space } from 'antd';
import { useEffect } from "react";
import { getCategorys } from "../../Redux/actions/categoryActions";
import { useDispatch } from "react-redux";
import { ProductsByCategory } from "./productByCategory";


function Products(){
    const [ active, setActive ] = useState("all");
    const history = useHistory();
    const dispatch = useDispatch();
    const { dataCategorys, loadingCategorys } = useSelector(({ categorys: { categorys } }) =>categorys);

    useEffect(() =>{
        getCategorys(dispatch);
    }, [dispatch]);

    return(
        <div className="products">
            <div className="div-categorys">
                <div onClick={() =>setActive("all")} className={`category ${active === "all"? "active":null}`}>Tous les produits</div>
                {
                    loadingCategorys ?
                    <Space>
                        <Skeleton.Button active={active} />
                        <Skeleton.Button active={active} />
                        <Skeleton.Avatar active={active} shape="circle" />
                        <Skeleton.Input style={{ width: 200 }} active={active} />
                    </Space>:
                    dataCategorys.map((category) =>(
                        <div onClick={() =>setActive(category.id)} className={`category ${active === category.id? "active":null}`}> {category.name} </div>
                    ))
                }
            </div>
            <div>
                {
                    active === "all" ?
                    <AllProducts />:
                    <ProductsByCategory categoryId={active} />
                }
            </div>
            <div className="btn-add-prod">
                <button onClick={() =>history.push("/product/add")} className="btn-add">Créer un produit</button>
            </div>
        </div>
    );
};

export default Products;