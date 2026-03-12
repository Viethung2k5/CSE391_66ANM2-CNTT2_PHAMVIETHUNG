let students = [];
let filteredStudents = [];
let sortAsc = true;

const nameInput = document.getElementById("name");
const scoreInput = document.getElementById("score");
const addBtn = document.getElementById("addBtn");

const tableBody = document.getElementById("tableBody");
const stats = document.getElementById("stats");

const searchInput = document.getElementById("search");
const filterSelect = document.getElementById("filter");
const scoreHeader = document.getElementById("scoreHeader");

addBtn.addEventListener("click", addStudent);

scoreInput.addEventListener("keypress", function(e){
if(e.key === "Enter"){
addStudent();
}
});

searchInput.addEventListener("input", applyFilters);
filterSelect.addEventListener("change", applyFilters);

scoreHeader.addEventListener("click", function(){

sortAsc = !sortAsc;

applyFilters();

});

function classify(score){

if(score >= 8.5) return "Giỏi";
if(score >= 7) return "Khá";
if(score >= 5) return "Trung bình";

return "Yếu";

}

function addStudent(){

let name = nameInput.value.trim();
let score = parseFloat(scoreInput.value);

if(name === "" || isNaN(score) || score < 0 || score > 10){

alert("Dữ liệu không hợp lệ");
return;

}

students.push({name, score});

nameInput.value = "";
scoreInput.value = "";
nameInput.focus();

applyFilters();

}

function renderTable(data = students){

tableBody.innerHTML = "";

if(data.length === 0){

tableBody.innerHTML =
"<tr><td colspan='5'>Không có kết quả</td></tr>";

return;

}

data.forEach((s,index)=>{

let type = classify(s.score);

let row = document.createElement("tr");

if(s.score < 5){
row.classList.add("yeu");
}

row.innerHTML = `
<td>${index+1}</td>
<td>${s.name}</td>
<td>${s.score}</td>
<td>${type}</td>
<td>
<button class="deleteBtn" data-index="${index}">Xóa</button>
</td>
`;

tableBody.appendChild(row);

});

updateStats();

}

tableBody.addEventListener("click",function(e){

if(e.target.classList.contains("deleteBtn")){

let index = e.target.dataset.index;

students.splice(index,1);

applyFilters();

}

});

function updateStats(){

let total = 0;

students.forEach(s => total += s.score);

let avg = students.length ?
(total / students.length).toFixed(2) : 0;

stats.innerHTML =
`Tổng sinh viên: ${students.length} | Điểm trung bình: ${avg}`;

}

function applyFilters(){

let keyword = searchInput.value.toLowerCase();
let type = filterSelect.value;

filteredStudents = students.filter(s=>{

let matchName =
s.name.toLowerCase().includes(keyword);

let matchType = true;

if(type !== "all"){
matchType = classify(s.score) === type;
}

return matchName && matchType;

});

filteredStudents.sort((a,b)=>{

return sortAsc ?
a.score - b.score :
b.score - a.score;

});

renderTable(filteredStudents);

updateSortArrow();

}

function updateSortArrow(){

scoreHeader.innerHTML =
sortAsc ? "Điểm ▲" : "Điểm ▼";

}