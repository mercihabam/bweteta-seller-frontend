import { PhoneOutlined, ShopOutlined } from "@ant-design/icons";
import { Modal, Select } from "antd";
import TextArea from "antd/lib/input/TextArea";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useHistory } from "react-router";
import { DefaultBtn } from "../../Components/buttons";
import { InputWithIcon } from "../../Components/input";
import { updateShop } from "../../Redux/actions/shopActions";

const { Option } = Select;
export function ModalEditShop(props){
    const { visible, setVisible } = props;
    const { dataShop } = useSelector(({ shops: { currentShop } }) =>currentShop);
    const { loading } = useSelector(({ shops: { updateShop } }) =>updateShop);
    const [ name, setName ] = useState(dataShop.name);
    const [ phone, setPhone ] = useState(dataShop.phone);
    const [ description, setDescription ] = useState(dataShop.description);
    const [ city, setCity ] = useState(dataShop.city);
    const dispatch = useDispatch();
    const history = useHistory();

    const dataCity = [
        "Goma",
        "Bukavu",
        "Kinshasa",
        "Butembo",
        "Beni",
        "Lubumbashi",
        "Bunia"
    ];

    const onSubmit = () =>{
        if(name && phone && description && city){
            updateShop({
                name: name,
                description: description,
                city: city,
                phone: phone
            }, dataShop.id)(dispatch, history);
        }
    };

    return(
        <Modal
          title="Editer mon shop"
          visible={visible}
          onOk
          onCancel={() =>setVisible(false)}
          footer={[
              <DefaultBtn loading={loading} onClick={onSubmit} label="mettre à jour" />
          ]}
        >
          <div className="input-id">
            <InputWithIcon value={name} onChange={(e) =>setName(e.target.value)} placeholder="Nom de la boutique" Icon={<ShopOutlined /> } />
        </div>
        <div className="input-id">
            <InputWithIcon value={phone} onChange={(e) =>setPhone(e.target.value)} placeholder="Numéro de téléphone" Icon={<PhoneOutlined rotate={90} /> } />
        </div>
        <div className="input-id">
            <TextArea
                value={description}
                onChange={(e) =>setDescription(e.target.value)}
                placeholder="Decrivez votre boutique en quelques mots"
                autoSize={{ minRows: 3, maxRows: 5 }}
            />
        </div>
        <div className="input-id">
            <Select onChange={(value) =>setCity(value)} defaultValue={city} placeholder="Ville" name="city" style={{ width: "100%"}}>
                {
                    dataCity.map(data =>(
                        <Option value={data} key={data} > {data} </Option>
                    ))
                }
            </Select>
        </div>
        </Modal>
    )
}