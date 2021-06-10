import { AppstoreOutlined, DashboardOutlined, DollarOutlined, SettingOutlined, ShopOutlined } from '@ant-design/icons';
import { ProSidebar, Menu, MenuItem } from 'react-pro-sidebar';
import 'react-pro-sidebar/dist/scss/styles.scss';
import { useHistory } from 'react-router';
import logo from "./img/min_logo.png";

export function SideBarMob(props){
    const history = useHistory();

    return(
        <ProSidebar toggled={true} className="sidebar-mob">
            <div className="sidelogo">
                <img src={logo} alt="" className="logo" />
            </div>
            <Menu popperArrow={true} iconShape="circle">
                <MenuItem onClick={()=>history.push("/overview")} icon={<DashboardOutlined />}>Tableau de bord</MenuItem>
                <MenuItem onClick={()=>history.push("/products")} icon={<AppstoreOutlined />}>Produits</MenuItem>
                <MenuItem onClick={()=>history.push("/orders")} icon={<DollarOutlined />}>Commandes</MenuItem>
                <MenuItem onClick={()=>history.push("/myshop")} icon={<ShopOutlined />}>Mon shop</MenuItem>
                <MenuItem onClick={()=>history.push("/settings")} icon={<SettingOutlined />}>Parametres</MenuItem>
            </Menu>
        </ProSidebar>
    );
}