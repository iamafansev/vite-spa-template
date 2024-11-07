import { RouteObject } from 'react-router-dom';

export const routes: RouteObject[] = [
    {
        path: "/",
        lazy: async () => {
            const [{ Root }, {loader}] = await Promise.all([
                import("@/pages/Root"),
                import("@/pages/Root/loader")
            ]);

            return {
                loader,
                Component: Root,
            };
        },
    },
];