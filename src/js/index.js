import '../css/index.scss';
import Header from '../components/header/index';
import ListItem from '../components/index/list-item/index';
import {IndexModel} from '../models/index';

const header = new Header (),
      listItem = new ListItem (),
      indexModel = new IndexModel ();

const App = (doc) => {
    let oContainer = document.getElementsByClassName ('J_container')[0],
        oList = document.getElementsByClassName ('J_list')[0];
    const init = () => {
        indexModel.getGoodsList (listItem.tpl).then ((res) => {
            oList.innerHTML = res;
        })
        oContainer.appendChild (header.tpl ('商品列表'));
    }

    init ();
}

new App (document);