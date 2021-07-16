import { List, Avatar, Pagination } from 'antd';
import { useState } from 'react';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router';
import { getOrders } from '../../Redux/actions/ordersActions';
import { getProducts } from '../../Redux/actions/productActions';
import { OrderDetail } from './orderDetail';
import { ProductImg } from '../../Utils/productImg';
import moment from 'moment';
import localization from "moment/locale/fr-ch";
import { ClockCircleOutlined } from '@ant-design/icons';


export function AllOrders(){
    const [ viewDetail, setView ] = useState();
    const [ clicked, setClicked ] = useState({ Product: {} });
    const history = useHistory();
    const dispatch = useDispatch();
    const { dataShop } = useSelector(({ shops: { currentShop } }) =>currentShop);
    const { loading, rows, count } = useSelector(({ orders: { orders } }) =>orders);

    useEffect(() =>{
        getProducts(dataShop.id, 100, 0)(dispatch, history);
        getOrders(dispatch, history, dataShop.id);
    }, [dispatch]);

    const onOrderClick = (order) =>{
        setClicked(order);
        setView(true);
    }

    return(
        <div className="orders">
            <List
                className="list-orders"
                itemLayout="horizontal"
                style={{
                    padding: 20
                }}
                loading={loading}
                dataSource={rows}
                renderItem={item => (
                <List.Item onClick={() =>onOrderClick(item)} className="order-list-item">
                    <List.Item.Meta
                    avatar={<Avatar src={ <ProductImg productId={item.ProductId} /> } />}
                    title={<span >{item.Product.name}</span>}
                    description={ <div className="div-item-desc">
                        Quantité: ${item.quantity}, Prix total: {item.totalPrice}{item.Product.currency} {item.color ? ", Couleur"+item.color: ""}
                        <div className="item-date"> <ClockCircleOutlined /> { moment(item.createdAt).locale("fr", localization).format("ll") }, { moment(item.createdAt).locale("fr", localization).format("LT") } </div>
                        {
                        item.status === "pending" ? <div className="div-status-pending">En attente</div>: <div className="div-status-approved">Approuvé</div>
                    }
                    </div> }
                    />
                </List.Item>
                )}
                footer={
                    <Pagination defaultCurrent={1} total={count} />
                }
            />
            <OrderDetail order={clicked} visible={viewDetail} setVisible={setView} />
        </div>
    )
}