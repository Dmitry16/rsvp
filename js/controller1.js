// the event handler for the checkbox which filters
// (showing or hiding) the invitees who confirmed or not
!function() {
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
}();
// the event handler for submit event: validates and
// calls to createLI function which creates and
// appends a new li element with the invitee's info
!function() {
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const text = input.value;
    input.value = "";
  //validation of the text submitted from input
    let validated = validateInput(text);
    if (validated) {
      const li = createLI(text);
      ul.appendChild(li);
    }
  });
}();
// the event handler for checking and unchecking a particular
// invitee weather it confirmed or not
!function() {
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
}();
