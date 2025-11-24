import { useEffect } from "react";
import { useRouter } from "next/router";

export const APIurl = () => {
  return process.env.NEXT_PUBLIC_APP_NAME;
};

export const redirectBack = (url, defaultUrl) => {
  const router = useRouter();

  useEffect(() => {
    const isStored = typeof window !== "undefined" && window.localStorage;
    const local = isStored && JSON.parse(localStorage.getItem("userInfo"));

    if (local?.status == 200) {
      router.push(url);
    } else {
      if (defaultUrl) {
        router.push(defaultUrl);
      }
    }
  }, []);
};

export const redirect = (url) => {
  const router = useRouter();

  useEffect(() => {
    const isStored = typeof window !== "undefined" && window.localStorage;
    const local = isStored && JSON.parse(localStorage.getItem("userInfo"));

    if (local?.status != 200) {
      router.push(`/${url}`);
    }
  }, []);
};
