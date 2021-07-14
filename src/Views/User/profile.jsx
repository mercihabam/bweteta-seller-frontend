import { UserOutlined } from "@ant-design/icons";
import { ConfigProvider, DatePicker, Select } from "antd";
import { useState } from "react";
import { useSelector } from "react-redux";
import local from "antd/lib/locale/fr_FR";
import moment from "moment";
import { DefaultBtn } from "../../Components/buttons";
import { updateUser } from "../../Redux/actions/users";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";
const { Option } = Select;

export function UserProfile(){
    const { data } = useSelector(({ users: { currentUser } }) =>currentUser);
    const { loading } = useSelector(({ users: { updateUser } }) =>updateUser);
    const [ name, setName ] = useState(data.fullname);
    const [ phone, setPhone ] = useState(data.phone);
    const [ email, setEmail ] = useState(data.email);
    const [ date, setDate ] = useState(data.birthdate);
    const [ city, setCity ] = useState(data.city);
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
    const dateFormat = 'DD/MM/YYYY';

    const onSubmit = () =>{
        if(name && phone &&email && date && city){
            const localDate = moment(date).toDate();
            updateUser({
                fullname: name,
                email: email,
                birthDate: localDate,
                phone: phone,
                city: city
            }, data.id, dispatch, history);
        }
    };

    return(
        <div className="user-profile">
            <div className="profile-avatar">
                <div className="profile-icon"> <UserOutlined /> </div>
                <div className="profile-info">
                    <div className="profile-name"> { data.fullname } </div>
                    <div className="profile-email"> { data.email } </div>
                </div>
            </div>
            <div className="profile-form">
                <div className="div-profile-input">
                    <div className="profile-label">Nom complet:</div>
                    <input value={name} onChange={(e) =>setName(e.target.value)} type="text" className="profile-input" />
                </div>
                <div className="div-profile-input">
                    <div className="profile-label">Email:</div>
                    <input value={email} onChange={(e) =>setEmail(e.target.value)} type="email" className="profile-input" />
                </div>
                <div className="div-profile-input">
                    <div className="profile-label">Phone:</div>
                    <input value={phone} onChange={(e) =>setPhone(e.target.value)} type="tel" className="profile-input" />
                </div>
                <div className="div-profile-input">
                    <div className="profile-label">Ville:</div>
                        <Select bordered={false} className="profile-input" 
                            onChange={(value) =>setCity(value)} placeholder="Ville"
                            name="city" style={{ width: "100%"}} defaultValue={city} >
                            {
                                dataCity.map(data =>(
                                    <Option value={data} key={data} > {data} </Option>
                                ))
                            }
                        </Select>
                </div>
                <div className="div-profile-input">
                    <div className="profile-label">Date de naissance:</div>
                    <ConfigProvider locale={local}>
                        <div className="profile-input-date">
                            <DatePicker bordered={false} locale={local} defaultValue={moment(date)}
                                onChange={(value, _) =>setDate(value)} style={{ width: "100%", borderRadius: 10, color: "gray" }}
                                placeholder="Date de naissance" size={20} format={dateFormat} className="profile-input" />
                        </div>
                    </ConfigProvider>
                </div>
                <div className="profile-btn">
                    <DefaultBtn onClick={onSubmit} loading={loading} block={true} label="Mettre à jour" />
                </div>
            </div>
        </div>
    )
}