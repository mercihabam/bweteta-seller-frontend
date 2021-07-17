import { AppstoreOutlined, InstagramOutlined, WalletOutlined } from "@ant-design/icons";
import { CDropdownItem } from "@coreui/react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { FacebookWidget, GradientWidget } from "../../Components/widgets";
import { getOrders } from "../../Redux/actions/ordersActions";
import { getProducts } from "../../Redux/actions/productActions";
import { Stats } from "./stats";
import "./style.scss";

function OverView(){
    const { countProducts } = useSelector(({ products: { allProducts } }) =>allProducts);
    const { dataShop } = useSelector(({ shops: { currentShop } }) =>currentShop);
    const { count } = useSelector(({ orders: { orders } }) =>orders);
    const dispatch = useDispatch();
    const history = useHistory();

    useEffect(() =>{
        getOrders(dispatch, history, dataShop.id);
    }, [dispatch]);

    useEffect(() =>{
        getProducts(dataShop.id, 100, 0)(dispatch, history);
    }, [dispatch])

    return(
        <div className="overview">
            <div className="div-widgets">
                <GradientWidget header={count} pointColor="warning" 
                    text="Commades" color="gradient-warning" 
                    DropItem={
                        <CDropdownItem to="/orders">Voir</CDropdownItem>
                    }
                    iconWidget={<WalletOutlined style={{ transform: "scale(1.3)", verticalAlign: "middle" }}/>}
                />
                <FacebookWidget />
                <div className="insta-widget">
                    <div className="insta-back">
                        <InstagramOutlined className="insta-icon" />
                    </div>
                    <div className="insta-stat">
                        <div className="insta-like">
                            <div className="number-like"> 500 </div>
                            <div className="title-like"> J'AIME </div>
                        </div>
                        <div className="insta-post">
                            <div className="number-like"> 35 </div>
                            <div className="title-like"> POSTS </div>
                        </div>
                    </div>
                </div>
                <GradientWidget header={countProducts} text="Produits" 
                    pointColor="primary" color="gradient-primary"
                    DropItem={
                        <>
                            <CDropdownItem to="/product/add">Ajouter produit</CDropdownItem>
                            <CDropdownItem to="/products">Voir mes produits</CDropdownItem>
                        </>
                    }
                    iconWidget={<AppstoreOutlined style={{ transform: "scale(1.3)", verticalAlign: "middle" }} />}
                />
            </div>
            <div className="div-statt">
                <Stats />
            </div>
        </div>
    );
};

export default OverView;