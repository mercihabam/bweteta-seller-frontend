import { Input } from "antd";
import "./style.scss";

const inputStyle = {
    borderRadius: 5
};

export function InputWithIcon(props){
    const { Icon, placeholder, className, onChange, value, type } = props;

    return(
        <Input prefix={Icon} placeholder={placeholder}
            className={className || "input-iconed"} style={inputStyle} onChange={onChange}
            value={value} type={type}
        />
    )
};