import { Image, ImageSourcePropType, Pressable, StyleSheet, Text, TextStyle, ViewStyle } from 'react-native';

interface ButtonProps {
  imageSource: ImageSourcePropType;
  onPress: () => void;
  style?: ViewStyle;
}

const Button: React.FC<ButtonProps> = ({ imageSource, onPress, style }) => {
  return (
    <Pressable style={[styles.button, style]} onPress={onPress}>
      <Image source={imageSource} style={styles.image}></Image>
    </Pressable>
  );
};


const styles = StyleSheet.create({
  button: {
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    width: 50, // 기본 이미지 크기
    height: 50,
    resizeMode: "contain",
  },
});

export default Button;