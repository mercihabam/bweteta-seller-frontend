import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { getCurrentShop } from "../../Redux/actions/shopActions";
import { LoadingComponent } from "../../Utils/loaders";
import { Header } from "./header";
import { SideBar } from "./sideBar";
import "./style.scss";

function Nav({children}){
    const [ collapsed, setCollapsed ] = useState(true);
    const { loadingShop } = useSelector(({ shops: { currentShop } }) =>currentShop);
    const dispatch = useDispatch();
    const history = useHistory();

    useEffect(() =>{
        getCurrentShop(localStorage.getItem("active-shop"), dispatch, history);
    }, [dispatch]);

    return(loadingShop ?
        <LoadingComponent />:
        <div className="page">
            <div className="nav">
                <div className="nav-sidebar">
                    <SideBar collapsed={collapsed} />
                </div>
                <div className="nav-header">
                    <Header collapsed={collapsed} setCollapsed={setCollapsed} />
                </div>
                <div className="content">
                    {children}
                </div>
            </div>
        </div>
    );
};

export default Nav;