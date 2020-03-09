import './index.scss';
import tpl from './index.tpl'

export default () => {
    return {
        name: 'numSelector',
        tpl (num, id, index, limitation) {
            return tpl ().replace (/{{(.*?)}}/g, (node, key) => {
                return {
                    num, 
                    id,
                    index,
                    limitation
                }[key];
            });
        }
    }
}