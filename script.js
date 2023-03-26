let boxes = document.querySelectorAll('.box');
let answerArray = [];
let randomArray = [];
let reset = document.getElementById('reset');
let result = document.getElementById('result');
reset.addEventListener('click', resetGame);

function getRandomChild() {
  if (randomArray.length === 4) return;

  let randomNum = Math.floor(Math.random() * 9);
  const children = document.getElementById('boxes').children;
  const randomChild = children.item(randomNum);
  const randomChildId = randomChild.getAttribute('id');
  if (
    answerArray.includes(randomChildId) ||
    randomArray.includes(randomChildId)
  ) {
    getRandomChild();
  } else {
    setTimeout(() => {
      if (Array.isArray(correctAnswer(answerArray, 'winner'))) return;
      randomArray.push(randomChildId);
      randomChild.setAttribute('value', 'X');
      randomChild.setAttribute('disabled', true);
      randomChild.setAttribute('readonly', true);
      correctAnswer(randomArray, 'looser');
    }, 700);
  }
}
function findSubset(list, arr) {
  return list.filter((subArr) => subArr.every((elem) => arr.includes(elem)))[0];
}
function correctAnswer(arr, className) {
  const values = [
    ['one', 'two', 'three'],
    ['four', 'five', 'six'],
    ['seven', 'eight', 'nine'],
    ['three', 'five', 'seven'],
    ['one', 'five', 'nine'],
    ['one', 'four', 'seven'],
    ['three', 'six', 'nine'],
    ['two', 'five', 'eight']
  ];
  let subset = findSubset(values, arr);
  if (subset != undefined) {
    result.textContent = `You are a ${className}`;
    result.classList.add('show');
    for (let box of boxes) {
      box.setAttribute('readonly', true);
      box.removeEventListener('click', boxClicked);
    }
    subset.forEach((id) => {
      const el = document.getElementById(id);
      if (el) {
        el.classList.add(className);
      }
    });
  }
  return subset;
}
function boxClicked(e) {
  elemId = e.target.id;
  elem = document.getElementById(elemId);
  if (elem.getAttribute('disabled') == true) return;
  elem.setAttribute('value', '0');
  elem.setAttribute('disabled', true);
  elem.setAttribute('readonly', true);
  answerArray.push(elemId);
  getRandomChild();

  if (answerArray.length + randomArray.length == 9) {
    result.textContent = 'The score is tied';
    result.classList.add('show');
  }
}
for (let box of boxes) {
  box.addEventListener('click', boxClicked);
}

function resetGame() {
  for (let box of boxes) {
    box.classList.remove('winner');
    box.classList.remove('looser');
    box.removeAttribute('disabled');
    box.removeAttribute('readonly');
    box.removeAttribute('value');
    answerArray = [];
    randomArray = [];
    box.addEventListener('click', boxClicked);
    result.textContent = '';
    result.classList.remove('show');
  }
}
