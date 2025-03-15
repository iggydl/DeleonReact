import React, { useState } from 'react';
import { View, TextInput, Text, TouchableOpacity, ImageBackground } from 'react-native';
import { loginStyle } from '../styles/Mainstyles';

const Homescreen = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    console.log('Username:', username);
    console.log('Password:', password);
  };

  return (
    <ImageBackground
      source={require('../assets/background.jpg')}
      style={loginStyle.container}
    >
      <View style={loginStyle.formContainer}>
        <Text style={loginStyle.formHeader}>LOGIN ACCOUNT</Text>

        {/* Username Input Field with Label */}
        <Text style={loginStyle.label}>Username</Text>
        <TextInput
          style={loginStyle.input}
          placeholder="Enter your username"
          placeholderTextColor="#888"
          value={username}
          onChangeText={setUsername}
        />

        {/* Password Input Field with Label */}
        <Text style={loginStyle.label}>Password</Text>
        <TextInput
          style={loginStyle.input}
          placeholder="Enter your password"
          placeholderTextColor="#888"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />

        <TouchableOpacity style={loginStyle.loginButton} onPress={handleLogin}>
          <Text style={loginStyle.loginText}>LOGIN</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

export default Homescreen;
