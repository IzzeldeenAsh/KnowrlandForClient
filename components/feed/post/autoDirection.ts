import { Extension } from '@tiptap/core'

// Renders dir="auto" on every paragraph so each one picks its own direction from
// its first strong character. Pasting Arabic (e.g. from ChatGPT) flips that
// paragraph to RTL on its own; explicit alignment still overrides it.
export const AutoDirection = Extension.create({
  name: 'autoDirection',

  addGlobalAttributes() {
    return [
      {
        types: ['paragraph'],
        attributes: {
          dir: {
            default: 'auto',
            parseHTML: () => 'auto',
            renderHTML: () => ({ dir: 'auto' }),
          },
        },
      },
    ]
  },
})
