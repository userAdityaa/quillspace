import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React, { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function Home() { 
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => { 
      setIsMenuOpen(!isMenuOpen);
    }


    return (
        <View style = {styles.container}>
            <Text style = {styles.text}></Text>

            {isMenuOpen && (
              <View style={styles.menu}>
                <TouchableOpacity style={styles.menuItem} onPress={() => router.push('/bookCreation')}>
                  <Text style={styles.menuText}>Write your own blog</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.menuItem} onPress={() => router.push('/bookCreation')}>
                  <Text style={styles.menuText}>Write your own book</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.menuItem} onPress={() => alert("Write your own journal")}>
                  <Text style={styles.menuText}>Write your own journal</Text>
                </TouchableOpacity>
              </View>
            )}

            <TouchableOpacity style = {styles.fab} onPress={toggleMenu}>
                <Ionicons name = {isMenuOpen ? "close": "add"} size = {28} color = "white"></Ionicons>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff7e8c8', 
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 20,
    fontWeight: '500',
  },
  fab: {
    position: 'absolute',
    bottom: 30,
    right: 30,
    backgroundColor: '#e16c90ea',
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5, // Android
    shadowColor: '#000', // iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
  },
  menu: { 
    position: "absolute", 
    bottom: 100, 
    right: 30, 
    alignItems: 'flex-end', 
    gap: 12, 
  }, 
  menuItem: {
    backgroundColor: "#fff", 
    paddingVertical: 10, 
    paddingHorizontal: 16, 
    borderRadius: 8, 
    elevation: 4, 
    shadowColor: '#000', 
    shadowOffset: { width: 0, height: 1}, 
    shadowOpacity: 0.2, 
    shadowRadius: 2, 
  }, 
  menuText: { 
    color: '#333', 
    fontWeight: '500',
  }
});
