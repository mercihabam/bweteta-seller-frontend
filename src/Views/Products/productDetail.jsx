import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import Slider from "react-slick";


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

  const colors = [
    {
        name: "noire",
        active: false,
    },
    {
        name: "blanc",
        active: false,
    },
    {
        name: "or",
        active: false
    },
    {
        name: "argent",
        active: false
    }
  ]


export function ProductDetail(){

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

    return(
        <div className="product-detail">
            <div className="div-detail">
                <div className="div-detail-imgs">
                    <Slider autoplay={false} {...settings}>
                        <div>
                            <img src="https://img.bfmtv.com/c/400/250/1500f32/2532062d42f07dad346f0dae6.jpg" alt="" className="img-product-detail" />
                        </div>
                        <div>
                            <img src="data:image/jpeg;base64,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" alt="" className="img-product-detail" />
                        </div>
                    </Slider>
                </div>
                <div className="detail-infos">
                    <div className="detail-name">HP</div>
                    <div className="detail-desc">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto quam doloremque dignissimos 
                        inventore veniam cum debitis, minima ad animi quidem, 
                        laborum fugit adipisci earum est sit, ut repellat cumque? Autem.
                    </div>
                    <div className="detail-price"> 250000FC </div>
                    <div className="detail-colors">
                        {
                            colors.map(color =>(
                                <div className={`color ${ color.name }`}> {color.name} </div>
                            ))
                        }
                    </div>
                    <div className="detail-actions">
                        <div className="detail-edit">
                            <EditOutlined />
                            <div>Modifier</div>
                        </div>
                        <div className="detail-delete"> <DeleteOutlined /> supprimer </div>
                    </div>
                </div>
            </div>
        </div>
    )
}