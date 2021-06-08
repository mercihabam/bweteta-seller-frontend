import { BellOutlined, MenuOutlined } from "@ant-design/icons";
import { Badge } from "antd";
import Avatar from "antd/lib/avatar/avatar";
import { useLocation } from "react-router"


export function Header(props){
    const location = useLocation();
    const { collapsed, setCollapsed } = props;

    return(
        <div className="header">
            <div className="header-left">
                <div className="icon-toggle">
                    <MenuOutlined onClick={() =>setCollapsed(!collapsed)} />
                </div>
                <div className="active-route"> Molato shop {location.pathname} </div>
            </div>
            <div className="header-right">
                <div className="notif">
                    <Badge dot>
                        <BellOutlined style={{ transform: "scale(1.5)" }} />
                    </Badge>
                </div>
                <div className="avatar-user">
                <Avatar style={{ verticalAlign: 'middle' }} gap={0}>
                    MJ
                </Avatar>
                </div>
            </div>
        </div>
    )
}