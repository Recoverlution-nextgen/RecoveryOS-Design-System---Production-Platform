import * as React from "react";

type RovingOptions = {
  loop?: boolean;
  skipDisabled?: boolean;
};

export function useRovingTabindex<T extends HTMLElement>(
  count: number,
  opts: RovingOptions = { loop: true, skipDisabled: true }
) {
  const { loop = true } = opts;
  const [activeIndex, setActiveIndex] = React.useState(0);
  const refs = React.useRef<Array<T | null>>([]);

  const focusIndex = (i: number) => {
    const el = refs.current[i];
    if (el) el.focus();
    setActiveIndex(i);
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (count <= 0) return;

    const go = (delta: number) => {
      let next = activeIndex + delta;
      if (loop) next = (next + count) % count;
      else next = Math.max(0, Math.min(count - 1, next));
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

  const getItemProps = (index: number) => ({
    tabIndex: index === activeIndex ? 0 : -1,
    ref: (el: T | null) => (refs.current[index] = el),
    onFocus: () => setActiveIndex(index)
  });

  return { activeIndex, setActiveIndex: focusIndex, onKeyDown, getItemProps };
}