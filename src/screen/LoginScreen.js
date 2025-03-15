import React, { useState } from 'react';
import { 
  View, 
  TextInput, 
  Text, 
  TouchableOpacity, 
  ImageBackground 
} from 'react-native';
import { loginStyle } from '../styles/Mainstyles';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LoginScreen = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [usernameError, setUsernameError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [loginError, setLoginError] = useState('');

  
  const validateUsername = (text) => {
    setUsername(text);
    setUsernameError(text.length < 3 ? 'Username must be at least 3 characters.' : '');
  };

  
  const validatePassword = (text) => {
    setPassword(text);
    setPasswordError(text.length < 6 ? 'Password must be at least 6 characters.' : '');
  };

  const handleLogin = async () => {
    setLoginError('');

    let valid = true;

    if (!username || username.length < 3) {
      setUsernameError('Username must be at least 3 characters.');
      valid = false;
    } else {
      setUsernameError('');
    }

    if (!password || password.length < 6) {
      setPasswordError('Password must be at least 6 characters.');
      valid = false;
    } else {
      setPasswordError('');
    }

    if (!valid) return;

    try {
      
      const storedUser = await AsyncStorage.getItem('registeredUser');
      const parsedUser = storedUser ? JSON.parse(storedUser) : null;

      if (parsedUser && parsedUser.username === username && parsedUser.password === password) {
        navigation.navigate('HomepageScreen', { username });
        return;
      }

      
      const response = await axios.post('https://fakestoreapi.com/auth/login', { username, password });

      if (response.data && response.data.token) {
        navigation.navigate('HomepageScreen', { username });
      } else {
        setLoginError('Invalid username or password.');
      }
    } catch (error) {
      if (error.response) {
        setLoginError(error.response.status === 401 ? 'Invalid username or password.' : error.response.data.message || 'Something went wrong. Please try again.');
      } else if (error.request) {
        setLoginError('No response from the server. Please check your connection.');
      } else {
        setLoginError('Something went wrong. Please try again.');
      }
    }
  };

  return (
    <ImageBackground
      source={require('../assets/login_bg.jpg')}
      style={loginStyle.container}
    >
      <View style={loginStyle.formContainer}>
        <Text style={loginStyle.formHeader}>LOGIN</Text>

        <Text style={loginStyle.label}>Username</Text>
        <TextInput
          style={loginStyle.input}
          placeholder="Enter your username"
          placeholderTextColor="#888"
          value={username}
          onChangeText={validateUsername}
        />
        {usernameError ? <Text style={loginStyle.errorText}>{usernameError}</Text> : null}

        <Text style={loginStyle.label}>Password</Text>
        <TextInput
          style={loginStyle.input}
          placeholder="Enter your password"
          placeholderTextColor="#888"
          value={password}
          onChangeText={validatePassword}
          secureTextEntry
        />
        {passwordError ? <Text style={loginStyle.errorText}>{passwordError}</Text> : null}

        <TouchableOpacity style={loginStyle.loginButton} onPress={handleLogin}>
          <Text style={loginStyle.loginText}>Sign In</Text>
        </TouchableOpacity>

        {loginError ? <Text style={loginStyle.errorText}>{loginError}</Text> : null}

        <View style={loginStyle.accountTextContainer}>
          <Text style={loginStyle.otherText}>Don't have an account? </Text>
          <TouchableOpacity onPress={() => navigation.navigate('RegisterScreen')}>
            <Text style={loginStyle.registerText}>Register</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
};

export default LoginScreen;
