import { Button } from "antd";
import "./style.scss";

export function DefaultBtn(props){
    const { loading, className, Icon, label, block, onClick, disabled } = props;

    return(
        <Button disabled={disabled} onClick={onClick} block={block} icon={Icon} className={`default-btn ${className}`} loading={loading}
            style={{
                backgroundColor: "#E0A808",
                borderRadius: 10,
                color: "white",
                border: "none"
            }}>
            {label}
        </Button>
    );
}