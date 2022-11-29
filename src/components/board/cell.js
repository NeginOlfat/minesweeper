import React from "react";
import { TouchableOpacity, Image } from "react-native";
import styled from "styled-components/native";

import { colors } from "../../theme/colors";

const Container = styled.View`
    width: 30px;
    height: 30px;
    align-items: center;
    justify-content: center;
     border-width: 1px;
    background-color: ${colors.PINK_500};
    border-top-color: ${colors.PINK_100};
    border-left-color: ${colors.PINK_100};
    border-right-color: ${colors.PINK_600};
    border-bottom-color: ${colors.PINK_600};
`;


export const Cell = ({ item }) => {

    return (
        <TouchableOpacity
            onPress={() => console.log(item)}
        >
            <Container>
            </Container>
        </TouchableOpacity>
    );
};
