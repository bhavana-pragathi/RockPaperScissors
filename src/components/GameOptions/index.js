import {OptionListItem, OptionButton, OptionImage} from './styledComponents'

const GameOptions = props => {
  const {optionsDetails, onClickGameOption} = props
  const {imageUrl, id} = optionsDetails
  const clickOption = () => {
    onClickGameOption(id)
  }
  return (
    <OptionListItem>
      <OptionButton
        data-testid={`${id.toLowerCase()}Button`}
        type="button"
        onClick={clickOption}
      >
        <OptionImage src={imageUrl} alt={id} />
      </OptionButton>
    </OptionListItem>
  )
}

export default GameOptions
