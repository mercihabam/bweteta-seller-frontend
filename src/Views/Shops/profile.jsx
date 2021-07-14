import { useSelector } from "react-redux";
import CloudImg from "../../Utils/cloudImg";
import { AddAPhotoOutlined } from "@material-ui/icons";
import moment from "moment";
import { CalendarOutlined, EditOutlined, LoadingOutlined, PhoneOutlined } from "@ant-design/icons";
import { Button } from "antd";
import { ModalEditShop } from "./editInfo";
import { useState } from "react";
import { useRef } from "react";
import axios from "axios";
import { getCurrentShop } from "../../Redux/actions/shopActions";
import { sendNotif } from "../../Utils/notification";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";
import { ImgShop } from "./shopImg";

const dateFormat = 'DD/MM/YYYY';

export function ShopProfile(){
    const [ modalVisible, setModalVisible ] = useState();
    const [ loading, setLoading ] = useState();
    const [ className, setClassName ] = useState("bg-full-shop-img");
    const imgRef = useRef();
    const dispatch = useDispatch();
    const history = useHistory();
    const { dataShop } = useSelector(({ shops: { currentShop } }) =>currentShop);

    const onFileChange = async(e) =>{
        const file = e.target.files[0];
        const reader = new FileReader();
        if(file){
            setLoading(true);
            reader.readAsDataURL(file);
            reader.onloadend = async() =>{
                const res = await axios.post(`https://bwetetamarket.herokuapp.com/api/v1/shops2/update-shop-avatar/${dataShop.id}`, {
                    file: reader.result
                }, {
                    headers: {
                        "x-access-token": localStorage.getItem("x-access-token")
                    }
                });
                if(res.data.status === 200){
                    setLoading(false);
                    sendNotif("success", res.data.msg)
                    getCurrentShop(dataShop.id, dispatch, history);
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
    };

    const onEditPicture = () =>{
        imgRef.current.click();
    };

    const onViewImg = () =>{
        setClassName("bg-full-shop-img active");
    };

    return(
        <div className="shop-profile">
            <div className="shop-avatar">
                {
                    dataShop.avatar ?
                    <div className="div-shop-img">
                        {/* <div className="bg-img"></div> */}
                        <CloudImg onClick={onViewImg} publicId={dataShop.avatar} className="shop-img" />
                    </div>:
                    <div className="add-picture">
                        {
                            loading ?
                            <LoadingOutlined />:
                            <AddAPhotoOutlined onClick={()=>imgRef.current.click() } />
                        }
                    </div>
                }
                <input onChange={onFileChange} ref={imgRef} style={{ display: "none" }} type="file" name="img" accept="image/*" id="" />
            </div>
            <div className="profile-shop-name"> { dataShop.name } </div>
            <div className="profile-shop-phone"> <PhoneOutlined rotate={90} /> { dataShop.phone } </div>
            <div className="profile-shop-meta">
                <div className="profile-shop-city"> { dataShop.city } </div>
                <div className="profile-shop-date"> <CalendarOutlined /> <div className="sep-date"> </div> Inscrit le { moment(dataShop.createdAt).format(dateFormat) } </div>
            </div>
            <div className="shop-profile-desc">
                <div className="profil-desc-title"> Description </div>
                {dataShop.description}
            </div>
            <div className="div-btn-edit-shop">
                <Button onClick={() =>setModalVisible(true)} icon={ <EditOutlined /> } style={{ borderRadius: 20, paddingBottom: 30 }} type="primary" className="btn-edit-shop">Editer les infos</Button>
            </div>
            <ModalEditShop visible={modalVisible} setVisible={setModalVisible} />
            <ImgShop className={className} setClassName={setClassName} loading={loading} onEdit={onEditPicture} avatar={dataShop.avatar} />
        </div>
    )
}