import {StyleSheet, View} from 'react-native';
import Colors from '../../constants/colors';
const Card = ({children}) => {
  return <View style={styles.card}>{children}</View>;
};

export default Card;

const styles = StyleSheet.create({
  card: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    marginTop: 100,
    marginHorizontal: 24,
    borderRadius: 8,
    backgroundColor: Colors.primary500,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowRadius: 6,
    shadowOpacity: 0.25,
  },
});
