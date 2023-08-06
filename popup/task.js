const date = new Date(new Date().getFullYear() + 100, 0, 1).toUTCString();
const close = document.querySelector('.modal__close');
const subscribePopup = document.getElementById('subscribe-modal');
const cookieArr = document.cookie.split(';');
const hasIsShow = cookieArr.some(cookie => cookie.trim().startsWith('isShow='));

if (!hasIsShow) {
  subscribePopup.classList.add('modal_active');
}

close.addEventListener('click', () => {
  subscribePopup.classList.remove('modal_active');
  document.cookie = 'isShow=True; expires=' + date;
});
