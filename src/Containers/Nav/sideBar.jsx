import { AppstoreOutlined, DashboardOutlined, SettingOutlined, ShopOutlined, UserOutlined } from '@ant-design/icons';
import { ProSidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import 'react-pro-sidebar/dist/scss/styles.scss';
import logo from "./img/min_logo.png";

export function SideBar(props){
    const { collapsed } = props;

    return(
        <ProSidebar collapsed={collapsed} toggled={true} className="sidebar">
            <div className="sidelogo">
                <img src={logo} alt="" className="logo" />
            </div>
            <Menu popperArrow={true} iconShape="circle">
                <MenuItem icon={<DashboardOutlined />}>Tableau de bord</MenuItem>
                <MenuItem icon={<AppstoreOutlined />}>Produits</MenuItem>
                <SubMenu title="Components" icon={<UserOutlined />}>
                <MenuItem>Component 1</MenuItem>
                <MenuItem>Component 2</MenuItem>
                </SubMenu>
                <MenuItem icon={<ShopOutlined />}>Mon shop</MenuItem>
                <MenuItem icon={<SettingOutlined />}>Parametres</MenuItem>
            </Menu>
        </ProSidebar>
    );
}