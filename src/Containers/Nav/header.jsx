import { BellOutlined, LogoutOutlined, MenuOutlined, UserOutlined } from "@ant-design/icons";
import { Badge, Popover } from "antd";
import Avatar from "antd/lib/avatar/avatar";
import { useSelector } from "react-redux";
import { useHistory, useLocation } from "react-router"


export function Header(props){
    const location = useLocation();
    const history = useHistory();
    const { collapsed, setCollapsed } = props;
    const { data } = useSelector(({ users: { currentUser } }) =>currentUser);

    const content = (
        <div className="pop-content">
          <div>Profile</div>
          <div onClick={() =>history.push("/me/shops")}>Changer de boutique</div>
          <div className="div-logout"> <LogoutOutlined className="icon-logout" /> Deconnexion </div>
        </div>
    );

    const title = (
        <div style={{ textAlign: "center" }} className="popover-title">
            <div className="popover-icon"> <UserOutlined /> </div>
            <div>{data.fullName}</div>
        </div>
    )

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
                    <Popover arrowContent placement="bottomRight" title={title} content={content} trigger="click">
                        <Avatar style={{ verticalAlign: 'middle', cursor: "pointer" }} gap={0}>
                            {data.fullName.substr(0, 1)}
                        </Avatar>
                    </Popover>
                </div>
            </div>
        </div>
    )
}