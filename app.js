const form = document.getElementById('registrar');
const mainDiv = document.querySelector('.main');
const input = form.querySelector('input');
const ul = document.getElementById('invitedList');

const div = document.createElement('div');
const filterLabel = document.createElement('label');
const filterCheckbox = document.createElement('input');

filterLabel.textContent = "Hide not confirmed";
filterCheckbox.type = 'checkbox';
div.appendChild(filterLabel);
div.appendChild(filterCheckbox);
mainDiv.insertBefore(div, ul);

// the event handler for the checkbox which filters
// (showing or hiding) the invitees who confirmed or not
filterCheckbox.addEventListener('change', (e) => {
  const isChecked = e.target.checked;
  let arr_li = ul.children;
  if (isChecked) {
    for(let i=0; i<arr_li.length; i++) {
      if (arr_li[i].className !== 'responded')
        arr_li[i].style.display = 'none';
    }
  } else {
    for(let i=0; i<arr_li.length; i++) {
      if (arr_li[i].className !== 'responded')
        arr_li[i].style.display = '';
    }
  }
});
// the event handler for submit event: validates and
// calls to createLI function which creates and
// appends a new li element with the invitee's info
window.onload = function() {
  let arr_invitees = getFromLocalStorage();
  if(arr_invitees !==[]) {
    arr_invitees.forEach(function(invitee) {
      const li = createLI(invitee);
      ul.appendChild(li);
    });
  }
}

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const text = input.value;
  input.value = "";
//validation of the submitted text from input
  let validated = validateInput(text);
  if (validated) {
    const li = createLI(text);
    ul.appendChild(li);
  }
});

function validateInput(submittedText) {
  if(submittedText !=="") {
    setToLocalStorage(submittedText);
    return true;
  }
}

function setToLocalStorage(submittedText) {
  let invitees = getFromLocalStorage();
  if(!submittedText || invitees.indexOf(submittedText)>-1) {
    return false;
  }
  invitees.push(submittedText);
  localStorage.setItem('invitees', JSON.stringify(invitees));
  return true;
}

function getFromLocalStorage() {
  let invitees = localStorage.getItem("invitees");
  if (invitees) {
    return JSON.parse(invitees);
  } else {
    return [];
  }
}

function removeFromLocalStorage(invitee) {
  let invitees = getFromLocalStorage("invitees");
  let inviteeIndex = invitees.indexOf(invitee);
  if ( inviteeIndex !== -1) {
    invitees.splice(inviteeIndex, 1);
    localStorage.setItem('invitees', JSON.stringify(invitees));
  }
}

function createLI(text) {

  function createEL(elemName, prop, val) {
    const elem = document.createElement(elemName);
    elem[prop] = val;
    return elem;
  }

  function appendToLI(elemName, prop, val) {
    const element = createEL(elemName, prop, val);
    li.appendChild(element);
    return element;
  }

  const li = document.createElement('li');
  appendToLI('span', 'textContent', text);
  appendToLI('label', 'textContent', 'Confirmed')
  .appendChild(createEL('input', 'type', 'checkbox'));
  appendToLI('button', 'textContent', 'edit');
  appendToLI('button', 'textContent', 'delete');

  return li;
}
// the event handler for checking and unchecking a particular
// invitee weather it confirmed or not
ul.addEventListener('change', (e) => {

  const checkbox = e.target;
  const checked = checkbox.checked;
  const listItem = checkbox.parentNode.parentNode;

  if(checked) {
    listItem.className = 'responded';
  } else {
    listItem.className = '';
  }
});

//event handler for cklicks on buttons 'delete','edit','save'
ul.addEventListener('click', (e) => {

  if (e.target.tagName === 'BUTTON') {
    const button = e.target;
    const li = button.parentNode;
    const span = li.firstElementChild;
    const invitee = span.textContent;
    const ul = li.parentNode;
    const action = button.textContent;
    const nameActions = {
      delete: () => {
        removeFromLocalStorage(invitee);
        ul.removeChild(li);
      },
      edit: () => {
        const span = li.firstElementChild;
        const input = document.createElement('input');
        input.type = 'text';
        input.value = span.innerHTML;
        li.insertBefore(input, span);
        li.removeChild(span);
        button.textContent = 'save';
      },
      save: () => {
        const input = li.firstElementChild;
        const span = document.createElement('span');
        span.textContent = input.value;
        li.insertBefore(span,li.firstElementChild);
        li.removeChild(input);
        button.textContent = 'edit';
      }
    }
    // select and run action in button's name
    nameActions[action]();
  }
});
