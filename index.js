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

  if (isWinningMove(event.target)) {
    const r = confirm('Vyhráváš! Spustit novou hru?');
    if (r === true) {
      location.reload();
    }
  }
};

const getSymbol = (field) => {
  if (field.classList.contains('board__field--circle')) {
    return 'circle';
  } else if (field.classList.contains('board__field--cross')) {
    return 'cross';
  } else {
    return undefined;
  }
};

const getField = (row, column) => {
  console.log(fields[column + row * boardSize]);
  return fields[column + row * boardSize];
};

const boardSize = 10;
const fields = document.querySelectorAll('.hra__boxik');

const getPosition = (field) => {
  // console.log(fields.indexOf(field.target));
  // const pole2 = document.querySelectorAll('.hra__boxik');
  // console.log(pole2.indexOf(field.target));
  // return pole2.indexOf(field.target);

  let fieldIndex = 0;
  while (fieldIndex < fields.length && field !== fields[fieldIndex]) {
    fieldIndex++;
  }

  return {
    row: Math.floor(fieldIndex / boardSize),
    column: fieldIndex % boardSize,
  };
};

const symbolsToWin = 5;
const isWinningMove = (field) => {
  const origin = getPosition(field);
  const symbol = getSymbol(field);

  let i;

  let inRow = 1; // Jednička pro právě vybrané políčko
  // Koukni doleva
  i = origin.column;
  while (i > 0 && symbol === getSymbol(getField(origin.row, i - 1))) {
    inRow++;
    i--;
  }

  // Koukni doprava
  i = origin.column;
  while (
    i < boardSize - 1 &&
    symbol === getSymbol(getField(origin.row, i + 1))
  ) {
    inRow++;
    i++;
  }

  if (inRow >= symbolsToWin) {
    return true;
  }

  let inColumn = 1;
  // Koukni nahoru
  i = origin.row;
  while (i > 0 && symbol === getSymbol(getField(i - 1, origin.column))) {
    inColumn++;
    i--;
  }

  // Koukni dolu
  i = origin.row;
  while (
    i < boardSize - 1 &&
    symbol === getSymbol(getField(i + 1, origin.column))
  ) {
    inColumn++;
    i++;
  }

  if (inColumn >= symbolsToWin) {
    return true;
  }

  let r;
  let inDiagL = 1;
  // Koukni SZ
  i = origin.column;
  r = origin.row;

  while (i > 0 && r > 0 && symbol === getSymbol(getField(r - 1, i - 1))) {
    inDiagL++;
    i--;
    r--;
  }

  // Koukni JV
  i = origin.column;
  r = origin.row;
  while (
    i < boardSize - 1 &&
    r < boardSize - 1 &&
    symbol === getSymbol(getField(r + 1, i + 1))
  ) {
    inDiagL++;
    i++;
    r++;
  }

  if (inDiagL >= symbolsToWin) {
    return true;
  }

  let inDiagP = 1;
  // Koukni SV
  i = origin.column;
  r = origin.row;

  while (
    i < boardSize - 1 &&
    r > 0 &&
    symbol === getSymbol(getField(r - 1, i + 1))
  ) {
    inDiagP++;
    i++;
    r--;
  }

  // Koukni JZ
  i = origin.column;
  r = origin.row;
  while (
    i > 0 &&
    r < boardSize - 1 &&
    symbol === getSymbol(getField(r + 1, i - 1))
  ) {
    inDiagP++;
    i--;
    r++;
  }

  if (inDiagP >= symbolsToWin) {
    return true;
  }

  return false;
};

document
  .querySelectorAll('.hra__boxik')
  .forEach((pole) => pole.addEventListener('click', pridejTridu));

// document.querySelectorAll('.hra__boxik').forEach((field) => {
//   field.addEventListener('click', getSymbol);
// });

// document.querySelectorAll('.hra__boxik').forEach((field) => {
//   field.addEventListener('click', isWinningMove);
// });
