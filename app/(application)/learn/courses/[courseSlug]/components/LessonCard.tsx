import { LessonsProps } from '@/lib/types'
import { Footprints, MapPin } from 'lucide-react'
import { CenterLeft, LeftCenter, CenterRight, RightCenter } from './'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@admin/components/ui/popover"

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
        <Popover>
          <PopoverTrigger asChild>
            <button className="group rotate-45 relative inline-flex size-12 items-center justify-center overflow-hidden rounded-full border border-orange-600 p-6 font-medium text-orange-600 transition-all duration-100 shadow-[5px_5px] hover:translate-y-[3px] hover:shadow-[3px_3px] active:translate-y-[7px] active:shadow-[0px_0px]">
              <span className='-rotate-45'>
                <Footprints />
              </span>
            </button>
          </PopoverTrigger>
          <PopoverContent className="flex flex-col gap-4 items-center w-80 p-6 rounded-xl overflow-hidden bg-white text-balance text-center shadow-xl shadow-[0px_0px_25px_-5px_#0000003b]">
            <h3 className='text-xl font-bold'>
              {lesson.name}
            </h3>
            <p>
              {lesson.description}
            </p>
            <button className='mt-2 font-semibold rounded-full text-orange-600 border-2 border-orange-600 p-2 w-32'>
              Start lesson
            </button>
          </PopoverContent>
        </Popover>
        <span className='text-sm w-36 text-balance text-center'>
          {lesson.name}
        </span>
      </div>
      {index%4 === 0 && <CenterLeft className='absolute top-[77px] left-[-110px] w-[454px] text-[#e5e5e5]' />}
      {index%4 === 1 && <LeftCenter className='absolute top-[77px] left-[-52px] w-[250px] text-[#e5e5e5]' />}
      {index%4 === 2 && <CenterRight className='absolute top-[-97px] left-[113px] w-[250px] text-[#e5e5e5]' />}
      {index%4 === 3 && <RightCenter className='absolute top-[77px] left-[-244px] w-[450px] text-[#e5e5e5]' />}
    </div>
  )
}
