export default function Home() {
  return (
    <div className="w-full h-[calc(100vh-6rem)] bg-muted/50 rounded-lg overflow-auto flex flex-col justify-between">
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
