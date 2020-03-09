import './index.scss';
import tpl from './index.tpl';
import {DetailModel} from '../../../models/detail';
import Toast from '../../toast/index';

const detailModel = new DetailModel (),
      toast = new Toast ();

export default () => {
    return {
        name: 'btnBox',
        tpl,
        bindEvent () {
            const oBtnBox = document.getElementsByClassName ('btn-box')[0];
            oBtnBox.addEventListener ('click', this.addCart, false);  
        },

        addCart (e) {
            let ev = e || window.event,
                tar = ev.target || ev.srcElement,
                gid = tar.dataset.id;

            detailModel.upDateShoppingCart (gid).then (res => {
                switch (res) {
                    case '1001':
                        window.location.href = 'index.html';
                        break;
                    case '1002':
                        toast.showToast ({
                            icon: 'warning',
                            text: '添加失败',
                            duration: 1500
                        });
                        break;
                    case '1003':
                        toast.showToast ({
                            icon: 'warning',
                            text: '已达上限',
                            duration: 1500
                        });
                        break;
                    case '200':
                        toast.showToast ({
                            icon: 'check',
                            text: '添加成功',
                            duration: 1500
                        });
                        break;
                    default :
                        break;
                }
            });
        }
    }
}