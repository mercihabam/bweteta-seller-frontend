import { AppstoreOutlined, WalletOutlined } from "@ant-design/icons";
import { FacebookWidget, GradientWidget } from "../../Components/widgets";
import { Stats } from "./stats";
import "./style.scss";

function OverView(){

    return(
        <div className="overview">
            <div className="div-widgets">
                <GradientWidget header={13} pointColor="warning" 
                    text="Commades" color="gradient-warning" 
                    act1="Voir"
                    iconWidget={<WalletOutlined style={{ transform: "scale(1.3)", verticalAlign: "middle" }}/>}
                />
                <FacebookWidget />
                <GradientWidget header={20} text="Produits" 
                    pointColor="primary" color="gradient-primary"
                    act1="Ajouter produit"
                    act2="Voir mes produits"
                    iconWidget={<AppstoreOutlined style={{ transform: "scale(1.3)", verticalAlign: "middle" }} />}
                />
            </div>
            <div className="div-statt">
                <Stats />
            </div>
        </div>
    );
};

export default OverView;