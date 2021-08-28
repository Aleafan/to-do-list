import { createElemAttr } from './domFunctions';

function createConfirmation(text, title) {
  const confWrapper = createElemAttr('div', { id: 'conf-wrapper', 'data-click': 'cancel' });

  const confDelete = createElemAttr('div', { id: 'conf-delete' });

  confWrapper.appendChild(confDelete);

  const p = document.createElement('p');
  const span = createElemAttr('span', { class: 'title-span' });
  span.textContent = title;

  p.append(`${text} `, span, ' ?');

  const btnWrapper = createElemAttr('div', { class: 'btn-conf-wrapper' });

  confDelete.append(p, btnWrapper);

  const btnDelete = createElemAttr('button', {
    type: 'button',
    class: 'btn-form btn-delete',
    'data-click': 'delete',
  });
  btnDelete.textContent = 'Delete';
  const btnCancel = createElemAttr('button', {
    type: 'button',
    class: 'btn-form btn-cancel',
    'data-click': 'cancel',
  });
  btnCancel.textContent = 'Cancel';

  btnWrapper.append(btnDelete, btnCancel);

  return confWrapper;
}

export default createConfirmation;
