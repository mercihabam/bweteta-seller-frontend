import { message } from 'antd';
import cogoToast from 'cogo-toast';

export function sendNotif(type="success", content){
    cogoToast[type](content, {
        position: 'top-right',
        bar: { size: '6px' },
        hideAfter: 5,
    })
};

export function loadingMsg(content){
    return message.loading({ content: content, duration: 0, key: "load" })
}