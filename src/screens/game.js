import React, { useEffect } from "react";
import { StatusBar, SafeAreaView, Pressable, Text, TouchableOpacity } from "react-native";
import styled from "styled-components/native";
import { useDispatch, useSelector } from "react-redux";

import { startGame } from "../actions/action";
import { Board } from "../components/board/board";
import { Spacer } from "../components/utility/spacer";
import { colors } from "../theme/colors";


const Container = styled(SafeAreaView)`
    flex: 1;
    backgroundColor: ${colors.PINK_500};
    ${StatusBar.currentHeight && `margin-top: ${StatusBar.currentHeight}px`};
`;

const Header = styled.View`
    flex-direction: row;
    padding: 20px
`;

const Image = styled.Image`
    height: 30px;
    width: 30px;
`;

const Content = styled.View`
    flex: 1;
    justify-content: center;
    align-items: center;
`;

const Title = styled.Text`
    font-size: 24px;
    font-weight: 600;
    color: ${colors.GREEN};
`;

const CounterHeader = styled.View`
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    width: 300px;   
    background-color: ${colors.PINK_600};
    border-width: 3px;
    border-top-color: ${colors.PINK_100};
    border-left-color: ${colors.PINK_100};
    border-right-color: ${colors.PINK_800};
    border-bottom-color: ${colors.PINK_800}
`;

const Counter = styled.View`
    margin: 10px;
    background-color: ${colors.PINK};
    border-width: 3px;
    border-top-color: ${colors.PINK_100};
    border-left-color: ${colors.PINK_100};
    border-right-color: ${colors.PINK_800};
    border-bottom-color: ${colors.PINK_800};
    width: 60px;
    height: 40px;
    justify-content: center; 
    align-items: center;
`;


export const Game = ({ navigation, route }) => {

    const difficulty = route.params.difficulty;
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(startGame(difficulty))
    }, []);

    return (
        <Container>
            <Header>
                <Pressable onPress={() => navigation.goBack()}>
                    <Image source={require("../../assets/back.png")} />
                </Pressable>
            </Header>

            <Content>
                <Title>{difficulty} GAME</Title>
                <Spacer size="large" />
                <CounterHeader>
                    <Counter><Text>10</Text></Counter>
                    <TouchableOpacity
                        onPress={() =>
                            console.log("pressed")
                        }
                    >
                        <Image source={require("../../assets/flag.png")} />
                    </TouchableOpacity>
                    <Counter><Text>00:00</Text></Counter>
                </CounterHeader>
                <Spacer size="medium" />
                <Board />
                <Spacer size="xxl" />
                <Title> YOU LOST</Title>
            </Content>
        </Container>
    );
};
