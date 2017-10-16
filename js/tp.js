function createPage() {
  buildModals();
}

$('document').ready(createPage);

function buildModals() {
  let $asModal = $('.as-modal');
  $asModal.each(buildModal);
}

const mdClass = 'modal-dialog';

function createModal() {
  let $modalDialog = $(`.${mdClass}`);

  if (!$modalDialog.length) {
    let mdHTML = `
    <div class="${mdClass}">
      <div class="${mdClass}-overlay"></div>  
      <div class="${mdClass}-content-frame">
        <div class="${mdClass}-content"></div>
      </div>
      <div class="${mdClass}-close"></div>
    </div>
    `;

    $('body').prepend(mdHTML);
    $modalDialog = $(`.${mdClass}`);
  }
  return $modalDialog;
}

function destroyModal(event) {
  $targetEL = $(event.target);

  let isInTheContent =
    $targetEL.hasClass(`${mdClass}-content`) ||
    $targetEL.parents(`.${mdClass}-content`).length;

  if (isInTheContent) {
    return;
  }

  event.stopPropagation();
  event.preventDefault();

  let $modalDialog = $(`.${mdClass}`);
  $modalDialog.remove();
}

function buildModal(index, element) {
  let $el = $(element);
  let href = $el.attr('href');

  function renderDialog(html) {
    let $modalDialog = createModal();
    $modalDialog
      .find(`.${mdClass}-content`)
      .css({
        width: $(window).width() * 0.75,
        height: $(window).height() * 0.75,
        'margin-top': $(window).height() * 0.15
      })
      .append(html)
      .parent()
      .parent()
      .css({
        opacity: 1
      });

    $(`body`)
      .off('click', destroyModal)
      .on('click', destroyModal);
  }

  function openModal(event) {
    event.stopPropagation();
    event.preventDefault();
    $.get(href).done(renderDialog);
  }

  $el.on('click', openModal);
}
