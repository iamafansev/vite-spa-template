import { useLoaderData } from "react-router-typesafe";

import type { Data } from "./loader";

export const Root = () => {
    const data = useLoaderData<Data>();

    return (
        <>
            <h1 className="font-bold text-4xl underline">{data.title}</h1>
            <div className="card">
                <p>
                    Edit <code>src/App.tsx</code> and save to test HMR
                </p>
            </div>
            <p className="read-the-docs">Click on the Vite and React logos to learn more</p>
        </>
    );
};

Root.displayName = "Root";
