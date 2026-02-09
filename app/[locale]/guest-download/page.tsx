"use client";

import React, { useCallback, useMemo, useState } from "react";
import { useParams, useSearchParams } from "next/navigation";
import type { ReadonlyURLSearchParams } from "next/navigation";
import { Anchor, Button, Center, Container, Group, Modal, Paper, Stack, Text, ThemeIcon, Title } from "@mantine/core";
import { useToast } from "@/components/toast/ToastContext";
import { IconClockExclamation } from "@tabler/icons-react";

function getQueryParamTrimmed(searchParams: ReadonlyURLSearchParams, key: string): string {
  const direct = searchParams.get(key);
  if (direct && direct.trim()) return direct.trim();

  // Robust fallback for cases like: `order_uuid%20=...` (i.e., key becomes `order_uuid `).
  let found = "";
  searchParams.forEach((v, k) => {
    if (found) return;
    if (k.trim() === key && v && v.trim()) found = v.trim();
  });
  if (found) return found;
  return "";
}

type ApiErrorShape = {
  type?: string;
  message?: string;
  errors?: Record<string, unknown>;
};

async function safeReadJson(response: Response): Promise<unknown> {
  const ct = response.headers.get("content-type") || "";
  if (!ct.toLowerCase().includes("application/json")) return null;
  try {
    return await response.json();
  } catch {
    return null;
  }
}

function isInvalidPermission422(response: Response, body: unknown): boolean {
  if (response.status !== 422) return false;
  if (!body || typeof body !== "object") return false;
  const b = body as ApiErrorShape;
  if (typeof b.message === "string" && b.message.toLowerCase().includes("invalid permission")) return true;
  const msg = (b.errors as any)?.message;
  if (Array.isArray(msg) && msg.some((m) => typeof m === "string" && m.toLowerCase().includes("invalid permission")))
    return true;
  return false;
}

export default function GuestDownloadPage() {
  const params = useParams();
  const locale = params.locale as string;
  const isRTL = locale === "ar";
  const searchParams = useSearchParams();
  const toast = useToast();

  const orderUuid = useMemo(() => getQueryParamTrimmed(searchParams, "order_uuid"), [searchParams]);
  const tokenFromUrl = useMemo(() => getQueryParamTrimmed(searchParams, "token"), [searchParams]);

  const [isDownloading, setIsDownloading] = useState(false);
  const [isExpiredModalOpen, setIsExpiredModalOpen] = useState(false);

  const triggerGuestDownload = useCallback(async () => {
    setIsDownloading(true);
    try {
      if (!orderUuid) throw new Error("Missing order_uuid");

      const guestToken = tokenFromUrl || localStorage.getItem("guest-token") || "";
      if (!guestToken) throw new Error("Missing token");

      // Persist token from URL so other pages can reuse it (same pattern as checkout).
      if (tokenFromUrl) localStorage.setItem("guest-token", tokenFromUrl);

      const response = await fetch(
        `https://api.foresighta.co/api/platform/guest/order/knowledge/download/${orderUuid}`,
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Accept-Language": locale,
            "X-Timezone": Intl.DateTimeFormat().resolvedOptions().timeZone,
            "X-GUEST-TOKEN": guestToken,
          },
        }
      );

      if (!response.ok) {
        const body = await safeReadJson(response);
        if (isInvalidPermission422(response, body)) {
          setIsExpiredModalOpen(true);
          return;
        }
        const apiMessage =
          body && typeof body === "object" && typeof (body as any).message === "string" ? (body as any).message : "";
        throw new Error(apiMessage || `Download failed: ${response.status}`);
      }

      const blob = await response.blob();
      const cd = response.headers.get("content-disposition") || "";
      const match = cd.match(/filename\*?=(?:UTF-8''|")?([^\";]+)"?/i);
      const filename = match?.[1] ? decodeURIComponent(match[1]) : "download.zip";

      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);

      toast.success(isRTL ? "تم بدء التنزيل" : "Download started");
    } catch (e: any) {
      const message = typeof e?.message === "string" ? e.message : "Failed to download";
      toast.error(message);
    } finally {
      setIsDownloading(false);
    }
  }, [isRTL, locale, orderUuid, toast, tokenFromUrl]);

  const canDownload = Boolean(orderUuid) && Boolean(tokenFromUrl || (typeof window !== "undefined" && localStorage.getItem("guest-token")));

  return (
    <Container size="sm" py={48}>
      <Modal
        opened={isExpiredModalOpen}
        onClose={() => setIsExpiredModalOpen(false)}
        centered
        withCloseButton
        title={isRTL ? "انتهت صلاحية الرابط" : "Link expired"}
      >
        <Stack gap={10}>
          <Center>
            <ThemeIcon color="orange" variant="light" size={56} radius="xl">
              <IconClockExclamation size={30} />
            </ThemeIcon>
          </Center>
          <Text size="sm" c="dimmed">
            {isRTL
              ? "لقد تجاوزت المدة المسموح بها لإعادة التنزيل (24 ساعة من وقت الشراء)، لذلك انتهت صلاحية هذا الرابط."
              : "You’ve passed the allowed re-download window (24 hours from purchase), so this link has expired."}
          </Text>
          <Text size="sm" c="dimmed">
            {isRTL ? (
              <>
                إذا كنت بحاجة إلى مساعدة،{" "}
                <Anchor href="https://foresighta.co/en/contact" target="_blank" rel="noopener noreferrer">
                  تواصل مع الدعم
                </Anchor>{" "}
                وارفق رقم الطلب.
              </>
            ) : (
              <>
                If you need help, please{" "}
                <Anchor href="https://foresighta.co/en/contact" target="_blank" rel="noopener noreferrer">
                  contact support
                </Anchor>{" "}
                and include your order number.
              </>
            )}
          </Text>
          {orderUuid ? (
            <Text size="sm">
              <strong>{isRTL ? "رقم الطلب:" : "Order:"}</strong> {orderUuid}
            </Text>
          ) : null}
          <Group justify="flex-end" mt={6}>
            <Button
              className="bg-gradient-to-r from-blue-500 to-teal-400 hover:from-blue-600 hover:to-teal-500 transition-all"
              onClick={() => setIsExpiredModalOpen(false)}
            >
              {isRTL ? "حسنًا" : "OK"}
            </Button>
          </Group>
        </Stack>
      </Modal>
      <Paper withBorder radius="md" p="lg">
        <Stack gap={20} flex={1} align="center" justify="center">
          <Title order={2}>{isRTL ? " إعادة تنزيل المعرفة "  : "Re-download Insight"}</Title>
          <Text c="dimmed" size="sm" ta="center" maw={520}>
            {isRTL
              ? "هذا الرابط مخصص لإعادة تنزيل المعرفة، وهو صالح لمدة 24 ساعة فقط من وقت الشراء. يرجى تنزيل ملفك قبل انتهاء صلاحية الرابط."
              : "This link is for re-downloading your Insight and is valid for 24 hours from the time of purchase. Please download your file before the link expires."}
          </Text>
          <svg width="107" height="110" viewBox="0 0 107 110" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M0 103.148V29.8705C0 26.322 2.87668 23.4453 6.42521 23.4453H30.433C32.1171 23.4453 33.7554 23.9942 35.0996 25.0089L42.4353 30.5462C43.7795 31.5608 45.4177 32.1097 47.1019 32.1097H100.509C104.058 32.1097 106.934 34.9864 106.934 38.5349V103.149C106.934 106.933 103.867 110 100.083 110H6.85187C3.06768 110 0 106.933 0 103.148Z" fill="url(#paint0_linear_222_1109)"/>
<path d="M88.9661 104.378H17.9539C13.039 104.378 9.05469 100.394 9.05469 95.4786V8.89924C9.05469 3.98432 13.039 0 17.9539 0H88.9661C93.881 0 97.8653 3.98432 97.8653 8.89924V95.4786C97.8653 100.394 93.881 104.378 88.9661 104.378Z" fill="white"/>
<path d="M88.8156 103.906H18.1048C13.2964 103.906 9.39844 100.008 9.39844 95.1992V9.17805C9.39844 4.36969 13.2964 0.47168 18.1048 0.47168H88.8156C93.624 0.47168 97.522 4.36963 97.522 9.17805V95.1992C97.522 100.008 93.6241 103.906 88.8156 103.906Z" fill="#FAFAFA"/>
<path d="M88.6651 103.434H18.2556C13.5538 103.434 9.74219 99.6225 9.74219 94.9206V9.45778C9.74219 4.75591 13.5538 0.944336 18.2556 0.944336H88.665C93.3669 0.944336 97.1785 4.75591 97.1785 9.45778V94.9206C97.1785 99.6224 93.3669 103.434 88.6651 103.434Z" fill="#F6F6F6"/>
<path d="M88.5145 102.962H18.4065C13.8111 102.962 10.0859 99.2365 10.0859 94.6411V9.73653C10.0859 5.14121 13.8111 1.41602 18.4065 1.41602H88.5145C93.1098 1.41602 96.835 5.14121 96.835 9.73653V94.6411C96.835 99.2364 93.1098 102.962 88.5145 102.962Z" fill="#F1F1F1"/>
<path d="M88.364 102.49H18.5573C14.0686 102.49 10.4297 98.8514 10.4297 94.3626V10.0163C10.4297 5.52756 14.0686 1.88867 18.5573 1.88867H88.364C92.8528 1.88867 96.4917 5.52756 96.4917 10.0163V94.3626C96.4917 98.8514 92.8528 102.49 88.364 102.49Z" fill="#EDEDED"/>
<path d="M88.2135 102.018H18.7082C14.3259 102.018 10.7734 98.4654 10.7734 94.0832V10.2951C10.7734 5.91286 14.3259 2.36035 18.7082 2.36035H88.2135C92.5957 2.36035 96.1482 5.91286 96.1482 10.2951V94.0832C96.1482 98.4654 92.5957 102.018 88.2135 102.018Z" fill="#E8E8E8"/>
<path d="M88.0629 101.545H18.859C14.5833 101.545 11.1172 98.0793 11.1172 93.8037V10.5738C11.1172 6.29817 14.5833 2.83203 18.859 2.83203H88.0629C92.3386 2.83203 95.8047 6.29817 95.8047 10.5738V93.8036C95.8047 98.0793 92.3386 101.545 88.0629 101.545Z" fill="#E4E4E4"/>
<path d="M87.9125 101.074H19.0099C14.8407 101.074 11.4609 97.6943 11.4609 93.5252V10.8536C11.4609 6.68445 14.8407 3.30469 19.0099 3.30469H87.9125C92.0817 3.30469 95.4614 6.68445 95.4614 10.8536V93.5251C95.4614 97.6943 92.0816 101.074 87.9125 101.074Z" fill="#DFDFDF"/>
<path d="M87.7619 100.602H19.1607C15.0981 100.602 11.8047 97.3082 11.8047 93.2456V11.1324C11.8047 7.06975 15.0981 3.77637 19.1607 3.77637H87.7619C91.8245 3.77637 95.1179 7.06975 95.1179 11.1324V93.2456C95.1179 97.3082 91.8245 100.602 87.7619 100.602Z" fill="#DBDBDB"/>
<path d="M87.6113 100.129H19.3115C15.3554 100.129 12.1484 96.9222 12.1484 92.9661V11.4111C12.1484 7.45505 15.3554 4.24805 19.3115 4.24805H87.6113C91.5674 4.24805 94.7744 7.45505 94.7744 11.4111V92.9661C94.7744 96.9222 91.5674 100.129 87.6113 100.129Z" fill="#D6D6D6"/>
<path d="M87.4609 99.6578H19.4623C15.6128 99.6578 12.4922 96.5371 12.4922 92.6876V11.6908C12.4922 7.84134 15.6128 4.7207 19.4623 4.7207H87.4608C91.3103 4.7207 94.4309 7.84134 94.4309 11.6908V92.6876C94.431 96.5371 91.3104 99.6578 87.4609 99.6578Z" fill="#D2D2D2"/>
<path d="M87.3103 99.1854H19.6132C15.8703 99.1854 12.8359 96.1512 12.8359 92.4082V11.9696C12.8359 8.2267 15.8702 5.19238 19.6132 5.19238H87.3103C91.0533 5.19238 94.0876 8.22664 94.0876 11.9696V92.4082C94.0876 96.1512 91.0533 99.1854 87.3103 99.1854Z" fill="#CDCDCD"/>
<path d="M87.1598 98.713H19.764C16.1276 98.713 13.1797 95.7651 13.1797 92.1286V12.2484C13.1797 8.61195 16.1276 5.66406 19.764 5.66406H87.1598C90.7962 5.66406 93.7441 8.61195 93.7441 12.2484V92.1287C93.7441 95.7651 90.7962 98.713 87.1598 98.713Z" fill="#C8C8C8"/>
<path d="M87.0093 98.2415H19.9148C16.3849 98.2415 13.5234 95.38 13.5234 91.8501V12.5281C13.5234 8.99823 16.3849 6.13672 19.9148 6.13672H87.0093C90.5391 6.13672 93.4007 8.99823 93.4007 12.5281V91.8501C93.4007 95.38 90.5391 98.2415 87.0093 98.2415Z" fill="#C4C4C4"/>
<path d="M86.8587 97.7692H20.0657C16.6424 97.7692 13.8672 94.994 13.8672 91.5707V12.8069C13.8672 9.38359 16.6424 6.6084 20.0657 6.6084H86.8587C90.2821 6.6084 93.0573 9.38359 93.0573 12.8069V91.5707C93.0573 94.994 90.2821 97.7692 86.8587 97.7692Z" fill="#BFBFBF"/>
<path d="M86.7043 97.2968H20.2126C16.8958 97.2968 14.207 94.6079 14.207 91.2912V13.0857C14.207 9.7689 16.8958 7.08008 20.2126 7.08008H86.7043C90.0211 7.08008 92.7099 9.7689 92.7099 13.0857V91.2912C92.7099 94.608 90.0211 97.2968 86.7043 97.2968Z" fill="#BBBBBB"/>
<path d="M86.5577 96.8253H20.3674C17.1571 96.8253 14.5547 94.2229 14.5547 91.0127V13.3654C14.5547 10.1552 17.1571 7.55273 20.3674 7.55273H86.5577C89.768 7.55273 92.3703 10.1552 92.3703 13.3654V91.0127C92.3703 94.223 89.7679 96.8253 86.5577 96.8253Z" fill="#B6B6B6"/>
<path d="M86.4032 96.3529H20.5143C17.4105 96.3529 14.8945 93.8368 14.8945 90.7331V13.6442C14.8945 10.5404 17.4106 8.02441 20.5143 8.02441H86.4032C89.507 8.02441 92.023 10.5405 92.023 13.6442V90.7331C92.023 93.8369 89.5069 96.3529 86.4032 96.3529Z" fill="#B2B2B2"/>
<path d="M86.2567 95.8816H20.6691C17.6719 95.8816 15.2422 93.4519 15.2422 90.4547V13.9239C15.2422 10.9268 17.6719 8.49707 20.6691 8.49707H86.2566C89.2538 8.49707 91.6835 10.9268 91.6835 13.9239V90.4547C91.6835 93.4519 89.2538 95.8816 86.2567 95.8816Z" fill="#ADADAD"/>
<path d="M86.1022 95.4091H20.816C17.9253 95.4091 15.582 93.0658 15.582 90.1752V14.2027C15.582 11.3121 17.9253 8.96875 20.816 8.96875H86.1022C88.9928 8.96875 91.3361 11.3121 91.3361 14.2027V90.1752C91.3361 93.0658 88.9928 95.4091 86.1022 95.4091Z" fill="#A9A9A9"/>
<path d="M85.9516 94.9367H20.9668C18.1827 94.9367 15.9258 92.6798 15.9258 89.8957V14.4814C15.9258 11.6974 18.1827 9.44043 20.9668 9.44043H85.9516C88.7357 9.44043 90.9927 11.6974 90.9927 14.4814V89.8957C90.9927 92.6798 88.7358 94.9367 85.9516 94.9367Z" fill="#A4A4A4"/>
<path d="M85.8012 94.4653H21.1177C18.4402 94.4653 16.2695 92.2948 16.2695 89.6172V14.7612C16.2695 12.0837 18.4401 9.91309 21.1177 9.91309H85.8012C88.4787 9.91309 90.6493 12.0837 90.6493 14.7612V89.6172C90.6493 92.2948 88.4787 94.4653 85.8012 94.4653Z" fill="#A0A0A0"/>
<path d="M85.6506 93.9929H21.2685C18.6975 93.9929 16.6133 91.9087 16.6133 89.3377V15.04C16.6133 12.469 18.6975 10.3848 21.2685 10.3848H85.6506C88.2216 10.3848 90.3058 12.469 90.3058 15.04V89.3377C90.3058 91.9087 88.2216 93.9929 85.6506 93.9929Z" fill="#9B9B9B"/>
<path d="M85.5001 93.5205H21.4193C18.9548 93.5205 16.957 91.5227 16.957 89.0582V15.3187C16.957 12.8543 18.9548 10.8564 21.4193 10.8564H85.5001C87.9645 10.8564 89.9623 12.8543 89.9623 15.3187V89.0582C89.9624 91.5227 87.9645 93.5205 85.5001 93.5205Z" fill="#979797"/>
<path d="M85.3496 93.0491H21.5702C19.2123 93.0491 17.3008 91.1376 17.3008 88.7797V15.5985C17.3008 13.2405 19.2123 11.3291 21.5702 11.3291H85.3496C87.7075 11.3291 89.6189 13.2405 89.6189 15.5985V88.7797C89.6189 91.1376 87.7075 93.0491 85.3496 93.0491Z" fill="#929292"/>
<path d="M85.199 92.5767H21.721C19.4697 92.5767 17.6445 90.7515 17.6445 88.5002V15.8773C17.6445 13.6259 19.4697 11.8008 21.721 11.8008H85.199C87.4504 11.8008 89.2755 13.6259 89.2755 15.8773V88.5002C89.2755 90.7516 87.4503 92.5767 85.199 92.5767Z" fill="#8D8D8D"/>
<path d="M85.0485 92.1052H21.8718C19.727 92.1052 17.9883 90.3665 17.9883 88.2217V16.157C17.9883 14.0121 19.727 12.2734 21.8718 12.2734H85.0485C87.1933 12.2734 88.932 14.0122 88.932 16.157V88.2217C88.9321 90.3665 87.1933 92.1052 85.0485 92.1052Z" fill="#898989"/>
<path d="M84.898 91.6328H22.0227C19.9844 91.6328 18.332 89.9804 18.332 87.9421V16.4357C18.332 14.3974 19.9844 12.7451 22.0227 12.7451H84.898C86.9363 12.7451 88.5886 14.3975 88.5886 16.4357V87.9422C88.5886 89.9805 86.9363 91.6328 84.898 91.6328Z" fill="#848484"/>
<path d="M84.7475 91.1605H22.1735C20.2418 91.1605 18.6758 89.5945 18.6758 87.6627V16.7146C18.6758 14.7828 20.2418 13.2168 22.1735 13.2168H84.7475C86.6792 13.2168 88.2452 14.7828 88.2452 16.7146V87.6627C88.2452 89.5945 86.6792 91.1605 84.7475 91.1605Z" fill="#808080"/>
<path d="M84.5969 90.689H22.3244C20.4992 90.689 19.0195 89.2094 19.0195 87.3842V16.9943C19.0195 15.1691 20.4992 13.6895 22.3244 13.6895H84.5969C86.4221 13.6895 87.9018 15.1691 87.9018 16.9943V87.3842C87.9018 89.2095 86.4221 90.689 84.5969 90.689Z" fill="#7B7B7B"/>
<path d="M84.4463 90.2166H22.4752C20.7565 90.2166 19.3633 88.8233 19.3633 87.1047V17.273C19.3633 15.5544 20.7565 14.1611 22.4752 14.1611H84.4463C86.165 14.1611 87.5582 15.5544 87.5582 17.273V87.1047C87.5582 88.8233 86.165 90.2166 84.4463 90.2166Z" fill="#777777"/>
<path d="M84.2959 89.7453H22.6261C21.0139 89.7453 19.707 88.4384 19.707 86.8262V17.5528C19.707 15.9407 21.0139 14.6338 22.6261 14.6338H84.2959C85.908 14.6338 87.2148 15.9407 87.2148 17.5528V86.8262C87.2148 88.4383 85.908 89.7453 84.2959 89.7453Z" fill="#727272"/>
<path d="M84.1453 89.2728H22.7769C21.2713 89.2728 20.0508 88.0523 20.0508 86.5467V17.8316C20.0508 16.326 21.2713 15.1055 22.7769 15.1055H84.1453C85.6509 15.1055 86.8714 16.326 86.8714 17.8316V86.5467C86.8714 88.0523 85.6509 89.2728 84.1453 89.2728Z" fill="#6E6E6E"/>
<path d="M83.9948 88.8004H22.9277C21.5287 88.8004 20.3945 87.6662 20.3945 86.2672V18.1103C20.3945 16.7113 21.5287 15.5771 22.9277 15.5771H83.9948C85.3938 15.5771 86.528 16.7113 86.528 18.1103V86.2672C86.528 87.6662 85.3938 88.8004 83.9948 88.8004Z" fill="#696969"/>
<path d="M83.8442 88.328H23.0785C21.786 88.328 20.7383 87.2803 20.7383 85.9877V18.3891C20.7383 17.0966 21.786 16.0488 23.0785 16.0488H83.8442C85.1367 16.0488 86.1845 17.0966 86.1845 18.3891V85.9877C86.1845 87.2802 85.1367 88.328 83.8442 88.328Z" fill="#656565"/>
<path d="M83.6937 87.8566H23.2294C22.0435 87.8566 21.082 86.8952 21.082 85.7092V18.6689C21.082 17.4829 22.0434 16.5215 23.2294 16.5215H83.6937C84.8797 16.5215 85.8411 17.4829 85.8411 18.6689V85.7092C85.8411 86.8952 84.8797 87.8566 83.6937 87.8566Z" fill="#606060"/>
<path d="M87.2921 98.9377H19.6274C15.8292 98.9377 12.75 95.8586 12.75 92.0603V9.64698C12.75 5.84865 15.8291 2.76953 19.6274 2.76953H87.2921C91.0905 2.76953 94.1696 5.84865 94.1696 9.64698V92.0603C94.1696 95.8585 91.0905 98.9377 87.2921 98.9377Z" fill="white"/>
<path d="M81.6545 22.7886H25.2659C24.1741 22.7886 23.2891 21.9035 23.2891 20.8118C23.2891 19.72 24.1741 18.835 25.2659 18.835H81.6545C82.7463 18.835 83.6313 19.72 83.6313 20.8118C83.6313 21.9035 82.7463 22.7886 81.6545 22.7886Z" fill="#E2E2E2"/>
<path d="M61.5891 31.3364H25.2659C24.1741 31.3364 23.2891 30.4514 23.2891 29.3596C23.2891 28.2678 24.1741 27.3828 25.2659 27.3828H61.5891C62.6809 27.3828 63.5659 28.2678 63.5659 29.3596C63.5659 30.4514 62.6809 31.3364 61.5891 31.3364Z" fill="#E2E2E2"/>
<path d="M81.6545 48.5571H25.2659C24.1741 48.5571 23.2891 47.6721 23.2891 46.5803C23.2891 45.4885 24.1741 44.6035 25.2659 44.6035H81.6545C82.7463 44.6035 83.6313 45.4885 83.6313 46.5803C83.6313 47.6721 82.7463 48.5571 81.6545 48.5571Z" fill="#E2E2E2"/>
<path d="M61.5891 57.104H25.2659C24.1741 57.104 23.2891 56.219 23.2891 55.1272C23.2891 54.0354 24.1741 53.1504 25.2659 53.1504H61.5891C62.6809 53.1504 63.5659 54.0354 63.5659 55.1272C63.5659 56.2189 62.6809 57.104 61.5891 57.104Z" fill="#E2E2E2"/>
<path d="M81.6545 74.3247H25.2659C24.1741 74.3247 23.2891 73.4397 23.2891 72.3479C23.2891 71.2561 24.1741 70.3711 25.2659 70.3711H81.6545C82.7463 70.3711 83.6313 71.2561 83.6313 72.3479C83.6313 73.4397 82.7463 74.3247 81.6545 74.3247Z" fill="#E2E2E2"/>
<path d="M61.5891 82.8716H25.2659C24.1741 82.8716 23.2891 81.9865 23.2891 80.8948C23.2891 79.803 24.1741 78.918 25.2659 78.918H61.5891C62.6809 78.918 63.5659 79.803 63.5659 80.8948C63.5659 81.9865 62.6809 82.8716 61.5891 82.8716Z" fill="#E2E2E2"/>
<path d="M6.91293 110H100.008C103.826 110 106.921 106.905 106.921 103.087V45.1461C106.921 41.598 104.045 38.7217 100.497 38.7217H6.42443C2.87635 38.7217 0 41.598 0 45.1461V103.087C0 106.905 3.09506 110 6.91293 110Z" fill="url(#paint1_linear_222_1109)"/>
<path d="M100.497 38.7217H6.42443C2.87635 38.7217 0 41.598 0 45.1461V45.7387C0 42.1906 2.87629 39.3142 6.42443 39.3142H100.497C104.045 39.3142 106.921 42.1905 106.921 45.7387V45.1461C106.921 41.598 104.045 38.7217 100.497 38.7217Z" fill="#A7DDFC"/>
<g opacity="0.2">
<path d="M61.9945 76.0685V66.0945C61.9945 64.8007 60.9456 63.752 59.6519 63.752H47.2739C45.9801 63.752 44.9313 64.8007 44.9313 66.0945V76.0685H40.5069C39.82 76.0685 39.4761 76.899 39.9617 77.3847L52.9177 90.3407C53.2188 90.6418 53.707 90.6418 54.0081 90.3407L66.964 77.3847C67.4497 76.8991 67.1057 76.0685 66.4188 76.0685H61.9945Z" fill="#000F56"/>
<path d="M60.4381 58.1553H46.4845C45.6258 58.1553 44.9297 58.8514 44.9297 59.7101C44.9297 60.5688 45.6258 61.2649 46.4845 61.2649H60.4381C61.2967 61.2649 61.9929 60.5688 61.9929 59.7101C61.9928 58.8514 61.2967 58.1553 60.4381 58.1553Z" fill="#000F56"/>
</g>
<defs>
<linearGradient id="paint0_linear_222_1109" x1="53.4672" y1="34.177" x2="53.4672" y2="41.5924" gradientUnits="userSpaceOnUse">
<stop offset="0.0012" stop-color="#7AC6F0"/>
<stop offset="0.6299" stop-color="#519ED7"/>
<stop offset="1" stop-color="#3E8CCC"/>
</linearGradient>
<linearGradient id="paint1_linear_222_1109" x1="53.4607" y1="88.2766" x2="53.4607" y2="124.731" gradientUnits="userSpaceOnUse">
<stop offset="0.0012" stop-color="#80CFFB"/>
<stop offset="1" stop-color="#3983C7"/>
</linearGradient>
</defs>
</svg>

       
          {!orderUuid ? (
            <Text c="red" size="sm">
              {isRTL ? "الرابط غير صالح: لا يوجد order_uuid" : "Invalid link: missing order_uuid"}
            </Text>
          ) : null}

          {!tokenFromUrl && typeof window !== "undefined" && !localStorage.getItem("guest-token") ? (
            <Text c="red" size="sm">
              {isRTL ? "الرابط غير صالح: لا يوجد token" : "Invalid link: missing token"}
            </Text>
          ) : null}

          <Group justify="flex-end" mt={6}>
            <Button
              className="bg-gradient-to-r from-blue-500 to-teal-400 hover:from-blue-600 hover:to-teal-500 transition-all"
              loading={isDownloading}
              disabled={!canDownload || isDownloading}
              onClick={() => {
                triggerGuestDownload().catch(() => {});
              }}
            >
              {isRTL ? "إعادة التحميل" : "Redownload"}
            </Button>
          </Group>
        </Stack>
      </Paper>
    </Container>
  );
}