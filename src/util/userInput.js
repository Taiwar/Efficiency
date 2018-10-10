export function matchProject(value, field) {
    const regEx = new RegExp('#([^\ ]+)');
    const match = regEx.exec(value);
    let project;
    if (match) {
        if (value.slice(-1) === " ") {
            project = match[1];
            field.value = value.slice(0, -(project.length+2));
        }
    }
    return project
}

export function matchPriority(value, field) {
    const regEx = new RegExp('!([^\ ])');
    const match = regEx.exec(value);
    let priority;
    if (match) {
        if (value.slice(-1) === " " && 0 < parseInt(match[1]) < 5) {
            priority = parseInt(match[1]);
            field.value = value.slice(0, -3);
        }
    }
    return priority
}

export function matchDate(value, field) {
    const expression = /(?:(?:31(\/|-|\.)(?:0?[13578]|1[02]|(?:Jan|Mar|May|Jul|Aug|Oct|Dec)))\1|(?:(?:29|30)(\/|-|\.)(?:0?[1,3-9]|1[0-2]|(?:Jan|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec))\2))(?:(?:1[6-9]|[2-9]\d)?\d{2})$|^(?:29(\/|-|\.)(?:0?2|(?:Feb))\3(?:(?:(?:1[6-9]|[2-9]\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00))))$|^(?:0?[1-9]|1\d|2[0-8])(\/|-|\.)(?:(?:0?[1-9]|(?:Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep))|(?:1[0-2]|(?:Oct|Nov|Dec)))\4(?:(?:1[6-9]|[2-9]\d)?\d{2})/;
    const regEx = new RegExp(expression);
    const match = regEx.exec(value);
    let reminder;
    if (match) {
        console.log("Got date:", match);
    }
    console.log("No match")
}