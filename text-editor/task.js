const editor = document.getElementById('editor');
const clearBtn = document.querySelector('.clear-button');

if (typeof Storage !== 'undefined') {
  const text = localStorage.getItem('data') || '';
  editor.value = text;

  editor.addEventListener('input', (event) => {
    localStorage.setItem('data', event.target.value);
  });

  clearBtn.addEventListener('click', () => {
    localStorage.removeItem('data');
    editor.value = '';
  });
}
