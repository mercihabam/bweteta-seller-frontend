import { DeleteOutlined, EditOutlined, QuestionCircleOutlined } from "@ant-design/icons";
import CloudImg from "../../Utils/cloudImg";
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from '@material-ui/core/styles';
import { useState } from "react";
import axios from "axios";
import { useHistory } from "react-router";
import { useDispatch } from "react-redux";
import { sendNotif } from "../../Utils/notification";
import { Popconfirm } from "antd";
import { useRef } from "react";
import { getProductDetail } from "../../Redux/actions/productActions";

const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
}));

export function ImgProd(props){
    const classes = useStyles();
    const [ loading, setLoading ] = useState();
    const { img, className, setClassName, product } = props;
    const dispatch = useDispatch();
    const imgRef = useRef();
    const history = useHistory();

    const onDeleteFile = async() =>{
        try {
            setLoading(true);
            const res = await axios.post(`https://seller-backend.herokuapp.com/api/v1/products/delete-product-img/${product.id}`, {
                publicId: img
            }, {
                headers: {
                    "auth-token": localStorage.getItem("auth-token")
                }
            });
            if(res.data.status === 200){
                setLoading(false);
                sendNotif("success", res.data.msg)
                getProductDetail(product.id)(dispatch);
            }else if(res.data.status === 401){
                setLoading(false);
                history.push("/login");
                sendNotif("error", "Vous devez vous connecter")
            }else{
                setLoading(false);
                sendNotif("error", res.data.error)
            }
        } catch (error) {
            setLoading(false);
            sendNotif("error", "Veuillez ressayer")
        }
    };

    const onEditImg = (e) =>{
        const file = e.target.files[0];
        const reader = new FileReader();
        if(file){
            setLoading(true);
            reader.readAsDataURL(file);
            reader.onloadend = async() =>{
                const res = await axios.post(`https://seller-backend.herokuapp.com/api/v1/products/update-product-img/${product.id}`, {
                    file: reader.result,
                    publicId: img
                }, {
                    headers: {
                        "auth-token": localStorage.getItem("auth-token")
                    }
                });
                if(res.data.status === 200){
                    setLoading(false);
                    sendNotif("success", res.data.msg)
                    getProductDetail(product.id)(dispatch);
                }else if(res.data.status === 401){
                    setLoading(false);
                    history.push("/login");
                    sendNotif("error", "Vous devez vous connecter")
                }else{
                    setLoading(false);
                    sendNotif("error", res.data.error)
                }
            }
        }
    }

    return(
        <div className={className}>
            <Backdrop className={classes.backdrop} open={loading}>
                <CircularProgress color="inherit" />
            </Backdrop>
            <div onClick={() =>setClassName("bg-full-shop-img")} className="bg-full-img"></div>
            <div className="div-full-shop-img">
                <CloudImg publicId={img} className="shop-full-img" />
                <input type="file" accept="image/*" onChange={onEditImg} ref={imgRef} style={{ display: "none" }}/>
                <div className="img-actions">
                    <div className="action-edit-img">
                        <EditOutlined onClick={() =>imgRef.current.click()} />
                    </div>
                    <Popconfirm onConfirm={onDeleteFile} title="Are you sure？" icon={<QuestionCircleOutlined style={{ color: 'red' }} />}>
                        <div className="action-delete-img">
                            <DeleteOutlined />
                        </div>
                    </Popconfirm>
                </div>
            </div>
        </div>
    );
}