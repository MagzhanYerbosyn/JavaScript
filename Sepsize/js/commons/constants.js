// Forms
const operatingInputsFormElement = document.querySelector('[data-js-operating-inputs]');
const flashInputsFormElement = document.querySelector('[data-js-flash-inputs]');

// Calculate Buttons
const factorCalculateButton = document.querySelector('[data-js-factor-calculate]');

// Elements from Flash Calculation Table
const molecularWeight = document.querySelectorAll('[data-js-molecularWeight]');
const product = document.querySelectorAll('[data-js-yi-Mi]');
const M_gas = document.querySelector('[data-js-M-gas]');
const M_air = 29;
const SG = document.querySelector('[data-js-SG]');
const viscosity = document.querySelector('[data-js-viscosity]');

// Elements from Z-factor Analysis module
const P_pc = document.querySelector('[data-js-pseudo-critical-pressure]');
const T_pc = document.querySelector('[data-js-pseudo-critical-temperature]');
const Z = document.querySelector('[data-js-pseudo-z-factor]');
const P_pr = document.querySelector('[data-js-pseudo-reduced-pressure]');
const T_pr = document.querySelector('[data-js-pseudo-reduced-temperature]');

// Elements from Separator Sizing module
const sizingCalculateButton = document.querySelector('[data-js-sizing-calculate]');
const gasOperElement = document.querySelector('[data-js-gas-oper]');
const gasDensityElement = document.querySelector('[data-js-gas-density]');
const liquidDensityElement = document.querySelector('[data-js-liquid-density]');
const gasVelocityElement = document.querySelector('[data-js-gas-velocity]');
const velocityTMinElement = document.querySelector('[data-js-velocity-t]');
const minParticleDiameterElement = document.querySelector('[data-js-min-part-diameter]');
const liquidVolumeElement = document.querySelector('[data-js-liquid-volume]');
