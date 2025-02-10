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
    padding: 20,
    backgroundColor: "#fff",
    borderRadius: 10,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  image: {
    width: 80,
    height: 80,
    marginBottom: 15,
    resizeMode: "contain"
  },
})
