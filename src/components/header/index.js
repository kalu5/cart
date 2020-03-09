import './index.scss';
import tpl from './index.tpl';

export default () => {
    return {
        name: 'header',
        flag: false,
        tpl (title, show) {
            let header = document.createElement ('div');
            header.className = 'cart-header';
            header.innerHTML = tpl ().replace (/{{(.*?)}}/g, (node, key) => {
                return {
                    title,
                    is_show: show
                }[key]
            });
            return header;
        },

        editClick () {
            let editBtn = document.getElementsByClassName ('J_editItem')[0],
                removeCell = document.getElementsByClassName ('remove-cell');
            this.flag = !this.flag;
            Array.from (removeCell).forEach (elem => {
                if (this.flag) {
                    editBtn.innerHTML = '关闭';
                    elem.className += ' show';
                   //this.flag = false;
                } else {
                    editBtn.innerHTML = '编辑';
                    elem.className = 'cell remove-cell';
                    //this.flag = true;
                }
            });
        }

    }
}