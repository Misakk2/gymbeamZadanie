import { ToastProvider } from "./components/Toast/context/ToastContext";
import "./style/global.scss";
import type { AppProps } from "next/app";

function App({ Component, pageProps }: AppProps) {
  return (
    <ToastProvider>
      <Component {...pageProps} />
    </ToastProvider>
  );
}

export default App;