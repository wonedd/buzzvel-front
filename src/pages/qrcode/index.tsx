import { useContext } from 'react';
import { QRCode } from '../../components/QRCode';
import { AuthContext } from '../../contexts/AuthContext';

export default function Qrcode() {
    const { user } = useContext(AuthContext);
    return <QRCode name={user?.name} />;
}
