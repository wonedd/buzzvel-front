import styled from '@emotion/styled';

export const Container = styled.div`
    display: flex;
    border: 1px solid #ccc;

    width: 100%;
    height: 40px;

    border-radius: 5px;
`;

export const Label = styled.div`
    width: 30%;
    background: #d9d9d9;
    color: #222;

    border-right: 1px solid #ccc;

    display: flex;
    align-items: center;
    justify-content: center;
`;

export const InputBase = styled.input`
    all: unset;
    width: 100%;

    padding-left: 8px;
`;
