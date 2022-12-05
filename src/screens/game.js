import React, { useEffect, useState, useRef } from "react";
import { StatusBar, SafeAreaView, Pressable, Text, TouchableOpacity } from "react-native";
import styled from "styled-components/native";
import { useDispatch, useSelector } from "react-redux";

import { changeFlag, startGame } from "../actions/action";
import { Board } from "../components/board/board";
import { Spacer } from "../components/utility/spacer";
import { colors } from "../theme/colors";
import { GameStatus } from "../utils/types";


const Container = styled(SafeAreaView)`
    flex: 1;
    backgroundColor: ${colors.PINK_500};
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


const formatTime = (time) => (time < 10) ? `0${time}` : time;


export const Game = ({ navigation, route }) => {

    const difficulty = route.params.difficulty;

    const dispatch = useDispatch();

    const flag = useSelector(state => state.reducer.flag);
    const flagNumber = useSelector(state => state.reducer.flagNumber);
    const bombNumber = useSelector(state => state.reducer.bombNumber);
    const gameStatus = useSelector(state => state.reducer.gameStatus);
    const isFinished = useSelector(state => state.reducer.isFinished);

    const [time, setTime] = useState(0);
    const interval = useRef(null);

    useEffect(() => {
        dispatch(startGame(difficulty))
    }, []);

    useEffect(() => {
        if (!isFinished) {
            interval.current = setInterval(() => { setTime(time + 1) }, 1000);
        }
        return () => clearInterval(interval.current);
    }, [time, isFinished]);

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
                    <Counter><Text>{bombNumber - flagNumber}</Text></Counter>
                    <TouchableOpacity
                        onPress={() =>
                            dispatch(changeFlag())
                        }
                    >
                        {!isFinished && (flag ? <Title>😱</Title> : <Image source={require("../../assets/flag.png")} />)}
                        {isFinished && (gameStatus === GameStatus.WON ? <Title>💯</Title> : <Title>💩</Title>)}

                    </TouchableOpacity>
                    <Counter><Text>{formatTime(Math.floor(time / 60))}:{formatTime(time % 60)}</Text></Counter>
                </CounterHeader>
                <Spacer size="medium" />
                <Board />
                <Spacer size="xxl" />
                {gameStatus === GameStatus.LOST && < Title > YOU LOST</Title>}
                {gameStatus === GameStatus.WON && < Title > YOU WON</Title>}
            </Content>
        </Container>
    );
};
