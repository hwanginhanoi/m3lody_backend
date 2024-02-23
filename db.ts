const Pool = require('pg').Pool;
const pool = new Pool(({
    user: '',
    host: '',
    password:'',
}))