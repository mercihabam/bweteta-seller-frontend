import { List, Avatar, Pagination } from 'antd';
import { Image } from 'cloudinary-react';
import { useState } from 'react';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router';
import { getOrders } from '../../Redux/actions/ordersActions';
import { getProducts } from '../../Redux/actions/productActions';
import { OrderDetail } from './orderDetail';
import { DollarOutlined } from "@ant-design/icons";
import { ProductImg } from '../../Utils/productImg';

const data = [
    {
        product: "Iphone 6",
        adress: "36 Quartier Katindo, Avenue La frontiere",
        city: "Goma"
    },
    {
        product: "Macbook pro",
        adress: "36 Quartier Katindo, Avenue La frontiere",
        city: "Goma"
    },
    {
        product: "Airmax 720",
        adress: "36 Quartier Katindo, Avenue La frontiere",
        city: "Goma"
    },
    {
        product: "Hp Elitebook",
        adress: "36 Quartier Katindo, Avenue La frontiere",
        city: "Goma"
    }
];


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
                    description={`Quantité: ${item.quantity}, Prix total: ${item.totalPrice}${item.Product.currency} ${item.color ? ", Couleur"+item.color: ""}`}
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