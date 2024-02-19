const searchState = document.querySelector("#searchState");
const nameState = document.querySelector("#nameState");
const flagState = document.querySelector("#flagState");
const mapState = document.querySelector("#mapState");
const Badka = document.querySelector("#Badka");
const tarikhda = document.querySelector("#tarikhda");
const Casumada = document.querySelector("#Casumada");
const lists = document.querySelector("#lists");
const list = document.querySelector("#list");

const select = async () => {
    const url = './datainfo.json';
    const response = await fetch(url);
    const data = await response.json();
    return data;
}

const updateList = () => {
    const inputValue = searchState.value.toLowerCase();

    if (inputValue === "") {
        lists.innerHTML = "";
        lists.classList.add('hidden');
        return;
    }

    select().then(data => {
        lists.innerHTML = ""; 

        data.forEach(element => {
            if (element.magaca.toLowerCase().includes(inputValue)) {
                lists.innerHTML += `<div class="list my-1 bg-gray-200 p-1">${element.magaca}</div>`;
            }
        });

        if (lists.innerHTML.trim() !== "") {
            lists.classList.remove('hidden');
        } else {
            lists.classList.add('hidden');
        }
    }).catch((error) => console.error(error));
}

searchState.addEventListener("input", updateList);

lists.addEventListener("click", (event) => {
    const clickedElement = event.target;
    const inputValue = clickedElement.textContent;
    searchState.value = inputValue; 
    update(searchState.value);
    lists.classList.add('hidden');
    
});



getcode = async (info) => {
    const url = ('./datainfo.json');
    const response = await fetch(url)
    const data = await response.json();
    return data;
}

update = async (perinfo) => {
    getcode()
        .then(data => {
            data.forEach((item) => {
                if (item.magaca === searchState.value) {
                    nameState.innerHTML = `${item.magaca}`;
                    flagState.src = `${item.calanka}`;
                    mapState.src = `${item.mapka}`;
                    Badka.innerHTML = `${item.Badka}`;
                    tarikhda.innerHTML = `${item.tarikhda}`;
                    Casumada.innerHTML = `${item.Casumada}`;
                    searchState.value = ""
                }
            });
        })
        .catch(error => console.error(error));
}