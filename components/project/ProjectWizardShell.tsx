import type { ReactNode } from 'react'
import AnimatedWizardBackground from './AnimatedWizardBackground'
import ProjectViewportLock from './ProjectViewportLock'

type ProjectWizardShellProps = {
  children: ReactNode
  align?: 'center' | 'top'
}

export default function ProjectWizardShell({
  children,
  align = 'center',
}: ProjectWizardShellProps) {
  const containerClassName =
    align === 'top' ? 'w-full h-full overflow-auto' : 'w-full flex justify-center'

  return (
    <section className="fixed inset-0 overflow-hidden bg-white z-0">
      <ProjectViewportLock />
      <AnimatedWizardBackground />
      <div
        className={`absolute left-0 right-0 bottom-0 z-10 flex box-border px-4 sm:px-6 lg:px-8 overflow-hidden ${
          align === 'top'
            ? 'items-start justify-start pt-8'
            : 'items-center justify-center py-10'
        }`}
        style={{ top: 'var(--app-header-height, 0px)' }}
      >
        <div className={containerClassName}>{children}</div>
      </div>
    </section>
  )
}
