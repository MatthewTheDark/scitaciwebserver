let number1;
let number2;
let operator;
let result;
let operatornum;
function rannum(min,max) {
    let range = max-min;
    let nc;
    nc = Math.random()*range+min;
    return Math.round(nc);
}


exports.apigenprob = function (req, res){
        res.writeHead(200, {
            "Content-type": "application/json",
            "Access-Control-Allow-Origin":"*"});


        number1 = rannum(1,20);
        number2 = rannum(1,20);
        operatornum = rannum(1,4);
        if (operatornum === 1){
            operator = "&#43;";
            result = number1 + number2;
        } else if (operatornum === 2){
            operator = "-";
            result = number1 - number2;
        } else if (operatornum === 3){
            operator = "*";
            result = number1 * number2;
        } else {
            operator = "/";
            number1 = number2 * number1;
            result = number1 / number2;
        }



        let obj = {};
        obj.number1 = number1;
        obj.number2 = number2;
        obj.operator = operator;
        obj.result = result;
        res.end(JSON.stringify(obj));

};