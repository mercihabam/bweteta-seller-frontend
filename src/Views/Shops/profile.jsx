import { useSelector } from "react-redux";
import CloudImg from "../../Utils/cloudImg";
import { AddAPhotoOutlined } from "@material-ui/icons";
import moment from "moment";
import { CalendarOutlined, EditOutlined, PhoneOutlined } from "@ant-design/icons";
import { Button } from "antd";
import { ModalEditShop } from "./editInfo";
import { useState } from "react";

const dateFormat = 'DD/MM/YYYY';

export function ShopProfile(){
    const [ modalVisible, setModalVisible ] = useState();
    const { dataShop } = useSelector(({ shops: { currentShop } }) =>currentShop);

    return(
        <div className="shop-profile">
            <div className="shop-avatar">
                {
                    dataShop.avatar ?
                    <CloudImg publicId={dataShop.avatar} className="shop-img" />:
                    // <div className="shop-letter"> { dataShop.name.substr(0, 1) } </div>
                    <div className="add-picture">
                        <AddAPhotoOutlined />
                    </div>
                }
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
        </div>
    )
}