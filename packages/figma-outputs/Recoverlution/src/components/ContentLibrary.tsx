import { Wind, Heart } from "lucide-react";
import { ContentCard } from "./ContentCard";
import { ScrollArea } from "./ui/scroll-area";
import { useState } from "react";

const breathContent = [
  {
    id: 1,
    title: "Box Breathing Foundation",
    duration: "8 min",
    category: "BREATHWORK",
    imageUrl: "https://images.unsplash.com/photo-1713428856080-43fc975d2496?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxicmVhdGhpbmclMjBleGVyY2lzZSUyMGNhbG18ZW58MXx8fHwxNzYwMTM4NTYzfDA&ixlib=rb-4.1.0&q=80&w=1080"
  },
  {
    id: 2,
    title: "Calm Mind Meditation",
    duration: "12 min",
    category: "MEDITATION",
    imageUrl: "https://images.unsplash.com/photo-1599744403700-b7330f3c4dbe?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtaW5kZnVsbmVzcyUyMG5hdHVyZSUyMHNlcmVuZXxlbnwxfHx8fDE3NjAxOTI4NDF8MA&ixlib=rb-4.1.0&q=80&w=1080"
  },
  {
    id: 3,
    title: "4-7-8 Breathing Technique",
    duration: "10 min",
    category: "BREATHWORK",
    imageUrl: "https://images.unsplash.com/photo-1687180948607-9ba1dd045e10?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZWRpdGF0aW9uJTIwd2VsbG5lc3MlMjBwZWFjZWZ1bHxlbnwxfHx8fDE3NjAxNDcyMzV8MA&ixlib=rb-4.1.0&q=80&w=1080"
  },
  {
    id: 4,
    title: "Morning Mindfulness Practice",
    duration: "15 min",
    category: "MEDITATION",
    imageUrl: "https://images.unsplash.com/photo-1599744403700-b7330f3c4dbe?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtaW5kZnVsbmVzcyUyMG5hdHVyZSUyMHNlcmVuZXxlbnwxfHx8fDE3NjAxOTI4NDF8MA&ixlib=rb-4.1.0&q=80&w=1080"
  }
];

const moveContent = [
  {
    id: 5,
    title: "Gentle Flow Yoga",
    duration: "20 min",
    category: "YOGA",
    imageUrl: "https://images.unsplash.com/photo-1715780463401-b9ef0567943e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx5b2dhJTIwcHJhY3RpY2UlMjBzdHVkaW98ZW58MXx8fHwxNzYwMTY3ODAzfDA&ixlib=rb-4.1.0&q=80&w=1080"
  },
  {
    id: 6,
    title: "Mindful Movement",
    duration: "18 min",
    category: "FITNESS",
    imageUrl: "https://images.unsplash.com/photo-1557512724-931547195611?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmaXRuZXNzJTIwd29ya291dCUyMGNhbG18ZW58MXx8fHwxNzYwMTkyODQyfDA&ixlib=rb-4.1.0&q=80&w=1080"
  },
  {
    id: 7,
    title: "Restorative Yoga Practice",
    duration: "25 min",
    category: "YOGA",
    imageUrl: "https://images.unsplash.com/photo-1715780463401-b9ef0567943e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx5b2dhJTIwcHJhY3RpY2UlMjBzdHVkaW98ZW58MXx8fHwxNzYwMTY3ODAzfDA&ixlib=rb-4.1.0&q=80&w=1080"
  },
  {
    id: 8,
    title: "Somatic Movement Therapy",
    duration: "22 min",
    category: "FITNESS",
    imageUrl: "https://images.unsplash.com/photo-1557512724-931547195611?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmaXRuZXNzJTIwd29ya291dCUyMGNhbG18ZW58MXx8fHwxNzYwMTkyODQyfDA&ixlib=rb-4.1.0&q=80&w=1080"
  }
];

export function ContentLibrary() {
  const [activeTab, setActiveTab] = useState<"breathe" | "move">("breathe");

  return (
    <div className="h-full bg-gradient-to-br from-white via-gray-50/50 to-gray-100/30 flex flex-col">
      {/* Tabs */}
      <div className="border-b border-gray-200/80 bg-white/80 backdrop-blur-sm">
        <div className="flex px-8 pt-6 gap-1">
          <button
            onClick={() => setActiveTab("breathe")}
            className={`
              group px-5 py-3 transition-all relative rounded-t-lg font-medium
              ${activeTab === "breathe" 
                ? "text-[#2C4F7C] bg-gradient-to-b from-white to-gray-50/50 font-semibold" 
                : "text-gray-500 hover:text-gray-700 hover:bg-gray-50/50"
              }
            `}
            style={{ fontFamily: 'var(--font-sans)' }}
          >
            <span className="flex items-center gap-2.5">
              <div className={`w-7 h-7 rounded-lg flex items-center justify-center transition-all ${
                activeTab === "breathe" 
                  ? "bg-gradient-to-br from-blue-50 to-blue-100/80" 
                  : "bg-gray-100 group-hover:bg-gray-200"
              }`}>
                <Wind className={`w-4 h-4 ${activeTab === "breathe" ? "text-blue-600" : "text-gray-500"}`} />
              </div>
              <span>Breathe</span>
            </span>
            {activeTab === "breathe" && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-[#6B9FA6] to-[#5A8A91]" />
            )}
          </button>
          <button
            onClick={() => setActiveTab("move")}
            className={`
              group px-5 py-3 transition-all relative rounded-t-lg font-medium
              ${activeTab === "move" 
                ? "text-[#2C4F7C] bg-gradient-to-b from-white to-gray-50/50 font-semibold" 
                : "text-gray-500 hover:text-gray-700 hover:bg-gray-50/50"
              }
            `}
            style={{ fontFamily: 'var(--font-sans)' }}
          >
            <span className="flex items-center gap-2.5">
              <div className={`w-7 h-7 rounded-lg flex items-center justify-center transition-all ${
                activeTab === "move" 
                  ? "bg-gradient-to-br from-rose-50 to-rose-100/80" 
                  : "bg-gray-100 group-hover:bg-gray-200"
              }`}>
                <Heart className={`w-4 h-4 ${activeTab === "move" ? "text-rose-600" : "text-gray-500"}`} />
              </div>
              <span>Move</span>
            </span>
            {activeTab === "move" && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-[#6B9FA6] to-[#5A8A91]" />
            )}
          </button>
        </div>
      </div>

      <ScrollArea className="flex-1">
        <div className="p-8 space-y-6">
          {activeTab === "breathe" ? (
            <section className="animate-in fade-in duration-300">
              <div className="mb-6 bg-white/60 backdrop-blur-sm rounded-xl p-5 border border-gray-200/50">
                <p className="text-gray-700 leading-relaxed">
                  An immersive sensory journey that transforms your state through breathwork, music, 
                  and guided meditation, offering a powerful reset in just minutes.
                </p>
              </div>
              <div className="grid grid-cols-2 gap-5">
                {breathContent.map((item) => (
                  <ContentCard
                    key={item.id}
                    title={item.title}
                    duration={item.duration}
                    category={item.category}
                    imageUrl={item.imageUrl}
                    onPlay={() => console.log(`Playing: ${item.title}`)}
                  />
                ))}
              </div>
            </section>
          ) : (
            <section className="animate-in fade-in duration-300">
              <div className="mb-6 bg-white/60 backdrop-blur-sm rounded-xl p-5 border border-gray-200/50">
                <p className="text-gray-700 leading-relaxed">
                  Mindful movement restores and strengthens body and mind, offering a powerful 
                  practice to challenge limits and cultivate resilience.
                </p>
              </div>
              <div className="grid grid-cols-2 gap-5">
                {moveContent.map((item) => (
                  <ContentCard
                    key={item.id}
                    title={item.title}
                    duration={item.duration}
                    category={item.category}
                    imageUrl={item.imageUrl}
                    onPlay={() => console.log(`Playing: ${item.title}`)}
                  />
                ))}
              </div>
            </section>
          )}
        </div>
      </ScrollArea>
    </div>
  );
}
