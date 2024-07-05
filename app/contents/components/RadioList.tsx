import { cn } from '@/utils/cn';

export default function RadioList({
  list,
  className='',
}: {
  list: string[];
  className?: string;
}) {

  return (
    <div className='group flex flex-col justify-center'>
      {list.map((option, index) => (
        <label
          key={index}
          htmlFor={`i-${index}`}
          className='cursor-pointer border-2 border-transparent rounded-xl px-2 py-1 has-[:checked]:border-green-500 focus-within:has-[:checked]:border-black'
        >
          <input
            name='radioList'
            className={cn(className, 'outline-none mr-2')}
            type='radio'
            id={`i-${index}`}
            value={option}
          />
          <span className='ml-2'>
            {option}
          </span>
        </label>
      ))}
    </div>
  )
}
