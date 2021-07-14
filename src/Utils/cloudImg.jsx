import { Image } from "cloudinary-react";


function CloudImg(props){
    const { className, publicId, onClick } = props;

    return(
        <Image onClick={onClick} cloudName="bwetetam" publicId={publicId} className={className} />
    )
};

export default CloudImg;