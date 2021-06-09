import cogoToast from 'cogo-toast';

export function sendNotif(type="success", content){
    cogoToast[type](content, {
        position: 'top-right',
        bar: { size: '6px' },
        hideAfter: 5,
    })
};