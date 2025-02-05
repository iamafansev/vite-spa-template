import { useRouter } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";

import { Button, Dialog, useDialog, DataTable } from "@/shared/ui";

import { routeApi } from "../config/routeApi";
import { columns } from "../config/table";

export const HomePage = () => {
  const { t } = useTranslation("home-page");
  const dialog = useDialog();

  const router = useRouter();
  const data = routeApi.useLoaderData();
  const search = routeApi.useSearch();

  const currentPage = search.page || 0;

  return (
    <>
      <section className="flex flex-col items-center pt-32">
        <h1 className="font-bold text-4xl mb-6">{t("title")}</h1>
        <DataTable
          columns={columns}
          data={data.getAllPokemon}
          rowCount={0}
          pageCount={10}
          pagination={{
            pageSize: 10,
            pageIndex: currentPage,
          }}
          onPrevPage={() =>
            router.navigate({
              to: "/",
              search: (prevSearch) => ({
                ...prevSearch,
                page: currentPage - 1,
              }),
            })
          }
          onNextPage={() =>
            router.navigate({
              to: "/",
              search: (prevSearch) => ({
                ...prevSearch,
                page: currentPage + 1,
              }),
            })
          }
        />
        <Button
          type="button"
          className="mb-4"
          onClick={() => router.invalidate({ sync: true })}
        >
          reload
        </Button>
        <Button type="button" onClick={dialog.open}>
          open dialog
        </Button>
      </section>
      <Dialog ref={dialog.ref}>
        <h2>Title</h2>
        <p>Description</p>
      </Dialog>
    </>
  );
};
