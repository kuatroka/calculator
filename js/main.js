const calculator  = document.querySelector('.calculator')
const keys = calculator.querySelector('.calculator__keys')
const display = calculator.querySelector('.calculator__display')


keys.addEventListener('click', event => {
    if (!event.target.closest('button')) return
    const key = event.target
    const keyValue = key.textContent
    const displayValue = display.textContent
    const { type } = key.dataset
    const { previousKeyType } = calculator.dataset

    // is it a number key or an operator?
    if (type === 'number') {
        if (displayValue === '0' || // OR operator
            previousKeyType === 'operator') {
            display.textContent = keyValue
        } else {
            display.textContent = displayValue + keyValue
        }
    }
//
//

    if (type === 'operator') {
        const operatorKeys = keys.querySelectorAll('[data-type="operator"]')
        operatorKeys.forEach(el => {el.dataset.state = ''})
        key.dataset.state = 'selected'
        ///////////////////////////////
        // another option to do the above
        // const currentActiveOperator = calculator.querySelector('[data-state="selected"]')
        // if (currentActiveOperator) {
        //     currentActiveOperator.dataset.state = ''
        // }
        // key.dataset.state = 'selected'
        ///////////////////////////////
        calculator.dataset.firstNumber = displayValue
        calculator.dataset.operator = key.dataset.key
        

    }

    if (type === 'equal') {
        // perform calculation
        // const firstNumber = parseInt(calculator.dataset.firstNumber)
        // const operator = calculator.dataset.operator
        // const secondNumber = parseInt(displayValue)
        // console.log(firstNumber, operator, secondNumber)

        // let result = ''
        // if (operator === 'plus') result = firstNumber + secondNumber
        // if (operator === 'minus') result = firstNumber - secondNumber
        // if (operator === 'times') result = firstNumber * secondNumber
        // if (operator === 'divide') result = firstNumber / secondNumber
        // display.textContent = result
        // console.log(result)
        ///////////////
        // the same as above but using an explicit function
        const firstNumber = calculator.dataset.firstNumber
        const operator = calculator.dataset.operator
        const secondNumber = displayValue
        display.textContent = calculate(firstNumber, operator, secondNumber)
        
        }

    calculator.dataset.previousKeyType = type
})

function calculate(firstNumber, operator, secondNumber) {
    firstNumber = parseInt(firstNumber)
    secondNumber = parseInt(secondNumber)
    // version 1 - with if statement
    if (operator === 'plus') return firstNumber + secondNumber
    if (operator === 'minus') return firstNumber - secondNumber
    if (operator === 'times') return firstNumber * secondNumber
    if (operator === 'divide') return firstNumber / secondNumber
    
    // version 2 - with switch statement
    let result = ''
    switch (operator) {
        case 'plus': result = firstNumber + secondNumber; break
        case 'minus': result = firstNumber - secondNumber; break
        case 'times': result = firstNumber * secondNumber; break
        case 'divide': result = firstNumber / secondNumber; break
    }
    return result
    // return result.toFixed(2) // rounds to 2 decimals
}
