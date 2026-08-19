import type { ReactNode } from 'react'
import CourseIcon from './CourseIcon'
import DataIcon from './DataIcon'
import InsightIcon from './InsightIcon'
import ManualIcon from './ManualIcon'
import ReportIcon from './ReportIcon'

type KnowledgeTypeIconProps = {
  type: string
  size?: number
  className?: string
}

function normalizeKnowledgeType(type: string): string {
  return type.trim().toLowerCase().replace(/[\s_]+/g, '-')
}

export default function KnowledgeTypeIcon({ type, size = 20, className }: KnowledgeTypeIconProps) {
  const iconProps = { width: size, height: size }
  let icon: ReactNode

  switch (normalizeKnowledgeType(type)) {
    case 'report':
      icon = <ReportIcon {...iconProps} />
      break
    case 'manual':
      icon = <ManualIcon {...iconProps} />
      break
    case 'data':
      icon = <DataIcon {...iconProps} />
      break
    case 'course':
    case 'article':
    case 'white-paper':
      icon = <CourseIcon {...iconProps} />
      break
    case 'statistic':
    case 'statistics':
    case 'insight':
    default:
      icon = <InsightIcon {...iconProps} />
      break
  }

  return (
    <span
      aria-hidden="true"
      className={`inline-flex shrink-0 items-center justify-center leading-none${className ? ` ${className}` : ''}`}
      style={{ width: size, height: size }}
    >
      {icon}
    </span>
  )
}
