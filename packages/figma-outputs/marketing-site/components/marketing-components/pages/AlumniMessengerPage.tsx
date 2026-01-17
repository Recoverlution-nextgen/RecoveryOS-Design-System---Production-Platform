/**
 * Alumni Message Board
 * 
 * Community-style message board (not direct messaging) with:
 * - Multiple topics/channels/groups
 * - Media upload capability
 * - Hashtag support
 * - AI content suggestions based on discussions
 * - Platform-initiated engagement prompts (polls, quizzes, reflections)
 * - Facility moderation controls (no patient-to-patient DMs)
 * 
 * Philosophy: Rehab maintains control, patients connect in a safe, monitored space
 */

import { useState } from "react";
import { Search, Hash, Image, Plus, ThumbsUp, MessageCircle, Send, Pin, AlertCircle, Sparkles, TrendingUp, Users, BookOpen, Video, FileText, ChevronDown, Filter } from "lucide-react";

type TopicType = "general" | "cravings" | "relationships" | "wins" | "questions" | "weekend-check-in";
type PostType = "discussion" | "poll" | "quote" | "ai-prompt" | "content-suggestion";

interface PostComment {
  id: string;
  author: string;
  authorInitials: string;
  timestamp: string;
  content: string;
  context?: string; // Optional context/quote from the original post
  reactions: number;
}

interface AlumniPost {
  id: string;
  author: string;
  authorInitials: string;
  timestamp: string;
  topic: TopicType;
  type: PostType;
  content: string;
  imageUrl?: string;
  hashtags?: string[];
  reactions: number;
  comments: number;
  isPinned?: boolean;
  aiSuggestedContent?: {
    type: "navicue" | "article" | "video";
    title: string;
    reason: string;
  }[];
  commentsList?: PostComment[]; // Full list of comments
}

interface Topic {
  id: TopicType;
  name: string;
  description: string;
  icon: any;
  color: string;
  postCount: number;
  activeToday: number;
}

const TOPICS: Topic[] = [
  {
    id: "general",
    name: "General Discussion",
    description: "Share your thoughts, wins, and daily reflections",
    icon: MessageCircle,
    color: "#3E2BB8",
    postCount: 234,
    activeToday: 12
  },
  {
    id: "cravings",
    name: "Urge Support",
    description: "Real-time support when cravings hit",
    icon: AlertCircle,
    color: "#DC2626",
    postCount: 87,
    activeToday: 5
  },
  {
    id: "relationships",
    name: "Relationships & Connection",
    description: "Navigating family, friends, and healthy boundaries",
    icon: Users,
    color: "#3B82F6",
    postCount: 156,
    activeToday: 8
  },
  {
    id: "wins",
    name: "Wins & Milestones",
    description: "Celebrate progress, no matter how small",
    icon: TrendingUp,
    color: "#10B981",
    postCount: 198,
    activeToday: 15
  },
  {
    id: "questions",
    name: "Ask the Community",
    description: "Questions about recovery, resources, or life",
    icon: MessageCircle,
    color: "#F59E0B",
    postCount: 92,
    activeToday: 7
  },
  {
    id: "weekend-check-in",
    name: "Weekend Check-In",
    description: "Platform-initiated prompt to stay connected",
    icon: Sparkles,
    color: "#8B5CF6",
    postCount: 45,
    activeToday: 22
  }
];

// Mock posts (in production, these come from database)
const MOCK_POSTS: AlumniPost[] = [
  {
    id: "1",
    author: "Sarah M.",
    authorInitials: "SM",
    timestamp: "2 hours ago",
    topic: "wins",
    type: "discussion",
    content: "90 days today! I never thought I'd make it this far. To everyone reading this who's struggling today - it gets easier. You've got this. 💪",
    hashtags: ["90days", "milestone", "gratitude"],
    reactions: 47,
    comments: 12,
    isPinned: false,
    commentsList: [
      {
        id: "c1",
        author: "James K.",
        authorInitials: "JK",
        timestamp: "1 hour ago",
        content: "This is so inspiring! Congratulations on your milestone. Your strength is helping me stay committed today.",
        context: "To everyone reading this who's struggling today - it gets easier.",
        reactions: 8
      },
      {
        id: "c2",
        author: "Lisa R.",
        authorInitials: "LR",
        timestamp: "45 minutes ago",
        content: "I'm on day 12 and needed to see this. Thank you for sharing your journey!",
        reactions: 5
      },
      {
        id: "c3",
        author: "David P.",
        authorInitials: "DP",
        timestamp: "30 minutes ago",
        content: "Day 45 here. Posts like this remind me why I keep going. Proud of you!",
        context: "90 days today! I never thought I'd make it this far.",
        reactions: 3
      }
    ]
  },
  {
    id: "2",
    author: "Recoverlution",
    authorInitials: "R",
    timestamp: "5 hours ago",
    topic: "weekend-check-in",
    type: "ai-prompt",
    content: "Weekend Poll: What's one thing you're looking forward to this weekend that doesn't involve substances? Drop your answer below 👇",
    reactions: 28,
    comments: 34,
    isPinned: true
  },
  {
    id: "3",
    author: "Marcus T.",
    authorInitials: "MT",
    timestamp: "8 hours ago",
    topic: "cravings",
    type: "discussion",
    content: "Feeling really triggered right now. Old friend just reached out wanting to 'hang like old times.' I know what that means. Not sure how to respond without burning the bridge completely.",
    hashtags: ["boundaries", "urges", "help"],
    reactions: 15,
    comments: 8,
    isPinned: false,
    commentsList: [
      {
        id: "c4",
        author: "Rachel W.",
        authorInitials: "RW",
        timestamp: "6 hours ago",
        content: "I've been exactly where you are. It's okay to protect your recovery. You can say something like 'I appreciate you thinking of me, but I'm focusing on different priorities right now.' You don't owe them an explanation.",
        context: "Not sure how to respond without burning the bridge completely.",
        reactions: 12
      },
      {
        id: "c5",
        author: "Tom S.",
        authorInitials: "TS",
        timestamp: "5 hours ago",
        content: "Boundaries aren't walls - they're gates. You decide who gets through. Stay strong.",
        reactions: 7
      }
    ],
    aiSuggestedContent: [
      {
        type: "navicue",
        title: "Setting Boundaries Without Guilt",
        reason: "This NaviCue addresses saying 'no' to old relationships that threaten your recovery"
      },
      {
        type: "article",
        title: "Window of Tolerance",
        reason: "Understanding your nervous system can help you recognize when you're triggered"
      }
    ]
  },
  {
    id: "4",
    author: "Jamie L.",
    authorInitials: "JL",
    timestamp: "Yesterday",
    topic: "relationships",
    type: "discussion",
    content: "My mom finally said she's proud of me. After 3 years of her not speaking to me, hearing those words hit different. If you're waiting for someone's approval - work on recovery for YOU first. The rest follows.",
    hashtags: ["family", "healing", "relationships"],
    reactions: 83,
    comments: 19,
    isPinned: false
  },
  {
    id: "5",
    author: "Recoverlution",
    authorInitials: "R",
    timestamp: "Yesterday",
    topic: "general",
    type: "quote",
    content: "\"Recovery is not a straight line. It's a spiral. You keep passing the same spots, but you're higher up each time.\" - Unknown\n\nWhat does this quote mean to you?",
    reactions: 56,
    comments: 23,
    isPinned: false
  },
  {
    id: "6",
    author: "Alex R.",
    authorInitials: "AR",
    timestamp: "2 days ago",
    topic: "questions",
    type: "discussion",
    content: "Does anyone else feel like they're \"faking it\" in recovery? Like everyone else has it figured out and you're just pretending? Is this imposter syndrome or am I actually not ready?",
    hashtags: ["feelings", "honesty", "question"],
    reactions: 41,
    comments: 15,
    isPinned: false,
    aiSuggestedContent: [
      {
        type: "article",
        title: "Shame vs. Guilt: Understanding the Difference",
        reason: "Imposter feelings often stem from shame. This article can help you distinguish between healthy and unhealthy self-talk"
      }
    ]
  }
];

export function AlumniMessengerPage() {
  const [selectedTopic, setSelectedTopic] = useState<TopicType | "all">("all");
  const [showNewPostForm, setShowNewPostForm] = useState(false);
  const [newPostContent, setNewPostContent] = useState("");
  const [newPostHashtags, setNewPostHashtags] = useState("");
  const [showImageUpload, setShowImageUpload] = useState(false);
  
  // Comment state
  const [expandedPostId, setExpandedPostId] = useState<string | null>(null);
  const [newCommentContent, setNewCommentContent] = useState<Record<string, string>>({});
  const [newCommentContext, setNewCommentContext] = useState<Record<string, string>>({});

  const filteredPosts = selectedTopic === "all" 
    ? MOCK_POSTS 
    : MOCK_POSTS.filter(post => post.topic === selectedTopic);

  const currentTopic = selectedTopic === "all" 
    ? null 
    : TOPICS.find(t => t.id === selectedTopic);

  return (
    <div className="min-h-screen bg-[#FAFAFA]">
      {/* Page Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-8">
          <div className="flex items-start justify-between">
            <div>
              <h1 
                className="text-gray-900 mb-2"
                style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '2.25rem' }}
              >
                Alumni Board
              </h1>
              <p className="text-gray-600 text-lg max-w-2xl">
                Connect with peers, share your journey, and support each other. Every conversation is monitored by your care team to ensure safety.
              </p>
            </div>
            <button
              onClick={() => setShowNewPostForm(!showNewPostForm)}
              className="px-6 py-3 bg-[#3E2BB8] text-white hover:bg-[#5739FB] transition-all flex items-center gap-2 shadow-lg shadow-[#3E2BB8]/20"
              style={{ 
                borderRadius: '0px',
                fontFamily: 'var(--font-body)', 
                fontWeight: 600 
              }}
            >
              <Plus className="w-5 h-5" />
              New Post
            </button>
          </div>

          {/* Stats Bar */}
          <div className="grid grid-cols-4 gap-6 mt-8">
            <div className="text-center">
              <div className="text-3xl font-bold text-gray-900">812</div>
              <div className="text-sm text-gray-600">Total Posts</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-gray-900">124</div>
              <div className="text-sm text-gray-600">Active Members</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-gray-900">47</div>
              <div className="text-sm text-gray-600">Posts Today</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-[#10B981]">89%</div>
              <div className="text-sm text-gray-600">Positive Sentiment</div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-12">
        <div className="grid lg:grid-cols-[320px_1fr] gap-8">
          {/* Left Sidebar - Topics */}
          <div className="space-y-6">
            {/* All Topics */}
            <div className="bg-white rounded-2xl p-6 border-2 border-gray-200">
              <h3 
                className="text-gray-900 mb-4 flex items-center gap-2"
                style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: '1.125rem' }}
              >
                <Hash className="w-5 h-5 text-[#3E2BB8]" />
                Topics
              </h3>

              {/* All Posts Option */}
              <button
                onClick={() => setSelectedTopic("all")}
                className={`w-full text-left p-4 rounded-xl transition-all mb-2 ${
                  selectedTopic === "all"
                    ? "bg-gradient-to-br from-[#3E2BB8] to-[#5739FB] text-white"
                    : "bg-gray-50 hover:bg-gray-100 text-gray-900"
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <MessageCircle className="w-5 h-5" />
                    <div>
                      <div className="font-semibold">All Topics</div>
                      <div className={`text-xs ${selectedTopic === "all" ? "text-white/70" : "text-gray-500"}`}>
                        812 posts
                      </div>
                    </div>
                  </div>
                  {selectedTopic === "all" && (
                    <div className="w-2 h-2 rounded-full bg-white"></div>
                  )}
                </div>
              </button>

              {/* Topic List */}
              <div className="space-y-2">
                {TOPICS.map((topic) => {
                  const Icon = topic.icon;
                  const isActive = selectedTopic === topic.id;
                  
                  return (
                    <button
                      key={topic.id}
                      onClick={() => setSelectedTopic(topic.id)}
                      className={`w-full text-left p-4 rounded-xl transition-all ${
                        isActive
                          ? "bg-gradient-to-br from-[#3E2BB8] to-[#5739FB] text-white"
                          : "bg-gray-50 hover:bg-gray-100 text-gray-900"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <Icon className="w-5 h-5" style={{ color: isActive ? "white" : topic.color }} />
                          <div>
                            <div className="font-semibold">{topic.name}</div>
                            <div className={`text-xs ${isActive ? "text-white/70" : "text-gray-500"}`}>
                              {topic.activeToday} active today
                            </div>
                          </div>
                        </div>
                        {isActive && (
                          <div className="w-2 h-2 rounded-full bg-white"></div>
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Community Guidelines */}
            <div className="bg-gradient-to-br from-[#F5F3FF] to-white rounded-2xl p-6 border border-[#3E2BB8]/10">
              <h3 
                className="text-gray-900 mb-3 flex items-center gap-2"
                style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: '1rem' }}
              >
                <AlertCircle className="w-5 h-5 text-[#3E2BB8]" />
                Community Guidelines
              </h3>
              <ul className="space-y-2 text-sm text-gray-700">
                <li className="flex items-start gap-2">
                  <span className="text-[#3E2BB8] mt-0.5">•</span>
                  <span>Be respectful and supportive</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#3E2BB8] mt-0.5">•</span>
                  <span>No substance glorification</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#3E2BB8] mt-0.5">•</span>
                  <span>Protect anonymity (first names only)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#3E2BB8] mt-0.5">•</span>
                  <span>Your care team monitors all posts</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Main Feed */}
          <div className="space-y-6">
            {/* New Post Form */}
            {showNewPostForm && (
              <div className="bg-white rounded-2xl p-6 border-2 border-[#3E2BB8]/20 shadow-xl">
                <h3 
                  className="text-gray-900 mb-4"
                  style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: '1.125rem' }}
                >
                  Create a Post
                </h3>

                {/* Topic Selector */}
                <div className="mb-4">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Topic
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {TOPICS.filter(t => t.id !== "weekend-check-in").map((topic) => {
                      const Icon = topic.icon;
                      return (
                        <button
                          key={topic.id}
                          className="p-3 rounded-xl border-2 border-gray-200 hover:border-[#3E2BB8] hover:bg-[#F5F3FF] transition-all flex items-center gap-2 text-left"
                        >
                          <Icon className="w-4 h-4" style={{ color: topic.color }} />
                          <span className="text-sm font-medium text-gray-900">{topic.name}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Post Content */}
                <textarea
                  value={newPostContent}
                  onChange={(e) => setNewPostContent(e.target.value)}
                  placeholder="Share your thoughts, ask a question, or celebrate a win..."
                  className="w-full p-4 border-2 border-gray-200 rounded-xl focus:border-[#3E2BB8] focus:outline-none resize-none"
                  rows={4}
                />

                {/* Hashtags */}
                <div className="mt-4">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Hashtags (optional)
                  </label>
                  <input
                    type="text"
                    value={newPostHashtags}
                    onChange={(e) => setNewPostHashtags(e.target.value)}
                    placeholder="#boundaries #90days #gratitude"
                    className="w-full p-3 border-2 border-gray-200 rounded-xl focus:border-[#3E2BB8] focus:outline-none"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Separate hashtags with spaces. This helps others find your post!
                  </p>
                </div>

                {/* Media Upload */}
                <div className="mt-4 flex items-center justify-between">
                  <button
                    onClick={() => setShowImageUpload(!showImageUpload)}
                    className="flex items-center gap-2 text-sm text-[#3E2BB8] hover:text-[#5739FB] font-semibold"
                  >
                    <Image className="w-4 h-4" />
                    Add Image
                  </button>

                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => {
                        setShowNewPostForm(false);
                        setNewPostContent("");
                        setNewPostHashtags("");
                      }}
                      className="px-6 py-2 text-gray-600 hover:text-gray-900 font-semibold"
                    >
                      Cancel
                    </button>
                    <button
                      disabled={!newPostContent.trim()}
                      className="px-6 py-2 bg-[#3E2BB8] text-white rounded-xl hover:bg-[#5739FB] transition-all font-semibold disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                    >
                      <Send className="w-4 h-4" />
                      Post
                    </button>
                  </div>
                </div>

                {showImageUpload && (
                  <div className="mt-4 p-4 border-2 border-dashed border-gray-300 rounded-xl text-center">
                    <Image className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                    <p className="text-sm text-gray-600 mb-2">
                      Drag and drop an image, or click to browse
                    </p>
                    <p className="text-xs text-gray-500">
                      JPG, PNG, or GIF. Max size 5MB.
                    </p>
                  </div>
                )}
              </div>
            )}

            {/* Topic Header (if filtered) */}
            {currentTopic && (
              <div className="bg-white rounded-2xl p-6 border-2 border-gray-200">
                <div className="flex items-center gap-4">
                  <div 
                    className="w-16 h-16 rounded-2xl flex items-center justify-center"
                    style={{ backgroundColor: `${currentTopic.color}15` }}
                  >
                    {<currentTopic.icon className="w-8 h-8" style={{ color: currentTopic.color }} />}
                  </div>
                  <div className="flex-1">
                    <h2 
                      className="text-gray-900 mb-1"
                      style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '1.5rem' }}
                    >
                      {currentTopic.name}
                    </h2>
                    <p className="text-gray-600">{currentTopic.description}</p>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-gray-900">{currentTopic.postCount}</div>
                    <div className="text-sm text-gray-600">total posts</div>
                  </div>
                </div>
              </div>
            )}

            {/* Posts Feed */}
            <div className="space-y-6">
              {filteredPosts.map((post) => (
                <div 
                  key={post.id} 
                  className={`bg-white rounded-2xl p-6 border-2 transition-all hover:border-[#3E2BB8]/30 ${
                    post.isPinned ? "border-[#3E2BB8]/20 bg-gradient-to-br from-[#F5F3FF]/50 to-white" : "border-gray-200"
                  }`}
                >
                  {/* Post Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-start gap-3">
                      {/* Author Avatar */}
                      <div className={`w-12 h-12 rounded-full flex items-center justify-center text-white font-bold ${
                        post.type === "ai-prompt" || post.type === "quote"
                          ? "bg-gradient-to-br from-[#3E2BB8] to-[#5739FB]"
                          : "bg-gradient-to-br from-[#7C67FF] to-[#9D8FFF]"
                      }`}>
                        {post.authorInitials}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-semibold text-gray-900">{post.author}</span>
                          {post.isPinned && (
                            <Pin className="w-4 h-4 text-[#3E2BB8]" />
                          )}
                          {(post.type === "ai-prompt" || post.type === "quote") && (
                            <span className="px-2 py-0.5 bg-gradient-to-r from-[#3E2BB8] to-[#5739FB] text-white text-xs rounded-full font-semibold">
                              Platform
                            </span>
                          )}
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-500">
                          <span>{post.timestamp}</span>
                          <span>•</span>
                          <span className="flex items-center gap-1">
                            <Hash className="w-3 h-3" />
                            {TOPICS.find(t => t.id === post.topic)?.name}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Post Content */}
                  <div className="mb-4">
                    <p className="text-gray-900 leading-relaxed whitespace-pre-wrap">
                      {post.content}
                    </p>

                    {/* Image (if present) */}
                    {post.imageUrl && (
                      <img 
                        src={post.imageUrl} 
                        alt="Post attachment" 
                        className="mt-4 rounded-xl w-full max-h-96 object-cover"
                      />
                    )}

                    {/* Hashtags */}
                    {post.hashtags && post.hashtags.length > 0 && (
                      <div className="flex items-center gap-2 mt-3 flex-wrap">
                        {post.hashtags.map((tag) => (
                          <span 
                            key={tag}
                            className="px-3 py-1 bg-[#F5F3FF] text-[#3E2BB8] text-sm rounded-full font-semibold hover:bg-[#3E2BB8] hover:text-white transition-all cursor-pointer"
                          >
                            #{tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* AI Suggested Content */}
                  {post.aiSuggestedContent && post.aiSuggestedContent.length > 0 && (
                    <div className="mb-4 p-4 bg-gradient-to-br from-[#F5F3FF] to-white rounded-xl border border-[#3E2BB8]/10">
                      <div className="flex items-center gap-2 mb-3">
                        <Sparkles className="w-4 h-4 text-[#3E2BB8]" />
                        <span className="text-sm font-semibold text-gray-900">
                          LUMA suggests this might help:
                        </span>
                      </div>
                      {post.aiSuggestedContent.map((content, idx) => (
                        <div key={idx} className="flex items-start gap-3 p-3 bg-white rounded-lg mb-2 last:mb-0 hover:shadow-md transition-all cursor-pointer">
                          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#3E2BB8] to-[#5739FB] flex items-center justify-center flex-shrink-0">
                            {content.type === "navicue" && <Sparkles className="w-5 h-5 text-white" />}
                            {content.type === "article" && <FileText className="w-5 h-5 text-white" />}
                            {content.type === "video" && <Video className="w-5 h-5 text-white" />}
                          </div>
                          <div className="flex-1">
                            <div className="font-semibold text-gray-900 text-sm">{content.title}</div>
                            <div className="text-xs text-gray-600 mt-1">{content.reason}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Post Actions */}
                  <div className="flex items-center gap-6 pt-4 border-t border-gray-200">
                    <button className="flex items-center gap-2 text-gray-600 hover:text-[#3E2BB8] transition-colors group">
                      <ThumbsUp className="w-5 h-5 group-hover:scale-110 transition-transform" />
                      <span className="font-semibold">{post.reactions}</span>
                    </button>
                    <button 
                      onClick={() => setExpandedPostId(expandedPostId === post.id ? null : post.id)}
                      className="flex items-center gap-2 text-gray-600 hover:text-[#3E2BB8] transition-colors group"
                    >
                      <MessageCircle className="w-5 h-5 group-hover:scale-110 transition-transform" />
                      <span className="font-semibold">{post.comments}</span>
                    </button>
                  </div>

                  {/* Comments Section (Expandable) */}
                  {expandedPostId === post.id && (
                    <div className="mt-6 pt-6 border-t border-gray-200 space-y-4">
                      {/* Existing Comments */}
                      {post.commentsList && post.commentsList.length > 0 && (
                        <div className="space-y-4 mb-6">
                          {post.commentsList.map((comment) => (
                            <div key={comment.id} className="flex gap-3">
                              {/* Commenter Avatar */}
                              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#7C67FF] to-[#9D8FFF] flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                                {comment.authorInitials}
                              </div>
                              
                              <div className="flex-1">
                                {/* Comment Header */}
                                <div className="flex items-center gap-2 mb-1">
                                  <span 
                                    className="text-gray-900"
                                    style={{ fontFamily: 'var(--font-body)', fontWeight: 600, fontSize: '0.875rem' }}
                                  >
                                    {comment.author}
                                  </span>
                                  <span className="text-xs text-gray-500">{comment.timestamp}</span>
                                </div>

                                {/* Context (if provided) */}
                                {comment.context && (
                                  <div 
                                    className="mb-2 p-3 bg-[#F5F3FF] border-l-4 border-[#3E2BB8] italic text-gray-700 text-sm"
                                    style={{ 
                                      borderRadius: '0px',
                                      fontFamily: 'var(--font-body)' 
                                    }}
                                  >
                                    "{comment.context}"
                                  </div>
                                )}

                                {/* Comment Content */}
                                <p 
                                  className="text-gray-900 text-sm leading-relaxed mb-2"
                                  style={{ fontFamily: 'var(--font-body)' }}
                                >
                                  {comment.content}
                                </p>

                                {/* Comment Actions */}
                                <button className="flex items-center gap-1 text-xs text-gray-500 hover:text-[#3E2BB8] transition-colors">
                                  <ThumbsUp className="w-3 h-3" />
                                  <span>{comment.reactions}</span>
                                </button>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}

                      {/* New Comment Form */}
                      <div 
                        className="p-4 bg-[#FAFAFA]"
                        style={{ borderRadius: '0px' }}
                      >
                        {/* Context Input (Optional) */}
                        <div className="mb-3">
                          <label 
                            className="block text-xs text-gray-600 mb-2"
                            style={{ fontFamily: 'var(--font-body)', fontWeight: 600 }}
                          >
                            Add context (optional) - Quote the part of the post you're responding to:
                          </label>
                          <input
                            type="text"
                            value={newCommentContext[post.id] || ''}
                            onChange={(e) => setNewCommentContext({
                              ...newCommentContext,
                              [post.id]: e.target.value
                            })}
                            placeholder="e.g., 'it gets easier' or 'not sure how to respond'"
                            className="w-full p-3 border-2 border-gray-200 focus:border-[#3E2BB8] focus:outline-none text-sm"
                            style={{ 
                              borderRadius: '0px',
                              fontFamily: 'var(--font-body)' 
                            }}
                          />
                        </div>

                        {/* Comment Content */}
                        <textarea
                          value={newCommentContent[post.id] || ''}
                          onChange={(e) => setNewCommentContent({
                            ...newCommentContent,
                            [post.id]: e.target.value
                          })}
                          placeholder="Write your supportive comment..."
                          className="w-full p-3 border-2 border-gray-200 focus:border-[#3E2BB8] focus:outline-none resize-none text-sm"
                          rows={3}
                          style={{ 
                            borderRadius: '0px',
                            fontFamily: 'var(--font-body)' 
                          }}
                        />

                        {/* Comment Actions */}
                        <div className="flex items-center justify-end gap-3 mt-3">
                          <button
                            onClick={() => {
                              setExpandedPostId(null);
                              setNewCommentContent({ ...newCommentContent, [post.id]: '' });
                              setNewCommentContext({ ...newCommentContext, [post.id]: '' });
                            }}
                            className="px-4 py-2 text-gray-600 hover:text-gray-900 text-sm"
                            style={{ 
                              borderRadius: '0px',
                              fontFamily: 'var(--font-body)', 
                              fontWeight: 600 
                            }}
                          >
                            Cancel
                          </button>
                          <button
                            disabled={!newCommentContent[post.id]?.trim()}
                            className="px-4 py-2 bg-[#3E2BB8] text-white hover:bg-[#5739FB] transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 text-sm"
                            style={{ 
                              borderRadius: '0px',
                              fontFamily: 'var(--font-body)', 
                              fontWeight: 600 
                            }}
                          >
                            <Send className="w-4 h-4" />
                            Post Comment
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Load More */}
            <div className="text-center py-8">
              <button className="px-8 py-3 bg-white border-2 border-gray-200 text-gray-700 rounded-xl hover:border-[#3E2BB8] hover:text-[#3E2BB8] transition-all font-semibold">
                Load More Posts
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
