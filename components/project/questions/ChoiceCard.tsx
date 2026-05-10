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

  const indicatorPos =
    size === 'sm'
      ? `absolute top-3 ${isRTL ? 'left-3' : 'right-3'}`
      : size === 'lg'
        ? `absolute top-5 ${isRTL ? 'left-6' : 'right-6'}`
        : `absolute top-4 ${isRTL ? 'left-6' : 'right-6'}`

  const indicatorSize = size === 'sm' ? 'h-5 w-5' : 'h-6 w-6'
  const checkIconSize = size === 'sm' ? 12 : 14
  const resolvedIconSize = iconSize ?? (size === 'sm' ? 44 : size === 'lg' ? 64 : 56)
  const titleTextClassName =
    size === 'sm' ? 'text-lg' : size === 'lg' ? 'text-xl' : 'text-lg'
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
      <span
        className={`${indicatorPos} box-border inline-flex aspect-square shrink-0 items-center justify-center ${indicatorSize} border transition-colors ${
          role === 'checkbox' ? 'rounded-md' : 'rounded-full'
        } ${
          checked ? 'border-blue-600 bg-blue-600' : 'border-slate-300 bg-white/80'
        }`}
        aria-hidden="true"
      >
        {checked ? (
          role === 'checkbox' ? (
            <IconCheck size={checkIconSize} stroke={3} className="text-white" />
          ) : (
            <span className="h-2 w-2 rounded-full bg-white" />
          )
        ) : null}
      </span>

      <div
        className={`flex h-full flex-col ${contentPaddingClassName} ${contentAlign} ${contentClassName}`}
      >
        {resolvedIcon ? (
          <span
            className={`inline-flex shrink-0 items-center justify-center text-blue-600 opacity-95 transition-transform duration-300 ease-out [&>svg]:h-full [&>svg]:w-full ${
              checked
                ? 'scale-105 drop-shadow-[0_6px_18px_rgba(37,99,235,0.25)]'
                : 'group-hover:scale-105 group-hover:-rotate-1'
            }`}
            style={{ width: resolvedIconSize, height: resolvedIconSize }}
            aria-hidden="true"
          >
            {resolvedIcon}
          </span>
        ) : null}

        <div className="space-y-1">
          <div
            className={`${titleTextClassName} font-bold bg-gradient-to-r from-sky-600 via-cyan-500 to-cyan-500 bg-clip-text text-transparent ${titleClassName}`}
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
