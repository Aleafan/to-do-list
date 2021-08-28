function createFormOverlay() {
  const formOverlay = document.createElement('div');
  formOverlay.classList.add('form-overlay');

  formOverlay.addEventListener('click', handleClickOverlay);

  return formOverlay;
}

function handleClickOverlay(e) {
  if (e.target === this) {
    document.querySelector('.edit-mode .btn-cancel').click();
    this.classList.remove('show');
  }
}

export default createFormOverlay;
