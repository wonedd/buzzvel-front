import { useQRCode } from 'next-qrcode';
import { Container, QRBox, SubTitle, Title } from './styles';

export function QRCode({ name }: { name: string | undefined }) {
    const { Image } = useQRCode();

    return (
        <Container>
            <Title>{name}</Title>
            <QRBox>
                <SubTitle>Scan Me</SubTitle>
                <Image
                    text="https://buzzvel-front.vercel.app/Sucess"
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