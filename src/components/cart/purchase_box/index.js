import './index.scss';
import tpl from './index.tpl';
import CheckBox from '../check_box/index';

const checkBox = new CheckBox ();

export default () => {
    return {
        name: 'purchase',
        tpl (price) {
            let list = '';
            list += tpl ().replace (/{{(.*?)}}/g, (node, key) => {
                return {
                    price: price,
                    check_box: checkBox.tpl (0, 'mainCheck')
                }[key];
            });
            const purchaseBox = document.createElement ('div');
            purchaseBox.className = 'purchase-box';
            purchaseBox.innerHTML = list;
            return purchaseBox;
        }
    }
}