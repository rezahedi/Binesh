export const getAnswerFeedbackClasses = (result: boolean | null) => {
  if (result === null) return ``;

  return result === true
    ? `has-checked:border-quiz-success-dark has-checked:bg-quiz-success-light has-checked:text-quiz-success-dark after:text-quiz-success-light relative after:hidden has-checked:after:block after:content-['✔'] after:absolute after:-top-2 after:-right-2 after:px-2 after:py-0.5 after:rounded-lg after:bg-quiz-success-dark`
    : `has-checked:border-quiz-error-dark has-checked:bg-quiz-error-light has-checked:text-quiz-error-dark after:text-quiz-error-light relative after:hidden has-checked:after:block after:content-['✘'] after:absolute after:-top-2 after:-right-2 after:px-2 after:py-0.5 after:rounded-lg after:bg-quiz-error-dark`;
};
