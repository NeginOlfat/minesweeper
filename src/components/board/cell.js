import React from "react";
import { TouchableOpacity } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components/native";

import { colors } from "../../theme/colors";
import { press } from "../../actions/action";
import { CellStatus, CellValue } from "../../utils/types";


const Container = styled.View`
    width: 30px;
    height: 30px;
    align-items: center;
    justify-content: center;
    border-width: ${props => (props.isRevealed ? "3px" : "1px")};
    background-color: ${props => (props.isBomb && props.isRevealed ? colors.PINK_800 : colors.PINK_500)};
    border-top-color: ${(props) => (props.isRevealed ? colors.PINK_600 : colors.PINK_100)};
    border-left-color: ${(props) => (props.isRevealed ? colors.PINK_600 : colors.PINK_100)};
    border-right-color: ${(props) => (props.isRevealed ? colors.PINK_500 : colors.PINK_600)};
    border-bottom-color: ${(props) => (props.isRevealed ? colors.PINK_500 : colors.PINK_600)};
`;

const Image = styled.Image.attrs({
    resizeMode: "contain"
})`
    width: 20px;
    height: 20px;
`;

const Title = styled.Text`
    align-items: center;
`;

const showValue = (item) => {
    let text = ""
    if (item.cellStatus === CellStatus.REVEALED) {
        text = item.cellValue === CellValue.NONE ? " " : item.cellValue
    }
    return text
};


export const Cell = ({ item }) => {

    const dispatch = useDispatch();

    return (
        <TouchableOpacity
            onPress={() => {
                if (item.cellStatus !== CellStatus.REVEALED)
                    dispatch(press(item))
            }}
        >
            <Container
                isRevealed={item.cellStatus === CellStatus.REVEALED}
                isBomb={item.cellValue === CellValue.BOMB}
            >
                {item.cellStatus === CellStatus.REVEALED && item.cellValue === CellValue.BOMB &&
                    <Image source={require("../../../assets/bomb.png")} />}
                {item.cellStatus !== CellStatus.FLAGGED && item.cellValue !== CellValue.BOMB &&
                    <Title>{showValue(item)}</Title>}
                {item.cellStatus === CellStatus.FLAGGED &&
                    <Image source={require("../../../assets/flag.png")} />}
            </Container>
        </TouchableOpacity>
    );
};
