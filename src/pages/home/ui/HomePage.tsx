import { Link } from "react-router-dom";
import { useLoaderData } from "react-router-typesafe";

import { useTheme } from "@/entities/theme";

import type { Data } from "../api/loader";

import LogoIcon from "./vite.svg?react";
import classes from "./HomePage.module.css";
import { useCallback } from "react";

export const HomePage = () => {
    const { theme, setTheme } = useTheme();
    const data = useLoaderData<Data>();

    const toggleTheme = useCallback(() => {
        if (theme === "dark") {
            setTheme("light");
        } else {
            setTheme("dark");
        }
    }, [theme, setTheme]);

    return (
        <section className="flex flex-col items-center pt-32">
            <LogoIcon />
            <h1 className="font-bold text-4xl underline">{data.title}</h1>
            <div className={classes.card}>
                <p>
                    Edit <code>src/App.tsx</code> and save to test HMR
                </p>
                <Link to="/unknown" className="underline">
                    go to UNKNOWN (404) page
                </Link>
            </div>
            <button type="button" onClick={toggleTheme}>
                toggle theme
            </button>
            <p className="read-the-docs">Click on the Vite and React logos to learn more</p>
        </section>
    );
};

HomePage.displayName = "HomePage";
