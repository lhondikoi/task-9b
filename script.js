let app = document.querySelector('#calculator-app')

// main driver code
function evaluate(expression) {
    if (operands.some(elem => elem == expression[expression.length - 1]) && !expression.length == 0) {
        return
    }
    expArr = []
    let temp = ""
    for (let char of expression) {
        if (digits.some(digit => digit == char) || char == ".") {
            temp += char
        } else {
            expArr.push(Number(temp))
            expArr.push(char)
            temp = ""
        }
    }
    expArr.push(Number(temp))
    console.log(expArr)
    // do multiplication, division and modulo
    idxArr = []
    for (let [index, value] of expArr.entries()) {
        if (value == "*" || value == "/" || value == "%") {
            idxArr.push(index)
        }
    }
    for (let i=idxArr.length - 1; i >= 0; i--) {
        if (expArr[idxArr[i]] == "*") {
            expArr.splice(idxArr[i]-1, 3, expArr[idxArr[i] - 1] * expArr[idxArr[i] + 1])
        }
        if (expArr[idxArr[i]] == "/") {
            expArr.splice(idxArr[i]-1, 3, (expArr[idxArr[i] - 1] / expArr[idxArr[i] + 1]).toFixed(2))
        }
        if (expArr[idxArr[i]] == "%") {
            expArr.splice(idxArr[i]-1, 3, expArr[idxArr[i] - 1] % expArr[idxArr[i] + 1])
        }

    }
    // do addition, subtraction
    let sum = expArr[0]
    let operation = ""
    for (let [idx, val] of expArr.entries()) {
        if (idx == 0) {
            continue
        }
        if (val == "+" || val == "-") {
            operation = val
            continue
        } else {
            if (operation == "+") {
                sum += val
            } else {
                sum -= val
            }
        }
    }
    return sum
}


// create the calculator screen
let disp = document.createElement('span')
disp.classList.add('disp')
app.appendChild(disp)

// calculator body
let body = document.createElement('div')
body.classList.add('body')
app.appendChild(body)

// create the digit buttons
for (let i=0; i <= 9; i++) {
    let btn = document.createElement('span')
    btn.innerText = i
    btn.classList.add('btn')
    btn.classList.add('digit')
    btn.classList.add(`digit-${i}`)
    btn.addEventListener('click', e => {
        expression += `${i}`
        disp.innerText = expression
    })
    body.appendChild(btn)
}

// create decimal button
let decimal = document.createElement('span')
decimal.innerHTML = '.'
decimal.classList.add('btn')
decimal.classList.add('decimal')
decimal.addEventListener('click', () => {
    alert('Decimal button does not work!')
    // expression += "."
    // disp.innerText = expression
})
body.appendChild(decimal)

// create backspace button
let bksp = document.createElement('span')
bksp.innerHTML = '<i class="bi bi-backspace"></i>'
bksp.classList.add('btn')
bksp.classList.add('bksp')
bksp.addEventListener('click', () => {
    expression = expression.slice(0, expression.length - 1)
    disp.innerText = expression
})
body.appendChild(bksp)

// create equals button
let eql = document.createElement('span')
eql.innerText = "="
eql.classList.add('btn')
eql.classList.add('eql')
eql.addEventListener('click', () => {
    expression = String(evaluate(expression))
    disp.innerText = expression
})
body.appendChild(eql)

// create add button
let plus = document.createElement('span')
plus.innerHTML = '<i class="bi bi-plus-lg"></i>'
plus.classList.add('btn')
plus.classList.add('plus')
plus.addEventListener('click', () => {
    if (!operands.some(elem => elem == expression[expression.length - 1]) && !expression.length == 0) {
        expression += "+"
        disp.innerText = expression
    }
})
body.appendChild(plus)

// create minus button
let minus = document.createElement('span')
minus.innerHTML = '<i class="bi bi-dash-lg"></i>'
minus.classList.add('btn')
minus.classList.add('minus')
minus.addEventListener('click', () => {
    if (!operands.some(elem => elem == expression[expression.length - 1]) && !expression.length == 0) {
        expression += "-"
        disp.innerText = expression
    }
})
body.appendChild(minus)

// create multiply button
let multiply = document.createElement('span')
multiply.innerHTML = '<i class="bi bi-x-lg"></i>'
multiply.classList.add('btn')
multiply.classList.add('multiply')
multiply.addEventListener('click', () => {
    if (!operands.some(elem => elem == expression[expression.length - 1]) && !expression.length == 0) {
        expression += "*"
        disp.innerText = expression
    }
})
body.appendChild(multiply)

// create modulo button
let modulo = document.createElement('span')
modulo.innerHTML = '<i class="bi bi-percent"></i>'
modulo.classList.add('btn')
modulo.classList.add('modulo')
modulo.addEventListener('click', () => {
    if (!operands.some(elem => elem == expression[expression.length - 1]) && !expression.length == 0) {
        expression += "%"
        disp.innerText = expression
    }
})
body.appendChild(modulo)

// create divide button
let divide = document.createElement('span')
divide.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" height="16" width="14" viewBox="0 0 448 512"><path d="M272 96a48 48 0 1 0 -96 0 48 48 0 1 0 96 0zm0 320a48 48 0 1 0 -96 0 48 48 0 1 0 96 0zM400 288c17.7 0 32-14.3 32-32s-14.3-32-32-32H48c-17.7 0-32 14.3-32 32s14.3 32 32 32H400z"/></svg>'
divide.classList.add('btn')
divide.classList.add('divide')
divide.addEventListener('click', () => {
    if (!operands.some(elem => elem == expression[expression.length - 1]) && !expression.length == 0) {
        expression += "/"
        disp.innerText = expression
    }
})
body.appendChild(divide)

// create AC button
let ac = document.createElement('span')
ac.innerHTML = 'AC'
ac.classList.add('btn')
ac.classList.add('ac')
ac.addEventListener('click', () => {
    expression = ""
    disp.innerText = expression
})
body.appendChild(ac)


let digits = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9']
let operands = ['+', '-', '*', '/', '%']
let expression = ""

document.addEventListener('keyup', (e) => {
    if (digits.some(elem => elem == e.key)) {
        expression += e.key
    } else if (operands.some(elem => elem == e.key)) {
        if (!operands.some(elem => elem == expression[expression.length - 1]) && !expression.length == 0) {
            expression += e.key
        }
    } else {
        alert('Only numbers and operands +, -, *, / and % are allowed.')
    }
    disp.innerText = expression
})