const myKatexRender = (formula, element) => {
  katex.render(formula, element, {
    throwOnError: false,
    displayMode: true,
  });
};
