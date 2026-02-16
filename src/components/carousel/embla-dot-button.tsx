"use client";

import { useEffect, useState } from "react";
import type { EmblaCarouselType } from "embla-carousel";

type UseDotButtonType = {
  selectedIndex: number;
  scrollSnaps: number[];
  onDotButtonClick: (index: number) => void;
};

export function useDotButton(
  emblaApi: EmblaCarouselType | undefined
): UseDotButtonType {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);

  const onDotButtonClick = (index: number) => {
    if (!emblaApi) return;
    emblaApi.scrollTo(index);
  };

  useEffect(() => {
    if (!emblaApi) return;

    const onInit = (api: EmblaCarouselType) => {
      setScrollSnaps(api.scrollSnapList());
    };

    const onSelect = (api: EmblaCarouselType) => {
      setSelectedIndex(api.selectedScrollSnap());
    };

    emblaApi.on("reInit", onInit).on("reInit", onSelect).on("select", onSelect);
    requestAnimationFrame(() => {
      onInit(emblaApi);
      onSelect(emblaApi);
    });

    return () => {
      emblaApi.off("reInit", onInit).off("reInit", onSelect).off("select", onSelect);
    };
  }, [emblaApi]);

  return { selectedIndex, scrollSnaps, onDotButtonClick };
}

export function DotButton({
  selected,
  onClick,
}: {
  selected: boolean;
  onClick: () => void;
}) {
  return (
    <button
      className={`embla__dot ${selected ? "embla__dot--selected" : ""}`}
      type="button"
      onClick={onClick}
      aria-label="Go to slide"
    />
  );
}
