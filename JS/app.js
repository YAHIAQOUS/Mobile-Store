/* eslint-disable no-multi-spaces */
/* eslint-disable no-empty */
/* eslint-disable indent */
/* eslint-disable no-trailing-spaces */
'use strict';

let mobilesArray = [];
let headerContent = ['User', 'Type', 'Price', 'Condition'];
gettingData();

// function for random numbers   from https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min);
}

//  constructor function
function Mobile(userName, type) {
    this.userName = userName;
    this.type = type;
    this.price = getRandomIntInclusive(100, 500);
    this.condition;

    this.conditionIf = function () {
        if (this.price < 200) {
            this.condition = 'Used';
        }
        else {
            this.condition = 'New';
        }
    };
    this.conditionIf();

    // console.log(this.condition);
    mobilesArray.push(this);
    this.mobile = [this.userName, this.type, this.price, this.condition];
    // console.log(this.mobile);
}
// console.log(mobilesArray);





// render
let parent = document.getElementById('table');

// render header
function renderHeader() {
    let tr = document.createElement('tr');
    parent.appendChild(tr);

    for (let i = 0; i < headerContent.length; i++) {
        let th = document.createElement('th');
        tr.appendChild(th);
        th.textContent = headerContent[i];
    }
}
renderHeader();

// render data
Mobile.prototype.renderData = function () {
    let tr = document.createElement('tr');
    parent.appendChild(tr);

    for (let i = 0; i < headerContent.length; i++) {
        let td = document.createElement('td');
        tr.appendChild(td);
        td.textContent = this.mobile[i];
    }
};

for (let i = 0; i < mobilesArray.length; i++) {
    mobilesArray[i].renderData();
}





// submit
let form = document.getElementById('form');
form.addEventListener('submit', submitter);

function submitter(event) {
    event.preventDefault();
    let userName = event.target.userName.value;
    let type = event.target.type.value;
    // console.log(userName, type);
    new Mobile(userName, type);

    parent.textContent = '';
    renderHeader();
    for (let i = 0; i < mobilesArray.length; i++) {
        mobilesArray[i].renderData();
    }
    savingData();
}







// local storage
function savingData() {
    let stringData = JSON.stringify(mobilesArray);
    localStorage.setItem('mobiles', stringData);
}
savingData();

function gettingData() {
    let stringData = localStorage.getItem('mobiles');
    let dataArray = JSON.parse(stringData);
    // console.log(stringData);

    if (stringData !== null) {
        for (let i = 0; i < dataArray.length; i++) {
            new Mobile(dataArray[i].userName, dataArray[i].type);
        }
    }
}







