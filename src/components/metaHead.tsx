import { FC } from 'react';
import Head from 'next/head';
import { theme } from '../theme';

interface IMetaHead {
    title: string;
}

export const MetaHead: FC<IMetaHead> = ({ title }) => {
    return (
        <Head>
            <meta charSet="utf-8" />
            <meta name="theme-color" content={theme.black} />
            <meta
                name="viewport"
                content="width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no"
            />
            <title>{title}</title>
        </Head>
    );
};
