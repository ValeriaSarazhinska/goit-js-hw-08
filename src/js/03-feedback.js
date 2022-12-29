import throttle from 'lodash.throttle';

const form = document.querySelector('.feedback-form');
const input = document.querySelector('input');
const textarea = document.querySelector('textarea');

const formData = localStorage.getItem('feedback-form-state');
const parsedFormData = JSON.parse(formData);
if (parsedFormData) {
  input.value = parsedFormData.email;
  textarea.value = parsedFormData.message;
}

form.addEventListener('input', throttle(handleInput, 500));
form.addEventListener('submit', handleSubmit);

function handleInput(event) {
  if (event.currentTarget?.elements) {
    const { email, message } = event.currentTarget.elements;
    localStorage.setItem('feedback-form-state', JSON.stringify({ email: email.value, message: message.value }));
  }
}

function handleSubmit(event) {
  event.preventDefault();
  const {
    elements: { email, message },
  } = event.currentTarget;

  if (!email.value || !message.value) {
    return console.log('Please fill in all the fields!');
  }

  console.log({ email: email.value, message: message.value });
  event.currentTarget.reset();
  localStorage.removeItem('feedback-form-state')
}