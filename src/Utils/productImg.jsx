import { LoadingOutlined } from "@ant-design/icons";
import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import CloudImg from "./cloudImg";

export function ProductImg(props){
    const { productId } = props;
    const [ loading, setLoading ] = useState(true);
    const [ img, setImg ] = useState();

    useEffect(() =>{
        const fetchImgs = async() =>{
            try {
                const res = await axios.get(`https://bwetetamarket.herokuapp.com/api/v1/products2/images/${productId}`);
                if(res.data.status === 200){
                    setLoading(false)
                    setImg(res.data.data[0].url)
                }
            } catch (error) {
                setLoading(false)
            }
        };
        fetchImgs();
    }, [productId]);

    return(
        <>
            {
                loading ? <LoadingOutlined />:
                <CloudImg publicId={img} />
            }
        </>
    )
};