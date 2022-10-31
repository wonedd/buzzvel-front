import styled from '@emotion/styled';

export const Container = styled.button`
    all: unset;
    height: 48px;

    text-align: center;

    padding: 8px 16px;

    border: 1px solid #ccc;
    border-radius: 5px;

    background-color: transparent;

    cursor: pointer;

    transition: 0.2s;

    color: #fff;
    font-size: 1.3rem;
    font-weight: 600;

    &:hover {
        background-color: #ccc;
        color: #222;
    }
`;

export const Loading = styled.div`
    width: 16px;
    height: 16px;

    border: 3px solid #fff;
    border-top: 3px solid #222;
    border-right: 3px solid #222;
    border-radius: 50%;

    margin: 0 auto;

    animation: loading 0.5s linear infinite;
`;
