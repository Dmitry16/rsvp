!function() {
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
}();
