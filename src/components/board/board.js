import React from "react";
import { View } from "react-native";
import { Cell } from "./cell";


export const Board = () => {

    const cells = [[0, 1, 2, 3, 4, 5, 6, 7, 8, 9], [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
    [0, 1, 2, 3, 4, 5, 6, 7, 8, 9], [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
    [0, 1, 2, 3, 4, 5, 6, 7, 8, 9], [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
    [0, 1, 2, 3, 4, 5, 6, 7, 8, 9], [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
    [0, 1, 2, 3, 4, 5, 6, 7, 8, 9], [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]]

    return (
        <View>
            {
                cells.map((row, rindex) => {
                    return (
                        <View key={rindex} style={{ flexDirection: "row" }}>
                            {row.map((item, index) => {
                                return <Cell key={index} item={item} />
                            })}
                        </View>
                    )
                })

            }
        </View>
    )
};
