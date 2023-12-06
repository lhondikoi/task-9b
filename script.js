let app = document.querySelector('#calculator-app')

// main driver code
function evaluate(expression) {
    if (operands.some(elem => elem == expression[expression.length - 1]) && !expression.length == 0) {
        return
    }
    alert('Calculate function not yet implemented.')
    // do multiplication and division
    // let partial_expression = ""
    // let num = ""
    // for (let char of expression) {
    //     if (digits.some(digit => digit == char)) {
    //         partial_expression += char
    //     } else {
    //         if (char == "*" || char == "/") {
                
    //         }
    //     }
    // }
}


// create the calculator screen
let disp = document.createElement('span')
disp.classList.add('disp')
app.appendChild(disp)

// calculator body
let body = document.createElement('div')
body.classList.add('body')
app.appendChild(body)

// create the calculator buttons
for (let i=9; i >= 0; i--) {
    let btn = document.createElement('span')
    btn.innerText = i
    btn.classList.add('btn')
    btn.addEventListener('click', e => console.log(e.target.innerText))
    body.appendChild(btn)
}

// create backspace button
let bksp = document.createElement('span')
bksp.innerHTML = '<i class="bi bi-backspace"></i>'
bksp.classList.add('btn')
bksp.addEventListener('click', () => {
    expression = expression.slice(0, expression.length - 1)
    disp.innerText = expression
})
body.appendChild(bksp)

// create equals button
let eql = document.createElement('span')
eql.innerText = "="
eql.classList.add('btn')
eql.addEventListener('click', () => {
    evaluate(expression)
})
body.appendChild(eql)


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