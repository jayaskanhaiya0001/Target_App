import {useState, useEffect} from 'react';
import {Alert, StyleSheet, Text, View, FlatList} from 'react-native';
import Title from '../components/ui/Title';
import {NumberContainer} from '../components/game/NumberContainer';
import {PrimaryButton} from '../components/ui/PrimaryButton';
import Card from '../components/ui/Card';
import {InstructionText} from '../components/ui/InstructionText';
import Icon from 'react-native-vector-icons/Ionicons';
import GuessLogItem from '../components/game/GuessLogItem';
const addIcon = <Icon name="add" size={24} color="white" />;
const removeIcon = <Icon name="remove" size={24} color="white" />;
function generateRandomBetween(min, max, exclude) {
  const rndNum = Math.floor(Math.random() * (max - min)) + min;
  if (rndNum === exclude) {
    return generateRandomBetween(min, max, exclude);
  } else {
    return rndNum;
  }
}

let minBoundary = 1;
let maxBoundary = 100;
export const GameScreen = ({userNumber, onGameOver}) => {
  const initialGuess = generateRandomBetween(
    minBoundary,
    maxBoundary,
    userNumber,
  );
  const [currentGuess, setCurrentGuess] = useState(initialGuess);
  const [guessRounds, setGuessRounds] = useState([initialGuess]);
  useEffect(() => {
    if (currentGuess === userNumber) {
      onGameOver(guessRounds.length);
    }
  }, [currentGuess, userNumber, onGameOver]);

  useEffect(() => {
    minBoundary = 1;
    maxBoundary = 100;
  }, []);
  console.log(currentGuess, userNumber);
  function nextGuessHandler(direction) {
    console.log(currentGuess, userNumber);
    if (
      (direction === 'lower' && currentGuess < userNumber) ||
      (direction === 'greater' && currentGuess > userNumber)
    ) {
      Alert.alert("Don't lie!", 'you know that this is wrong...', [
        {text: 'Sorry!', style: 'cancel'},
      ]);
      return;
    }
    if (direction === 'lower') {
      maxBoundary = currentGuess;
    } else {
      minBoundary = currentGuess + 1;
    }
    const newRndNumber = generateRandomBetween(
      minBoundary,
      maxBoundary,
      currentGuess,
    );
    setCurrentGuess(newRndNumber);
    setGuessRounds(prevGuessRounds => [...prevGuessRounds, newRndNumber]);
  }
  const guessRoundListLength = guessRounds.length;
  return (
    <View style={styles.screen}>
      <Title>Opponent's Guess</Title>
      <NumberContainer>{currentGuess}</NumberContainer>
      <Card>
        <InstructionText style={styles.instructionText}>
          Higher or lower?
        </InstructionText>
        <View style={styles.buttonsContainer}>
          <View style={styles.buttonsContainer}>
            <PrimaryButton onPress={nextGuessHandler.bind(this, 'lower')}>
              {removeIcon}
            </PrimaryButton>
          </View>
          <View style={styles.buttonsContainer}>
            <PrimaryButton onPress={nextGuessHandler.bind(this, 'greater')}>
              {addIcon}
            </PrimaryButton>
          </View>
        </View>
      </Card>
      <View style={styles.listContainer}>
        {/* {guessRounds.map(guessRound => (
          <Text key={guessRound}>{guessRound}</Text>
        ))} */}
        <FlatList
          data={guessRounds}
          renderItem={itemData => (
            <GuessLogItem
              roundNumber={guessRoundListLength - itemData.index}
              guess={itemData.item}
            />
          )}
          keyExtractor={item => item}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 40,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
    borderWidth: 2,
    borderColor: 'white',
    padding: 12,
  },
  buttonsContainer: {
    flexDirection: 'row',
  },
  instructionText: {
    marginBottom: 12,
  },
  listContainer: {
    flex: 1,
    padding: 16,
  },
});
