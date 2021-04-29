'use strict';

let kdoJeNaTahu = 'circle';

const pridejTridu = (event) => {
  let ikonka = document.getElementById('hra__znak__miniatura');

  if (kdoJeNaTahu === 'circle') {
    event.target.classList.add('board__field--circle');
    kdoJeNaTahu = 'cross';
    ikonka.src = 'cross.svg';
    ikonka.alt = 'Krizek';
    event.target.disabled = true;
  } else {
    event.target.classList.add('board__field--cross');
    ikonka.src = 'circle.svg';
    ikonka.alt = 'Kolecko';
    kdoJeNaTahu = 'circle';
    event.target.disabled = true;
  }
};

document
  .querySelectorAll('.hra__boxik')
  .forEach((pole) => pole.addEventListener('click', pridejTridu));
