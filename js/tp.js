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

    $('body').append(mdHTML);
    $modalDialog = $(`.${mdClass}`);
  }
  return $modalDialog;
}

function destroyModal(event) {
  event.stopPropagation();
  event.preventDefault();
  console.log(event.target);
  let $modalDialog = $(`.${mdClass}`);
  $modalDialog.remove();
}

function buildModal(index, element) {
  let $el = $(element);
  let href = $el.attr('href');

  function openModal(event) {
    event.stopPropagation();
    event.preventDefault();
    console.log('you clicked', href);

    $.get(href).done(function(html) {
      let $modalDialog = createModal();
      $modalDialog.find(`.${mdClass}-content`).append(html);
      $(`.${mdClass} div`)
        .not(`.${mdClass}-content`)
        .off('click', destroyModal)
        .on('click', destroyModal);
    });
  }

  $el.on('click', openModal);
}
