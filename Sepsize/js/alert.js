const customAlert = (title, body, type = false) => {
  !type
    ? document.body.insertAdjacentHTML(
        'afterbegin',
        `<div class="alert-blur" hidden="${type}">
      <form class="alert-el">
        <h5 class="alert-title">${title}</h5>
        <p class="alert-body">${body}</p>
        <input class="alert-input" name="OK" type="button" value="OK" />
      </form>
    </div>`
      )
    : getElement('alert-blur').remove();
};

const getElement = (className) => {
  return document.querySelector(`.${className}`);
};

document.addEventListener('click', (event) => {
  if (event.target === getElement('alert-blur') || event.target === getElement('alert-input')) {
    customAlert('', '', true);
  }
});
