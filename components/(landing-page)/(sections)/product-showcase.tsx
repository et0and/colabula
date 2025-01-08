import { AutoplayVideo } from "../../ui/autoplay-video";

export function ProductShowcase() {
  return (
    <div className="container mx-auto px-12">
      <AutoplayVideo
        src="/"
        type="video/webm"
        title="Get AI to scan a portfolio for key subject matter"
      />
    </div>
  );
}
