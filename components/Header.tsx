import { StyleSheet, Text, View } from 'react-native'
import { Image } from 'expo-image';
import { SafeAreaView } from 'react-native-safe-area-context';
import Button from './Button';

const logo = require("../assets/images/cute-refrig.png");

const Header: React.FC = () => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        {/* here: 추후에 냉장고, 살림 카테고리로 나눌거임 */}
        <View style={styles.categoryContainer}>
          <Image source={logo} style={styles.headerLogo} />
          <Text style={styles.headerText}>냉장고</Text>
        </View>

        <View style={styles.buttonContainer}>
          <Button iconName="bars" onPress={() => console.log("메뉴 버튼 클릭됨")} />
          <Button iconName="search" onPress={() => console.log("검색 버튼 클릭됨")} />
          <Button iconName="bell" onPress={() => console.log("알림 버튼 클릭됨")} />
        </View>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  safeArea: {
    //backgroundColor: "#FEE500",
  },
  header: {
    height: 70,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 15,
  },
  logo: {
    width: 55,
    height: 55,
    resizeMode: "contain",
  },
  buttonContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 25,
    marginTop: 25,
  },
  categoryContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  headerLogo: {
    width: 70,
    height: 70,
    resizeMode: "contain",
  },
  headerText: {
    fontSize: 20,
    marginTop: 30,
  },
})

export default Header