import { StyleSheet } from 'react-native';

export const registerStyle = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    formHeader: {
        fontWeight: 'bold',
        marginBottom: 20,
        color: '#fff',
        fontSize: 24,
        textAlign: 'center',
    },
    formContainer: {
        position: 'absolute',
        left: 20,
        right: 20,
        borderWidth: 2,
        borderRadius: 20,
        padding: 40,
        elevation: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.,
        shadowRadius: 6,
        height: 580,
        top: '20%',
        backgroundColor: 'rgba(0,0,0,0.88)',
    },

    label: {
        color: 'white',
        fontSize: 14,
        marginBottom: 12,
        fontWeight: 'bold',
    },
    input: {
        height: 50,
        borderBottomWidth: 0.5, // Only bottom border
        borderBottomColor: '#fff', // Set bottom border color
        marginBottom: 20,
        paddingHorizontal: 10,
        color: 'white',
        fontSize: 16, // Slightly larger for better readability
    },
    inputError: {
        borderBottomColor: 'red', // Red bottom border when there is an error
    },

    errorText: {
        color: 'white', // White text for error messages
        fontSize: 12,
        marginBottom: 10,
        textAlign: 'left', // Align error text to the left
    },
    registerButton: {
        width: '100%',
        backgroundColor: 'red',
        borderRadius: 5,
        padding: 14,
        marginBottom: 10,
        justifyContent: 'center',
    },
    registerText: {
        color: '#fff',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    otherButton: {
        width: '100%',
        padding: 10,
        marginBottom: 10,
        justifyContent: 'center',
    },
    otherText: {
        color: '#fff',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    accountTextContainer: {
        flexDirection: 'row',
        marginTop: 15,
        justifyContent: 'center',
    },

    otherText: {
        fontSize: 14,
        color: '#666',
    },

    createOneText: {
        fontSize: 14,
        color: 'red',
        fontWeight: 'bold',
        textDecorationLine: 'none',
    },
    
});

export const loginStyle = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    formHeader: {
        fontWeight: 'bold',
        marginBottom: 20,
        color: '#fff',
        fontSize: 28,
        textAlign: 'center',
    },
    formContainer: {
        position: 'absolute',
        left: 20,
        right: 20,
        borderWidth: 2,
        borderRadius: 20,
        padding: 30,
        elevation: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: -2 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        height: 500,
        top: '25%',
        backgroundColor: 'rgba(0,0,0,0.88)'
    },
    label: {
        color: 'white',
        fontSize: 14,
        marginBottom: 12,
        fontWeight: 'bold',
    },
    input: {
        height: 50,
        borderBottomWidth: 0.5, // Only bottom border
        borderBottomColor: '#fff', // Set bottom border color
        marginBottom: 20,
        paddingHorizontal: 10,
        color: 'white',
        fontSize: 16, // Slightly larger for better readability
    },
    inputError: {
        borderBottomColor: 'red', // Red bottom border when there is an error
    },
    errorText: {
        color: 'red',
        fontSize: 14,
        marginBottom: 10,
        textAlign: 'left',
    },
    loginButton: {
        width: '100%',
        backgroundColor: 'red',
        padding: 18,
        marginBottom: 10,
        borderRadius: 5,
        marginTop: 10,
        justifyContent: 'center',
    },
    loginText: {
        color: '#fff',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    otherButton: {
        width: '100%',
        padding: 10,
        marginBottom: 10,
        justifyContent: 'center',
    },
    otherText: {
        color: '#fff',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    accountTextContainer: {
        flexDirection: 'row',
        marginTop: 15,
        justifyContent: 'center',
    },

    otherText: {
        fontSize: 14,
        color: '#666',
    },

    registerText: {
        fontSize: 14,
        color: 'red',
        fontWeight: 'bold',
        textDecorationLine: 'none',
    },

});
