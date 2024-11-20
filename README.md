# Legend List

Legend List aims to be a drop-in replacement for FlatList with much better performance and supporting dynamically sized items.

## Caution: Experimental

This is an early release to test and gather feedback. It's not used in production yet and needs more work to reach parity with FlatList features.

## Features

In addition to normal FlatList features:

-   Dynamic layouts supported. Just use the `estimatedItemLength` prop to give a close estimate so that layouts aren't too far off, and positions will adjust while rendering.
-   `autoScrollToBottom`: If true and scroll is within `autoScrollToBottomThreshold * screen height` then changing items or heights will scroll to the bottom. This can be useful for chat interfaces.
-   `recycleItems` prop enables toggling recycling of list items. If enabled it will reuse item components for improved performance, but it will reuse any local state in items. So if you have local state in items you likely want this disabled.

## Usage

## PRs gladly accepted!

There's not a lot of code here so hopefully it's easy to contribute. If you want to add a missing feature or fix a bug please post an issue to see if development is already in progress so we can make sure to not duplicate work 😀.

## TODO list

-   onViewableItemsChanged
-   Adjust scroll when item heights change above the viewable area so they don't jump
-   A prop to start with items at the bottom like a chat interface, just needs to pad the top with screen height - items height
-   Other important missing features from FlatList or other lists libraries
-   Optimizations:
    -   Loop over only potentially changed items when adjusting heights rather than data array
