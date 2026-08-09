# Onboarding design QA

## Evidence

- Reference: `/var/folders/bp/jypbddkj1g758_mdbfx68vzw0000gn/T/codex-clipboard-f8ffcb42-d922-40af-bc04-f9b22148e8db.png`
- Implementation capture: `design-qa-implementation.png`
- Side-by-side comparison: `design-qa-comparison.png`
- Reference size: 400 × 300
- Browser viewport: 1000 × 750
- Normalized comparison: 1600 × 600, with each image fitted into an 800 × 600 panel
- State: English country-selection step using the development-only design preview

## Design check

- Layout: passed. The compact centered card, split-panel proportion, answer-panel density, and footer alignment follow the supplied reference.
- User-directed composition: passed. The illustration and stepper were removed; the dark panel now carries the requirement, large question, and supporting copy higher in the composition. The white panel contains only the answer controls and action.
- Typography: passed. The question is visually dominant on the background panel while answer labels remain compact and readable.
- Color and imagery: passed. A restrained Insighta navy/cobalt abstract background supports white copy without competing with it. Contrast remains strong.
- Spacing and responsive behavior: passed. Desktop spacing is balanced and the mobile layout reserves enough height for the large question before the answer area.
- Interaction: passed. Country search renders correctly, Jordan can be selected, `aria-selected` updates to `true`, and Continue remains available.
- Runtime: passed. TypeScript completed without errors, the diff has no whitespace errors, and the browser console contains no errors.
- Copy: passed. Existing localized onboarding copy is preserved and moved to the intended panel.

## Iteration history

1. The initial split layout placed an illustration on the left and the question with its controls on the right. The user requested no illustration and a clearer division of responsibilities between panels.
2. Replaced the illustration with an abstract brand background, moved the question hierarchy to the left, and reduced the right panel to selection and action controls.
3. Removed the step label and progress indicator, then lifted the requirement tag, question, and supporting copy into the upper portion of the background panel.

final result: passed
