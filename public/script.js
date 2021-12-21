const fromCode = document.getElementById('fromCode')
const toCode = document.getElementById('toCode')
const toValue = document.getElementById('toValue')
const loading = document.getElementById('loading')

const createNode = (element) => {
    return document.createElement(element)
}

const append = (parent, element) => {
    return parent.appendChild(element)
}

const updateToCode = async (code) => {
    while (toCode.firstChild) {
        toCode.removeChild(toCode.firstChild)
    }

    await fetch(`/filter?from=${code}`)
        .then(response => response.json())
        .then((data) => {
            return data.map(item => {
                let option = createNode('option')
                option.value = item.code
                option.innerHTML = `${item.name}`
                append(toCode, option)
            })
        })

    await updateToValue(code)

}

const updateToValue = async (code) => {
    loading.classList.remove('hidden')
    await fetch(`/getQuotation?to=${toCode.value}&from=${code}`)
        .then(response => response.json())
        .then((data) => {
            if (data.ask) {
                toValue.value = data.ask
                loading.classList.add('hidden')
            } else {
                console.log(data.message)
            }
        })
}

document.addEventListener('DOMContentLoaded', () => {

    updateToCode(fromCode.value)

    fromCode.addEventListener('change', (e) => {
        updateToCode(e.target.value)
    })

    toCode.addEventListener('change', (e) => {
        updateToValue(fromCode.value)
    })


})