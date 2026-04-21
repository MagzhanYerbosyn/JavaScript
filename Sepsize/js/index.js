let operatingInputs = new FormData();
let flashInputs = new FormData();

operatingInputsFormElement.addEventListener('submit', (event) => {
  event.preventDefault();

  // Getting datas from module 1 inputs
  operatingInputs = new FormData(operatingInputsFormElement);
  console.log('Operating Inputs: ', Object.fromEntries(operatingInputs));
});

flashInputsFormElement.addEventListener('submit', (event) => {
  event.preventDefault();

  flashInputs = new FormData(flashInputsFormElement);

  console.log('Flash Inputs: ', Object.fromEntries(flashInputs));

  //Setting yi*Mi in HTML
  for (let i = 0; i < molecularWeight.length; i++) {
    product[i].textContent = (
      (parseFloat(molecularWeight[i].textContent) * Array.from(flashInputs)[i][1]) /
      100
    ).toFixed(3);
    console.log(Array.from(flashInputs)[i][1]);
  }

  //Calculating M_gas
  const arr = [];

  for (element of product) {
    arr.push(parseFloat(element.textContent));
  }

  const sum = arr.reduce((acc, value) => acc + value);
  M_gas.textContent = sum.toFixed(2) + ' g/mol';

  // Calculating SG
  SG.textContent = (sum / M_air).toFixed(1);
});

factorCalculateButton.addEventListener('click', (event) => {
  event.stopPropagation();

  let sgNumber = parseFloat(SG.textContent);

  // Calculation for Pseudo-Critical Pressure
  P_pc.textContent = 677 + 15 * sgNumber - 37.5 * Math.pow(sgNumber, 2);

  // Calculation for Pseudo-Critical Pressure
  T_pc.textContent = 168 + 325 * sgNumber - 12.5 * Math.pow(sgNumber, 2);

  // Calculation for Reduced Pressure
});
