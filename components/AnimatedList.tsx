import { motion, useInView } from "motion/react";
import React, {
  MouseEventHandler,
  ReactNode,
  UIEvent,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";

interface AnimatedItemProps {
  children: ReactNode;
  delay?: number;
  index: number;
  onMouseEnter?: MouseEventHandler<HTMLDivElement>;
  onClick?: MouseEventHandler<HTMLDivElement>;
}

const AnimatedItem: React.FC<AnimatedItemProps> = ({
  children,
  delay = 0,
  index,
  onMouseEnter,
  onClick,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount: 0.5, once: false });
  return (
    <motion.div
      ref={ref}
      data-index={index}
      onMouseEnter={onMouseEnter}
      onClick={onClick}
      initial={{ scale: 0.7, opacity: 0 }}
      animate={inView ? { scale: 1, opacity: 1 } : { scale: 0.7, opacity: 0 }}
      transition={{ duration: 0.2, delay }}
    >
      {children}
    </motion.div>
  );
};

interface AnimatedListProps<T> {
  items?: T[];
  renderItem: (item: T) => ReactNode;
  onItemSelect?: (item: T, index: number) => void;
  showGradients?: boolean;
  enableArrowNavigation?: boolean;
  displayScrollbar?: boolean;
  initialSelectedIndex?: number;
}

const AnimatedList = <T,>({
  items = [] as T[],
  renderItem,
  onItemSelect,
  showGradients = true,
  enableArrowNavigation = true,
  displayScrollbar = true,
  initialSelectedIndex = -1,
}: AnimatedListProps<T>) => {
  const listRef = useRef<HTMLDivElement>(null);
  const [selectedIndex, setSelectedIndex] =
    useState<number>(initialSelectedIndex);
  const keyboardNavRef = useRef(false);
  const [topGradientOpacity, setTopGradientOpacity] = useState<number>(0);
  const [bottomGradientOpacity, setBottomGradientOpacity] = useState<number>(1);

  const handleItemMouseEnter = useCallback((index: number) => {
    setSelectedIndex(index);
  }, []);

  const handleItemClick = useCallback(
    (item: T, index: number) => {
      setSelectedIndex(index);
      if (onItemSelect) {
        onItemSelect(item, index);
      }
    },
    [onItemSelect],
  );

  const handleScroll = (e: UIEvent<HTMLDivElement>) => {
    const { scrollTop, scrollHeight, clientHeight } =
      e.target as HTMLDivElement;
    setTopGradientOpacity(Math.min(scrollTop / 50, 1));
    const bottomDistance = scrollHeight - (scrollTop + clientHeight);
    setBottomGradientOpacity(
      scrollHeight <= clientHeight ? 0 : Math.min(bottomDistance / 50, 1),
    );
  };

  useEffect(() => {
    if (!enableArrowNavigation) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowDown" || (e.key === "Tab" && !e.shiftKey)) {
        e.preventDefault();
        keyboardNavRef.current = true;
        setSelectedIndex((prev) => Math.min(prev + 1, items.length - 1));
      } else if (e.key === "ArrowUp" || (e.key === "Tab" && e.shiftKey)) {
        e.preventDefault();
        keyboardNavRef.current = true;
        setSelectedIndex((prev) => Math.max(prev - 1, 0));
      } else if (e.key === "Enter") {
        if (selectedIndex >= 0 && selectedIndex < items.length) {
          e.preventDefault();
          onItemSelect?.(items[selectedIndex], selectedIndex);
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [items, selectedIndex, onItemSelect, enableArrowNavigation]);

  useEffect(() => {
    if (!keyboardNavRef.current || selectedIndex < 0 || !listRef.current)
      return;

    const container = listRef.current;
    const selectedItem = container.querySelector(
      `[data-index="${selectedIndex}"]`,
    ) as HTMLElement | null;

    if (selectedItem) {
      const extraMargin = 50;
      const containerScrollTop = container.scrollTop;
      const containerHeight = container.clientHeight;
      const itemTop = selectedItem.offsetTop;
      const itemBottom = itemTop + selectedItem.offsetHeight;

      if (itemTop < containerScrollTop + extraMargin) {
        container.scrollTo({ top: itemTop - extraMargin, behavior: "smooth" });
      } else if (
        itemBottom >
        containerScrollTop + containerHeight - extraMargin
      ) {
        container.scrollTo({
          top: itemBottom - containerHeight + extraMargin,
          behavior: "smooth",
        });
      }
    }

    // reset WITHOUT causing render
    keyboardNavRef.current = false;
  }, [selectedIndex]);

  return (
    <div
      ref={listRef}
      className={`flex max-h-112 flex-col gap-5 overflow-y-auto border-y py-5 ${
        displayScrollbar
          ? "[&::-webkit-scrollbar]:w-[8px] [&::-webkit-scrollbar-thumb]:rounded-[4px] [&::-webkit-scrollbar-thumb]:bg-[#222] [&::-webkit-scrollbar-track]:bg-[#060010]"
          : "scrollbar-hide"
      }`}
      onScroll={handleScroll}
      style={{
        scrollbarWidth: displayScrollbar ? "thin" : "none",
        scrollbarColor: "#222 #060010",
      }}
    >
      {items.map((item, index) => (
        <AnimatedItem
          key={index}
          delay={0.1}
          index={index}
          onMouseEnter={() => handleItemMouseEnter(index)}
          onClick={() => handleItemClick(item, index)}
        >
          {renderItem(item)}
        </AnimatedItem>
      ))}
      {showGradients && (
        <>
          <div
            className="ease pointer-events-none absolute top-0 right-0 left-0 h-[50px] bg-linear-to-b from-[#060010] to-transparent transition-opacity duration-300"
            style={{ opacity: topGradientOpacity }}
          ></div>
          <div
            className="ease pointer-events-none absolute right-0 bottom-0 left-0 h-[100px] bg-linear-to-t from-[#060010] to-transparent transition-opacity duration-300"
            style={{ opacity: bottomGradientOpacity }}
          ></div>
        </>
      )}
    </div>
  );
};

export default AnimatedList;
