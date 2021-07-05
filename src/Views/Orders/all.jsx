import { List, Avatar, Pagination } from 'antd';
import { Image } from 'cloudinary-react';
import { useState } from 'react';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router';
import { getProducts } from '../../Redux/actions/productActions';
import { OrderDetail } from './orderDetail';

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
    const history = useHistory();
    const dispatch = useDispatch();
    const { dataShop } = useSelector(({ shops: { currentShop } }) =>currentShop);
    const { rowsProducts, loadingProducts, countProducts } = useSelector(({ products: { allProducts } }) =>allProducts);

    useEffect(() =>{
        getProducts(dataShop.id, 100, 0)(dispatch, history);
    }, [dispatch]);

    return(
        <div className="orders">
            <List
                className="list-orders"
                itemLayout="horizontal"
                style={{
                    padding: 20
                }}
                loading={loadingProducts}
                dataSource={rowsProducts}
                renderItem={item => (
                <List.Item onClick={() =>setView(true)} className="order-list-item">
                    <List.Item.Meta
                    avatar={<Avatar src={<Image cloudName="mulo" publicId={item.images[0]} />} />}
                    title={<span >{item.name}</span>}
                    description={`36 Quartier Katindo, Avenue La frontiere, Goma`}
                    />
                </List.Item>
                )}
                footer={
                    <Pagination defaultCurrent={1} total={countProducts} />
                }
            />
            <OrderDetail visible={viewDetail} setVisible={setView} />
        </div>
    )
}