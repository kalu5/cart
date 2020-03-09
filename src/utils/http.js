import { config } from './config';

const doAjax = Symbol ();

class HTTP {

    [doAjax] (options) {
        //处理两个异步时，new这个对象生成不同的对象
        let o = window.XMLHttpRequest ? new XMLHttpRequest ()
                                        : new ActiveXObject ('Microsoft.XMLHTTP');
        let t = null;

        if (!o) {
            throw new Error ('您的浏览器不支持异步请求');
        }

        let opt = options || {},
            type = (opt.type || 'GET').toUpperCase (),
            url = config.api_base_url + opt.url,
            async = '' + opt.async === 'false' ? false : true,
            dataType = opt.dataType || 'JSON',
            data = opt.data,
            jsonp = opt.jsonp || 'cb',
            jsonpCallback = opt.jsonpCallback || 'jQuery' + randomNum () + '_' + new Date ().getTime (), 
            success = opt.success || function () {},
            error = opt.error || function () {},
            compelete = opt.compelete || function () {},
            timeout = opt.timeout || 30000;

        if (!url) {
            throw new Error ('您没有输入url');
        }

        if (dataType.toUpperCase () === 'JSONP' && type  !== 'GET') {
            throw new Error ('JSONP 只支持GET请求！');
        }

        if (dataType.toUpperCase () === 'JSONP') {
            let oScript = document.createElement ('script');
            oScript.src = url.indexOf ('?') === -1 ? url + '?' + jsonp + '=' + jsonpCallback
                                                   : url + '&' + jsonp + '=' + jsonpCallback;
            document.body.appendChild (oScript);
            document.body.removeChild (oScript);

            window[jsonpCallback] = function (data) {
                success (data);
            }
            return;
        }

        o.onreadystatechange = function () {
            if (o.readyState === 4) {
                if ((o.status >= 200 && o.status < 300) || o.status === 304) {
                    success (JSON.parse (o.responseText));
                    switch (dataType.toUpperCase ()) {
                        case  'JSON':
                            success (JSON.parse (o.responseText));
                            break;
                        case 'TEXT':
                            success (o.responseText);
                            break;
                        case 'XML':
                            success (o.responseXML);
                            break;
                        default:
                            success  (JSON.parse (o.responseText));
                    }
                } else {
                    error ('请求失败');
                }
                compelete ();
                clearTimeout (t);
                t = null;
                o = null;
            }    
        }

        o.open (type, url, async);
        type === 'POST' && o.setRequestHeader ('Content-type', 'application/x-www-form-urlencoded');
        o.send (type === 'GET' ? null : format (data));
        t = setTimeout (function () {
            o.abort ();
            clearTimeout (t);
            t = null;
            o = null;
            throw new Error ('This request has been timeout for' + url);
        }, timeout);
    }
    ajax (opt) {
        this[doAjax] (opt);
    }

    post (url, data, callback) {
        this[doAjax] ({
            type: 'POST',
            url: url,
            data: data,
            success: callback
        });
    }

    get (url, callback) {
        this[doAjax] ({
            type: 'GET', 
            success: callback
        });
    }
}

function format (obj) {
    let str = '';
    for (var key in obj) {
        str += key + '=' + obj[key] + '&';
    }
    return str.replace (/&$/g, '');
}

function randomNum () {
    let num = '';
    for (let i = 0; i < 9; i++) {
        num += Math.floor (Math.random () * 10);
    }
    return num;
}

export { HTTP };