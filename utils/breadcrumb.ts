interface BreadcrumbItem {
  label: string;
  url: string;
}

export async function fetchBreadcrumb(
  type: 'industry' | 'sub-industry' | 'topic' | 'knowledge',
  identifier: number | string,
  locale: string = 'en'
): Promise<BreadcrumbItem[]> {
  const response = await fetch('https://api.foresighta.co/api/common/setting/breadcrumb', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Accept-Language': locale,
      "X-Timezone": Intl.DateTimeFormat().resolvedOptions().timeZone,
    },
    body: JSON.stringify({
      type,
      identifier
    })
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch breadcrumb: ${response.status} ${response.statusText}`);
  }

  const data = await response.json();
  return data.breadcrumb;
}
