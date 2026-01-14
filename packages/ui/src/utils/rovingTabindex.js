import * as React from "react";
export function useRovingTabindex(count, opts = { loop: true, skipDisabled: true }) {
    const { loop = true } = opts;
    const [activeIndex, setActiveIndex] = React.useState(0);
    const refs = React.useRef([]);
    const focusIndex = (i) => {
        const el = refs.current[i];
        if (el)
            el.focus();
        setActiveIndex(i);
    };
    const onKeyDown = (e) => {
        if (count <= 0)
            return;
        const go = (delta) => {
            let next = activeIndex + delta;
            if (loop)
                next = (next + count) % count;
            else
                next = Math.max(0, Math.min(count - 1, next));
            focusIndex(next);
        };
        switch (e.key) {
            case "ArrowDown":
                e.preventDefault();
                go(1);
                break;
            case "ArrowUp":
                e.preventDefault();
                go(-1);
                break;
            case "Home":
                e.preventDefault();
                focusIndex(0);
                break;
            case "End":
                e.preventDefault();
                focusIndex(count - 1);
                break;
        }
    };
    const getItemProps = (index) => ({
        tabIndex: index === activeIndex ? 0 : -1,
        ref: (el) => (refs.current[index] = el),
        onFocus: () => setActiveIndex(index)
    });
    return { activeIndex, setActiveIndex: focusIndex, onKeyDown, getItemProps };
}
