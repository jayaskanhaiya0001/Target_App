import {useState} from 'react';
import {
  TextInput,
  View,
  StyleSheet,
  Alert,
  Dimensions,
  useWindowDimensions,
  KeyboardAvoidingView,
  ScrollView,
} from 'react-native';
import {PrimaryButton} from '../components/ui/PrimaryButton';
import Card from '../components/ui/Card';
import {InstructionText} from '../components/ui/InstructionText';
import Colors from '../constants/colors';
import Title from '../components/ui/Title';
const StartGameScreen = ({onPickNumber}) => {
  const [enteredNumber, setEnteredNumber] = useState('');
  const {width, height} = useWindowDimensions();
  function numberInputHandler(enteredText) {
    setEnteredNumber(enteredText);
  }

  function resetInputHandler() {
    setEnteredNumber('');
  }

  function confirmInputHandler() {
    const chosenNumber = parseInt(enteredNumber);
    if (isNaN(chosenNumber) || chosenNumber <= 0 || chosenNumber > 99) {
      // show alert ...
      Alert.alert(
        'Invalid number!',
        'Number has to be a number between 1 and 99',
        [{text: 'Okay', style: 'destructive', onPress: resetInputHandler}],
      );
      return;
    }
    onPickNumber(chosenNumber);
  }

  const marginTop = height < 300 ? 30 : 100;
  return (
    <ScrollView style={Styles.screen}>
      <KeyboardAvoidingView style={Styles.screen}>
        <View style={[Styles.rootContainer, {marginTop: marginTop}]}>
          <Title>Guess My Number</Title>
          <Card>
            <InstructionText>Enter a Number</InstructionText>
            <TextInput
              style={Styles.numberInput}
              maxLength={2}
              keyboardType="number-pad"
              autoCapitalize="none"
              autoCorrect={false}
              onChangeText={numberInputHandler}
              value={enteredNumber}
            />
            <View style={Styles.buttonsContainer}>
              <View style={Styles.buttonContainer}>
                <PrimaryButton onPress={resetInputHandler}>Reset</PrimaryButton>
              </View>
              <View style={Styles.buttonContainer}>
                <PrimaryButton onPress={confirmInputHandler}>
                  Confirm
                </PrimaryButton>
              </View>
            </View>
          </Card>
        </View>
      </KeyboardAvoidingView>
    </ScrollView>
  );
};
export default StartGameScreen;

const deviceHeight = Dimensions.get('window').height;

const Styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  rootContainer: {
    flex: 1,
    marginTop: deviceHeight < 400 ? 30 : 100,
    alignItems: 'center',
  },
  numberInput: {
    height: 50,
    width: 50,
    textAlign: 'center',
    fontSize: 32,
    borderBottomColor: Colors.accent500,
    borderBottomWidth: 2,
    color: Colors.accent500,
    marginVertical: 8,
    fontWeight: 'bold',
  },
  buttonsContainer: {
    flexDirection: 'row',
  },
  buttonContainer: {
    flex: 1,
  },
});
