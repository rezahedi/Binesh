import { LessonsProps } from '@/lib/types'
import { Footprints, MapPin } from 'lucide-react'
import { CenterLeft, LeftCenter, CenterRight, RightCenter } from './'

const treeClasses = [
  'self-center',
  'self-start',
  'self-center',
  'self-end',
]

export default function LessonCard(
  {
    lesson,
    index
  }: {
    lesson: LessonsProps,
    index: number
  }
) {
  return (
    <div key={lesson.id} className={`p-8 w-fit ${treeClasses[index%4]} relative h-36 w-36`}>
      <div className='absolute flex flex-col gap-3 items-center'>
        <button className="group rotate-45 relative inline-flex size-12 items-center justify-center overflow-hidden rounded-full border border-[#a30036] p-6 font-medium text-[#a30036] transition-all duration-100 shadow-[5px_5px_#a30036] hover:translate-y-[3px] hover:shadow-[3px_3px_#a30036] active:translate-y-[7px] active:shadow-[0px_0px_#a30036]">
          <span className='-rotate-45'>
            <Footprints />
          </span>
        </button>
        <span className='text-sm w-36 text-balance text-center'>
          {lesson.name}
        </span>
      </div>
      {/* <a href={`./${params.courseSlug}/${lesson.slug}`}>{lesson.name}</a>
      <p>{lesson.description}</p> */}
      {index%4 === 0 && <CenterLeft className='absolute top-[77px] left-[-110px] w-[454px] text-[#e5e5e5]' />}
      {index%4 === 1 && <LeftCenter className='absolute top-[77px] left-[-52px] w-[250px] text-[#e5e5e5]' />}
      {index%4 === 2 && <CenterRight className='absolute top-[-97px] left-[113px] w-[250px] text-[#e5e5e5]' />}
      {index%4 === 3 && <RightCenter className='absolute top-[77px] left-[-244px] w-[450px] text-[#e5e5e5]' />}
    </div>
  )
}
