import { AppstoreOutlined, WalletOutlined } from "@ant-design/icons";
import { FacebookWidget, GradientWidget } from "../../Components/widgets";
import "./style.scss";

function OverView(){

    return(
        <div className="overview">
            <div className="div-widgets">
                <GradientWidget header={13} pointColor="warning" 
                    text="Commades" color="gradient-warning" 
                    iconWidget={<WalletOutlined style={{ transform: "scale(1.3)", verticalAlign: "middle" }}/>}
                />
                <FacebookWidget />
                <GradientWidget header={20} text="Produits" 
                    pointColor="primary" color="gradient-primary"
                    iconWidget={<AppstoreOutlined style={{ transform: "scale(1.3)", verticalAlign: "middle" }} />}
                />
            </div>
        </div>
    );
};

export default OverView;