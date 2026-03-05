import { Star } from "lucide-react";

const StarRating = ({ rating, onRate, interactive = false }: { rating: number; onRate?: (r: number) => void; interactive?: boolean }) => (
  <div className="flex gap-1">
    {[1, 2, 3, 4, 5].map(i => (
      <Star
        key={i}
        className={`w-5 h-5 transition-colors ${interactive ? "cursor-pointer hover:text-primary" : ""} ${i <= rating ? "fill-primary text-primary" : "text-muted-foreground/30"}`}
        onClick={() => interactive && onRate?.(i)}
      />
    ))}
  </div>
);

export default StarRating;
