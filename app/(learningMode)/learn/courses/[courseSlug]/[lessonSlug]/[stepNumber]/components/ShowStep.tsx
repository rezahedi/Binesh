
export default function ShowStep(
  { title, content: Content, answer, checkAnswer }:
  {
    title: string,
    content: () => React.ReactNode,
    answer: number,
    checkAnswer: (answer: number) => boolean
  }
) {
  return (
    <>
      <Content />
    </>
  )
}
