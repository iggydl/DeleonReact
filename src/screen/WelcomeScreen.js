import React, {useState} from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ImageBackground,ActivityIndicator } from 'react-native';


const WelcomeScreen = ({ navigation }) => {
    const [loading, setLoading] = useState(false)

  return (
    <ImageBackground
      source={require('../assets/giphy.gif')} 
      style={styles.container}
    >
      <View style={styles.content}>
        <Text style={styles.title}>Welcome to NEKFLIX!</Text>

        {/* Buttons Column */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[styles.button, styles.getStartedButton]}
            onPress={() => navigation.navigate('RegisterScreen')} 
          >
            <Text style={styles.buttonText}>Get Started</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.button, styles.loginButton]}
            onPress={() => navigation.navigate('AdminLogin')} 
          >
            <Text style={styles.buttonText}>
                {/* {loading && ( 
                    <ActivityIndicator size='40' color='#fff' /> 
                )} */}
                {loading ? (<ActivityIndicator size='40' color='#fff' />  ) : "Login as admin"}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    flex: 1,
    justifyContent: 'flex-end', 
    width: '100%',
    alignItems: 'center',
    paddingBottom: 40,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 40,
  },
  buttonContainer: {
    width: '80%',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  button: {
    width: '100%',
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
  },
  getStartedButton: {
    backgroundColor: '#C8181E', 
  },
  loginButton: {
    backgroundColor: 'transparent',
    borderRadius: 10,
    borderWidth: 2,  
    borderColor: '#C8181E',  
  },
  
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default WelcomeScreen;
