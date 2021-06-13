import { CloudUploadOutlined, PictureFilled } from "@ant-design/icons";
import { Button, Select, Switch } from "antd";
import TextArea from "antd/lib/input/TextArea";
// import ImgCrop from 'antd-img-crop';
import Dragger from "antd/lib/upload/Dragger";
import { useState } from "react";
import { DefaultBtn } from "../../Components/buttons";
import { InputWithIcon } from "../../Components/input";
const { Option } = Select;

export function ProductForm(){
    const [ files, setFiles ] = useState();
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
            setFiles(info.fileList);
          }
        },
        onDrop(e) {
          console.log('Dropped files', e.dataTransfer.files);
        },
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
    }

      const categorys = [
        "Habillement",
        "Appareils electroniques",
        "Cosmetiques",
        "Accessoires"
    ]

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
                <InputWithIcon placeholder="Nom du produit" />
            </div>
            <div className="input-product">
                <Select onChange placeholder="Categorie du produit" name="category" style={{ width: "100%", borderRadius: 5}}>
                    {
                        categorys.map(data =>(
                            <Option value={data} key={data} > {data} </Option>
                        ))
                    }
                </Select>
            </div>
            <div className="input-product">
                <TextArea
                    // value={description}
                    // onChange={(e) =>setDescription(e.target.value)}
                    placeholder="Description du produit"
                    autoSize={{ minRows: 3, maxRows: 5 }}
                    style={{ borderRadius: 5 }}
                />
            </div>
            <div className="input-product">
                <div className="product-price">
                    <InputWithIcon type="number" placeholder="Prix du produit" />
                </div>
                <div className="product-currency">
                    <Select onChange placeholder="Devise de la monnaie" name="currency" style={{ width: "100%", borderRadius: 5}}>
                        <Option value="USD" key="USD" > USD </Option>
                        <Option value="CDF" key="CDF" > CDF </Option>
                    </Select>
                </div>
            </div>
            <div className="input-product">
                <div className="product-price">
                    <InputWithIcon type="number" placeholder="Quantité en stock"  />
                </div>
                <div className="switch-new">
                <Switch
                    checkedChildren="Nouvauté"
                    unCheckedChildren="Nouvauté"
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
                <DefaultBtn block={true} Icon={ <CloudUploadOutlined /> } label="Enregistrer" />
            </div>
        </div>
    )
}