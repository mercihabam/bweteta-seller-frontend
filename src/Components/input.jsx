import { Input } from "antd";
import 'antd/dist/antd.css';
import "./style.scss";

export function InputWithIcon(props){
    const { Icon, ref, placeholder, className } = props;

    return(
        <Input prefix={Icon} placeholder={placeholder}
            className={className || "input-iconed"} ref={ref}
        />
    )
};