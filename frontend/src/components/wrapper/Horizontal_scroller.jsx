import { useRef, useEffect, useState } from "react";
export default function Horizontal_scroll_wrapper({
  children,
  height = "500px",
}) {
  const container_ref = useRef(null);
  const track_ref = useRef(null);
  const [translate_x, set_translate_x] = useState(0);
  useEffect(function () {
    function handle_scroll() {
      if (!container_ref.current || !track_ref.current) return;

      const container_rect = container_ref.current.getBoundingClientRect();
      const track_width = track_ref.current.scrollWidth;
      const window_width = window.innerWidth;

      // Calculate how much we can scroll horizontally
      const max_translate = track_width - window_width;

      // When the top of the container hits the sticky point (top-20 = 80px)
      const sticky_offset = 80;
      const start_scroll = container_rect.top - sticky_offset;

      if (start_scroll <= 0) {
        // Calculate progress based on how much of the container height has been scrolled
        // We use 3x the height of the container as the scroll distance for a smooth feel
        const scroll_distance =
          container_ref.current.offsetHeight - window.innerHeight;
        const progress = Math.min(
          Math.max(-start_scroll / scroll_distance, 0),
          1,
        );

        set_translate_x(-(progress * max_translate));
      } else {
        set_translate_x(0);
      }
    }

    window.addEventListener("scroll", handle_scroll);
    return function () {
      window.removeEventListener("scroll", handle_scroll);
    };
  }, []);

  return (
    <div
      ref={container_ref}
      className="relative w-full"
      style={{ height: "300vh" }} // Provides the vertical scroll "runway"
    >
      <div
        className="sticky top-20 overflow-hidden bg-zinc-950/40 backdrop-blur-sm border-yborder-zinc-800/40"
        style={{ height: height }}
      >
        <div
          ref={track_ref}
          style={{ transform: `translateX(${translate_x}px)` }}
          className="flex items-center h-full gap-8 px-8 transition-transform duration-150ease-out will-change-transform"
        >
          {/* We use flex-shrink-0 on children to ensure they don't squash */}
          {children}
        </div>
      </div>
    </div>
  );
}
