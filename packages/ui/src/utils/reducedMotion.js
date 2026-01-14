import * as React from "react";
/** Reduced motion hook (no deps) */
export function useReducedMotion() {
    const [reduced, setReduced] = React.useState(false);
    React.useEffect(() => {
        const mq = window.matchMedia?.("(prefers-reduced-motion: reduce)");
        if (!mq)
            return;
        const update = () => setReduced(!!mq.matches);
        update();
        // Safari compatibility
        if (mq.addEventListener)
            mq.addEventListener("change", update);
        else
            mq.addListener(update);
        return () => {
            if (mq.removeEventListener)
                mq.removeEventListener("change", update);
            else
                mq.removeListener(update);
        };
    }, []);
    return reduced;
}
