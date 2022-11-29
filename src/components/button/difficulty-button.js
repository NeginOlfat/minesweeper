import React from "react";
import { Pressable } from "react-native";
import styled from "styled-components/native";

import { colors } from "../../theme/colors";


const ButtonText = styled.Text`
    color: ${colors.GREEN};
    fontSize: 20px;
`;

export const DifficultyButton = ({ onPress, title }) => {
    return (
        <Pressable onPress={onPress}>
            <ButtonText>{title}</ButtonText>
        </Pressable>
    )
};
