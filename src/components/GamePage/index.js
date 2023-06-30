import {Component} from 'react'
import Popup from 'reactjs-popup'
import 'reactjs-popup/dist/index.css'
import {RiCloseLine} from 'react-icons/ri'
import GameOptions from '../GameOptions'
import {
  MainDiv,
  SubDiv,
  ScoreDiv,
  NamesUl,
  NamesLi,
  Score,
  Name,
  Button,
  TriggerImage,
  GameOptionUl,
  PopupDiv,
  CloseButton,
  ResultDiv,
  NameImageDiv,
  NameText,
  SelectedOption,
  NameImageMainDiv,
  ResultText,
  PlayAgain,
  GameContainer,
  GameOptionsDiv,
  GameHeading,
} from './styledComponents'

const gameStatusConst = {
  win: 'WIN',
  lose: 'LOSE',
  inProgress: 'IN_PROGRESS',
  draw: 'DRAW',
}

class GamePage extends Component {
  state = {
    score: 0,
    gameStatus: gameStatusConst.inProgress,
    clickOption: '',
    gameOption: '',
  }

  onClosePopup = () => {}

  onClickGameOption = id => {
    this.setState(
      {clickOption: id, gameOption: this.getGameOption()},
      this.runGame,
    )
  }

  getGameOption = () => {
    const {choicesList} = this.props
    const getChoicesList = choicesList.map(eachChoice => eachChoice.id)
    const randomInd = Math.floor(Math.random() * 3)
    return getChoicesList[randomInd]
  }

  runGame = () => {
    const {gameOption, clickOption} = this.state
    if (clickOption === gameOption) {
      this.setState({gameStatus: gameStatusConst.draw})
    } else if (clickOption === 'ROCK') {
      if (gameOption === 'SCISSORS') {
        this.setState(prevState => ({
          gameStatus: gameStatusConst.win,
          score: prevState.score + 1,
        }))
      } else {
        this.setState(prevState => ({
          gameStatus: gameStatusConst.lose,
          score: prevState.score - 1,
        }))
      }
    } else if (clickOption === 'PAPER') {
      if (gameOption === 'ROCK') {
        this.setState(prevState => ({
          gameStatus: gameStatusConst.win,
          score: prevState.score + 1,
        }))
      } else {
        this.setState(prevState => ({
          gameStatus: gameStatusConst.lose,
          score: prevState.score - 1,
        }))
      }
    } else if (clickOption === 'SCISSORS') {
      if (gameOption === 'PAPER') {
        this.setState(prevState => ({
          gameStatus: gameStatusConst.win,
          score: prevState.score + 1,
        }))
      } else {
        this.setState(prevState => ({
          gameStatus: gameStatusConst.lose,
          score: prevState.score - 1,
        }))
      }
    }
  }

  renderGameInProgress = () => {
    const {choicesList} = this.props
    return (
      <GameOptionsDiv>
        <GameOptionUl>
          {choicesList.map(eachItem => (
            <GameOptions
              key={eachItem.id}
              optionsDetails={eachItem}
              onClickGameOption={this.onClickGameOption}
            />
          ))}
        </GameOptionUl>
      </GameOptionsDiv>
    )
  }

  renderGameWon = () => {
    const {clickOption, gameOption} = this.state
    const {choicesList} = this.props
    const userChoiceOptionList = choicesList.filter(
      eachChoice => eachChoice.id === clickOption,
    )
    const userChoiceOption = userChoiceOptionList[0]
    const gameChoiceOptionList = choicesList.filter(
      eachChoice => eachChoice.id === gameOption,
    )
    const gameChoiceOption = gameChoiceOptionList[0]
    return (
      <ResultDiv>
        <NameImageMainDiv>
          <NameImageDiv>
            <NameText>YOU</NameText>
            <SelectedOption src={userChoiceOption.imageUrl} alt="your choice" />
          </NameImageDiv>
          <NameImageDiv>
            <NameText>OPPONENT</NameText>
            <SelectedOption
              src={gameChoiceOption.imageUrl}
              alt="opponent choice"
            />
          </NameImageDiv>
        </NameImageMainDiv>
        <ResultText>YOU WON</ResultText>
        <PlayAgain type="button" onClick={this.onClickPlayAgain}>
          PLAY AGAIN
        </PlayAgain>
      </ResultDiv>
    )
  }

  renderGameLose = () => {
    const {clickOption, gameOption} = this.state
    const {choicesList} = this.props
    const userChoiceOptionList = choicesList.filter(
      eachChoice => eachChoice.id === clickOption,
    )
    const userChoiceOption = userChoiceOptionList[0]
    const gameChoiceOptionList = choicesList.filter(
      eachChoice => eachChoice.id === gameOption,
    )
    const gameChoiceOption = gameChoiceOptionList[0]
    return (
      <ResultDiv>
        <NameImageMainDiv>
          <NameImageDiv>
            <NameText>YOU</NameText>
            <SelectedOption src={userChoiceOption.imageUrl} alt="your choice" />
          </NameImageDiv>
          <NameImageDiv>
            <NameText>OPPONENT</NameText>
            <SelectedOption
              src={gameChoiceOption.imageUrl}
              alt="opponent choice"
            />
          </NameImageDiv>
        </NameImageMainDiv>
        <ResultText>YOU LOSE</ResultText>
        <PlayAgain type="button" onClick={this.onClickPlayAgain}>
          PLAY AGAIN
        </PlayAgain>
      </ResultDiv>
    )
  }

  renderGameDraw = () => {
    const {clickOption, gameOption} = this.state
    const {choicesList} = this.props
    const userChoiceOptionList = choicesList.filter(
      eachChoice => eachChoice.id === clickOption,
    )
    const userChoiceOption = userChoiceOptionList[0]
    const gameChoiceOptionList = choicesList.filter(
      eachChoice => eachChoice.id === gameOption,
    )
    const gameChoiceOption = gameChoiceOptionList[0]
    return (
      <ResultDiv>
        <NameImageMainDiv>
          <NameImageDiv>
            <NameText>YOU</NameText>
            <SelectedOption src={userChoiceOption.imageUrl} alt="your choice" />
          </NameImageDiv>
          <NameImageDiv>
            <NameText>OPPONENT</NameText>
            <SelectedOption
              src={gameChoiceOption.imageUrl}
              alt="opponent choice"
            />
          </NameImageDiv>
        </NameImageMainDiv>
        <ResultText>IT IS DRAW</ResultText>
        <PlayAgain type="button" onClick={this.onClickPlayAgain}>
          PLAY AGAIN
        </PlayAgain>
      </ResultDiv>
    )
  }

  renderWholeGame = () => {
    const {gameStatus} = this.state
    switch (gameStatus) {
      case gameStatusConst.inProgress:
        return this.renderGameInProgress()
      case gameStatusConst.draw:
        return this.renderGameDraw()
      case gameStatusConst.win:
        return this.renderGameWon()
      case gameStatusConst.lose:
        return this.renderGameLose()
      default:
        return null
    }
  }

  onClickPlayAgain = () => {
    this.setState({gameStatus: gameStatusConst.inProgress})
  }

  render() {
    const {score} = this.state
    return (
      <MainDiv>
        <GameHeading>Rock Paper Scissors</GameHeading>
        <SubDiv>
          <NamesUl>
            <NamesLi>ROCK</NamesLi>
            <NamesLi>PAPER</NamesLi>
            <NamesLi>SCISSORS</NamesLi>
          </NamesUl>
          <ScoreDiv>
            <Name>Score</Name>
            <Score>{score}</Score>
          </ScoreDiv>
        </SubDiv>
        <GameContainer>{this.renderWholeGame()}</GameContainer>
        <Popup modal trigger={<Button>Rules</Button>} closeOnEscape window>
          {close => (
            <PopupDiv>
              <CloseButton type="button" onClick={() => close()}>
                <RiCloseLine />
              </CloseButton>
              <TriggerImage
                src="https://assets.ccbp.in/frontend/react-js/rock-paper-scissor/rules-image.png"
                alt="rules"
              />
            </PopupDiv>
          )}
        </Popup>
      </MainDiv>
    )
  }
}

export default GamePage
