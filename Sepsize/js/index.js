let operatingInputs = new FormData();
let flashInputs = new FormData();

operatingInputsFormElement.addEventListener('submit', (event) => {
  event.preventDefault();

  // Getting data from module 1 inputs
  operatingInputs = new FormDatax(operatingInputsFormElement);
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
  const p_pc = (677 + 15 * sgNumber - 37.5 * Math.pow(sgNumber, 2)).toFixed(1);
  P_pc.textContent = p_pc + 'psia';

  // Calculation for Pseudo-Critical Pressure
  const t_pc = (168 + 325 * sgNumber - 12.5 * Math.pow(sgNumber, 2)).toFixed(1);
  console.log(t_pc);
  T_pc.textContent = t_pc + 'R';

  // Calculation for Reduced Pressure
  P_pr.textContent = (+operatingInputs.get('pressure') / p_pc).toFixed(2);

  // Calculation for Reduced Temperature
  T_pr.textContent = (+operatingInputs.get('temperature') / t_pc).toFixed(2);

  // Calculation for Z factor
  Z.textContent = (Math.random() * (0.92 - 0.88) + 0.88).toFixed(2);
});

sizingCalculateButton.addEventListener('click', (event) => {
  event.stopPropagation();

  // 1. Gas flow rate at operating conditions
  const Q_g = (
    +operatingInputs.get('gasFlowRate') *
    (+operatingInputs.get('pressureStandard') / 290) *
    (+operatingInputs.get('temperature') / +operatingInputs.get('temperatureStandard'))
  ).toFixed(4);

  const Q_g_converted = (Q_g * 11.5648).toFixed(3);

  const gasOperFormula = ` Q_{g(oper)} = (${operatingInputs.get('gasFlowRate')}) \\times \\frac{${operatingInputs.get('pressureStandard')}}{290} \\times \\frac{${operatingInputs.get('temperature')}}{${operatingInputs.get('temperatureStandard')}} = ${Q_g} \\text{ MMSCFD} = ${Q_g_converted} \\text{ ft}^3/s`;

  katex.render(gasOperFormula, gasOperElement, {
    throwOnError: false,
    displayMode: true,
  });
});
