const blockImage = document.querySelector('.block')
const blockDescription = document.querySelector('.data_damage')

// преобразует время
function timestampToDate(ts) {
    let d = new Date();
    const timeData = new Date()
    d.setTime(ts);
    return [('0' + d.getDate()).slice(-2) + '.' + ('0' + (d.getMonth() + 1)).slice(-2) + '.' + d.getFullYear(),
        `${timeData.getHours()}:${timeData.getMinutes()}`]
}

const dataAboutAuto = {
    numberDamage: 0,
    currentCursorPosition: [],
    dateAddDamage: [],
    description: [], // Описание повреждения
    setNumberDamage() {
        this.numberDamage += 1
    },
    setDateDamage() {
        this.dateAddDamage.push(timestampToDate(Date.now()))
    },
    setDescription(title) {
        this.description.push([title])

    }
}

// Получает данный из Local Storage и передает в массив
const getDataInLocalStorage = (data) => {
    const getDataFromLocalStorage = JSON.parse(localStorage.getItem('test'))

    try {
        data.numberDamage = getDataFromLocalStorage[0]
        data.currentCursorPosition = [...getDataFromLocalStorage[1]]
        data.dateAddDamage = [...getDataFromLocalStorage[2]]
        data.description = [...getDataFromLocalStorage[3]]
    } catch (e) {
        console.log(e)
    }
}
getDataInLocalStorage(dataAboutAuto)

// Обновляет данные в Local Storage
const addDataInLocalStorage = (data) => {
    const getDataFromLocalStorage = JSON.parse(localStorage.getItem('test'))

    // Данные из LS
    const numberDamage = data.numberDamage
    const currentCursorPosition = data.currentCursorPosition
    const dateAddDamage = data.dateAddDamage
    const description = data.description

    // Если в LS нет данных - LS заполняется пустыми данными
    if (getDataFromLocalStorage == null) {
        return localStorage.setItem('test', JSON.stringify([numberDamage,
            currentCursorPosition,
            dateAddDamage,
            description]))
    } else {
        //Если данные есть, то они удаляются и заново записываются с учетом обновлений
        localStorage.clear()
        return localStorage.setItem('test', JSON.stringify([numberDamage,
            currentCursorPosition,
            dateAddDamage,
            description]))
    }
}

// Получает данные меток
const getPositionCursor = () => {
    blockImage.addEventListener('click', e => {
        const position = [e.offsetX - 12, e.offsetY -12]
        dataAboutAuto.currentCursorPosition.push(position)
        dataAboutAuto.setNumberDamage()
        dataAboutAuto.setDateDamage()
        addDataInLocalStorage(dataAboutAuto)
        console.log(dataAboutAuto)

        addDescriptionDamage(dataAboutAuto)

        createNewCircle(position)
    })
}

getPositionCursor()

// Рисует метки, которые уже есть в LS
const createCircle = (data) => {
    try {
        for (let i = 0; i < data.numberDamage; i++) {
            const x = data.currentCursorPosition[i][0]
            const y = data.currentCursorPosition[i][1]
            blockImage.insertAdjacentHTML('afterbegin',
                `<div class="circle" 
                           oncontextmenu="console.log('Mouse right')" 
                           onclick="" style="top:${y}px; left: ${x}px;">
                                ${i+1}
                       </div>`
            )
        }
    } catch (e) {
        console.log(e)
    }
}
createCircle(dataAboutAuto)

// Создает новые метки при нажатии на картинку
const createNewCircle = (position) => {
    const [x, y] = position
    blockImage.insertAdjacentHTML('afterbegin',
        `<div class="circle" 
                   oncontextmenu="console.log('Mouse right')" 
                   onclick="" 
                   style="top:${y}px; left: ${x}px;">
                        ${dataAboutAuto.numberDamage}
               </div>`
    )
}

const addDescriptionDamage = (data) => {
    blockDescription.insertAdjacentHTML('afterbegin',
        `<div class="data__description">
                  <input type="checkbox"/>  
                  <p>${data.numberDamage}</p>
                  <p class="description-damage" 
                     contenteditable="false"
                     ondblclick={correctionOfTheDescription(event)}
                     onkeydown={pressEnter(event)}
                     onchange={x(event)}>Описание повреждения
                  </p>
                  <p>${data.dateAddDamage[0][0]}</p>
               </div>`)
}

const writeDescriptionInLS = (value) => {
    return dataAboutAuto.setDescription(value)
}

//////////////
// Устанавливает значение true атрибуту contenteditable
const correctionOfTheDescription = (e) => {
    return e.composedPath()[0].contentEditable = true
}

// При нажатии на Enter устанавливает значение false атрибуту contenteditable
const pressEnter = (e) => {
    if(e.key === 'Enter'){
        e.preventDefault()
        e.composedPath()[0].contentEditable = false
        const text = e.target.innerText
        dataAboutAuto.setDescription(text)
    }
}

// Удаляет все из Local Storage
document.querySelector('.clear')
    .addEventListener('click', () => localStorage.clear())