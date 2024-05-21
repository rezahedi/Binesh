import Link from 'next/link';

export default function CourseCard(props: any) {
  let {
    id,
    name,
    description,
    slug,
    image,
    level='',
    categoryID,
    category,
    progress=-1,
    ...rest
  } = props;

  if (progress>100) progress = 100;

  return (
    <Link href={`${process.env.NEXT_APP_BASE}/courses/${slug}`}
      className="p-6 border border-gray-200 rounded-xl
        shadow-[2px_2px_0_rgba(0,0,0,0.1)]
        hover:shadow-[4px_4px_0_rgba(0,0,0,0.1)] hover:border-black
        transition-all duration-300
        flex flex-col gap-2">
      <img src={image} alt={name} width={96} height={96} loading="lazy" className="pb-1" />
      <p className="uppercase text-xs font-medium text-orange-600">
        {category.name}
        {level && ` . LEVEL ${level}`}&nbsp;
      </p>
      <h4 className="flex-1 text-lg font-semibold text-balance">
        {name}
      </h4>
      {progress>-1 &&
        <div className="flex w-full h-2 bg-gray-100 rounded-full overflow-hidden" role="progressbar" aria-valuenow={progress} aria-valuemin={0} aria-valuemax={100}>
          <div className="flex flex-col justify-center rounded-full overflow-hidden bg-[#179E7E] text-xs text-white text-center whitespace-nowrap transition duration-500" style={{width:`${progress}%`}}></div>
        </div>
      }
    </Link>
  )
}
