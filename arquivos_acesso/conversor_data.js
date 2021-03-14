// conversão da data para o padrão brasileiro


let data = new Date();
let dia     = data.getDate();           // 1-31
let mes     = data.getMonth();          // 0-11 (zero=janeiro)
let ano4    = data.getFullYear();       // 4 dígitos
let str_data = dia + '/' + (mes+1) + '/' + ano4;

module.exports = str_data