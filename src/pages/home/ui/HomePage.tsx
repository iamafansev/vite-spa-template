import { useCallback } from "react";
import { useRouter } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";

import {
  Button,
  Dialog,
  useDialog,
  DataTable,
  SubmittingOverlay,
} from "@/shared/ui";

import { routeApi } from "../config/routeApi";
import { columns } from "../config/table";

export const HomePage = () => {
  const { t } = useTranslation("home");
  const dialog = useDialog();

  const router = useRouter();
  const data = routeApi.useLoaderData();
  const search = routeApi.useSearch();
  const { isFetching } = routeApi.useMatch();

  const currentPage = search.page || 0;
  const filterName = search.name;

  const refetchData = useCallback(() => {
    router.invalidate({
      filter: (value) => {
        return value.id === routeApi.id;
      },
    });
  }, [router]);

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
    <SubmittingOverlay className="static" processing={Boolean(isFetching)}>
      <section className="flex flex-col items-center pt-32">
        <h1 className="font-bold text-4xl">{t("title")}</h1>
        <DataTable
          columns={columns}
          data={data.animals}
          rowCount={data.page?.numberOfElements || -1}
          pageCount={data.page?.totalPages}
          nameValue={filterName}
          pagination={
            data.page
              ? {
                  pageSize: data.page.pageSize,
                  pageIndex: data.page.pageNumber,
                }
              : undefined
          }
          formAction={formAction}
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
        <Button type="button" onClick={refetchData} className="my-4">
          reload data
        </Button>
        <Button type="button" onClick={dialog.open}>
          open dialog
        </Button>
      </section>
      <Dialog ref={dialog.ref}>
        <h2>Title</h2>
        <p>Description</p>
      </Dialog>
    </SubmittingOverlay>
  );
};
