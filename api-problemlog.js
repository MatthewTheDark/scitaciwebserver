exports.apiproblemlog = function (req, res, q, msgs){
    if (q.pathname === "/log/listproblems") {
        res.writeHead(200, {
            "Content-type": "application/json",
            "Access-Control-Allow-Origin":"*"});

        let obj = {};
        obj.messages = msgs;
        res.end(JSON.stringify(obj));

    }  else if (q.pathname === "/log/addproblem") {
        res.writeHead(200, {
            "Content-type": "application/json",
            "Access-Control-Allow-Origin":"*"});

        let obj = {};
        obj.number1 = q.query["number1"];
        obj.number2 = q.query["number2"];
        obj.operator = q.query["operator"];
        obj.result = q.query["result"];
        msgs.push(obj);
        res.end(JSON.stringify(obj));
    }
};
