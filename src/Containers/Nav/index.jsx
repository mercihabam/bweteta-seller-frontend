import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { getCurrentShop } from "../../Redux/actions/shopActions";
import { LoadingComponent } from "../../Utils/loaders";
import { Header } from "./header";
import { SideBar } from "./sideBar";
import { SideBarMob } from "./siderMob";
import "./style.scss";

function Nav({children}){
    const [ collapsed, setCollapsed ] = useState(true);
    const { loadingShop } = useSelector(({ shops: { currentShop } }) =>currentShop);
    const { isAuth } = useSelector(({ users: { currentUser } }) =>currentUser);
    const dispatch = useDispatch();
    const history = useHistory();

    useEffect(() =>{
        if(isAuth){
            getCurrentShop(localStorage.getItem("active-shop"), dispatch, history);
        }
    }, [dispatch]);

    const toggleSider = () =>{
        const btnDisplay = document.querySelector(".icon-collapse");
        const sider = document.querySelector(".sidebar-mob");
        const divSider = document.querySelector(".nav-mob-sider");
        const bgSiser = document.querySelector(".side-mob-bg");
        if(btnDisplay && sider && divSider && bgSiser){
            btnDisplay.addEventListener("click", () =>{
                sider.style.transform = "translateX(-0%)";
                divSider.style.display = "block"
            });

            bgSiser.addEventListener("click", () =>{
                sider.style.transform = "translateX(-40%)";
                setTimeout(() =>{
                    divSider.style.display = "none"
                }, [300]);
            })
        }
    };

    toggleSider();

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
                <div className="nav-mob-sider">
                    <div className="side-mob-bg"></div>
                    <SideBarMob />
                </div>
                <div className="content">
                    {children}
                </div>
            </div>
        </div>
    );
};

export default Nav;