import "@/app/globals.css";
import { MyAppProps } from "@components/common/types";
import { Layouts } from "@components/layouts/layout";
import axiosClient from "../api/config";
import { SWRConfig } from "swr";
import { CacheProvider } from "@emotion/react";
import { wrapper } from "../redux/store/store";
import "react-toastify/dist/ReactToastify.css";
import { GetServerSidePropsContext } from "next";
import { SessionProvider } from "next-auth/react"

import createEmotionCache from "../../utillity/createEmotionCache";

const clientSideEmotionCache = createEmotionCache();

function MyApp({
  Component,
  pageProps: { session, ...pageProps },
  emotionCache = clientSideEmotionCache,
}: MyAppProps) {
  const Layout = Layouts[Component.Layout] ?? ((props: any) => props.children);
  return (
    <SessionProvider session={session}>
      <CacheProvider value={emotionCache}>
        <SWRConfig
          value={{
            fetcher: (url) => axiosClient.get(url),
            shouldRetryOnError: false,
          }}
        >
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </SWRConfig>
      </CacheProvider>
    </SessionProvider>
  );
}

export default wrapper.withRedux(MyApp);
