import './index.scss';
import tpl from './index.tpl';

export default () => {
    return {
        name: 'checkBox',
        tpl (id, mark, index) {
            return tpl ().replace (/{{(.*?)}}/g, (node, key) => {
                return {
                    id,
                    mark,
                    index
                }[key];
            });
        }
    }
}