import ProgressBar from './ProgressBar'

export default function MegaProgressBar({
  steps,
  className
}: {
  steps: { percentage: number, progress: number }[],
  className?: string
}) {

  return (
    <div className={`${className} flex gap-0.5`}>
      {steps.map((step, index) => (
        <div key={index} style={{width:`${step.percentage}%`}}>
          <ProgressBar progress={step.progress} />
        </div>
      ))}
    </div>
  )
}
