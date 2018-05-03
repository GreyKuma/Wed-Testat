/**
 * core
 */
let opdic = {
    "+": function(x,y){return parseFloat(x) + parseFloat(y)},
    "-": function(x,y){return parseFloat(x) - parseFloat(y)},
    "*": function(x,y){return parseFloat(x) * parseFloat(y)},
    "/": function(x,y){return parseFloat(x) / parseFloat(y)}
};
let calculator = function(array){
    console.log(array);
    let x = array[0];
    let operator = array[1];
    let y = array[2];
    if (operator == "/" && y == "0"){
        return "Computer says no! Don't divide by 0!";
    }
    console.log(x,y,operator);
    let operation = opdic[operator];
    return operation(x,y);
};


/**
 * UI
 */
window.addEventListener('load', function() {
    let equalFlag = false;
    window.addEventListener("click", function(e){
        e = window.event;
        let target = e.target;
        let value = target.value;
        let input = document.getElementById("input");
        let output = document.getElementById("output");

        if(target.className == "operator"){ //todo operator as first thing error
            let inputlength = input.value.length;
            let outputlength = output.value.length;
            if(inputlength == 0 && outputlength == 0){ //everything empty, do nothing

            }else if(inputlength == 0 && outputlength > 0) {     //changing operator if already typed in
                output.value = output.value.substring(0, output.value.length - 1) + value;
            }else if (inputlength > 0 && outputlength == 0){    // move number plus operator to output if output is empty and you press operator
                output.value = input.value + " " + value;
            }else if(inputlength > 0 && outputlength > 0) {     //do operation if two operands are available and you press another operator
                let calcarray = output.value.split(" ").concat(input.value.split(" "));
                let result = calculator(calcarray);
                output.value = result + " " + target.value;
            }
            input.value = "";
        }

        else if(target.className == "number"){
            if(equalFlag){
                input.value = "";
                equalFlag = false;
            }
            input.value = input.value + value;
        }

        else if(target.className == "command"){
            if(target.id == "key-c"){
                input.value = "";
                output.value = "";
            }
            else{
                if(output.value.length > 0){
                    let calcarray = output.value.split(" ").concat(input.value.split(" "));
                    let result = calculator(calcarray);
                    input.value = result;
                    output.value = "";
                    console.log(calcarray, result)
                }
                equalFlag = true;
            }
        }

    });


});