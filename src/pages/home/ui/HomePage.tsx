import { useCallback } from "react";
import { useRouter } from "@tanstack/react-router";
import { useQueryClient } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import { Button, Input } from "@heroui/react";

import { useApiClient } from "@/shared/api/client";

import { routeApi } from "../config/routeApi";

export const HomePage = () => {
  const { t } = useTranslation("home-page");

  const router = useRouter();
  const data = routeApi.useLoaderData();
  const search = routeApi.useSearch();
  const client = useQueryClient();
  const { openapiQueryClient } = useApiClient();

  const currentPage = search.page || 0;
  const filterName = search.name;

  const refetchData = useCallback(() => {
    client.invalidateQueries(
      openapiQueryClient.queryOptions("post", "/v1/rest/animal/search")
    );
    router.invalidate({ sync: true });
  }, [router, client, openapiQueryClient]);

  const formAction = useCallback(
    (formData: FormData) => {
      const name = formData.get("name");

      if (typeof name !== "string") {
        return;
      }

      router.navigate({
        to: "/",
        search: (prevSearch) => ({ ...prevSearch, name: name || undefined }),
      });
    },
    [router]
  );

  return (
    <>
      <section className="flex flex-col items-center pt-32">
        <h1 className="font-bold text-4xl">{t("title")}</h1>
        <form className="flex items-center py-4" action={formAction}>
          <Input
            id="name"
            name="name"
            placeholder="Search"
            className="max-w-sm"
            defaultValue={filterName}
          />
        </form>
        <ul>
          {data.animals.map((animal) => (
            <li key={animal.uid}>{animal.name}</li>
          ))}
        </ul>
        <div className="flex items-center justify-end space-x-2 py-4">
          <Button
            variant="bordered"
            size="sm"
            onPress={() =>
              router.navigate({
                to: "/",
                search: (prevSearch) => ({
                  ...prevSearch,
                  page: currentPage - 1,
                }),
              })
            }
            isDisabled={currentPage < 1}
          >
            Previous
          </Button>
          <Button
            variant="bordered"
            size="sm"
            onPress={() =>
              router.navigate({
                to: "/",
                search: (prevSearch) => ({
                  ...prevSearch,
                  page: currentPage + 1,
                }),
              })
            }
            isDisabled={currentPage >= (data.page?.totalPages || 0)}
          >
            Next
          </Button>
        </div>
        <Button type="button" onPress={refetchData} className="my-4">
          reload data
        </Button>
      </section>
    </>
  );
};
