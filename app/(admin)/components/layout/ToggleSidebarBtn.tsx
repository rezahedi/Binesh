'use client'

export default function ToggleSidebarBtn({children, className=''}: {children: React.ReactNode, className?: string}) {
  return (
    <button
      className={className}     
      onClick={() => document.getElementById('sidebarNav')?.classList.toggle('isOpen')}
    >
      {children}
    </button>
  );
}