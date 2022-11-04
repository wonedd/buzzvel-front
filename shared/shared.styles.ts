import styled from '@emotion/styled';

export const Container = styled.main`
    max-width: 400px;
    margin: 0 auto;

    gap: 32px;

    padding: 8px;
`;

export const Content = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    max-width: 400px;
`;

export const Title = styled.h1`
    align-self: center;
    font-size: 1.5rem;
`;

export const Text = styled.p`
    font-size: 1.2rem;
    font-weight: 500;
    max-width: 400px;
`;
