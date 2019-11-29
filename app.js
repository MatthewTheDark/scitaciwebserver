const http = require("http");
const fs = require("fs");
const  url = require('url');
const  apiproblemlog = require('./api-problemlog').apiproblemlog; //import fce .=tato slozka
const  apigenprob = require('./api-generateproblem').apigenprob;

let msgs = [];


function processStaticFiles(res, fileName) {
    fileName = fileName.substr(1); //zkopir. od 2. znaku
    console.log(fileName);
    let contentType = "text/html";
    if (fileName.endsWith(".png")){
        contentType = "image/png";
    } else if (fileName.endsWith(".jpg") || fileName.endsWith(".jpeg")){
        contentType = "image/jpeg";
    }

    if (fs.existsSync(fileName)){
        fs.readFile(fileName, function(err, data) {
            res.writeHead(200, {'Content-Type': contentType});
            res.write(data);
            res.end();
        });

    } else {
        res.writeHead(404);
        res.end();

    }
}


http.createServer((req, res) => {

    let q = url.parse(req.url, true);

    if (q.pathname === "/") { //url - co po nas prohlizec chce
        processStaticFiles(res, "/index.html");
        return;
    }
    if (q.pathname.length - q.pathname.lastIndexOf(".") < 6) {
        processStaticFiles(res, q.pathname);
        return;
    }
    if (q.pathname === "/priklady") {
        res.writeHead(200, {"Content-type": "application/json"});
        let obj = {};
        obj.jmeno = "Link";
        obj.prijmeni = "Smith";
        obj.rokNarozeni = 1980;
        JSON.stringify(obj);
        res.end(JSON.stringify(obj));
    } else if (q.pathname.startsWith(("/log/genprob"))) {

        apigenprob(req, res, q);
    } else if (q.pathname.startsWith(("/log"))) {
        apiproblemlog(req, res, q, msgs);
    }

}).listen(8888);
//terminal
//C:\Users\moravecmatous\WebstormProjects\untitled>lt --port 8888 --subdomain libor
//your url is: https://big-bear-21.localtunnel.me


