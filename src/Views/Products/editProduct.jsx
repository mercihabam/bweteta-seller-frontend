import { CloudUploadOutlined, DeleteOutlined } from "@ant-design/icons";
import { Button, Select, Switch } from "antd";
import TextArea from "antd/lib/input/TextArea";
import { useEffect } from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { DefaultBtn } from "../../Components/buttons";
import { InputWithIcon } from "../../Components/input";
import { getCategorys } from "../../Redux/actions/categoryActions";
import { updateProduct } from "../../Redux/actions/productActions";
const { Option } = Select;

export function EditProductForm(props){
    const { product, className } = props;
    const [ name, setName ] = useState(product.name);
    const [ category, setCategory ] = useState(product.categoryId);
    const [ description, setDescription ] = useState(product.description);
    const [ price, setPrice ] = useState(product.price);
    const [ currency, setCurrency ] = useState(product.currency);
    const [ quantity, setQuantity ] = useState(product.quantity);
    const [ isNew, setIsNew ] = useState(product.isNew);
    const dispatch = useDispatch();
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

    useEffect(() =>{
        getCategorys(dispatch);
    }, [dispatch]);

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

    const { rowsCategorys, loadingCategorys } = useSelector(({ categorys: { categorys } }) =>categorys);
    const { loadingUpdate } = useSelector(({ products: { updateProduct } }) =>updateProduct);

    const onUpdate = () =>{
        updateProduct({
            name: name,
            categoryId: category,
            description: description,
            price: price,
            isNew: isNew,
            currency: currency,
            quantity: quantity,
        }, product.id)(dispatch);
    }

    return(
        <div className={className}>
            <div className="edit-product">
                <div className="edit-label">Nom du produit</div>
                <InputWithIcon value={name} placeholder="Nom du produit" onChange={(e) =>setName(e.target.value)} />
            </div>
            <div className="edit-product">
                <div className="edit-label">Categorie du produit</div>
                <Select onChange={(value) =>setCategory(value)} placeholder="Categorie du produit"
                 style={{ width: "100%", borderRadius: 5}}
                 loading={loadingCategorys}
                 defaultValue={category}
                 >
                    {
                        rowsCategorys.map(data =>(
                            <Option value={data.id} key={data.id} > {data.name} </Option>
                        ))
                    }
                </Select>
            </div>
            <div className="edit-product">
                <div className="edit-label">Description du produit</div>
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
                <div className="edit-label">Prix du produit</div>
                    <InputWithIcon value={price} type="number" placeholder="Prix du produit" onChange={(e) =>setPrice(e.target.value)} />
                </div>
                <div className="product-currency">
                    <div className="edit-label">Devise</div>
                    <Select defaultValue={currency} onChange={(value) =>setCurrency(value)} placeholder="Devise de la monnaie" name="currency" style={{ width: "100%", borderRadius: 5}}>
                        <Option value="USD" key="USD" > USD </Option>
                        <Option value="CDF" key="CDF" > CDF </Option>
                    </Select>
                </div>
            </div>
            <div className="input-product">
                <div className="product-price">
                    <div className="edit-label">Quantité en stock</div>
                    <InputWithIcon type="number" value={quantity} placeholder="Quantité en stock" onChange={(e) =>setQuantity(e.target.value)}  />
                </div>
                <div className="switch-new" style={{ marginTop: 20 }}>
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
            <div className="div-edit-btn">
                <DefaultBtn onClick={onUpdate} loading={loadingUpdate} Icon={ <CloudUploadOutlined /> } label="Mettre à jour" />
                <div className="delete-btn">
                    <Button color="red" icon={ <DeleteOutlined /> }
                    style={{
                        backgroundColor: "rgb(201, 0, 0)",
                        borderRadius: 10,
                        color: "white",
                        border: "none"
                    }}
                    >
                        Supprimer
                    </Button>
                </div>
            </div>
        </div>
    );
}