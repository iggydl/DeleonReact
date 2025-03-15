import React, { useEffect } from "react";
import { View, StyleSheet, Image, 
  ImageBackground } from "react-native";
import SplasScreen from '../../src/assets/netflix.gif'

const SplashScreen = ({ navigation }) => {
  useEffect(() => {
    setTimeout(() => {
      navigation.replace("WelcomeScreen"); 
    }, 2000);
  }, []);

  return (
    <View style={styles.container}>
      <ImageBackground
            source={SplasScreen}
            resizeMode="contain"
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: 'rgba(17, 17, 17, 1)',
              width: '100%',
              height: '100%',
            }}
          />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#000000", 
  },
  image: {
    width: 200, 
    height: 200, 
  },
});

export default SplashScreen;
