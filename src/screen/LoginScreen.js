import React, { useState } from 'react';
import {
  View,
  TextInput,
  Text,
  TouchableOpacity,
  Image,
  SafeAreaView
} from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { styles } from '../styles/LoginStyle';

const LoginScreen = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async () => {
    setLoginError('');

    if (!username || !password) {
      setLoginError('Please enter both email/username and password.');
      return;
    }

    try {
      const loginData = {
        version_number: "2.2.6",
        Username: username, 
        Password: password, 
        app_name: "xtore"
      };

      console.log('Sending login request:', JSON.stringify(loginData));

      const response = await axios.post(
        'https://pk9blqxffi.execute-api.us-east-1.amazonaws.com/xdeal/LoginXpert',
        loginData,
        {
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );

      console.log('Login response received');

      if (response.data && response.data.XpertData && response.data.XpertData.length > 0) {
        console.log('Login successful');
        
        const userData = response.data.XpertData[0];
        await AsyncStorage.setItem('userToken', userData.token);
        await AsyncStorage.setItem('userData', JSON.stringify(userData));

        navigation.navigate('HomepageScreen', { 
          username: userData.username,
          fullName: `${userData.firstname} ${userData.lastname}`,
          userId: userData.xpert_id
        });
      } else {
        console.log('Login response format unexpected:', response.data);
        setLoginError('Login failed. Invalid Credentials.');
      }
    } catch (error) {
      console.error('Login error:', error);
      
      if (error.response) {
        console.error('Error response status:', error.response.status);
        setLoginError(error.response?.data?.message || `Login failed (${error.response.status})`);
      } else if (error.request) {
        setLoginError('No response from the server. Please check your connection.');
      } else {
        setLoginError('Something went wrong. Please try again.');
      }
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.formContainer}>
        <Image
          source={require('../assets/xure-logo.png')}
          style={styles.logo}
          resizeMode="contain"
        />
        
        <Text style={styles.title}>Sign In</Text>

        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Email address or username"
            placeholderTextColor="#888"
            value={username}
            onChangeText={setUsername}
          />
        </View>

        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Password"
            placeholderTextColor="#888"
            value={password}
            onChangeText={setPassword}
            secureTextEntry={!showPassword}
          />
          <TouchableOpacity 
            style={styles.eyeIcon} 
            onPress={() => setShowPassword(!showPassword)}
          >
            <Text style={styles.eyeIconText}>
              {showPassword ? '👁️' : '👁️‍🗨️'}
            </Text>
          </TouchableOpacity>
        </View>

        {loginError ? <Text style={styles.errorText}>{loginError}</Text> : null}

        <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
          <Text style={styles.loginText}>Login</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.forgotPasswordContainer}>
          <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
        </TouchableOpacity>

        <View style={styles.footerContainer}>
          <Text style={styles.noAccountText}>Don't have an account?</Text>
          <TouchableOpacity 
            style={styles.createAccountButton}
            onPress={() => navigation.navigate('RegisterScreen')}
          >
            <Text style={styles.createAccountText}>Create an Account</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default LoginScreen;