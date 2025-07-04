import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Button, Skeleton } from "antd";
import { Image } from "cloudinary-react";
import { useState } from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useParams } from "react-router";
import Slider from "react-slick";
import { getProductDetail } from "../../Redux/actions/productActions";
import { EditProductForm } from "./editProduct";
import { ImgProd } from "./productImg";


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
    const [ editClass, setEditClass ] = useState("edit-product-form");
    const [ imgClass, setImgClass ] = useState("bg-full-shop-img");
    const [ clickedImg, setClicked ] = useState({});
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
    };

    const onImgClick = (img) =>{
        setClicked(img);
        setImgClass("bg-full-shop-img active");
    };

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
                                    productData.Images.map(img =>(
                                        <div>
                                            <Image onClick={() =>onImgClick(img)} cloudName="bwetetam" publicId={img.url} className="img-product-detail" />
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
                                        <div className={`detail-color ${ color }`}></div>
                                    ))
                                }
                            </div>
                        </div>
                    </div>
                    <EditProductForm className={editClass} product={productData} />
                    <div onClick={toggleEdit} className="form-toggle">
                        {
                            editClass === "edit-product-form" ? 
                            <Button type="ghost" style={{ borderRadius: 20 }} icon={ <EditOutlined /> } >Modifier le produit</Button>
                            : "Fermer le formulaire"
                        }
                    </div>
                    <ImgProd product={productData} className={imgClass} setClassName={setImgClass} img={clickedImg} />
                </div>
            }
        </div>
    )
}