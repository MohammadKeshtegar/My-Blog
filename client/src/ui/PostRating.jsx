import Star from "./Star";

export default function PostRating({ maxRating, size = 36, color = "#fcc419", defaultRating = 0 }) {
  return (
    <div className="flex items-center gap-14">
      <ul className="list flex">
        {Array.from({ length: maxRating }).map((_, i) => (
          <Star key={i} full={defaultRating >= i + 1} color={color} size={size} />
        ))}
      </ul>
    </div>
  );
}
