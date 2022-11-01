import { useQRCode } from 'next-qrcode';
import { Container, QRBox, SubTitle, Title } from './styles';

export function QRCode({ name }: { name: string }) {
    const { Image } = useQRCode();

    return (
        <Container>
            <Title>{name}</Title>
            <QRBox>
                <SubTitle>Scan Me</SubTitle>
                <Image
                    text="http://localhost:3000/Sucess"
                    options={{
                        type: 'image/jpeg',
                        quality: 0.3,
                        level: 'M',
                        margin: 3,
                        scale: 4,
                        width: 200,
                        color: {
                            dark: '#000',
                            light: '#fff',
                        },
                    }}
                />
            </QRBox>
        </Container>
    );
}
