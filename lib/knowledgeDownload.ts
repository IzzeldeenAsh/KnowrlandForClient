const DOWNLOAD_KNOWLEDGE_URL = "https://api.foresighta.co/api/account/library/my-knowledge/download";

interface DownloadAccountKnowledgeOptions {
  token?: string | null;
  locale: string;
  filename?: string;
}

const withZipExtension = (filename: string) => {
  const trimmed = filename.trim();
  if (!trimmed) return "knowledge.zip";
  return trimmed.toLowerCase().endsWith(".zip") ? trimmed : `${trimmed}.zip`;
};

const getFilenameFromContentDisposition = (contentDisposition: string, fallback: string) => {
  const utf8Match = contentDisposition.match(/filename\*=UTF-8''([^;]+)/i);
  if (utf8Match?.[1]) {
    return decodeURIComponent(utf8Match[1].replace(/"/g, ""));
  }

  const filenameMatch = contentDisposition.match(/filename="?([^";]+)"?/i);
  if (filenameMatch?.[1]) {
    return decodeURIComponent(filenameMatch[1]);
  }

  return fallback;
};

const readDownloadError = async (response: Response) => {
  try {
    const text = await response.text();
    if (!text.trim()) return `Download failed: ${response.status}`;

    const parsed = JSON.parse(text) as { message?: unknown };
    return typeof parsed.message === "string" ? parsed.message : `Download failed: ${response.status}`;
  } catch {
    return `Download failed: ${response.status}`;
  }
};

export const downloadAccountKnowledge = async (
  knowledgeUUID: string,
  { token, locale, filename = "knowledge.zip" }: DownloadAccountKnowledgeOptions
) => {
  if (!knowledgeUUID) {
    throw new Error("Missing knowledge download id");
  }

  if (typeof window === "undefined" || typeof document === "undefined") {
    throw new Error("Download can only be started in the browser");
  }

  const response = await fetch(`${DOWNLOAD_KNOWLEDGE_URL}/${knowledgeUUID}`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      "Accept-Language": locale,
      "X-Timezone": Intl.DateTimeFormat().resolvedOptions().timeZone,
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    body: JSON.stringify({}),
  });

  if (!response.ok) {
    throw new Error(await readDownloadError(response));
  }

  const blob = await response.blob();
  const fallbackFilename = withZipExtension(filename);
  const resolvedFilename = getFilenameFromContentDisposition(
    response.headers.get("content-disposition") || "",
    fallbackFilename
  );

  const url = window.URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = resolvedFilename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  window.URL.revokeObjectURL(url);
};
