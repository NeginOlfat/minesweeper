import React from "react";
import styled from "styled-components/native";

import { DifficultyButton } from "../components/button/difficulty-button";
import { Spacer } from "../components/utility/spacer";
import { colors } from "../theme/colors";
import { Difficulty } from "../utils/types";


const Container = styled.View`
    flex: 1;
    background-color: ${colors.PINK_500};
    align-items: center;
    justify-content: center;
`;

const Title = styled.Text`
    textTransform: uppercase;
    color: ${colors.MUSTARD};
    font-size: 40px;
    font-weight: 600;
`;

const SubTitle = styled.Text`
    textTransform: uppercase;
    color: ${colors.PURPLE};
    font-size: 25px;
`;


export const Home = ({ navigation }) => {
    return (
        <Container>
            <Title>
                minesweeper
            </Title>
            <Spacer size="large" />
            <SubTitle>
                SELECT GAME DIFFICULTY
            </SubTitle>
            <Spacer size="xl" />
            <DifficultyButton
                onPress={() => navigation.navigate("game", { difficulty: Difficulty.EASY })}
                title="EASY 🙂"
            />
            <Spacer size="medium" />
            <DifficultyButton
                onPress={() => navigation.navigate("game", { difficulty: Difficulty.MEDIUM })}
                title="MEDIUM 🤪"
            />
            <Spacer size="medium" />
            <DifficultyButton
                onPress={() => navigation.navigate("game", { difficulty: Difficulty.HARD })}
                title="HARD ☠️"
            />
        </Container>
    );
};
