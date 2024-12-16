import {
  ColorCircle,
  ColorPaletteContainer,
} from '@components/Calendar/ColorPallete/ColorPallete.style'

const colors = [
  '#FF0000',
  '#FFA500',
  '#FFFF00',
  '#008000',
  '#0000FF',
  '#4B0082',
  '#EE82EE',
  '#ADD8E6',
]

const ColorPalette = ({ onSelectColor }) => {
  return (
    <ColorPaletteContainer>
      {colors.map((color) => (
        <ColorCircle
          key={color}
          color={color}
          onClick={() => {
            console.log('Color clicked:', color) // 디버깅용 로그
            onSelectColor(color)
          }}
        />
      ))}
    </ColorPaletteContainer>
  )
}

export default ColorPalette
