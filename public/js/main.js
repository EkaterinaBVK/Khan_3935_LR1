const update = async() => {

    let students = await fetch("/students")
        .then(response => response.json())
        .then(data => {
            return data
        }).catch(err => {
            console.warn(err)
            return []
        })

    return students
}

const renderStudents = (array) => {
    let html = ""
    for (let i in array) {
        html +=
            `
        <div class="card" style="width: 100%;">
            <div class="card-body" group=${array[i].group}>${array[i].name}</div>
        </div>
        `
    }
    // console.log(html)
    document.getElementById("students").innerHTML = html
}

const setAlert = () => {
    let el = document.querySelectorAll('.card').forEach((el) => {
        let group = el.children[0].getAttribute('group');
        let name = el.children[0].textContent;
        console.log(name + group);
        el.addEventListener('click', () => {
            alert(`${name} ${group}`);
        })
    })
}


document.addEventListener("DOMContentLoaded", () => {
    document.querySelector("[btn]").addEventListener("click", () => {
        update().then(data => {
            /*             console.table(data) */
            renderStudents(data)
            setAlert();
        })
    })
})