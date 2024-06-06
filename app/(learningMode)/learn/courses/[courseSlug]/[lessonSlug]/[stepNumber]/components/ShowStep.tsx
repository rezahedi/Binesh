
type Step = {
  title: string,
  content: () => React.ReactNode,
  answer: number | undefined,
}

export default function ShowStep(
  {
    title,
    content: Content,
    answer,
    checkAnswer
  }:
    Step &
    { checkAnswer: (answer: number) => boolean }
) {
  return (
    <>
      <Content />
    </>
  )
}
