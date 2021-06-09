import { PhoneOutlined, ShopOutlined, UploadOutlined } from "@ant-design/icons";
import { Alert, Select } from "antd";
import { DefaultBtn } from "../../Components/buttons";
import { InputWithIcon } from "../../Components/input";
import { Option } from "antd/lib/mentions";
import { signup } from "../../Redux/actions/users";
import { useDispatch, useSelector } from "react-redux";
import TextArea from "antd/lib/input/TextArea";
import { useState } from "react";
import createShop from "../../Redux/actions/createShop";
import { useHistory } from "react-router";

export function CreateShop(){
    const [ name, setName ] = useState();
    const [ phone, setPhone ] = useState();
    const [ description, setDescription ] = useState();
    const [ city, setCity ] = useState("Goma");
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

    const { error, loading } = useSelector(({ shops: { createShop } }) =>createShop);

    const submit = () =>{
        if(name && phone && city && description){
                createShop({
                    name: name,
                    phone: phone,
                    country: "DRC",
                    city: city,
                    description: description
                })(dispatch, history);
            }
        }

    return(
        <div className="signup-page">
            <div className="card-signup">
                <div className="signup-title">Enregistrez votre boutique</div>
                <form className="form-signup">
                    {
                        error &&
                        <div className="div-signup-war">
                            <Alert message={error} type="error" showIcon />
                        </div>
                    }
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
                        <Select onChange={(value) =>setCity(value)} placeholder="Ville" name="city" style={{ width: "100%"}}>
                            {
                                dataCity.map(data =>(
                                    <Option value={data} key={data} > {data} </Option>
                                ))
                            }
                        </Select>
                    </div>
                    <div className="login-btn">
                        <DefaultBtn disabled={!name || !phone || !city || !description} loading={loading} onClick={submit} block={true} Icon={<UploadOutlined />} label="soummettre" />
                    </div>
                </form>
            </div>
        </div>
    );
}