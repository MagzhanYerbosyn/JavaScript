let operatingInputs = new FormData();
let flashInputs = new FormData();

operatingInputsFormElement.addEventListener('submit', (event) => {
  event.preventDefault();

  // Getting data from module 1 inputs
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

  myKatexRender(gasOperFormula, gasOperElement);

  // 2. Maximum allowable gas velocity (Souders-Brown)
  // 2.1 Gas Density
  const rho_g = (
    2.7 *
    ((+SG.textContent * +operatingInputs.get('pressure')) /
      (+operatingInputs.get('temperature') * +Z.textContent))
  ).toFixed(2);

  const gasDensityFormula = `\\rho_g = 2.7 \\times \\frac{${SG.textContent} \\times ${operatingInputs.get('pressure')}}{${operatingInputs.get('temperature')} \\times ${Z.textContent}  } = ${rho_g} \\left( \\frac{\\text{lb}}{\\text{ft}^3} \\right)`;

  myKatexRender(gasDensityFormula, gasDensityElement);

  // 2.2 Liquid Density
  const rho_l = (62.4 * (141.5 / (131.5 + +operatingInputs.get('API')))).toFixed(1);

  const liquidDensityFormula = `\\rho_l = 62.4 \\times \\frac{141.5}{131.5 + ${operatingInputs.get('API')}} = ${rho_l} \\left( \\frac{\\text{lb}}{\\text{ft}^3} \\right)`;

  myKatexRender(liquidDensityFormula, liquidDensityElement);

  // 2.3 Gas Velocity (Sounders-Brown)
  const V_gas_max = (0.197 * Math.sqrt((rho_l - rho_g) / rho_g)).toFixed(2);

  const gasVelocityFormula = `V_{\\mathrm{gas,max}} = 0.197 \\sqrt{\\frac{${rho_l} - ${rho_g}}{${rho_g}}} = ${V_gas_max} \\,\\mathrm{ft/s}`;

  myKatexRender(gasVelocityFormula, gasVelocityElement);

  // 3.Minimum droplet size
  // minimum time velocity
  const V_t_min = V_gas_max / 3;

  const velocityTMinFormula = `V_{\\mathrm{t,min}} = \\frac{v_{\\mathrm{gas}}}{\\frac{L}{D}} = \\frac{${V_gas_max}}{3} = ${V_t_min} \\, \\frac{\\mathrm{ft}}{\\mathrm{s}}`;

  myKatexRender(velocityTMinFormula, velocityTMinElement);

  // minimum particle diameter
  const viscosityConverted = +viscosity.textContent * 6.7197 * Math.pow(10, -4);

  const d_p_min = Math.sqrt((18 * viscosityConverted * V_t_min) / ((rho_l - rho_g) * 32.2)).toFixed(
    4
  );

  const minParticleDiameterFormula = `d_{\\mathrm{p,min}} = \\sqrt{\\frac{18 \\times ${(viscosityConverted * Math.pow(10, 6)).toFixed(2)} \\times 10^{-6} \\times ${V_t_min} }{(${rho_l} - ${rho_g}) \\times 32.2}} = ${d_p_min * Math.pow(10, 6)} \\mathrm{\\mu m}`;

  myKatexRender(minParticleDiameterFormula, minParticleDiameterElement);

  // 4. Liquid Residence Time

  const V_l = (((+operatingInputs.get('totalFlowRate') * 5.615) / 86400) * 900).toFixed(0);

  const liquidVolumeFormula = ` V_L = \\left( \\frac{ ${operatingInputs.get('totalFlowRate')} \\times 5.615}{86400} \\right) \\times 900 = ${V_l} \\, \\mathrm{ft}^3 `;

  myKatexRender(liquidVolumeFormula, liquidVolumeElement);

  // 5. Separator Dimensions
  const V_L = (A_l * 3).toFixed(3);

  const newLiquidVolumeFormula = `V_L = A_l \\times L = 1.178 D^2 \\times 3 D = ${V_L} D^3`;

  myKatexRender(newLiquidVolumeFormula, newLiquidVolElement);

  // Calculating Diameter
  const D = (V_l / A_l).toFixed(1);

  const diameterFormula = `D = \\frac{V_l}{A_L} = \\frac{ ${V_l} }{ ${A_l} } = ${D} \\, \\mathrm{ft}  `;

  myKatexRender(diameterFormula, diameterElement);

  // Calculating Length
  const length = (V_l / 0.3927 / Math.pow(D, 2)).toFixed(1);

  const lengthFormula = `L_{\\mathrm{sep}} = \\frac{${V_l}}{0.3927 \\times ${D} ^2} = ${length} \\, \\mathrm{ft}`;

  myKatexRender(lengthFormula, lengthElement);

  // 6. Verification
  // Area
  const A_g = (0.5 * ((Math.PI * Math.pow(D, 2)) / 4)).toFixed(2);

  const areaFormula = `A_g = 0.5 \\times \\frac{3.14 \\times ${D}^2}{4} = ${A_g} \\, \\mathrm{ft}^2`;

  myKatexRender(areaFormula, areaElement);

  // Gas Velocity
  const V_g = (Q_g_converted / A_g).toFixed(2);

  const gasVelocityFormula = `v_{\\mathrm{g,act}} = \\frac{${Q_g_converted}}{${A_g}} = ${V_g} \\, \\frac{\\mathrm{ft}}{\\mathrm{s}} \\ll 2.46 \\, \\frac{\\mathrm{ft}}{\\mathrm{s}}`;

  myKatexRender(gasVelocityFormula, gasVelocityElement);

  const passGradeFormula = `$$ v_{\\mathrm{g,act}} \\ll v_{\\mathrm{gas,max}} = ${V_g} \\,
                      \\frac{\\mathrm{ft}}{\\mathrm{s}}`;
});
