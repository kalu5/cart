import '../css/detail.scss';
import ImgShow from '../components/detail/img_show/index';
import { DetailModel } from '../models/detail';
import tools from '../utils/tools';
import InfoBox from '../components/detail/info_box/index';
import TitleBox from '../components/detail/product-title/index';
import BtnBox from '../components/detail/cart_box/index';

const imgShow = new ImgShow (),
      detailModel = new DetailModel (),
      infoBox = new InfoBox (),
      titleBox = new TitleBox (),
      btnBox = new BtnBox ();

const App = (doc) => {
    const oContainer = doc.getElementsByClassName ('J_container')[0];

    const init = () => {
        detailModel.getGoodsDetail (tools.getUrlQueryValue('id')).then ((res) => {
            let html = '';
            html += imgShow.tpl ().replace (/{{(.*?)}}/g, (node, key) => {
                return {
                    img_url: res.img_url,
                    goods_name: res.goods_name
                }[key];
            });

            html += infoBox.tpl ().replace (/{{(.*?)}}/g, (node,key) => {
                return {
                    price: res.price,
                    m_sales: res.m_sales
                }[key];
            });

            html += titleBox.tpl ().replace (/{{(.*?)}}/g, (node, key) => {
                return {
                    goods_name: res.goods_name
                }[key];
            });

            html += btnBox.tpl ().replace (/{{(.*?)}}/g, res.id);

            oContainer.innerHTML = html;
        }).then (res => {
            btnBox.bindEvent ();
        })
    }

    init ();
}

new App (document);