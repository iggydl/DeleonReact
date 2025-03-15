import React, { useState } from 'react';
import { 
  View, 
  TextInput, 
  Text, 
  TouchableOpacity, 
  ImageBackground, 
  Alert 
} from 'react-native';
import { registerStyle } from '../styles/Mainstyles';
import AsyncStorage from '@react-native-async-storage/async-storage';

const RegisterScreen = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [usernameError, setUsernameError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  
  const validateUsername = (text) => {
    setUsername(text);
    setUsernameError(text.length < 3 ? 'Username must be at least 3 characters.' : '');
  };

  
  const validatePassword = (text) => {
    setPassword(text);
    setPasswordError(text.length < 6 ? 'Password must be at least 6 characters.' : '');
  };

  
  const validateConfirmPassword = (text) => {
    setConfirmPassword(text);
    setPasswordError(text !== password ? 'Passwords do not match.' : '');
  };

  const handleRegister = async () => {
    let valid = true;

    if (username.length < 3) {
      setUsernameError('Username must be at least 3 characters.');
      valid = false;
    }

    if (password.length < 6) {
      setPasswordError('Password must be at least 6 characters.');
      valid = false;
    }

    if (password !== confirmPassword) {
      setPasswordError('Passwords do not match.');
      valid = false;
    }

    if (!valid) return;

    try {
      await AsyncStorage.setItem('registeredUser', JSON.stringify({ username, password }));
      Alert.alert('Success', 'Account Created!', [
        { text: 'OK', onPress: () => navigation.navigate('LoginScreen') }
      ]);
    } catch (error) {
      Alert.alert('Error', 'Something went wrong. Please try again.');
    }
  };

  return (
    <ImageBackground
      source={require('../assets/login_bg.jpg')}
      style={registerStyle.container}
    >
      <View style={registerStyle.formContainer}>
        <Text style={registerStyle.formHeader}>REGISTER ACCOUNT</Text>

        <Text style={registerStyle.label}>Username</Text>
        <TextInput
          style={[registerStyle.input, usernameError ? registerStyle.inputError : null]}
          placeholder="Enter your username"
          placeholderTextColor="#888"
          value={username}
          onChangeText={validateUsername}
        />
        {usernameError ? <Text style={registerStyle.errorText}>{usernameError}</Text> : null}

        <Text style={registerStyle.label}>Password</Text>
        <TextInput
          style={[registerStyle.input, passwordError ? registerStyle.inputError : null]}
          placeholder="Enter your password"
          placeholderTextColor="#888"
          secureTextEntry
          value={password}
          onChangeText={validatePassword}
        />
        {passwordError ? <Text style={registerStyle.errorText}>{passwordError}</Text> : null}

        <Text style={registerStyle.label}>Confirm Password</Text>
        <TextInput
          style={[registerStyle.input, passwordError ? registerStyle.inputError : null]}
          placeholder="Confirm your password"
          placeholderTextColor="#888"
          secureTextEntry
          value={confirmPassword}
          onChangeText={validateConfirmPassword}
        />
        {passwordError ? <Text style={registerStyle.errorText}>{passwordError}</Text> : null}

        <TouchableOpacity style={registerStyle.registerButton} onPress={handleRegister}>
          <Text style={registerStyle.registerText}> Join Now</Text>
        </TouchableOpacity>

        <View style={registerStyle.accountTextContainer}>
          <Text style={registerStyle.otherText}>Already have an account? </Text>
          <TouchableOpacity onPress={() => navigation.navigate('LoginScreen')}>
            <Text style={registerStyle.createOneText}>Create here</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
};

export default RegisterScreen;
