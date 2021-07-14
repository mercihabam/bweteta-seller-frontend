import "./style.scss";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useHistory } from "react-router";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { getProductsByCategory } from "../../Redux/actions/productActions";
import { useDispatch } from "react-redux";
import {Image} from 'cloudinary-react';
import { Skeleton } from "antd";

export function ProductsByCategory(props){
    const { categoryId } = props;
    const history = useHistory();
    const dispatch = useDispatch();
    const { dataShop } = useSelector(({ shops: { currentShop } }) =>currentShop);
    const { rowsProducts, loadingProducts } = useSelector(({ products: { allProducts } }) =>allProducts);

    useEffect(() =>{
        getProductsByCategory(dataShop.id, categoryId, 100, 0)(dispatch, history)
    }, [dispatch, categoryId]);


    return(
        <div className="all-products">
            {
                loadingProducts ?
                <div>
                    <Skeleton active />
                    <Skeleton active />
                </div>:
                <div className="div-products">
                    {
                        rowsProducts.map((product) =>(
                            <div onClick={() =>history.push(`/product/detail/${product.id}`)} className="product">
                                        <div className="div-product-img">
                                            {
                                                <Image cloudName="bwetetam" publicId={product.Images[0].url} className="img-product" />
                                            }
                                        </div>
                                <div className="product-name">{product.name}</div>
                                <div className="product-price">{product.price} { product.currency }</div>
                            </div>
                        ))
                    }
                </div>
            }
        </div>
    )
}