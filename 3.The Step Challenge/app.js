const nameInputEl = document.getElementById("p-name");
const stepsInputEl = document.getElementById("steps");
const caloriesInputEl = document.getElementById("calories");


const loadBtnEl = document.getElementById("load-records");
const addRecordBtnEl = document.getElementById("add-record");
const editRecordBtnEl = document.getElementById("edit-record");

const BASE_URL = "http://localhost:3030/jsonstore/records";

const liListEl = document.getElementById("list");

loadBtnEl.addEventListener("click", loadRecords);
addRecordBtnEl.addEventListener("click", addRecord);
editRecordBtnEl.addEventListener("click", updateRecord);

let recordId = null;
async function loadRecords() {
    liListEl.innerHTML = "";
    const res = await fetch(BASE_URL);
    const data = await res.json();
    const records = Object.values(data);
    for (const record of records) {
       const liRecordEl = document.createElement('li');
       liRecordEl.classList.add("record");
       const divInfoEl = document.createElement("div");
       divInfoEl.classList.add("info");
       const divBtnWrapperEl = document.createElement("div");
       divBtnWrapperEl.classList.add("btn-wrapper");


       let pNameEl = document.createElement('p');
       let pStepsEl = document.createElement('p');
       let pCaloriesEl = document.createElement('p');
        
       pNameEl.textContent = record.name;
       pStepsEl.textContent = record.steps;
       pCaloriesEl.textContent = record.calories;

       liListEl.appendChild(liRecordEl);
       liRecordEl.appendChild(divInfoEl);
       liRecordEl.appendChild(divBtnWrapperEl)

       divInfoEl.appendChild(pNameEl);
       divInfoEl.appendChild(pStepsEl);
       divInfoEl.appendChild(pCaloriesEl);

       const changeBtnEl = document.createElement("button");
       const deleteBtnEl = document.createElement('button');

       changeBtnEl.classList.add("change-btn");
       deleteBtnEl.classList.add("delete-btn");

       changeBtnEl.textContent = "Change";
       deleteBtnEl.textContent = "Delete";

       divBtnWrapperEl.appendChild(changeBtnEl);
       divBtnWrapperEl.appendChild(deleteBtnEl);

       changeBtnEl.addEventListener('click', handleShowEdit);
       deleteBtnEl.addEventListener('click', deleteRecord);

        function handleShowEdit() {
            addRecordBtnEl.disabled = true;
            editRecordBtnEl.disabled = false;

   
            nameInputEl.value = record.name;
            stepsInputEl.value = record.steps;
            caloriesInputEl.value = record.calories;
    
            recordId = record._id;
        }

    async function deleteRecord() {
        await fetch(BASE_URL + '/' +  record._id, {
            method: "DELETE",
        });

        await loadRecords();
    } 

}    
   
}

async function addRecord() {

        let name = nameInputEl.value;
        let steps = Number(stepsInputEl.value);
        let calories = Number(caloriesInputEl.value);

        await fetch(BASE_URL, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name, steps, calories})
        })

        nameInputEl.value = '';
        stepsInputEl.value = '';
        caloriesInputEl.value = '';
        loadRecords()
}

async function updateRecord() {
    let name = nameInputEl.value;
    let steps = Number(stepsInputEl.value);
    let calories = Number(caloriesInputEl.value);
    
    await fetch(BASE_URL + '/' + recordId, {
            method: "PUT",
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({name, steps, calories, _id: recordId})
        });
    
        nameInputEl.value = '';
        stepsInputEl.value = '';
        caloriesInputEl.value = '';

        addRecordBtnEl.disabled = false;
        editRecordBtnEl.disabled = true;

        await loadRecords();
}