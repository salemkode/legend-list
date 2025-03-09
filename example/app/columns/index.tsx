import { LegendList } from "@legendapp/list";
import { LogBox, StyleSheet, Text, View } from "react-native";

LogBox.ignoreLogs(["Open debugger"]);

const data = Array.from({ length: 10 }, (_, index) => ({ id: index.toString() }));

export default function Columns() {
    return (
        <View style={styles.container}>
            <LegendList
                data={data}
                renderItem={Item}
                keyExtractor={(item) => item.id}
                numColumns={2}
                // ListEmptyComponent2={() => <Text style={{ color: "white" }}>Empty</Text>}
            />
        </View>
    );
}

function Item({ item }: { item: { id: string } }) {
    return (
        <View style={styles.redRectangle}>
            <View style={styles.redRectangleInner} />
            <Text>Item {item.id}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
    },
    redRectangle: {
        aspectRatio: 1,
        // height: 100,
        // width: "100%",
        padding: 10,
    },
    redRectangleInner: {
        height: "100%",
        width: "100%",
        backgroundColor: "red",
        borderRadius: 8,
    },
    columnWrapper: {
        justifyContent: "space-between",
    },
    listHeader: {
        alignSelf: "center",
        height: 100,
        width: 100,
        backgroundColor: "#456AAA",
        borderRadius: 12,
        marginHorizontal: 8,
        marginVertical: 8,
    },
    listEmpty: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#6789AB",
        paddingVertical: 16,
        height: 100,
    },
});
