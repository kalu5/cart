import '../css/index.scss';
import Header from '../components/header/index';
import ListItem from '../components/cart/list_item/index';
import { CartModel } from '../models/cart';
import PurchaseBox from '../components/cart/purchase_box/index';
import NoListBox from '../components/cart/nolist_box/index';
import Toast from '../components/toast/index';

const header = new Header (),
      listItem = new ListItem (),
      cartModel = new CartModel (),
      purchaseBox = new PurchaseBox (),
      nolistBox = new NoListBox (),
      toast = new Toast ();

const doms = {
    oSubCheck : null,
    oMainCheck : null,
    oEditBtn: null,
    oPuchaseBox: null,
    oPuchaseBtn: null,
    oTotal : null
}

const App = (doc) => {
    const oContainer = doc.getElementsByClassName ('J_container')[0],
          oList = oContainer.getElementsByClassName ('J_list')[0];

    let cartInfos = {
        list: [],
        total: 0
    }
        

    const init = () => {
        oContainer.appendChild (header.tpl ('商品管理', 'show'));

        cartModel.getCartList (1).then (res => {
            cartInfos.total = res.total_price;
            cartInfos.list = res.res;

            if (res.res) {
                oList.innerHTML = listItem.makeList (cartInfos.list);
                oContainer.appendChild (purchaseBox.tpl (cartInfos.total));
            } else {
                oList.innerHTML = nolistBox.tpl ();
            }
            
        }).then (() => {
            bindEvent ();
        });

        const bindEvent = () => {
            doms.oSubCheck = doc.getElementsByClassName ('J_subCheck');
            doms.oMainCheck = doc.getElementsByClassName ('J_mainCheck')[0];
            doms.oTotal = doc.getElementsByClassName ('J_total_price')[0];
            doms.oEditBtn = doc.getElementsByClassName ('J_editItem')[0];
            doms.oPuchaseBox = doc.getElementsByClassName ('purchase-box')[0];
            doms.oPuchaseBtn = doc.getElementsByClassName ('J_purchaseBtn')[0];
            oList.addEventListener ('click', listClick, false); 
            doms.oMainCheck && doms.oMainCheck.addEventListener ('click', mainClick, false);
            doms.oEditBtn.addEventListener ('click', header.editClick.bind (header), false);
            doms.oPuchaseBtn && doms.oPuchaseBtn.addEventListener ('click', purchaseCart, false);
        };

        const listClick = (e) => {
            // res {field num index}
            listItem.listClick (e).then (res => {
                
                if (res !== -1) {
                    let item = cartInfos.list[res.index];
                    switch (res.field) {
                        case 'numSelector':
                            numOptions (item, res);
                            break;
                        case 'checkBox':
                            itemCheck (item, res);
                            break;
                        case 'trash':
                            removeItems (res.id);
                            break;
                        default: 
                            break;
                    }
                }
            })
        };

        const purchaseCart = () => {
            let gids = [];
            cartInfos.list.forEach ((elem) => {
                if (elem.checked) {
                    gids.push (elem.id);
                }
            });
            cartModel.purchaseCart (1, gids.toString ()).then (res => {
                let code = res.msg_code;
                if (code === '200') {
                    toast.showToast ({
                        icon: 'check',
                        text: '购买成功',
                        duration: 1500
                    });

                    gids.forEach (val => {
                        cartInfos.list.forEach ((elem, index) => {
                            if (elem.id === val) {
                                cartInfos.list.splice (index, 1);
                            }
                        });
                    });

                    if (cartInfos.list.length > 0) {
                        oList.innerHTML = listItem.makeList (cartInfos.list);
                        doms.oMainCheck.checked = true;
                        reComputeTotal ();
                    } else {
                        doms.oPuchaseBox.remove ();
                        oList.innerHTML = nolistBox.tpl ();
                    }
                } else {
                    toast.showToast ({
                        icon: 'warning',
                        text: '购买失败',
                        duration: 1500
                    })
                }
            })
        }

        const removeItems = (id) => {
            const list = cartInfos.list,
                  listLen = list.length;

            for (var i = 0; i < listLen; i++) {
                let item = list[i];

                if (item.id === id) {
                    console.log (item);
                    let index = list.findIndex ((value,index, arr) => {
                        return value >= 0;
                    });
                    cartInfos.list.splice (index, 1);
                }
            }

            if (cartInfos.list.length > 0) {
                reComputeTotal ();
            } else {
                doms.oPuchaseBox.remove ();
                oList.innerHTML = nolistBox.tpl ();
            }
        }

        const mainClick = () => {
            Array.from (doms.oSubCheck).forEach ((elem,index) => {
                elem.checked = doms.oMainCheck.checked;
                cartInfos.list[index].checked = doms.oMainCheck.checked;
            });
            reComputeTotal ();
        };

        const itemCheck = (item, data) => {
            item.checked = data.checked;
            reComputeTotal ();
        }

        const numOptions = (item, data) => {
            item.num = data.num;
            item.total_price = data.num * item.price;
            doms.oSubCheck[data.index].checked = true;
            cartInfos.list[data.index].checked = true;
            reComputeTotal ();
            
        }

        const reComputeTotal = () => {
            cartInfos.total = 0;
            cartInfos.list.forEach (elem => {
                if (elem.checked) {
                   cartInfos.total += Number (elem.total_price);
                }
                doms.oTotal.innerHTML = cartInfos.total;
            })
        }
    }

    init ();
}

new App (document);