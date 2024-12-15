import { LogBox, Platform, StyleSheet } from "react-native";

LogBox.ignoreLogs(["Open debugger"]);

// @ts-ignore
const uiManager = global?.nativeFabricUIManager ? "Fabric" : "Paper";

console.log(`Using ${uiManager}`);

export default function HomeScreen() {
    return null;
}

const styles = StyleSheet.create({
    listHeader: {
        alignSelf: "center",
        height: 100,
        width: 100,
        backgroundColor: "#456AAA",
        borderRadius: 12,
        marginHorizontal: 8,
        marginTop: 8,
    },
    outerContainer: {
        backgroundColor: "#456",
        bottom: Platform.OS === "ios" ? 82 : 0,
    },
    scrollContainer: {
        paddingHorizontal: 16,
        // paddingrVertical: 48,
    },

    itemContainer: {
        // padding: 4,
        // borderBottomWidth: 1,
        // borderBottomColor: "#ccc",
    },
    listContainer: {
        // paddingHorizontal: 16,
        // paddingTop: 48,
        // flexGrow: 1,
        // marginTop: -400,
    },
});
