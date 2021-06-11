import { CommonLoading } from 'react-loadingg';
import "./style.scss";

export function LoadingComponent(){

    return(
        <div className="div-loading-page">
             <CommonLoading />
        </div>
    );
};

export function Spin(){

    return(
        <div className="bg-spin">
            <div className="spin"></div>
        </div>
    );
}