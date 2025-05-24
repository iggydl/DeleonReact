import { StyleSheet, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

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
        borderBottomWidth: 0.5, 
        borderBottomColor: '#fff', 
        marginBottom: 20,
        paddingHorizontal: 10,
        color: 'white',
        fontSize: 16, 
    },
    inputError: {
        borderBottomColor: 'red', 
    },

    errorText: {
        color: 'white',
        fontSize: 12,
        marginBottom: 10,
        textAlign: 'left', 
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
        borderBottomWidth: 0.5, 
        borderBottomColor: '#fff', 
        marginBottom: 20,
        paddingHorizontal: 10,
        color: 'white',
        fontSize: 16, 
    },
    inputError: {
        borderBottomColor: 'red', 
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

    const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000',
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#000',
    },
    errorContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#000',
        padding: 20,
    },
    errorText: {
        color: '#E50914',
        fontSize: 16,
        marginBottom: 20,
        textAlign: 'center',
    },
    retryButton: {
        backgroundColor: '#E50914',
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 5,
    },
    retryText: {
        color: '#FFF',
        fontSize: 16,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 15,
        paddingVertical: 10,
        backgroundColor: '#111',
        borderBottomWidth: 2,
        borderBottomColor: '#222',
    },
    logoText: {
        color: '#E50914',
        fontSize: 24,
        fontWeight: 'bold',
    },
    headerRight: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    headerButton: {
        marginRight: 15,
    },
    headerButtonText: {
        color: '#FFF',
        fontSize: 16,
    },
    profileButton: {
        width: 30,
        height: 30,
        borderRadius: 5,
        backgroundColor: '#E50914',
        justifyContent: 'center',
        alignItems: 'center',
    },
    profileText: {
        color: '#FFF',
        fontSize: 16,
        fontWeight: 'bold',
    },
    scrollView: {
        flex: 1,
    },
    featuredContainer: {
        width: '100%',
        height: height * 0.55,
        marginBottom: 10,
    },
    featuredImage: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
    },
    featuredGradient: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: '50%',
        justifyContent: 'flex-end',
        padding: 15,
        backgroundColor: 'rgba(0,0,0,0.7)',
    },
    featuredTitle: {
        color: '#FFF',
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    featuredPrice: {
        color: '#E50914',
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    featuredBrand: {
        color: '#AAA',
        fontSize: 16,
    },
    categoryRow: {
        marginBottom: 20,
    },
    categoryTitle: {
        color: '#FFF',
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
        marginLeft: 15,
    },
    horizontalList: {
        paddingLeft: 15,
    },
    horizontalItem: {
        marginRight: 10,
        width: width * 0.28,
        height: width * 0.42,
        borderRadius: 4,
        overflow: 'hidden',
    },
    horizontalItemImage: {
        width: '100%',
        height: '100%',
    },
    itemOverlay: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        padding: 5,
        backgroundColor: 'rgba(0,0,0,0.7)',
    },
    itemPrice: {
        color: '#E50914',
        fontSize: 12,
        fontWeight: 'bold',
    },
    categoriesList: {
        paddingBottom: 20,
    },
    bottomNav: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        backgroundColor: '#111',
        paddingVertical: 10,
        borderTopWidth: 1,
        borderTopColor: '#222',
    },
    navItem: {
        paddingVertical: 5,
    },
    navText: {
        color: '#AAA',
        fontSize: 14,
    },
    activeNavText: {
        color: '#FFF',
        fontWeight: 'bold',
    },
    });

export { styles };