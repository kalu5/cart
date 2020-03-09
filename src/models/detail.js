import { HTTP } from '../utils/http';

class DetailModel extends HTTP {
    getGoodsDetail (gid) {
        return new Promise ((resolve, reject) => {
            this.ajax ({
                url: 'ShoppingCart/getGoodsDetail',
                dataType: 'JSON',
                type: 'POST',
                data: {
                    id: gid
                },
                success (data) {
                    let code = data.error_code;
                    code === '1001' && (window.location.href ='index.html');

                    resolve (data);
                }
            })
        })
    }

    upDateShoppingCart (gid) {
        return new Promise ((resolve, reject) => {
            this.ajax ({
                url: 'ShoppingCart/updateShoppingCart',
                type: 'POST',
                dataType: 'JSON',
                data: {
                    uid: 1,
                    goodsId: gid
                },
                success (data) {
                    resolve (data.error_code);
                }
            })
        })
    }
}

export { DetailModel };