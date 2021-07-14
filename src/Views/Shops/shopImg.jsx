import { DeleteOutlined, EditOutlined, QuestionCircleOutlined } from "@ant-design/icons";
import CloudImg from "../../Utils/cloudImg";
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from '@material-ui/core/styles';
import { useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { useHistory } from "react-router";
import { useDispatch } from "react-redux";
import { sendNotif } from "../../Utils/notification";
import { getCurrentShop } from "../../Redux/actions/shopActions";
import { Popconfirm } from "antd";

const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
}));

export function ImgShop(props){
    const classes = useStyles();
    const [ loadingDelete, setLoading ] = useState();
    const { avatar, onEdit, loading, className, setClassName } = props;
    const dispatch = useDispatch();
    const history = useHistory();
    const { dataShop } = useSelector(({ shops: { currentShop } }) =>currentShop);

    const onDeleteFile = async() =>{
        try {
            setLoading(true);
            const res = await axios.get(`https://bwetetamarket.herokuapp.com/api/v1/shops2/delete-shop-avatar/${dataShop.id}`, {
                headers: {
                    "x-access-token": localStorage.getItem("x-access-token")
                }
            });
            if(res.data.status === 200){
                setLoading(false);
                sendNotif("success", res.data.msg)
                getCurrentShop(dataShop.id, dispatch, history);
            }else if(res.data.status === 401){
                setLoading(false);
                history.push("/login");
                sendNotif("error", "Vous devez vous connecter")
            }else{
                setLoading(false);
                sendNotif("error", res.data.error)
            }
        } catch (error) {
            setLoading(false);
            sendNotif("error", "Veuillez ressayer")
        }
    };

    return(
        <div className={className}>
            <Backdrop className={classes.backdrop} open={loading || loadingDelete}>
                <CircularProgress color="inherit" />
            </Backdrop>
            <div onClick={() =>setClassName("bg-full-shop-img")} className="bg-full-img"></div>
            <div className="div-full-shop-img">
                <CloudImg publicId={avatar} className="shop-full-img" />
                <div className="img-actions">
                    <div className="action-edit">
                        <EditOutlined onClick={onEdit} />
                    </div>
                    <Popconfirm onConfirm={onDeleteFile} title="Are you sure？" icon={<QuestionCircleOutlined style={{ color: 'red' }} />}>
                        <div className="action-delete">
                            <DeleteOutlined />
                        </div>
                    </Popconfirm>
                </div>
            </div>
        </div>
    );
}