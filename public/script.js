const filterToCoinCode = document.getElementById('toCoinCode')
const coinToValue = document.getElementById('quotation')

const createNode = (element) => {
    return document.createElement(element)
}

const append = (parent, element) => {
    return parent.appendChild(element)
}

const updateFilter = async (code) => {
    while (filterToCoinCode.firstChild) {
        filterToCoinCode.removeChild(filterToCoinCode.firstChild)
    }

    await fetch(`/filter?filtertoCoinCode=${code}`)
        .then(response => response.json())
        .then((data) => {
            return data.map(item => {
                let option = createNode('option')
                option.value = item.code
                option.innerHTML = `${item.name}`
                append(filterToCoinCode, option)
            })
        })

    await updateCoinValue(code)

}

const updateCoinValue = async (code) => {
    await fetch(`/getQuotation?to=${filterToCoinCode.value}&from=${code}`)
        .then(response => response.json())
        .then((data) => {
            if (data.ask) {
                coinToValue.value = data.ask
            } else {
                console.log(data.message)
            }
        })
}

document.addEventListener('DOMContentLoaded', () => {
    const filterMain = document.getElementById('fromCoinCode')

    // first load
    updateFilter(filterMain.value)

    // load dynamic
    filterMain.addEventListener('change', (e) => {
        updateFilter(e.target.value)
    })

    filterToCoinCode.addEventListener('change', (e) => {
        updateCoinValue(filterMain.value)
    })


})