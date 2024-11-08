import { useLoaderData } from "react-router-typesafe";

import type { Data } from "../api/loader";

import LogoIcon from "./vite.svg?react";
import classes from "./RootPage.module.css";

export const RootPage = () => {
    const data = useLoaderData<Data>();

    return (
        <section className="flex flex-col items-center">
            <LogoIcon />
            <h1 className="font-bold text-4xl underline">{data.title}</h1>
            <div className={classes.card}>
                <p>
                    Edit <code>src/App.tsx</code> and save to test HMR
                </p>
            </div>
            <p className="read-the-docs">Click on the Vite and React logos to learn more</p>
        </section>
    );
};

RootPage.displayName = "RootPage";
