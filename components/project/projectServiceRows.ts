/** A project service as the wizard lists it, parsed from `project/show`'s `project_services`. */
export type ProjectServiceRow = {
  uuid: string
  position: number
  name: string
  serviceId: number | null
  isOther: boolean
  slug: string
  prompt: string
  scopeNames: string[]
  subscopeCount: number
  deliverables: Array<{ title: string; period_days: number }>
}

export function toProjectServiceRows(projectServices: unknown): ProjectServiceRow[] {
  if (!Array.isArray(projectServices)) return []

  return projectServices
    .map((item: any) => {
      const service = item?.service ?? {}
      const deliverables = (Array.isArray(item?.components) ? item.components : [])
        .flatMap((block: any) => block?.['deliverable-stage']?.deliverables ?? [])
        .map((d: any) => ({ title: String(d?.title || ''), period_days: Number(d?.period_days) || 0 }))

      return {
        uuid: String(item?.uuid || ''),
        position: Number(item?.position) || 0,
        name: String(item?.title || service?.name || ''),
        serviceId: Number.isFinite(Number(service?.id)) ? Number(service.id) : null,
        isOther: String(service?.slug || '') === 'other',
        slug: String(service?.slug || ''),
        prompt: String(item?.prompt_ai || ''),
        scopeNames: (Array.isArray(item?.scopes) ? item.scopes : [])
          .map((scope: any) => String(scope?.scope || ''))
          .filter(Boolean),
        subscopeCount: (Array.isArray(item?.scopes) ? item.scopes : []).reduce(
          (sum: number, scope: any) => sum + (Array.isArray(scope?.children) ? scope.children.length : 0),
          0
        ),
        deliverables,
      }
    })
    .filter((row) => row.uuid)
    .sort((a, b) => a.position - b.position)
}
