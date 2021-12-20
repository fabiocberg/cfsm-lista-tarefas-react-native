import React from "react";
import { Image, Platform, StyleSheet, Text, View } from "react-native";
// @ts-ignore
import logo from "../../assets/images/logo.png";

export default function Header() {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image style={styles.logo} source={logo} />
        <Text style={styles.title}>Lista de Tarefas</Text>
      </View>
    </View>
  );
}

const logoSize = 40;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#55B659",
    paddingTop: Platform.select({ ios: 30, android: 40, web: 0 }),
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 15,
    paddingVertical: 8,
  },
  logo: {
    width: logoSize,
    height: logoSize,
  },
  title: {
    marginLeft: 8,
    color: "#fff",
    fontSize: 18,
  },
});
