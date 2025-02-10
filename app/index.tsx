import { StyleSheet, Text, View } from "react-native";
import { Image } from 'expo-image'

const AppLogo = require('@/assets/images/refrig_logo.png')

export default function Index() {
  return (
    <View style={styles.container}>
      <View style={styles.loginBox}>
        <Image source={AppLogo} style={styles.image}/>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5f5f5"
  },
  loginBox: {
    width: 300,
    height: 600,
    padding: 20,
    backgroundColor: "#fff",
  },
  image: {
    width: 320,
    height: 440,
    borderRadius: 18,
  },
})
