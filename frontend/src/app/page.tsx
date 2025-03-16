export default function Home() {
  const now = new Date();
  const hours = now.getHours();
  const minutes = now.getMinutes();
  const currentTimePercentage =
    (((hours - 2) * 60 + minutes) * 100) / (24 * 60);

  console.log();
  return (
    <div className="w-full h-[calc(100vh-6rem)] bg-muted/50 rounded-lg overflow-auto flex flex-col justify-between relative">
      <div
        className="absolute w-full h-0.5 bg-sidebar-primary/50 z-10"
        style={{ top: `${currentTimePercentage}%` }}
      />

      {Array.from({ length: 24 }).map((_, index) => {
        const hour = (index + 5) % 24;
        const timeString = hour.toString().padStart(2, '0') + ':00';

        return (
          <div
            key={index}
            className={`dotted-pattern min-h-15 w-full p-1.5 ${
              index !== 23 ? 'border-b-1' : ''
            }`}
          >
            <p className="text-xs text-muted-foreground">{timeString}</p>
          </div>
        );
      })}
    </div>
  );
}
