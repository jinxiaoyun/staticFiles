const http = require('http');
const chalk = require('chalk');
const path = require('path');
const route = require('./helper/route');
const conf = require('./config/defaultConfig');
const openUrl = require('./helper/openUrl');

// const server = http.createServer((req, res)=>{
//     const filePath = path.join(process.cwd(), req.url);
//     route(req, res, filePath);
// });

// server.listen(9527, '127.0.0.1', ()=>{
//     console.info(`${chalk.green('运行在127.0.0.1：9527')}`);
// });

class Server {
    constructor(config){
        this.conf = Object.assign({},conf, config);
    }
    start(){
        const server = http.createServer((req, res)=>{
            const filePath = path.join(this.conf.root, req.url);
            route(req, res, filePath, this.conf);
        });
        server.listen(this.conf.port, this.conf.hostname, ()=>{
            const addr = `http://${this.conf.hostname}:${this.conf.port}`;
            console.info(`Server started at ${chalk.green(addr)}`);
            openUrl(addr);
        });
    }
}


module.exports = Server;
