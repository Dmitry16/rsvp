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
