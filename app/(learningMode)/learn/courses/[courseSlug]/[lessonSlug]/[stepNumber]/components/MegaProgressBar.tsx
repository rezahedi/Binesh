import ProgressBar from './ProgressBar'

export default function MegaProgressBar({
  parts,
  className
}: {
  parts: { percentage: number, progress: number }[],
  className?: string
}) {

  return (
    <div className={`${className} flex gap-0.5`}>
      {parts.map((data, index) => (
        <div key={index} style={{width:`${data.percentage}%`}}>
          <ProgressBar progress={data.progress} />
        </div>
      ))}
    </div>
  )
}
