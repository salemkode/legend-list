# Legend List 

**Legend List** is a high-performance list component for **React Native**, written purely in Javascript / Typescript (no native dependencies). It aims to be a drop-in replacement for `FlatList` and/or `FlashList` with better performance, especially when handling dynamically sized items.

---

## ⚠️ Caution: Experimental ⚠️ 

This is an early release to test and gather feedback. It's not used in production yet and needs more work to reach parity with FlatList (and FlashList) features.

---

## 🤔 Why Legend List?

*   **Performance:** Designed from the ground up for speed, aiming to outperform `FlatList` in common scenarios.
*   **Dynamic Item Sizes:** Natively supports items with varying heights without performance hits. Just provide an `estimatedItemSize`.
*   **Drop-in Potential:** Aims for API compatibility with `FlatList` for easier migration.
*   **Pure JS/TS:** No native module linking required, ensuring easier integration and compatibility across platforms.
*   **Lightweight:** Our goal is to keep LegendList as small of a dependency as possible. For more advanced use cases, we plan on supporting optional plugins. This ensures that we keep the package size as small as possible.

For more information, listen to the podcast we had on [React Native Radio](https://infinite.red/react-native-radio/rnr-325-legend-list-with-jay-meistrich)!

---
## ✨ Additional Features 

Beyond standard `FlatList` capabilities:

*   `maintainScrollAtEnd`: (boolean) If `true` and the user is scrolled near the bottom (within `maintainScrollAtEndThreshold * screen height`), the list automatically scrolls to the end when items are added or heights change. Ideal for chat interfaces.
*   `recycleItems`: (boolean) Toggles item component recycling.
    *   `true` (default): Reuses item components for optimal performance. Be cautious if your item components contain local state, as it might be reused unexpectedly.
    *   `false`: Creates new item components every time. Less performant but safer if items have complex internal state.

---

## 📚 Documentation (In Progress)

For comprehensive documentation, guides, and the full API reference, please visit:

➡️ **[Legend List Documentation Site](https://www.legendapp.com/open-source/list)**

---

## 💻 Usage

### Installation

```bash
# Using Bun
bun add @legendapp/list

# Using npm
npm install @legendapp/list

# Using Yarn
yarn add @legendapp/list
```

### Example
```ts
import React, { useRef } from "react"; 
import { View, Image, Text, StyleSheet } from "react-native";
import { LegendList, LegendListRef, LegendListRenderItemProps } from "@legendapp/list";
import { userData } from "../userData"; // Assuming userData is defined elsewhere

// Define the type for your data items
interface UserData {
    id: string;
    name: string;
    photoUri: string;
}

const LegendListExample = () => {

    // Optional: Ref for accessing list methods (e.g., scrollTo)
    const listRef = useRef<LegendListRef | null>(null);

    const renderItem = ({ item }: LegendListRenderItemProps<UserData>) => {

        return (
            <View style={styles.itemContainer}>
                <Image style={styles.profilePic} source={{ uri: item.photoUri }} />
                <Text style={styles.name}>{item.name}</Text>
            </View>
        );
    };

    return (
        <LegendList<UserData>
            // Required Props
            data={data}
            renderItem={renderItem} 
            estimatedItemSize={70} 

            // Strongly Recommended Prop (Improves performance)
            keyExtractor={(item) => item.id} 

            // Optional Props
            ref={listRef} 
            recycleItems={true}   
            maintainScrollAtEnd={false} 
            maintainScrollAtEndThreshold={1} 

            // See docs for all available props!
        />
    );
};

export default LegendListExample;

```

---

## How to Build

`npm run build` will build the package to the `dist` folder.

## Running the Example

1. `cd example`
2. `npm i`
3. `npm run bootstrap-start`

## PRs gladly accepted!

There's not a lot of code here so hopefully it's easy to contribute. If you want to add a missing feature or fix a bug please post an issue to see if development is already in progress so we can make sure to not duplicate work 😀.

## TODO list

See [Road to v1](https://github.com/LegendApp/legend-list/issues/28)

## Community

Join us on [Discord](https://discord.gg/tuW2pAffjA) to get involved with the Legend community.

## 👩‍⚖️ License

[MIT](LICENSE)
