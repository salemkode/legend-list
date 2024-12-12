import { ThemedText } from "@/components/ThemedText";
import { LegendList } from "@legendapp/list";
import { Link, type LinkProps } from "expo-router";
import { StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

type ListElement = {
    id: number;
    title: string;
    url: LinkProps["href"];
};

const data: ListElement[] = [
    {
        id: 1,
        title: "Initial scroll index precise navigation",
        url: "/initial-scroll-index",
    },
    {
        id: 2,
        title: "Chat example",
        url: "/chat-example",
    },
    // Add more items as needed
];

const RightIcon = () => <ThemedText type="subtitle">›</ThemedText>;

const ListItem = ({ title, url }: ListElement) => (
    <Link href={url}>
        <View style={styles.item}>
            <ThemedText>{title}</ThemedText>
            <RightIcon />
        </View>
    </Link>
);

const ListElements = () => {
    return (
        <SafeAreaView style={styles.container}>
            <LegendList
                estimatedItemSize={80}
                data={data}
                renderItem={({ item }) => <ListItem {...item} />}
                keyExtractor={(item) => item.id.toString()}
            />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    item: {
        padding: 16,
        borderBottomColor: "#ccc",
        borderBottomWidth: 1,
        width: "100%",
        flexDirection: "row",
        justifyContent: "space-between",
    },
});

export default ListElements;
