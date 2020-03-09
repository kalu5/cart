import './index.scss';
import tpl from './index.tpl';
import NumberSelector from '../selector/index';
import CheckBox from '../check_box/index';
import {CartModel} from '../../../models/cart';
import Toast from '../../../components/toast/index';


const numberSelector = new NumberSelector (),
      checkBox = new CheckBox (),
      cartModel = new CartModel (),
      toast = new Toast ();

export default () => {
    return {
        name: 'listItem',
        makeList (data) {
            let list = '';
            data.forEach ((elem, index) => {
                elem.checked = true;
                list += tpl ().replace (/{{(.*?)}}/g, (node, key) => {
                    return {
                        img_url: elem.img_url,
                        goods_name: elem.goods_name,
                        price: elem.price, 
                        check_box: checkBox.tpl (elem.id, 'subCheck', index) ,
                        num_selector: numberSelector.tpl (elem.num, elem.id, index, elem.limitation),
                        id: elem.id,
                        index: index
                    }[key];
                });
            });
            return list;
        },

        listClick (e) {
            let ev = e || window.event,
                tar = ev.target || ev.srcElement,
                className = tar.className;

            return new Promise ((resolve, reject) => {
                if (className === 'item btn') {
                    let oParent = tar.parentNode,
                        id = oParent.dataset.id,
                        index = oParent.dataset.index,
                        limitation = tar.dataset.limitation,
                        field = tar.dataset.field,
                        oInput = document.getElementById ('J_numInput_' + id);
    
                    let val = parseInt (oInput.value);
    
                    switch (field) {
                        case 'add':
                            if (val < limitation) {
                                oInput.value = parseInt (oInput.value) + 1;
                                cartModel.updateCartNum (id, oInput.value);
                                resolve ({
                                    field: 'numSelector',
                                    num: oInput.value,
                                    index: index
                                });
                            } else {
                                resolve (-1);
                            }
                            break;
                        case 'minus':
                            if (val > 1) {
                                oInput.value = parseInt (oInput.value) - 1;
                                cartModel.updateCartNum (id, oInput.value);
                                resolve ({
                                    field: 'numSelector',
                                    num: oInput.value,
                                    index: index
                                });
                            } else {
                                resolve (-1);
                            }
                            break;
                        default: 
                            break;
                    }
                } else if (className === 'check-input J_subCheck' || className === 'fa fa-check check-true') {
                    const oSubCheck = Array.from (document.getElementsByClassName ('J_subCheck')),
                          oMainCheck = document.getElementsByClassName ('J_mainCheck')[0],
                          oParent = tar.parentNode,
                          index = oParent.dataset.index,
                          checked = oSubCheck[index].checked;

                    oMainCheck.checked = oSubCheck.every ((elem) => {
                        return elem.checked === true;
                    });
                    resolve ({
                        field: 'checkBox',
                        index,
                        checked
                    })
                } else if (className === 'fa fa-trash') {
                    const id = tar.dataset.id,
                          index = tar.dataset.index,
                          oParent = tar.parentNode.parentNode;

                    cartModel.removeCart (id).then (res => {
                        const code = res.msg_code;

                        if (code === '200') {
                            toast.showToast ({
                                icon: 'check',
                                text: '删除成功',
                                duration: 1500
                            });
                            oParent.remove ();
                            resolve ({
                                field: 'trash', 
                                id, 
                                index
                            });
                        } else {
                            toast.showToast ({
                                icon: 'warning',
                                text: '删除失败',
                                duration: 1500
                            });
                        }
                    })
                }
            })
        }

    }
}