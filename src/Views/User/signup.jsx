import { LockOutlined, MailOutlined, PhoneOutlined, UploadOutlined, UserOutlined } from "@ant-design/icons";
import { Alert, ConfigProvider, DatePicker, Input, Select } from "antd";
import { useRef, useState } from "react";
import { DefaultBtn } from "../../Components/buttons";
import { InputWithIcon } from "../../Components/input";
import moment from "moment";
import local from "antd/lib/locale/fr_FR";
import { Option } from "antd/lib/mentions";
import { signup } from "../../Redux/actions/users";
import { useDispatch, useSelector } from "react-redux";

export function Signup(){
    const [ name, setName ] = useState();
    const [ phone, setPhone ] = useState();
    const [ email, setEmail ] = useState();
    const [ date, setDate ] = useState();
    const [ city, setCity ] = useState("Goma");
    const [ pwd, setPwd ] = useState();
    const [ confirmPw, setConfirmPwd ] = useState();
    const dispatch = useDispatch();

    const [ errorMatch, setError] = useState();

    const dateFormat = 'DD/MM/YYYY';
    const dataCity = [
        "Goma",
        "Bukavu",
        "Kinshasa",
        "Butembo",
        "Beni",
        "Lubumbashi",
        "Bunia"
    ];

    const { error, loading } = useSelector(({ users: { signup } }) =>signup);

    const submit = () =>{
        setError(null);
        console.log(date);
        if(name && phone && email && date && city && pwd && confirmPw){
            if(pwd !== confirmPw){
                setError("les mots de passes ne correspondent pas")
            }else{
                const localDate = moment(date).toDate();
                signup({
                    fullName: name,
                    phone: phone,
                    email: email,
                    birthDate: localDate,
                    country: "DRC",
                    city: city,
                    password: pwd,
                    confirmPassword: confirmPw
                }, dispatch)
            }
        }
    }

    return(
        <div className="signup-page">
            <div className="card-signup">
                <div className="signup-title">Inscrivez-vous</div>
                <form className="form-signup">
                    {
                        errorMatch ?
                        <div className="div-signup-war">
                            <Alert onClose={() =>setError(null)} message={errorMatch} type="error" showIcon closable />
                        </div>:
                        error &&
                        <div className="div-signup-war">
                            <Alert message={error} type="error" showIcon />
                        </div>
                    }
                    <div className="input-id">
                        <InputWithIcon value={name} onChange={(e) =>setName(e.target.value)} placeholder="Nom complet" Icon={<UserOutlined /> } />
                    </div>
                    <div className="input-id">
                        <InputWithIcon value={phone} onChange={(e) =>setPhone(e.target.value)} placeholder="Numéro de téléphone" Icon={<PhoneOutlined rotate={90} /> } />
                    </div>
                    <div className="input-id">
                        <InputWithIcon value={email} onChange={(e) =>setEmail(e.target.value)} placeholder="Email" Icon={<MailOutlined /> } />
                    </div>
                    <div className="input-id">
                        <ConfigProvider locale={local}>
                            <DatePicker onChange={(_, value) =>setDate(value)} style={{ width: "100%", borderRadius: 5 }} placeholder="Date de naissance" size={20} format={dateFormat} />
                        </ConfigProvider>
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
                    <div className="input-id">
                        <Input.Password style={{ borderRadius: 5 }} placeholder="Mot de passe" value={pwd} onChange={(e) =>setPwd(e.target.value)} prefix={<LockOutlined />} />
                    </div>
                    <div className="input-pwd">
                        <Input.Password style={{ borderRadius: 5 }} placeholder="Repeter le mot de passe" value={confirmPw} onChange={(e) =>setConfirmPwd(e.target.value)} prefix={<LockOutlined />} />
                    </div>
                    <div className="login-btn">
                        <DefaultBtn disabled={!name || !phone || !email || !date || !city || !pwd || !confirmPw} loading={loading} onClick={submit} block={true} Icon={<UploadOutlined />} label="soummettre" />
                    </div>
                </form>
            </div>
        </div>
    );
}