import { Input } from "antd";
import 'antd/dist/antd.css';
import "./style.scss";

export function InputWithIcon(props){
    const { Icon, ref, placeholder, className } = props;

    return(
        <Input prefix={<Icon className="site-form-item-icon" />} placeholder={placeholder}
            className={className || "input-iconed"} ref={ref}
        />
    )
};