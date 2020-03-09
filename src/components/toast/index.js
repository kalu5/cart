import './index.scss';
import tpl from './index.tpl';

export default () => {
    return {
        name: 'toast',
        showToast (opt) {
            const oContainerBox = document.getElementsByClassName ('toast-box')[0];

            if (oContainerBox) {
                return ;
            }

            let oContainer = document.createElement ('div');
            oContainer.className = 'toast-box';
            oContainer.innerHTML = tpl ().replace (/{{(.*?)}}/g, (node, key) => {
                return {
                    icon: opt.icon === 'warning' ? 'warning' : 'check',
                    text: opt.text
                }[key];
            });

            document.body.appendChild (oContainer);

            setTimeout (() => {
                const oContainerBox = document.getElementsByClassName ('toast-box')[0];
                oContainerBox.remove ();
            }, opt.duration || 2000);
        }
    }
}