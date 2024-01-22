import React, {useState, createContext, useRef, useEffect} from "react";
import ProgressBar from "./components/ProgressBar";
import styled from "styled-components";

const ContainerWrapper = styled.div`
    max-width: 1280px;
    margin: auto;
`;

const Input = styled.input`
    height: 30px;
    width: 100px;
    border-radius: 5px;
    padding: 0px 5px;
`;

const Button = styled.button`
    height: 30px;
    width: 100px;
`;

function App() {
    const [count, setCount] = useState<number>(0);
    const [percentage, setPercentage] = useState<number[]>([]);
    const interval = useRef(null);
    const currentIndex = useRef(null);

    const start = () => {
        if (!interval.current) {
            currentIndex.current = (currentIndex && currentIndex.current) || 0;
            interval.current = setInterval(() => {
                setPercentage((prev: number[]) => {
                    prev[currentIndex.current] += 1;
                    return [...prev];
                });
            }, 10);
        }
    }

    const pause = () => {
        if (interval.current) {
            clearInterval(interval.current);
            interval.current = null;
        }
    }

    useEffect(() => {
        if (interval.current && percentage[currentIndex.current] === 100) {
            if (currentIndex.current === (count-1)) {
                clearInterval(interval.current);
                interval.current = null;
                return;
            }
            currentIndex.current += 1;
        }
    }, [percentage]);

    const onInputChange = (e) => {
        setCount(e.target.value);
        currentIndex.current = 0;
        if (e.target.value && Number(e.target.value) > 0) {
            setPercentage(new Array(Number(e.target.value)).fill(0));
        }
    }

    return (
        <>
            <main>
                <ContainerWrapper>
                    <h1>Custom Progress-bar</h1>
                    <div>
                        <Input type="number" value={count} onChange={onInputChange} />
                        <Button onClick={start}>Start</Button>
                        <Button onClick={pause}>Pause</Button>
                    </div>
                    {
                        percentage && percentage?.map((_percentage: number, index: number) => (
                            <React.Fragment key={`bar-${index}`}>
                                <ProgressBar percentage={_percentage} />
                            </React.Fragment>
                        ))
                    }
                </ContainerWrapper>
            </main>
        </>
    )
}

export default App;