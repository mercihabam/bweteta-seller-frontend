import { Image } from "cloudinary-react";


function CloudImg(props){
    const { className, publicId } = props;

    return(
        <Image cloudName="mulo" publicId={publicId} className={className} />
    )
};

export default CloudImg;