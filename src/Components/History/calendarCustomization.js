function classifyHistory(historyArr) {
    const classification = [];
    for (let i=0; i < historyArr.length; i ++) {
        const [day, month, year] = historyArr[i].day.split('/');
        const date = new Date(+year, month - 1, +day);
        let isDone = true;
        for (let j = 0; j < historyArr[i].habits.length; j ++) {
            if (historyArr[i].habits[j].done === false) {
                isDone = false;
            }
        }
        classification.push({
            date,
            isDone,
        })
    }
    
    return classification
}

function paintTiles(date, historyChecks) {
    let paint;
    const currentDate = splitDate(date.date);
    const todayDate = splitDate(new Date());

    if (compareDates(todayDate, currentDate)) return ""
    
    historyChecks.map(day => {
        const historyDate = splitDate(day.date);
        if (compareDates(historyDate, currentDate)) {
            if (day.isDone) {
                paint = true;
            } else {
                paint = false;
            }
        }

        return ""
    })

    if (paint) {
        return "date-green"
    } else if (paint === undefined) {
        return ""
    }

    return "date-red"
}

function splitDate(dateObj) {
    const splitedDate = {
        day: dateObj.getDate(),
        month: dateObj.getMonth(),
        year: dateObj.getFullYear(),
    }

    return splitedDate
}

function compareDates(dateObj1, dateObj2) {
    if (dateObj1.day === dateObj2.day &&
        dateObj1.month === dateObj2.month &&
        dateObj1.year === dateObj2.year) {
            return true
        }

    return false
}

export { classifyHistory, paintTiles };