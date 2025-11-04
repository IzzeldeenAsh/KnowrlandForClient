export const metadata = {
  title: 'Integrations - Insighta',
  description: 'Page description',
}

import IntegrationsSection from './integrations-section'
import IntegrationsList from './integrations-list'

export default function Integrations() {
  return (
    <>
      <IntegrationsSection />
      <IntegrationsList />
    </>
  )
}
