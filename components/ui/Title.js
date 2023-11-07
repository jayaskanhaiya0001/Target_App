import {StyleSheet, Text} from 'react-native';
import Colors from '../../constants/colors';
function Title({children}) {
  return <Text style={styles.title}>{children}</Text>;
}
const styles = StyleSheet.create({
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
    borderWidth: 2,
    borderColor: Colors.accent500,
    padding: 12,
    maxWidth: '80%',
    width: 300,
  },
});
export default Title;
