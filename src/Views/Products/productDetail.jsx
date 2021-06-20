import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Skeleton } from "antd";
import { Image } from "cloudinary-react";
import { useState } from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useParams } from "react-router";
import Slider from "react-slick";
import { getProductDetail } from "../../Redux/actions/productActions";
import { EditProductForm } from "./editProduct";


function SampleNextArrow(props) {
    const { className, style, onClick } = props;
    return (
            <div className={`${className} btn-next`}
                style={{ ...style, display: "block" }}
                onClick={onClick}
            />
    );
  }
  
  function SamplePrevArrow(props) {
    const { className, style, onClick } = props;
    return (
        <div
        className={`${className} btn-prev`}
        style={{ ...style, display: "block" }}
        onClick={onClick}
        />
    );
  }


export function ProductDetail(){
    const params = useParams();
    const dispatch = useDispatch();
    const [ editClass, setEditClass ] = useState("edit-product-form")
    const { productData, loadingProduct } = useSelector(({ products: { productById } }) =>productById);

    const settings = {
        dots: true,
        infinite: true,
        autoplaySpeed: 2000,
        slideToshow: 0,
        slideToscroll: 1,
        speed: 500,
        className: "slick-detail-product",
        nextArrow: <SampleNextArrow />,
        prevArrow: <SamplePrevArrow />,
    };

    useEffect(() =>{
        getProductDetail(params.id)(dispatch);
    }, [dispatch, params.id]);

    const toggleEdit = () =>{
        if(editClass === "edit-product-form"){
            setEditClass("edit-product-form view")
        }else{
            setEditClass("edit-product-form");
        }
    }

    return(
        <div className="product-detail">
            {
                loadingProduct ?
                <div>
                    <Skeleton active />
                </div>:
                <div>
                    <div className="div-detail">
                        <div className="div-detail-imgs">
                            <Slider autoplay={false} {...settings}>
                                {
                                    productData.images.map(img =>(
                                        <div>
                                            <Image cloudName="mulo" publicId={img} className="img-product-detail" />
                                        </div>
                                    ))
                                }
                            </Slider>
                        </div>
                        <div className="detail-infos">
                            <div className="detail-name"> { productData.name } </div>
                            <div className="detail-desc">
                                {productData.description}
                            </div>
                            <div className="detail-price"> { productData.price+productData.currency } </div>
                            <div className="detail-colors">
                                {
                                    productData.colors.map(color =>(
                                        <div className={`color ${ color }`}> {color} </div>
                                    ))
                                }
                            </div>
                        </div>
                    </div>
                    <EditProductForm className={editClass} product={productData} />
                    <div onClick={toggleEdit} className="form-toggle">
                        {
                            editClass === "edit-product-form" ? "Modifier le produit": "Fermer le formulaire"
                        }
                    </div>
                </div>
            }
        </div>
    )
}