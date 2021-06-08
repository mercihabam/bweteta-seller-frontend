import { LockOutlined, MailOutlined, PhoneOutlined, UploadOutlined, UserOutlined } from "@ant-design/icons";
import { ConfigProvider, DatePicker, Input, Select } from "antd";
import { useRef } from "react";
import { DefaultBtn } from "../../Components/buttons";
import { InputWithIcon } from "../../Components/input";
import moment from "moment";
import local from "antd/lib/locale/fr_FR";
import { Option } from "antd/lib/mentions";

export function Signup(){
    const nameRef = useRef();
    const phoneRef = useRef();
    const emailRef = useRef();
    const pwdRef = useRef();
    const confirmRef = useRef();

    const dateFormat = 'DD/MM/YYYY';
    const dataCity = [
        "Goma",
        "Bukavu",
        "Kinshasa",
        "Butembo",
        "Beni",
        "Lubumbashi",
        "Bunia"
    ]

    return(
        <div className="signup-page">
            <div className="card-signup">
                <div className="signup-title">Inscrivez-vous</div>
                <form className="form-signup">
                    <div className="input-id">
                        <InputWithIcon ref={nameRef} placeholder="Nom complet" Icon={<UserOutlined /> } />
                    </div>
                    <div className="input-id">
                        <InputWithIcon ref={phoneRef} placeholder="Numéro de téléphone" Icon={<PhoneOutlined rotate={90} /> } />
                    </div>
                    <div className="input-id">
                        <InputWithIcon ref={emailRef} placeholder="Email" Icon={<MailOutlined /> } />
                    </div>
                    <div className="input-id">
                        <ConfigProvider locale={local}>
                            <DatePicker style={{ width: "100%", borderRadius: 5 }} placeholder="Date de naissance" size={20} format={dateFormat} />
                        </ConfigProvider>
                    </div>
                    <div className="input-id">
                        <Select placeholder="Ville" name="city" style={{ width: "100%"}}>
                            {
                                dataCity.map(data =>(
                                    <Option value={data} key={data} > {data} </Option>
                                ))
                            }
                        </Select>
                    </div>
                    <div className="input-id">
                        <Input.Password style={{ borderRadius: 5 }} placeholder="Mot de passe" ref={pwdRef} prefix={<LockOutlined />} />
                    </div>
                    <div className="input-pwd">
                        <Input.Password style={{ borderRadius: 5 }} placeholder="Repeter le mot de passe" ref={confirmRef} prefix={<LockOutlined />} />
                    </div>
                    <div className="login-btn">
                        <DefaultBtn block={true} Icon={<UploadOutlined />} label="soummettre" />
                    </div>
                </form>
            </div>
        </div>
    );
}