let email = {},
  password = {},
  signInButton;

function handleFloatingLabel() {
  let input = document.querySelector('.js-floating-input'),
    label = document.querySelector('.js-floating-label');

  input.addEventListener('blur', function () {
    console.log(event);
    if (input.value) {
      label.classList.add('is-floating');
    } else {
      label.classList.remove('is-floating');
    }
  });
}

const handlePasswordSwitcher = function () {
  let passwordInput = document.querySelector('.js-password-input'),
    passwordCheckbox = document.querySelector('.js-password-toggle-checkbox');

  passwordCheckbox.addEventListener('click', function () {
    if (passwordInput.type == 'password') {
      passwordInput.type = 'input';
    } else {
      passwordInput.type = 'password';
    }
  });
};

const isValidEmailAddress = function (emailAddress) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailAddress);
};

const isValidPassword = function (password) {
  return password.length > 1;
};

const isEmpty = function (fieldValue) {
  return !fieldValue || !fieldValue.length;
};

const doubleCheckEmailAddress = function () {
  if (isValidEmailAddress(email.input.value)) {
    email.input.removeEventListener('input', doubleCheckEmailAddress);
    removeErrors(email);
  } else {
    if (isEmpty(email.input.value)) {
      email.errorMessage.innerText = 'This field is required';
    } else {
      email.errorMessage.innerText = 'Invalid emailaddress';
    }
  }
};

const doubleCheckPassword = function () {
  if (isValidPassword(password.input.value)) {
    password.input.removeEventListener('input', doubleCheckPassword);
    removeErrors(password);
  } else {
    if (isEmpty(password.input.value)) {
      password.errorMessage.innerText = 'This field is required';
    } else {
      password.errorMessage.innerText = 'Invalid password';
    }
  }
};

const addErrors = function (formField) {
  formField.field.classList.add('has-error');
  formField.errorMessage.classList.add('is-visible');
};

const removeErrors = function (formField) {
  formField.field.classList.remove('has-error');
  formField.errorMessage.classList.remove('is-visible');
};

const getDOMElements = function () {
  email.label = document.querySelector('.js-email-label');
  email.errorMessage = email.label.querySelector('.js-email-error-message');
  email.input = document.querySelector('.js-email-input');
  email.field = document.querySelector('.js-email-field');

  password.label = document.querySelector('.js-password-label');
  password.errorMessage = password.label.querySelector('.js-password-error-message');
  password.input = document.querySelector('.js-password-input');
  password.field = document.querySelector('.js-password-field');

  signInButton = document.querySelector('.js-sign-in-button');
};

const enableListeners = function () {
  email.input.addEventListener('blur', function () {
    if (!isValidEmailAddress(email.input.value)) {
      if (isEmpty(email.input.value)) {
        email.errorMessage.innerText = 'This field is required';
      } else {
        email.errorMessage.innerText = 'Invalid emailaddress';
      }

      addErrors(email);
      email.input.addEventListener('input', doubleCheckEmailAddress);
    }
  });

  password.input.addEventListener('blur', function () {
    if (!isValidPassword(password.input.value)) {
      if (isEmpty(email.input.value)) {
        email.errorMessage.innerText = 'This field is required';
      }
      addErrors(password);
      password.input.addEventListener('input', doubleCheckPassword);
    }
  });

  signInButton.addEventListener('click', function (e) {
    e.preventDefault();

    if (isValidEmailAddress(email.input.value) && isValidPassword(password.input.value)) {
      console.log('Form is good to go!');
    } else {
      addErrors(password);
      password.input.addEventListener('input', doubleCheckPassword);
      addErrors(email);
      email.input.addEventListener('input', doubleCheckEmailAddress);
    }
  });
};

document.addEventListener('DOMContentLoaded', function () {
  console.log('Script loaded!');
  getDOMElements();
  enableListeners();
  handleFloatingLabel();
  handlePasswordSwitcher();
});
