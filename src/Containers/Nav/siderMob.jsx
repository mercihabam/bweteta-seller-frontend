import { AppstoreOutlined, DashboardOutlined, DollarOutlined, SettingOutlined, ShopOutlined } from '@ant-design/icons';
import { ProSidebar, Menu, MenuItem } from 'react-pro-sidebar';
import 'react-pro-sidebar/dist/scss/styles.scss';
import { useHistory } from 'react-router';
import logo from "./img/min_logo.png";

export function SideBarMob(props){
    const history = useHistory();

    const toggleSider = () =>{
        const sider = document.querySelector(".sidebar-mob");
        const divSider = document.querySelector(".nav-mob-sider");
        if(sider && divSider){
            sider.style.transform = "translateX(-40%)";
            setTimeout(() =>{
                divSider.style.display = "none"
            }, [300]);
        }
    };

    const goTo = (path) =>{
        toggleSider();
        history.push(path)
    }

    return(
        <ProSidebar toggled={true} className="sidebar-mob">
            <div className="sidelogo">
                <img src={logo} alt="" className="logo" />
            </div>
            <Menu popperArrow={true} iconShape="circle">
                <MenuItem onClick={()=>goTo("/overview")} icon={<DashboardOutlined />}>Tableau de bord</MenuItem>
                <MenuItem onClick={()=>goTo("/products")} icon={<AppstoreOutlined />}>Produits</MenuItem>
                <MenuItem onClick={()=>goTo("/orders")} icon={<DollarOutlined />}>Commandes</MenuItem>
                <MenuItem onClick={()=>goTo("/myshop")} icon={<ShopOutlined />}>Mon shop</MenuItem>
                <MenuItem onClick={()=>goTo("/settings")} icon={<SettingOutlined />}>Parametres</MenuItem>
            </Menu>
        </ProSidebar>
    );
}