import { Fragment } from 'react'

type Breadcrumb = {
  label: string
  href?: string
}

export function InsighterGuideHero({
  isRTL,
  breadcrumbs,
  title,
  subtitle,
}: {
  isRTL: boolean
  breadcrumbs: Breadcrumb[]
  title: string
  subtitle?: string
}) {
  return (
    <div className="relative overflow-hidden px-4 sm:px-12 py-8 md:py-24 mb-6 md:mb-8">
      <div
        className="absolute inset-0 bg-center bg-cover"
        style={{
          backgroundImage:
            "url('https://res.cloudinary.com/dsiku9ipv/image/upload/v1770102117/pattern_lj3gmd.png')",
          transform: isRTL ? 'scaleX(-1)' : 'none',
          transformOrigin: 'center',
          backgroundPositionX: isRTL ? '1%' : '1%',
          backgroundSize: isRTL ? '95% 100%' : '100% 95%',
        }}
        aria-hidden="true"
      />
      {/* Brighter/less dark overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-white/30 via-white/20 to-white/20" aria-hidden="true" />

      <div className="relative z-10 px-4 sm:px-12">
        {/* Breadcrumbs + Hero Title Section (with bg + overlay) */}
        <nav
          className={`mb-6 text-xs md:text-sm ps-6 md:ps-0 ${isRTL ? 'text-right' : 'text-left'}`}
          aria-label="Breadcrumb"
        >
          <ol className="flex items-center gap-2 text-gray-700/80 flex-wrap">
            {breadcrumbs.map((crumb, index) => (
              <Fragment key={`${crumb.label}-${index}`}>
                <li>
                  {crumb.href ? (
                    <a href={crumb.href} className="hover:text-gray-900 transition-colors">
                      {crumb.label}
                    </a>
                  ) : (
                    <span className="text-[#013175] font-bold" aria-current="page">
                      {crumb.label}
                    </span>
                  )}
                </li>
                {index < breadcrumbs.length - 1 && (
                  <li>
                    <span className="text-gray-400">/</span>
                  </li>
                )}
              </Fragment>
            ))}
          </ol>
        </nav>

        {/* Hero Title Section */}
        <div className="text-center ">
          <div
            className={`flex flex-col align-center justify-center gap-2 ${isRTL ? 'text-right' : 'text-left'} text-left`}
            style={{ lineHeight: '1.3' }}
          >
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-[#013175]">
              {title}
            </h1>
            {subtitle && <h2 className="text-3xl sm:text-4xl md:text-4xl font-medium text-[#7D7D7D]">{subtitle}</h2>}
          </div>
        </div>
      </div>
    </div>
  )
}
