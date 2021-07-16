import { Drawer } from 'antd';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { DefaultBtn } from '../../Components/buttons';
import { approveOrder } from '../../Redux/actions/ordersActions';


export function OrderDetail(props) {
    const { visible, setVisible, order } = props;
    const dispatch = useDispatch();
    const history = useHistory();
    const { loading } = useSelector(({ orders: { approveOrder } }) =>approveOrder);

    return (
      <>
        <Drawer
        //   width={640}
            width={null}
          placement="right"
          closable={false}
          onClose={() =>setVisible(false)}
          visible={visible}
          className="drawer-detail"
          contentWrapperStyle={{
              width: "80%"
          }}
        >
          <div className="order-detail">
            <h2 className="site-description-item-profile-p" style={{ marginBottom: 10 }}>
              Detail de la commande
            </h2>
            <div className="order-infos">
              <div className="order-product-name">
                Produit : <span>{ order.Product.name }</span>
              </div>
              <div className="order-quantity">
                Quantité : <span> { order.quantity } { order.Product.quantityMetric } </span>
              </div>
              <div className="order-color">
                Couleur : <span> { order.color ? order.color : "Non définie" } </span>
              </div>
              <div className="order-status">
                Statut : <span> { order.status === "pending" ? "En attente": "Approuvé" } </span>
              </div>
              <div className="order-price">
                Prix total : <span> { order.totalPrice }{order.Product.currency} </span>
              </div>
            </div>
            {
              order.status === "pending" ?
              <div className="btn-approve">
                <DefaultBtn loading={loading} onClick={() =>approveOrder(dispatch, history, order.id, order.shopId)} label="Approuver" />
              </div>:null
            }
          </div>
        </Drawer>
      </>
    );
  }