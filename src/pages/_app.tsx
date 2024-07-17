
import "./style/global.scss";
import type { AppProps } from "next/app";
import dynamic from 'next/dynamic'

const DynamicToastProvider = dynamic(
  () => import('./components/Toast/context/ToastContext').then((mod) => mod.ToastProvider),
  { ssr: false }
)
function App({ Component, pageProps }: AppProps) {
  return (
    <DynamicToastProvider>
      <Component {...pageProps} />
    </DynamicToastProvider>
  );
}

export default App;