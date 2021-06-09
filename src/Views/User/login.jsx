import React, {useState} from "react";
// import { InputWithIcon } from "../../Components/input";
import { LockOutlined, LoginOutlined, UserOutlined } from "@ant-design/icons";
import { Input } from "antd";
import './style.scss';
import "../../Components/style.scss";
import { useRef } from "react";
import { DefaultBtn } from "../../Components/buttons";
import { useHistory, useLocation } from "react-router";
import { Alert } from 'antd';
import { login } from "../../Redux/actions/users";
import { useDispatch, useSelector } from "react-redux";

const inputStyle = {
    borderRadius: 5
};

export function Login(){
    const [ id, setId ] = useState();
    const [ pwd, setPwd ] = useState();

    const history = useHistory();
    const location = useLocation();
    const dispatch = useDispatch();
    const next = location.state ? location.state.next : "/";
    const [ msg, setMsg ] = useState( location.state ? location.state.error: null)
    
    const { error, loading } = useSelector(({ users: { login } }) =>login);

    const submit = () =>{
        setMsg(null);
        if(id && pwd){
            login({ id: id, password: pwd }, next, dispatch, history);
        }
    };

    return(
        <div className="login-page">
            <div className="card-login">
                {
                    msg ?
                    <div className="div-login-war">
                        <Alert message={msg} type="warning" showIcon closable />
                    </div>:
                    error &&
                    <div className="div-login-war">
                        <Alert message={error} type="error" showIcon />
                    </div>
                }
                <form className="login-form">
                    <div className="input-id">
                        <Input prefix={<UserOutlined />} placeholder="Email ou numéro de téléphone"
                            className="input-iconed" onChange={(e) =>setId(e.target.value)}
                            style={inputStyle}
                        />
                    </div>
                    <div className="input-pwd">
                        <Input.Password style={inputStyle} placeholder="Mot de passe" 
                            prefix={<LockOutlined />}
                            onChange={(e) =>setPwd(e.target.value)}
                        />
                    </div>
                    <div className="login-btn">
                        <DefaultBtn disabled={!id || !pwd} loading={loading} onClick={submit} block={true} Icon={<LoginOutlined />} label="connexion" />
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