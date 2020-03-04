function eval() {
    // Do not use eval!!!
    return;
}



function last_in_s(stack){
    return stack[stack.length - 1]
}

function expressionCalculator(expr) {
    n_s = [];
    o_s = [];
    oper = NaN;
    count_bracket = 0
    a = NaN
    b = NaN
    o = {
        '+': 1,
        '-': 1,
        '*': 2,
        '/': 2
    }
    numb = ''
    e = expr.split(' ').join('')
    if (/\/0/.test(e)) throw new Error('TypeError: Division by zero.')
    for (let i = 0; i < e.length; i++){
        if (e[i] == '(') count_bracket++;
        if (e[i] == ')') count_bracket --;
    }
    if (count_bracket) throw new Error('ExpressionError: Brackets must be paired');
        
    
    
    
    for(let i = 0; i < e.length; i++){
        if (/\d/.test(e[i])){
            numb += e[i]
            if (!/\d/.test(e[i + 1])){
                n_s.push(Number(numb))
                numb = ''
            }
            continue
            
        }
        if(!Number(e[i]) && e[i] != '(' && e[i] != ')'){
            while((o[last_in_s(o_s)] > o[e[i]]) || (o[last_in_s(o_s)] == o[e[i]])  && (last_in_s(o_s) != '(') && (o[e[i]])   ){
                b = n_s.pop();
                a = n_s.pop();
                oper = o_s.pop();
                switch(oper){
                    case '+':
                        n_s.push(a + b);
                        break;
                    case '-':
                        n_s.push(a - b);
                        break;
                    case '*':
                        n_s.push(a * b);
                        break;
                    case '/':
                        n_s.push(a / b);
                        break;
                    
                }

            }
            o_s.push(e[i])
        }

        if (e[i] == '('){
             o_s.push(e[i])
        }

        if(e[i] == ')'){
            while(last_in_s(o_s) != '('){
                b = n_s.pop();
                a = n_s.pop();
                oper = o_s.pop();
                switch(oper){
                    case '+':
                        n_s.push(a + b);
                        break;
                    case '-':
                        n_s.push(a - b);
                        break;
                    case '*':
                        n_s.push(a * b);
                        break;
                    case '/':
                        n_s.push(a / b);
                        break;
                    
                }
            }
            if (last_in_s(o_s) == '('){
                o_s.pop()
            }
        }

        

    }
    if (o_s.length){
        while(o_s.length){
            b = n_s.pop();
            a = n_s.pop();
            oper = o_s.pop();
            switch(oper){
                case '+':
                    n_s.push(a + b);
                    break;
                case '-':
                    n_s.push(a - b);
                    break;
                case '*':
                    n_s.push(a * b);
                    break;
                case '/':
                    n_s.push(a / b);
                    break;
                
            }

        }
    }

    return n_s[0]
}


module.exports = {
    expressionCalculator
}