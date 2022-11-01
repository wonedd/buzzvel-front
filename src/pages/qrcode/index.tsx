import { useContext } from 'react';
import { QRCode } from '../../components/QRCode';
import { AuthContext } from '../../contexts/AuthContext';

export default function Qrcode() {
    const { user } = useContext(AuthContext);
    console.log('🚀 ~ file: index.tsx ~ line 7 ~ Qrcode ~ user', user);
    return <QRCode name={user?.name} />;
}
