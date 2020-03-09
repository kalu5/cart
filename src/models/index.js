import { HTTP } from '../utils/http';

class IndexModel extends HTTP {
    getGoodsList (tpl) {
        return new Promise ((resolve, reject) => {
            this.ajax ({
                url: 'Shopping_cart/getGoodsList',
                type: 'POST',
                dataType: 'JSON',
                success (data) {
                    let list = '';
                    data.forEach ((elem) => {
                        list += tpl().replace (/{{(.*?)}}/g, (node, key) => {
                            return {
                                id: elem.id,
                                img_url: elem.img_url,
                                goods_name: elem.goods_name,
                                price: elem.price
                            }[key];
                        });
                    });
                    resolve (list);
                }
            })
        })
    }
}

export {IndexModel};