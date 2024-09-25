/** @type { import('@storybook/react').Preview } */
import GlobalStyle from '@styles/GlobalStyle'

const preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
  decorators: [
    (Story) => (
      <>
        <GlobalStyle />
        <Story />
      </>
    ),
  ],
}

export default preview
