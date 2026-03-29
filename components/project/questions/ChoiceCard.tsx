'use client'

import type { ComponentType, ReactNode } from 'react'
import { cloneElement, isValidElement } from 'react'
import { IconCheck } from '@tabler/icons-react'

type IconComponent = ComponentType<{
  size?: number
  stroke?: number
  className?: string
}>

type IconRenderProps = {
  size: number
  stroke: number
  className?: string
}

type ChoiceCardProps = {
  role?: 'radio' | 'checkbox'
  checked: boolean
  title: string
  subtitle?: string
  icon?: ReactNode
  Icon?: IconComponent
  renderIcon?: (props: IconRenderProps) => ReactNode
  size?: 'sm' | 'md' | 'lg'
  iconSize?: number
  iconStroke?: number
  iconClassName?: string
  onSelect: () => void
  entered?: boolean
  delayMs?: number
  isRTL?: boolean
  align?: 'start' | 'center'
  className?: string
  contentClassName?: string
  titleClassName?: string
  subtitleClassName?: string
  childrenClassName?: string
  children?: ReactNode
}

export default function ChoiceCard({
  role = 'radio',
  checked,
  title,
  subtitle,
  icon,
  Icon,
  renderIcon,
  size = 'md',
  iconSize,
  iconStroke = 1.6,
  iconClassName = '',
  onSelect,
  entered = true,
  delayMs = 0,
  isRTL = false,
  align = 'center',
  className = '',
  contentClassName = '',
  titleClassName = '',
  subtitleClassName = '',
  childrenClassName = '',
  children,
}: ChoiceCardProps) {
  const contentAlign =
    align === 'center'
      ? 'items-center text-center'
      : 'items-start text-start'

  const radiusClassName =
    size === 'sm' ? 'rounded-2xl' : size === 'lg' ? 'rounded-[2rem]' : 'rounded-3xl'

  const contentPaddingClassName =
    size === 'sm'
      ? 'gap-3 px-4 py-5'
      : size === 'lg'
        ? 'gap-5 px-7 py-8'
        : 'gap-4 px-6 py-7'

  const checkBadgeClassName =
    size === 'sm'
      ? `absolute top-3 ${isRTL ? 'left-3' : 'right-3'} inline-flex h-9 w-9 items-center justify-center rounded-full bg-blue-600 text-white`
      : size === 'lg'
        ? `absolute top-5 ${isRTL ? 'left-5' : 'right-5'} inline-flex h-8 w-8 items-center justify-center rounded-full bg-blue-600 text-white `
        : `absolute top-4 ${isRTL ? 'left-4' : 'right-4'} inline-flex h-8 w-8 items-center justify-center rounded-full bg-blue-600 text-white `

  const checkIconSize = size === 'sm' ? 18 : size === 'lg' ? 24 : 22
  const resolvedIconSize = iconSize ?? (size === 'sm' ? 44 : size === 'lg' ? 64 : 56)
  const titleTextClassName =
    size === 'sm' ? 'text-base' : size === 'lg' ? 'text-xl' : 'text-lg'
  const subtitleTextClassName =
    size === 'sm' ? 'text-xs' : size === 'lg' ? 'text-base' : 'text-sm'

  let resolvedIcon: ReactNode = null
  if (renderIcon) {
    resolvedIcon = renderIcon({
      size: resolvedIconSize,
      stroke: iconStroke,
      className: iconClassName,
    })
  } else if (Icon) {
    resolvedIcon = (
      <Icon size={resolvedIconSize} stroke={iconStroke} className={iconClassName} />
    )
  } else if (icon) {
    if (isValidElement(icon) && typeof icon.type === 'string' && icon.type === 'svg') {
      const existingClassName = (icon.props as { className?: string }).className ?? ''
      resolvedIcon = cloneElement(icon as any, {
        width: resolvedIconSize,
        height: resolvedIconSize,
        className: `${existingClassName} ${iconClassName}`.trim(),
      })
    } else {
      resolvedIcon = icon
    }
  }

  return (
    <button
      type="button"
      role={role}
      aria-checked={checked}
      aria-label={title}
      onClick={onSelect}
      className={`group relative h-full w-full transform-gpu border shadow-sm backdrop-blur-md transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-300 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent ${radiusClassName} ${
        checked
          ? 'border-blue-400 bg-white/70 shadow-md'
          : 'border-white/30 bg-white/40 hover:-translate-y-0.5 hover:border-white/50 hover:bg-white/55 hover:shadow-md'
      } ${
        entered
          ? 'opacity-100 translate-x-0'
          : isRTL
            ? 'opacity-0 translate-x-4'
            : 'opacity-0 -translate-x-4'
      } ${className}`}
      style={{ transitionDelay: `${delayMs}ms` }}
    >
      {checked ? (
        <span className={checkBadgeClassName} aria-hidden="true">
          <IconCheck size={checkIconSize} stroke={3} />
        </span>
      ) : null}

      <div
        className={`flex h-full flex-col ${contentPaddingClassName} ${contentAlign} ${contentClassName}`}
      >
        {resolvedIcon ? (
          <span
            className="inline-flex shrink-0 items-center justify-center text-blue-600 opacity-95 [&>svg]:h-full [&>svg]:w-full"
            style={{ width: resolvedIconSize, height: resolvedIconSize }}
            aria-hidden="true"
          >
            {resolvedIcon}
          </span>
        ) : null}

        <div className="space-y-1">
          <div
            className={`${titleTextClassName} font-bold ${
              checked ? 'text-[#2563eb]' : 'text-slate-900'
            } ${titleClassName}`}
          >
            {title}
          </div>
          {subtitle ? (
            <div
              className={`${subtitleTextClassName} font-semibold text-slate-600 ${subtitleClassName}`}
            >
              {subtitle}
            </div>
          ) : null}
        </div>

        {children ? (
          <div className={`w-full flex-1 flex flex-col ${childrenClassName}`}>
            {children}
          </div>
        ) : null}
      </div>
    </button>
  )
}
