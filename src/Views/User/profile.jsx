import { UserOutlined } from "@ant-design/icons";
import { ConfigProvider, DatePicker, Select } from "antd";
import { useState } from "react";
import { useSelector } from "react-redux";
import local from "antd/lib/locale/fr_FR";
import moment from "moment";
const { Option } = Select;

export function UserProfile(){
    const { data } = useSelector(({ users: { currentUser } }) =>currentUser);
    const [ name, setName ] = useState(data.fullName);
    const [ phone, setPhone ] = useState(data.phone);
    const [ email, setEmail ] = useState(data.email);
    const [ date, setDate ] = useState(data.birthDate);
    const [ city, setCity ] = useState(data.city);

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

    return(
        <div className="user-profile">
            <div className="profile-avatar">
                <div className="profile-icon"> <UserOutlined /> </div>
                <div className="profile-info">
                    <div className="profile-name"> { data.fullName } </div>
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
                            <DatePicker bordered={false} locale={local} defaultValue={moment(date, dateFormat)}
                                onChange={(_, value) =>setDate(value)} style={{ width: "100%", borderRadius: 10, color: "gray" }}
                                placeholder="Date de naissance" size={20} format={dateFormat} className="profile-input" />
                        </div>
                    </ConfigProvider>
                </div>
            </div>
        </div>
    )
}