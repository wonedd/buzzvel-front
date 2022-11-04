import { useQRCode } from 'next-qrcode';
import { parseCookies } from 'nookies';
import { Container, QRBox, SubTitle, Title } from './styles';

export function QRCode({ name }: { name: string | undefined }) {
    const { Image } = useQRCode();
    const { 'buzzvel-token': token } = parseCookies();
    console.log('🚀 ~ file: index.tsx ~ line 8 ~ QRCode ~ token', token);

    return (
        <Container>
            <Title>{name}</Title>
            <QRBox>
                <SubTitle>Scan Me</SubTitle>
                <Image
                    text={`https://buzzvel-front.vercel.app/Success?token=${token}`}
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
