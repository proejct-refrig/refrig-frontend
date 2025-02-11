import { Image, ImageSourcePropType, Pressable, StyleSheet, Text, TextStyle, ViewStyle } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';

interface ButtonProps {
  iconName: keyof typeof FontAwesome5.glyphMap;
  onPress: () => void;
  style?: ViewStyle;
}

const Button: React.FC<ButtonProps> = ({ iconName, onPress, style }) => {
  return (
    <Pressable style={[ style ]} onPress={onPress}>
      <FontAwesome5 name={iconName} size={24} color="#3A3A3A" solid={false} />
    </Pressable>
  );
};

const styles = StyleSheet.create({
  image: {
    width: 20,
    height: 20,
    resizeMode: "contain",
  },
});

export default Button;