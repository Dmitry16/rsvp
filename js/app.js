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

window.onload = function() {
  let arr_invitees = getFromLocalStorage();
  if(arr_invitees !==[]) {
    arr_invitees.forEach(function(invitee) {
      const li = createLI(invitee);
      ul.appendChild(li);
    });
  }
}
