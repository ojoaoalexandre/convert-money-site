const filterToCoinCode = document.getElementById('toCoinCode')

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
}

document.addEventListener('DOMContentLoaded', () => {
    const filterMain = document.getElementById('fromCoinCode')

    // first load
    updateFilter(filterMain.value)

    // load dinamic
    filterMain.addEventListener('change', (e) => {
        updateFilter(e.target.value)
    })
})