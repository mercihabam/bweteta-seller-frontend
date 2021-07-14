import { CloudUploadOutlined, PictureFilled } from "@ant-design/icons";
import { Button, Select, Switch } from "antd";
import TextArea from "antd/lib/input/TextArea";
// import ImgCrop from 'antd-img-crop';
import Dragger from "antd/lib/upload/Dragger";
import { useEffect } from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useHistory } from "react-router";
import { DefaultBtn } from "../../Components/buttons";
import { InputWithIcon } from "../../Components/input";
import { getCategorys } from "../../Redux/actions/categoryActions";
import createProduct from "../../Redux/actions/createProduct";
const { Option } = Select;

export function ProductForm(){
    const [ files, setFiles ] = useState([]);
    const [ name, setName ] = useState();
    const [ category, setCategory ] = useState();
    const [ description, setDescription ] = useState();
    const [ price, setPrice ] = useState();
    const [ currency, setCurrency ] = useState();
    const [ quantity, setQuantity ] = useState();
    const [ isNew, setIsNew ] = useState();
    const dispatch = useDispatch();
    const history = useHistory();
    const [ colors, setColors ] = useState([
        {
            name: "noire",
            active: false,
        },
        {
            name: "blanc",
            active: false,
        },
        {
            name: "jaune",
            active: false,
        },
        {
            name: "rouge",
            active: false,
        },
        {
            name: "orange",
            active: false,
        },
        {
            name: "bleu",
            active: false,
        },
        {
            name: "violet",
            active: false,
        },
        {
            name: "or",
            active: false
        },
        {
            name: "argent",
            active: false
        }
    ]);

    const props = {
        name: 'file',
        multiple: true,
        onChange(info) {
          if (info.file.status !== 'uploading') {
            info.file.status = "done";
            const fileArray = [];
            info.fileList.forEach(file => {
                fileArray.push(file.originFileObj);
                // console.log(file.originFileObj);
            });
            readFiles(fileArray);
            console.log(files);
          }
        },
        onDrop(e) {
          console.log('Dropped files', e.dataTransfer.files);
        },
      };

    const readFiles = async(files) =>{
        const fileArray = [];
        await files.forEach(file =>{
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onloadend = () =>{
                fileArray.push(reader.result)
            }
        });
        setFiles(fileArray)
    };
    

    const onColorToggle = async(color) =>{
        const array = [];
        await colors.forEach(value =>{
            if(value === color){
                const newColor = { name: color.name, active: !color.active };
                array.push(newColor)
            }else{
                array.push(value)
            }
        });
        setColors(array)
    };

    useEffect(() =>{
        getCategorys(dispatch);
    }, [dispatch]);

    const { dataShop } = useSelector(({ shops: { currentShop } }) =>currentShop);
    const { loadingAdd } = useSelector(({ products: { createProduct } }) =>createProduct);

    const onSubmit = async() =>{
        if(files && name && category && description && price && currency && quantity){
            const colorArray = colors.filter(color => color.active);
            let newColors = [];
            await colorArray.forEach(color =>{
                newColors.push(color.name)
            });
            const filesArray = files.reverse();
            createProduct({
                name: name,
                categoryId: 1,
                images: filesArray,
                description: description,
                price: price,
                colors: newColors,
                isNew: isNew,
                currency: currency,
                quantity: quantity,
                shopId: dataShop.id
            })(dispatch, history);
        }
    };

    const { rowsCategorys, loadingCategorys } = useSelector(({ categorys: { categorys } }) =>categorys);

    return(
        <div className="form-product">
            <div className="div-upload-images">
                <Dragger accept="image/*" listType="picture" {...props}>
                    <p className="ant-upload-drag-icon">
                    <PictureFilled />
                    </p>
                    <p className="ant-upload-text">Cliquer ou faites glisser l'image du produit</p>
                    <p className="ant-upload-hint">
                        vous pouvez en choisir plusieures
                    </p>
                </Dragger>
            </div>
            <div className="input-product">
                <InputWithIcon value={name} placeholder="Nom du produit" onChange={(e) =>setName(e.target.value)} />
            </div>
            <div className="input-product">
                <Select onChange={(value) =>setCategory(value)} placeholder="Categorie du produit"
                 style={{ width: "100%", borderRadius: 5}}
                 loading={loadingCategorys}
                 >
                    {
                        rowsCategorys.map(data =>(
                            <Option value={data.id} key={data.id} > {data.name} </Option>
                        ))
                    }
                </Select>
            </div>
            <div className="input-product">
                <TextArea
                    value={description}
                    onChange={(e) =>setDescription(e.target.value)}
                    placeholder="Description du produit"
                    autoSize={{ minRows: 3, maxRows: 5 }}
                    style={{ borderRadius: 5 }}
                />
            </div>
            <div className="input-product">
                <div className="product-price">
                    <InputWithIcon value={price} type="number" placeholder="Prix du produit" onChange={(e) =>setPrice(e.target.value)} />
                </div>
                <div className="product-currency">
                    <Select onChange={(value) =>setCurrency(value)} placeholder="Devise de la monnaie" name="currency" style={{ width: "100%", borderRadius: 5}}>
                        <Option value="USD" key="USD" > USD </Option>
                        <Option value="CDF" key="CDF" > CDF </Option>
                    </Select>
                </div>
            </div>
            <div className="input-product">
                <div className="product-price">
                    <InputWithIcon type="number" placeholder="Quantité en stock" onChange={(e) =>setQuantity(e.target.value)}  />
                </div>
                <div className="switch-new">
                <Switch
                    checkedChildren="Nouvauté"
                    checked={isNew}
                    unCheckedChildren="Nouvauté"
                    onChange={() =>setIsNew(!isNew)}
                />
                </div>
            </div>
            <div className="div-colors">
                <div className="label-color">couleurs</div>
                <div className="div-choose-colors">
                    {
                        colors.map(color =>(
                            <div onClick={() =>onColorToggle(color)} className={`color ${ color.active && color.name }`}> {color.name} </div>
                        ))
                    }
                </div>
            </div>
            <div className="div-btn">
                <DefaultBtn disabled={loadingAdd} onClick={onSubmit} block={true} Icon={ <CloudUploadOutlined /> } label="Enregistrer" />
            </div>
        </div>
    )
}