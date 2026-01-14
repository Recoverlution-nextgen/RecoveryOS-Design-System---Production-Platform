import { jsx as _jsx } from "react/jsx-runtime";
import '../styles/globals.css';
export default function App({ Component, pageProps }) {
    return _jsx(Component, { ...pageProps });
}
