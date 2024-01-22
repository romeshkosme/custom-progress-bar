import React, {useState, useEffect, useRef, useContext} from "react";
import {styled} from "styled-components";
// import { TimerContext } from "../App";

const ProgressBarWrapper = styled.div`
    height: 20px;
    border-radius: 20px;
    width: 100%;
    background: gray;
    margin: 10px 0px;
`;

const ProgressBarSuccess = styled.div<{$percentage: number}>`
    height: 20px;
    border-radius: 20px;
    width: ${props => `${props.$percentage}%`};
    background: green;
`;

function ProgressBar({ percentage}) {
    return (
        <>
            <ProgressBarWrapper>
                <ProgressBarSuccess $percentage={percentage} />
            </ProgressBarWrapper>
        </>
    )
}

export default ProgressBar;