import { PageHeader } from "antd";
import { useHistory } from "react-router-dom";
import { AllOrders } from "./all";
import "./style.scss";

function Orders(){
    const history = useHistory();

    return(
        <div className="">
            <div className="page-header">
                <PageHeader
                    className="site-page-header"
                    onBack={() => history.goBack()}
                    title="Commandes"
                />
            </div>
            <div className="all-orders"><AllOrders /></div>
        </div>
    )
};

export default Orders;