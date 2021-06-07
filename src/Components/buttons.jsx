import { Button } from "antd";
import "./style.scss";

export function DefaultBtn(props){
    const { style, loading, className, Icon, label, block } = props;

    return(
        <Button block={block} icon={Icon} className={`default-btn ${className}`} loading={loading} style={style}>
            {label}
        </Button>
    );
}