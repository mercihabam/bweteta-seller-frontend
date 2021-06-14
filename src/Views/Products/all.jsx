import "./style.scss";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useHistory } from "react-router";

export function AllProducts(){
    const history = useHistory();

    const productsData = [
        "Air Jordan",
        "Samsnug j5 pro",
        "Iphone 6",
        "Hp",
        "Mac book",
        "Lenovo",
        "Souris",
        "Usb",
    ];

    return(
        <div className="all-products">
            <div className="div-products">
                {
                    productsData.map((product) =>(
                        <div onClick={() =>history.push(`/product/detail/${product}`)} className="product">
                                    <div className="div-product-img">
                                        <img onClick={() =>history.push(`/product/detail/${product}`)} src="https://img.bfmtv.com/c/400/250/1500f32/2532062d42f07dad346f0dae6.jpg" alt="" className="img-product" />
                                    </div>
                            <div className="product-name">{product}</div>
                            <div className="product-price">220000 FC</div>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}