"use client";

type ShowroomControlsProps = {
  speed: number;
  paused: boolean;
  minSpeed: number;
  maxSpeed: number;
  onSpeedChange: (speed: number) => void;
  onTogglePause: () => void;
  onPreset: (speed: number) => void;
  speedLabel: string;
};

export function ShowroomControls({
  speed,
  paused,
  minSpeed,
  maxSpeed,
  onSpeedChange,
  onTogglePause,
  onPreset,
  speedLabel,
}: ShowroomControlsProps) {
  return (
    <div className="showroom-controls pointer-events-auto w-full max-w-md px-3 sm:px-5 sm:py-3">
      <div className="showroom-controls__header">
        <span className="showroom-controls__label">Carousel speed</span>
        <span className="showroom-controls__value capitalize">{speedLabel}</span>
      </div>

      <input
        type="range"
        min={minSpeed}
        max={maxSpeed}
        step={1}
        value={speed}
        onChange={(e) => onSpeedChange(Number(e.target.value))}
        className="showroom-speed-range w-full cursor-pointer"
        aria-label="Carousel rotation speed"
      />

      <div className="showroom-controls__row">
        <button
          type="button"
          onClick={onTogglePause}
          className={`showroom-controls__chip ${
            paused ? "showroom-controls__chip--active" : ""
          }`}
        >
          {paused ? "Play" : "Pause"}
        </button>
        <button
          type="button"
          onClick={() => onPreset(22)}
          className={`showroom-controls__chip ${
            speedLabel === "fast" ? "showroom-controls__chip--active" : ""
          }`}
        >
          Fast
        </button>
        <button
          type="button"
          onClick={() => onPreset(48)}
          className={`showroom-controls__chip ${
            speedLabel === "medium" ? "showroom-controls__chip--active" : ""
          }`}
        >
          Medium
        </button>
        <button
          type="button"
          onClick={() => onPreset(75)}
          className={`showroom-controls__chip ${
            speedLabel === "slow" ? "showroom-controls__chip--active" : ""
          }`}
        >
          Slow
        </button>
      </div>
    </div>
  );
}
