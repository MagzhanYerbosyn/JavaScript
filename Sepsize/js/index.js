let formData = new FormData();

formElement.addEventListener('submit', (event) => {
  event.preventDefault();

  formData = new FormData(formElement);
  console.log(Object.fromEntries(formData));
});
