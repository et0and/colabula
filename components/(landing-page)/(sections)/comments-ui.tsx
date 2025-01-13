import { TiltedScroll } from "@/components/ui/tilted-scroll";

export function CommentsUi() {
  const customItems = [
    { id: "1", text: "Great work!" },
    {
      id: "2",
      text: "I think this is tracking as an Achieved High, but if they were to ...",
    },
    { id: "3", text: "What artist models did they look at for this?" },
    { id: "4", text: "The last work finishes the board well. Nice work!" },
    {
      id: "5",
      text: "This is nearly there. I would highly recommend they look at Daido Moriyama's work...",
    },
  ];

  return (
    <div 
      className="space-y-8"
      aria-label="User comments"
      role="region"
    >
      <TiltedScroll items={customItems} className="mt-8" />
    </div>
  );
}
