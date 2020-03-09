function getUrlQueryValue (key) {
    const reg = new RegExp ( '(^|&)' + key + '=([^&]*)(&|$)', 'i' ),
          res = window.location.search.substr (1).match (reg);

    return res !== null ? decodeURIComponent (res[2]) : null; 
}

module.exports = {
    getUrlQueryValue
}

/*
const regs = new RegExp ( '(^|&)' + 'id' + '=([^&]*)(&|$)', 'i' )
undefined
var res = window.location.search.substr (1).match (regs);
undefined
console.log (res)
VM725:1 (4) ["id=12", "", "12", "", index: 0, input: "id=12", groups: undefined]
undefined
*/