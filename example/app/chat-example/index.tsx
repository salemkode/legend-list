import { LegendList } from "@legendapp/list";
import { useState } from "react";
import { Button, StyleSheet, Text, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

type Message = {
    id: string;
    text: string;
    sender: "user" | "bot";
    timeStamp: number;
};

let idCounter = 0;

const defaultChatMessages: Message[] = [
    { id: String(idCounter++), text: "Hello", sender: "bot", timeStamp: Date.now() },
    { id: String(idCounter++), text: "How can I help you?", sender: "bot", timeStamp: Date.now() },
];

const ChatExample = () => {
    const [messages, setMessages] = useState<Message[]>(defaultChatMessages);
    const [inputText, setInputText] = useState("");

    const sendMessage = () => {
        if (inputText.trim()) {
            setMessages((messages) => [
                ...messages,
                { id: String(idCounter++), text: inputText, sender: "user", timeStamp: Date.now() },
            ]);
            setInputText("");
            setTimeout(() => {
                setMessages((messages) => [
                    ...messages,
                    {
                        id: String(idCounter++),
                        text: `Answer: ${inputText.toUpperCase()}`,
                        sender: "bot",
                        timeStamp: Date.now(),
                    },
                ]);
            }, 300);
        }
    };

    return (
        <SafeAreaView style={styles.container} edges={["bottom"]}>
            <LegendList
                data={messages}
                keyExtractor={(item) => item.id}
                estimatedItemSize={80}
                maintainScrollAtEnd
                renderItem={({ item }) => (
                    <>
                        <View
                            style={[
                                styles.messageContainer,
                                item.sender === "bot" ? styles.botStyle : styles.userStyle,
                            ]}
                        >
                            <Text style={styles.messageText}>{item.text}</Text>
                        </View>
                        <View style={[styles.timeStamp, item.sender === "bot" ? styles.botStyle : styles.userStyle]}>
                            <Text>{new Date(item.timeStamp).toLocaleTimeString()}</Text>
                        </View>
                    </>
                )}
            />
            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    value={inputText}
                    onChangeText={setInputText}
                    placeholder="Type a message"
                />
                <Button title="Send" onPress={sendMessage} />
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
        backgroundColor: "#fff",
    },
    messageContainer: {
        padding: 16,
        backgroundColor: "#f1f1f1",
        borderRadius: 5,
        marginVertical: 5,
    },
    messageText: {
        fontSize: 16,
    },
    inputContainer: {
        flexDirection: "row",
        alignItems: "center",
        padding: 10,
        borderTopWidth: 1,
        borderColor: "#ccc",
    },
    botStyle: {
        width: "60%",
        alignSelf: "flex-start",
    },
    userStyle: {
        width: "60%",
        alignSelf: "flex-end",
    },
    input: {
        flex: 1,
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 5,
        padding: 10,
        marginRight: 10,
    },
    timeStamp: {
        marginVertical: 5,
    },
});

export default ChatExample;
