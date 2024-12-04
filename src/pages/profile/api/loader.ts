import { sleep } from "@/shared/utils";

export const loader = async () => {
  await sleep(500);

  return {
    userLogin: localStorage.getItem("login"),
  };
};
