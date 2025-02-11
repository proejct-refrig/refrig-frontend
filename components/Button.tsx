import { Image, ImageSourcePropType, Pressable, StyleSheet, Text, TextStyle, ViewStyle } from 'react-native';
import { FontAwesome5, Ionicons } from '@expo/vector-icons';

interface ButtonProps {
  iconName: keyof typeof Ionicons.glyphMap;
  onPress: () => void;
  style?: ViewStyle;
}

const Button: React.FC<ButtonProps> = ({ iconName, onPress, style }) => {
  return (
    <Pressable style={[ style ]} onPress={onPress}>
      <Ionicons name={iconName} size={28} color="#3A3A3A" />
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