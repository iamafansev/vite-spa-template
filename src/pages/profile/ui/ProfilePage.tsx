import { routeApi } from "../config/routeApi";

export const ProfilePage = () => {
  const data = routeApi.useLoaderData();

  return (
    <section className="flex flex-col items-center pt-32">
      <h1 className="font-bold text-4xl">{data.userLogin || "No name"}</h1>
    </section>
  );
};
