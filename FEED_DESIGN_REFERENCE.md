# Feed Design Reference

Use the Claude artifact **“Feed page design system”** as the visual reference for the `/en` and `/ar` feed.

Reference: https://claude.ai/code/artifact/40c44356-c91c-470b-a617-d28ad61f6da2

## Visual direction

- Keep the interface flat, compact, and information-first.
- Do not add box shadows, drop shadows, glow effects, or inset shadows.
- Separate surfaces with subtle 1px borders and small background-color changes.
- Use gradients only for the primary action where they already exist in the reference.
- Avoid oversized typography, icons, avatars, buttons, padding, and whitespace.
- Bordered fields use one light-blue border-color change on focus. Do not stack a focus
  ring or outline on top of an existing border.
- Borderless and filled controls use only one thin, pale focus outline.

## Corner radius

- Main cards and sidebar containers: `8px`.
- Dashboard panel, action buttons, and nested callouts: `6px`.
- Status badges: `4px`.
- Keep full circles only for avatars.
- Keep pill shapes only where the control is intentionally pill-shaped in the reference, such as the composer field or small Follow action.
- Do not use large radii such as `16px`, `20px`, or `24px` on feed surfaces.

## Sidebar measurements

- Sidebar width: `256px`.
- Profile header height: `216px`.
- Profile avatar: `96px`.
- Profile name: `16px`, bold.
- Role badge: `11px`.
- Dashboard item: `52px` high with `14px` text.
- Primary and secondary action buttons: `40px` high with approximately `13.5px` text.
- Standard navigation rows: approximately `48px` high with `14px` text.
- Standard navigation icons: approximately `18px`.
- Draft badge: `11px`.

## Composer measurements

- Composer card radius: `8px`, with a subtle 1px border and no shadow.
- Composer input row: approximately `68px` high.
- Composer avatar: `40px`.
- Composer placeholder: `14px`, regular weight.
- Composer action row: approximately `60px` high.
- Composer action labels: `14px`, regular weight.
- Composer action icons: `20px`.
- Distribute Video, Image, and Article evenly across three columns.
- Use the reference icon colors: red for Video, green for Image, and amber for Article.
- Composer controls are visual only until posting behavior is implemented separately.

## Layout and behavior

- Preserve the three-column desktop layout from the reference.
- Keep the feed rail hidden below the desktop breakpoint unless a mobile-specific design is provided.
- Mirror the column order, alignment, and icon/text direction for Arabic.
- Menu visibility must continue to follow the same roles used by the header profile menu.
- Guests receive a compact sidebar card with only Create account and Log in actions.
- Do not show the global bottom authentication banner on `/en` or `/ar`, because the feed has its own guest authentication card.

## Implementation check

Before completing feed UI work:

1. Compare the desktop English layout with the reference.
2. Verify Arabic alignment and column mirroring.
3. Confirm there are no shadow utilities or shadow CSS declarations in feed components.
4. Confirm card and control radii follow the values above.
5. Confirm role-based and guest navigation links remain functional.
