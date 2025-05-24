import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  formContainer: {
    flex: 1,
    paddingHorizontal: 30,
    justifyContent: 'center',
  },
  logo: {
    height: 50,
    width: '100%',
    marginBottom: 16,
    alignSelf: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 30,
    color: '#000',
  },
  inputContainer: {
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: '#CCCCCC',
    borderRadius: 5,
    marginBottom: 15,
    height: 50,
    alignItems: 'center',
  },
  input: {
    flex: 1,
    height: '100%',
    paddingHorizontal: 15,
    color: '#000',
  },
  eyeIcon: {
    padding: 10,
  },
  eyeIconText: {
    fontSize: 18,
    color: '#888',
  },
  errorText: {
    color: 'red',
    marginBottom: 10,
    textAlign: 'center',
  },
  loginButton: {
    backgroundColor: '#5E259B', 
    height: 50,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  loginText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  forgotPasswordContainer: {
    alignSelf: 'flex-end',
    marginTop: 15,
  },
  forgotPasswordText: {
    color: '#C4A56D',
    fontSize: 14,
  },
  footerContainer: {
    position: 'absolute',
    bottom: 40,
    left: 0,
    right: 0,
    alignItems: 'center',
  },
  noAccountText: {
    textAlign: 'center',
    marginBottom: 15,
    color: '#666',
  },
  createAccountButton: {
    borderWidth: 1,
    borderColor: '#C4A56D',
    borderRadius: 5,
    paddingVertical: 12,
    paddingHorizontal: 15,
    width: '80%',
    alignItems: 'center',
  },
  createAccountText: {
    color: '#C4A56D',
    fontSize: 16,
  },
});

export default styles;