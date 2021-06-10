import "./style.scss";
import { PlusOutlined } from "@ant-design/icons";
import { useHistory } from "react-router";
import { useEffect, useState } from "react";
import { getCurrentShop, getUserShops } from "../../Redux/actions/shopActions";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

export function UserShops(){
    const history = useHistory();
    const dispatch = useDispatch();
    const { shopsRows } = useSelector(({ shops: { shopsByUser } }) =>shopsByUser);
    const { data } = useSelector(({ users: { currentUser } }) =>currentUser);
    const { loadingShop } = useSelector(({ shops: { currentShop } }) =>currentShop);
    const [ clicked, setClicked ] = useState();

    useEffect(() =>{
        getUserShops(data.id, dispatch, history)
    },[dispatch, data.id]);

    const onShopClick = (id) =>{
        setClicked(id);
        getCurrentShop(id, dispatch, history);
    };

    return(
        <div className="user-shops">
            <div className="div-shops-bg">
                <div className="shops-welcome">
                    <div className="welcome">Bienvenue</div>
                    <div className="wel-name">Mr (Mlle). {data.fullName}</div>
                    <div className="well-msg">Conncetez-vous avec votre boutique</div>
                </div>
                <div className="shops-data">
                    <div className="div-shops">
                        {
                            shopsRows.map(shop =>(
                                <div onClick={()=>{ !loadingShop && onShopClick(shop.id) }} className="div-card-shop">
                                    <div className="shop-first-letter">
                                        { shop.name.substr(0, 1) }
                                    </div>
                                    {loadingShop && clicked === shop.id ?
                                        <div className="div-resto-loading">
                                            <div className="resto-loading"></div>
                                        </div>:null
                                    }
                                    <div className="shop-name"> {shop.name} </div>
                                </div>
                            ))
                        }
                        <div onClick={() =>history.push("/create-shop")} className="card-add-shop">
                            <div className="icon-add-shop"> <PlusOutlined /> </div>
                            <div>Ajouter boutique</div>
                        </div>
                    </div>
                </div>
                <div class="custom-shape-divider-bottom-1623278223">
                    <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
                        <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" class="shape-fill"></path>
                    </svg>
                </div>
            </div>
        </div>
    )
}