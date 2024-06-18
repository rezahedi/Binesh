import ProgressBar from './ProgressBar'

export default function MegaProgressBar({
  steps,
  className
}: {
  steps: {
    title: string,
    steps: number,
    currentStep?: number,
  }[],
  className?: string
}) {

  const sumOfAllSteps = steps.reduce((acc, part) => acc + part.steps, 0);

  return (
    <div className={`${className} flex gap-0.5`}>
      {steps.map((step, index) => (
        <div key={index} style={{width:`${Math.round(step.steps * 100 / sumOfAllSteps)}%`}}>
          <ProgressBar
            title={step.title}
            progress={Math.round( (step.currentStep ? step.currentStep : 0) * 100 / step.steps )}
            focused={index===0}
          />
        </div>
      ))}
    </div>
  )
}
