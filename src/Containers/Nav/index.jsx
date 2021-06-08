import { useState } from "react";
import { Header } from "./header";
import { SideBar } from "./sideBar";
import "./style.scss";

function Nav({children}){
    const [ collapsed, setCollapsed ] = useState(false);

    return(
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