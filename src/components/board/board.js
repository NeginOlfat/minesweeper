import React from "react";
import { View } from "react-native";
import { useDispatch, useSelector } from "react-redux";

import { Cell } from "./cell";


export const Board = () => {

    const cells = useSelector(state => state.reducer.cells)

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
