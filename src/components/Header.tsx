import React from 'react';
import { Text, StyleSheet, View, TouchableOpacity } from 'react-native';
import { useMayoSettings } from 'mayo-settings';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const Header = ({ count, goodCount, wrongCount }) => {
    const insets = useSafeAreaInsets();
    const { handleOpenMayoSettings } = useMayoSettings();

    return (
      <View style={{ paddingTop: insets.top }}>
        <View style={styles.headerContainer}>
          <View style={styles.header}>
            <View style={styles.headerBox}>
                <Text style={styles.headerText}>G{goodCount} W{wrongCount} T{count}</Text>
            </View>
          </View>
          <TouchableOpacity onPress={handleOpenMayoSettings}>
            <Text style={styles.optionsMenuText}>...</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.headerSeparator} />
      </View>
    );
};

export default Header;

const styles = StyleSheet.create({
    headerText: {
        position: 'absolute',
        left: 10,
        fontWeight: 'bold',
    },
    headerContainer: {
        flexDirection: 'row',
        justifyContent: 'center', // This centers the title with the count
        alignItems: 'center',
        paddingBottom: 10, // Adjust this to control space between header and the content
    },
    header: {
        flex: 1, // Takes full width
        // height: 70, // Height of the header
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white', // Change this to your preferred background color
    },
    optionsButton: {
        position: 'absolute',
        right: 10, // Adjust for desired spacing from the right edge
        top: '50%',
        transform: [{ translateY: -12 }], // Half of the font size to vertically center
    },
    headerBox: {
      backgroundColor: '#e0e0e0',
      padding: 5,
      borderRadius: 5,
    },
    headerCount: {
      fontWeight: 'bold',
    },
    headerSeparator: {
      height: 1, // Height of separator line
      backgroundColor: 'grey', // Color of separator line
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5, // for Android shadow
    },
    optionsMenuText: {
        fontSize: 24,
        padding: 5,
    }
  });
