import { InputWithIcon } from "../../Components/input";
import { LockOutlined, LoginOutlined, UserOutlined } from "@ant-design/icons";
import { Input } from "antd";
import './style.scss';
import "../../Components/style.scss";
import { useRef } from "react";
import { DefaultBtn } from "../../Components/buttons";
import { useHistory } from "react-router";

export function Login(){
    const idRef = useRef();
    const pwdRef = useRef();
    const history = useHistory();

    return(
        <div className="login-page">
            <div className="card-login">
                <form className="login-form">
                    <div className="input-id">
                        <InputWithIcon ref={idRef} placeholder="Email ou numéro de téléphone" Icon={<UserOutlined /> } />
                    </div>
                    <div className="input-pwd">
                        <Input.Password style={{ borderRadius: 5 }} placeholder="Mot de passe" ref={pwdRef} prefix={<LockOutlined />} />
                    </div>
                    <div className="login-btn">
                        <DefaultBtn block={true} Icon={<LoginOutlined />} label="connexion" />
                    </div>
                </form>
            </div>
            <div className="card-link-signup">
                <div className="signup-msg">
                    Vous n'avez pas de compte ?
                    <div onClick={() =>history.push("/signup")} className="signup-link">
                        Faites une inscription rapide
                    </div>
                </div>
            </div>
        </div>
    );
}