import React from "react";
import styled from "styled-components/native";

const sizeVariant = {
    small: 0,
    medium: 4,
    large: 8,
    xl: 16,
    xxl: 32
};

const positionVariant = {
    top: "margin-top",
    left: "margin-left",
    right: "margin-right",
    bottom: "margin-bottom"
}

const SpaceView = styled.View`
    ${({ variant }) => variant};
`;

export const Spacer = ({ position = "top", size = "small", children }) => {
    const property = positionVariant[position];
    const value = sizeVariant[size];
    const variant = `${property}:${value}px`;
    return <SpaceView variant={variant} >{children}</SpaceView>
};
