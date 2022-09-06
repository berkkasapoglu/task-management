import "@/styles/globals.scss"
import { Provider } from "react-redux"
import { store } from "@/store/store"
import { SessionProvider } from "next-auth/react"
import Layout from "@/components/common/Layout/Layout"

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <SessionProvider session={session}>
      <Provider store={store}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </Provider>
    </SessionProvider>
  )
}

export default MyApp
