
import { Head } from '@inertiajs/react';
import { useState } from 'react';

export default function Index({ appName = 'My Desktop App', phpVersion, laravelVersion }) {
    const [count, setCount] = useState(0);

    return (

        <>
            <Head title="الرئيسية" />
            <div>hello </div>
        </>
    );
}