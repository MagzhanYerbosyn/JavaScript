let currentSizingStep = 0;

const updateSizingNav = () => {
  const isFirst = currentSizingStep === 0;
  const isLast = currentSizingStep === sizingSections.length - 1;

  sizingPrevButton.disabled = isFirst;
  sizingNextButton.disabled = isLast;
  sizingNextButton.textContent = isLast ? 'Finish' : 'Next step →';
};

const showSizingStep = (index) => {
  sizingSections.forEach((section, i) => {
    section.hidden = i !== index;
  });

  currentSizingStep = index;
  updateSizingNav();

  sizingSections[index]?.scrollIntoView({ behavior: 'smooth', block: 'start' });
};

sizingPrevButton.addEventListener('click', () => {
  if (currentSizingStep > 0) {
    showSizingStep(currentSizingStep - 1);
  }
});

sizingNextButton.addEventListener('click', () => {
  if (currentSizingStep < sizingSections.length - 1) {
    showSizingStep(currentSizingStep + 1);
  }
});

showSizingStep(0);
