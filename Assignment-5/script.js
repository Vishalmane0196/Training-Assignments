

const xValues = ["Italy", "France", "paric", "japan"];
const yValues = [55, 49, 44, 24, 15];
const barColors = ["red", "green", "blue", "orange", "brown"];

new Chart("myChart", {
  type: "bar",
  data: {
    labels: xValues,
    datasets: [{
      backgroundColor: barColors,
      data: yValues
    }]
  },
  options: {
    responsive: true,
    maintainAspectRatio: false,
    legend: { display: false },
    title: {
      display: true,
      text: "World Wine Production 2018"
    }
  }
});




// -------------------------------------------chart code || ---------------------------

let transactionList = JSON.parse(localStorage.getItem('data')) || [];

let Total_Income = 0;
let Income = 0, Expense = 0;
let persetage = 0

calculateAmount();

var xValuess = ["Italy", "France", "Spain", "USA", "Argentina"];
var yValuess = [55, 49, 44, 24, 15];
const barColorss = [
  "#b91d47",
  "#00aba9",
  "#2b5797",
  "#e8c3b9",
  "#1e7145"
];

new Chart("myChart2", {
  type: "pie",
  data: {
    labels: returnxValuess(),
    datasets: [{
      backgroundColor: barColorss,
      data: returnyValuess(),
    }]
  },
  options: {
    responsive: true,
    maintainAspectRatio: false,
    title: {
      display: true,
      text: "Expence Category Wise"
    }
  }
});

document.getElementById('select-sort').classList.add("option-select2")
document.getElementById('select-sort').addEventListener('change', colorselect);

function colorselect(e) {

  console.log()
  if (document.getElementById('select-sort').value !== 'Sort') {
    document.getElementById('select-sort').classList.remove("option-select2")
  }

}

document.getElementById('addTransaction').addEventListener("click", function () {
  document.getElementsByClassName("popup")[0].style.display = 'flex';
})

document.getElementsByClassName("cancel-btn")[0].addEventListener("click", function (e) {
  e.preventDefault();
  document.getElementsByClassName("popup")[0].style.display = 'none';
})

// form all steps 
document.getElementsByClassName("submit-btn")[0].disabled = true;

document.getElementById("addtransactionform").addEventListener("submit", function (e) {
  e.preventDefault();
  let transaction_type = document.getElementById("transaction-type").value;
  let date = document.getElementById("date").value;
  let label = document.getElementById("label").value;
  let note = document.getElementById("note").value;
  let amount = document.getElementById("number").value;
  let P_N;
  let icon = document.getElementById("transaction-type").options[document.getElementById("transaction-type").selectedIndex].getAttribute('icon-data');;
  let logo_color = document.getElementById("transaction-type").options[document.getElementById("transaction-type").selectedIndex].getAttribute('logo-data');

  if (transaction_type === 'Salary' || transaction_type === 'Bussiness') {
    P_N = 'positive';

  }
  else {

    P_N = 'negative';

  }
  transaction = {
    id: new Date().getTime(),
    Type: transaction_type,
    Date: date || '--',
    Label: label || "--",
    Note: note || "--",
    P_N: P_N,
    icon: icon,
    logo: logo_color,
    Amount: parseInt(amount)
  }

  transactionList.push(transaction);
  localStorage.setItem('data', JSON.stringify(transactionList));
  calculateAmount();
  this.reset();
  document.getElementsByClassName("popup")[0].style.display = 'none';
  displayTransaction(transactionList);

})

document.getElementById("transaction-type").addEventListener('change', function () {
  buttonvalid();
})

document.getElementById("number").addEventListener("input", function () {
  buttonvalid();
})

function buttonvalid() {
  let amount = document.getElementById("number").value;
  let transaction_type = document.getElementById("transaction-type").value;

  if (transaction_type === 'Salary' || transaction_type === 'Bussiness') {
    document.getElementById("transaction-type").style.backgroundColor = "#12c48b";
  }
  else {
    document.getElementById("transaction-type").style.backgroundColor = " rgba(245, 104, 104, 0.85)";
  }
  if (amount) {
    document.getElementsByClassName("submit-btn")[0].disabled = false;
    document.getElementsByClassName("submit-btn")[0].style.opacity = '1';
    document.getElementsByClassName("submit-btn")[0].style.cursor = 'pointer';
  } else {
    document.getElementsByClassName("submit-btn")[0].disabled = true;
    document.getElementsByClassName("submit-btn")[0].style.opacity = '0.2';
    document.getElementsByClassName("submit-btn")[0].style.cursor = 'not-allowed';
  }

}
buttonvalid();

function displayTransaction(transactionList) {
  if (transactionList.length === 0) {
    document.getElementsByClassName("notrancsactiondispaly")[0].style.display = 'flex';

    document.getElementsByClassName("expence-cover")[0].style.display = 'none';
    document.getElementsByClassName("chart-container")[0].style.display = 'none';

  }
  else {
    document.getElementsByClassName("expence-cover")[0].style.display = 'block';
    document.getElementsByClassName("chart-container")[0].style.display = 'flex';
    document.getElementsByClassName("notrancsactiondispaly")[0].style.display = 'none';

    let divv = document.getElementsByClassName("transaction-container")[0];
    divv.innerHTML = '';
    transactionList.forEach(e => {
      let div = document.createElement('div');
      div.setAttribute('class', 'transaction');
      div.innerHTML = `
                            <div class="details">
                               <div class="divv">
                                <div class="category ${e.logo}">
                                    <i class="${e.icon}"></i>
                                   </div>
                                    <div>
                                        <h3>${e.Type}</h3>
                                        
                                    </div>
                               </div>
                            </div>
                            <div class="label-div">
                                <p>${e.Label}</p>
                            </div>
                            <div class="date-div">
                                <p>${e.Date}</p>
                            </div>
                            <div class="amount ${e.P_N}">
                                <p>${e.Amount} /-</p>
                               
                            </div>
                               <Button delete_id="${e.id}" id="deletebtn"><i class="fa-solid fa-trash-can"></i></Button>
                       `
      div.setAttribute('delete_id', `${e.id}`);
      divv.appendChild(div);
    })
    addEventOnDelEdit();
  }

}

function addEventOnDelEdit() {
  document.querySelectorAll('#deletebtn').forEach(e => {
    e.addEventListener('click', function () {
      let id = parseInt(this.getAttribute('delete_id'));
      transactionList = transactionList.filter(transaction => transaction.id !== id);
      localStorage.setItem('data', JSON.stringify(transactionList));
      calculateAmount();
      displayTransaction(transactionList);
    })
  })
}

function calculateAmount() {
  Income = 0;
  Expense = 0;
  transactionList.forEach(e => {
    if (e.P_N === "positive") {
      Income = Income + e.Amount;

    }
    else {
      Expense = Expense + e.Amount;
      Income = Income - Expense;
    }
  })

  persetage = (Expense / Income) * 100;
  if (isNaN(persetage) || persetage > 100) {
    persetage = 0;
  }
  document.getElementById("progress-percentage").innerText = `${Math.floor(persetage)}%`;
  document.getElementsByClassName("fill-bar")[0].style.width = `${persetage}%`;
  document.getElementById("expense").innerText = `${Expense}/-`;
  document.getElementById("current").innerText = `${Income}/-`;

  categoryCalculation();

}
let map = new Map();
function categoryCalculation() {

  let shopTotal, carTotal, electricityTotal, home, other
  transactionList.forEach(e => {
    let getitem = map.get(e.Type);
    if (getitem) {
      map.set(e.Type, (getitem + e.Amount));
    } else {
      map.set(e.Type, e.Amount)
    }

  })
  yValuess = [];
  xValuess = [];
  map.forEach((value, key) => {
    console.log(key)
    xValuess.push(key);
    yValuess.push(((value / Total_Income) * 100))
  })
  
}

function returnxValuess(){
   return xValuess;
}
function returnyValuess(){
  return yValuess;
}


document.getElementById('select-sort').addEventListener('input', function () {
  let sortedArray = [];
  let sortType = document.getElementById('select-sort').value;
  if (sortType == 'date') {
    sortedArray = transactionList.slice().sort((a, b) => new Date(a.Date) - new Date(b.Date))
    displayTransaction(sortedArray);
    return;
  }
  else if (sortType == 'amount') {
    sortedArray = transactionList.slice().sort((a, b) => a.Amount - b.Amount)
    displayTransaction(sortedArray);
    return;
  }
})

// Search Function

document.getElementById('search').addEventListener('input', function (e) {
  newarray = [];
  let searchValue = document.getElementById('search').value;
  console.log(e);
  console.log(searchValue);

  if (searchValue.includes(" ") || e.data === null) {
    displayTransaction(transactionList);
  }
  else {
    transactionList.forEach(e => {
      if (e.Type.toLowerCase().includes(searchValue.trim().toLowerCase()) || e.Label.toLowerCase().includes(searchValue.trim().toLowerCase()) || String(e.Amount).includes(searchValue.trim().toLowerCase()) || e.Date.includes(searchValue.trim().toLowerCase())) {
        newarray.push(e);
      }
    })
    displayTransaction(newarray);
  }


})

calculateAmount();
displayTransaction(transactionList);