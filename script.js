async function fetchData() {
    try {
        const response = await fetch("./data.json")
        if (response.ok) {
            return response.json()
        }
    } catch (e) {
        console.error(e)
    }
}

async function getData() {
    const jsonData = await fetchData()
    const data = jsonData.map(el => {
        return {
            category: el.category,
            score: el.score,
            icon: el.icon
        }
    })

    return data
}

async function displayResult() {
    const data = await getData()
    const resultListItems = document.querySelectorAll(".result-list-item")
    resultListItems.forEach((el, i) => {
        const { category, score, icon } = data[i]
        const resultIcon = el.querySelector(".result-icon")
        const resultItem = el.querySelector(".result-item")
        const resultScore = el.querySelector(".result-item-score")

        resultIcon.setAttribute("source", icon)
        resultItem.innerText = category
        resultScore.innerHTML = `<span class="score">${score}</span> / 100`
    })
}

displayResult()

async function displayScore() {
    const data = await getData()
    let total = 0
    for (const {score} of data) {
        total += score
    }

    const average = parseInt(total / data.length)
    const result = document.querySelector(".result")
    
    for (let i = 1; i <= average; i++) {
        setTimeout(() => {
            result.innerText = i
        }, 1000)
    }
    
}

displayScore()