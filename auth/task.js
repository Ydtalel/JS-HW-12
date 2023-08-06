const signinBtn = document.getElementById('signin__btn');
const url = 'https://students.netoservices.ru/nestjs-backend/auth'
const signinForm = document.getElementById('signin__form');
const welcomeDiv = document.getElementById('welcome')
const user = document.getElementById('user_id');
const logout = document.getElementById('signout__btn');

function wellcomeUser() {
  const userId = localStorage.getItem('user');
  const isUserLoggedIn = !!userId;
  user.textContent = userId;

  welcomeDiv.classList.toggle('welcome_active', isUserLoggedIn);
  logout.classList.toggle('btn-active', isUserLoggedIn);
  signinBtn.style.display = isUserLoggedIn ? "none" : "block";
  logout.style.display = isUserLoggedIn ? "block" : "none";
}

const ajaxSend = async (formData) => {
  const response = await fetch(url, {
    method: "POST",
    body: formData
  });
  if (!response.ok) {
    throw new Error(`Ошибка по адресу ${url}, статус ошибки ${response.status}`);
  }
  return await response.json();
};

function isSuccess(responseData) {
  if (responseData.success) {
    localStorage.setItem('user', responseData.user_id);
    wellcomeUser();
  } else {
    alert('Неверный логин/пароль');
  }
}

function handleFormSubmit(e) {
  e.preventDefault();
  const formData = new FormData(signinForm);

  ajaxSend(formData)
    .then((response) => {
      if (response.success) {
        alert('Вы успешно авторизовались.');
        signinForm.reset();
      }
      isSuccess(response);
    })
    .catch((err) => console.error(err));
}

function handleLogout() {
  localStorage.removeItem('user');
  wellcomeUser();
  alert('Вы успешно деавторизовались.');
}

function init() {
  if (typeof Storage !== 'undefined') {
    wellcomeUser();
  }

  signinForm.addEventListener("submit", handleFormSubmit);
  logout.addEventListener('click', handleLogout);
}

document.addEventListener("DOMContentLoaded", init);
