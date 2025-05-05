"use client";
import React, { useState, useEffect } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Link,
  useNavigate,
  useParams,
} from "react-router-dom";

// Types for Community, Post, Event
interface Post {
  id: number;
  content: string;
  likes: number;
  comments: string[];
  author: string;
  timestamp: string;
}

interface Event {
  id: number;
  title: string;
  date: string;
  location?: string;
  attendees?: number;
}

interface Community {
  id: number;
  name: string;
  description?: string;
  coverImage?: string;
  posts: Post[];
  events: Event[];
  members: string[];
}

// Sample data (unchanged)
const sampleCommunities: Community[] = [
  {
    id: 1,
    name: "Tech Enthusiasts",
    description:
      "A community for tech lovers to discuss the latest innovations and developments.",
    coverImage:
      "https://plus.unsplash.com/premium_photo-1683134022335-921a23ff37a3?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8dGVjaCUyMGVudGh1c2lhc3R8ZW58MHx8MHx8fDA%3D",
    posts: [
      {
        id: 1,
        content:
          "React 19 just launched with revolutionary new features! I'm particularly excited about the improved concurrent rendering capabilities. Has anyone had a chance to try it yet?",
        likes: 24,
        comments: [
          "Awesome! I've been waiting for this!",
          "Can't wait to try the new API enhancements.",
        ],
        author: "Alice Chen",
        timestamp: "1 hour ago",
      },
      {
        id: 2,
        content:
          "Which code editor do you folks prefer? I've been using VS Code but considering trying out JetBrains products.",
        likes: 15,
        comments: [
          "VS Code all the way!",
          "Definitely try WebStorm, it's worth it!",
        ],
        author: "Bob Johnson",
        timestamp: "3 hours ago",
      },
    ],
    events: [
      {
        id: 1,
        title: "Next.js Workshop",
        date: "May 10, 2025",
        location: "Tech Hub Downtown",
        attendees: 45,
      },
      {
        id: 2,
        title: "Web Performance Optimization Seminar",
        date: "May 22, 2025",
        location: "Virtual",
        attendees: 112,
      },
    ],
    members: ["Alice", "Bob", "Charlie", "David", "Emma", "Felix"],
  },
  {
    id: 2,
    name: "Music Lovers",
    description:
      "Share your passion for music, discover new artists, and discuss your favorite albums.",
    coverImage:
      "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bXVzaWN8ZW58MHx8MHx8fDA%3D",
    posts: [
      {
        id: 1,
        content:
          "New album release this Friday! I've pre-ordered and can't wait to share my thoughts with everyone.",
        likes: 19,
        comments: [
          "So excited!",
          "Love their music, their last tour was amazing!",
        ],
        author: "David Wilson",
        timestamp: "2 hours ago",
      },
      {
        id: 2,
        content:
          "What's your go-to playlist for productive work sessions? Looking for recommendations!",
        likes: 8,
        comments: [
          "Lo-fi beats never fail!",
          "I prefer instrumental jazz for deep focus.",
        ],
        author: "Grace Lee",
        timestamp: "5 hours ago",
      },
    ],
    events: [
      {
        id: 1,
        title: "Summer Music Festival",
        date: "June 15, 2025",
        location: "Central Park",
        attendees: 230,
      },
    ],
    members: ["David", "Ella", "Grace", "Henry", "Isabella"],
  },
];

// LandingPage Component with Tailwind CSS
const LandingPage = () => {
  const navigate = useNavigate();

  const handleJoinCommunity = () => {
    navigate("/communities");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 to-black text-purple-200 flex flex-col justify-center items-center p-8 text-center font-sans">
      <h1 className="text-4xl md:text-6xl font-extrabold mb-4 drop-shadow-lg">
        Welcome to<span className="text-purple-400">CommunityHub</span>
      </h1>
      <p className="text-lg md:text-xl max-w-xl mb-8 text-purple-300 font-medium">
        Connect with people who share your interests, join discussions, and
        participate in exciting events.
      </p>
      <button
        onClick={handleJoinCommunity}
        className="bg-purple-400 text-black font-semibold text-lg px-10 py-3 rounded-full shadow-lg hover:scale-110 transition-transform duration-300 tracking-wide"
      >
        Join a Community
      </button>
    </div>
  );
};

// Navbar with Tailwind CSS
const Navbar = () => {
  return (
    <nav className="bg-gray-900 bg-opacity-90 text-purple-400 px-6 py-3 sticky top-0 z-50 shadow-md font-sans">
      <div className="max-w-7xl mx-auto flex justify-between items-center flex-wrap">
        <Link
          to="/"
          className="flex items-center text-purple-400 font-bold text-xl space-x-2"
        >
          <span role="img" aria-label="home" className="text-2xl">
            🏠
          </span>
          <span>CommunityHub</span>
        </Link>
        <div className="flex items-center space-x-8 text-lg">
          <Link
            to="/communities"
            className="hover:text-purple-300 transition-colors"
          >
            Communities
          </Link>
          <Link
            to="/profile"
            className="hover:text-purple-300 transition-colors"
          >
            Profile
          </Link>
        </div>
      </div>
    </nav>
  );
};

// Footer with Tailwind CSS
const Footer = () => {
  return (
    <footer className="bg-gray-900 text-purple-300 py-12 font-sans">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <h3 className="text-purple-400 font-bold mb-4 text-lg">
            CommunityHub
          </h3>
          <p>
            Connect with like-minded individuals and build meaningful
            relationships within your interests.
          </p>
        </div>
        <div>
          <h3 className="font-semibold mb-3 text-purple-400">Quick Links</h3>
          <ul className="space-y-2">
            <li>
              <Link className="hover:text-purple-400" to="/">
                Home
              </Link>
            </li>
            <li>
              <Link className="hover:text-purple-400" to="/communities">
                Communities
              </Link>
            </li>
            <li>
              <Link className="hover:text-purple-400" to="/profile">
                Profile
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <h3 className="font-semibold mb-3 text-purple-400">Contact Us</h3>
          <p>Have questions or feedback? Reach out to us!</p>
          <div className="flex space-x-4 mt-3 text-2xl">
            <a href="#" aria-label="Phone" className="hover:text-purple-400">
              📱
            </a>
            <a href="#" aria-label="Email" className="hover:text-purple-400">
              📧
            </a>
          </div>
        </div>
      </div>
      <div className="border-t border-purple-700 mt-12 pt-6 text-center text-sm text-purple-500">
        &copy; 2025 CommunityHub |{" "}
        <Link className="text-purple-400 hover:underline" to="/terms">
          Terms of Service
        </Link>{" "}
        |{" "}
        <Link className="text-purple-400 hover:underline" to="/privacy">
          Privacy Policy
        </Link>
      </div>
    </footer>
  );
};

// CommunitiesPage with Tailwind CSS
const CommunitiesPage = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");

  const handleCommunityClick = (communityId: number) => {
    navigate(`/community/${communityId}`);
  };

  const filteredCommunities = sampleCommunities.filter((community) =>
    community.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="bg-gray-900 min-h-screen p-8 text-purple-200 font-sans">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-2 text-purple-400 drop-shadow-md">
          Communities
        </h1>
        <p className="text-purple-300 mb-6 text-lg font-medium">
          Find and join your favorite communities
        </p>
        <div className="relative max-w-md mb-8">
          <input
            type="text"
            placeholder="Search communities..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full rounded-full border-2 border-purple-700 bg-gray-800 text-purple-200 px-10 py-3 focus:border-purple-400 focus:outline-none shadow-inner"
          />
          <svg
            className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-purple-400 pointer-events-none"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>
        <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCommunities.map((community) => (
            <div
              key={community.id}
              tabIndex={0}
              onClick={() => handleCommunityClick(community.id)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  handleCommunityClick(community.id);
                }
              }}
              aria-label={`View ${community.name} community`}
              className="cursor-pointer rounded-xl bg-gray-800 shadow-lg shadow-purple-700/50 transform transition-transform duration-300 hover:scale-105 focus:scale-105 outline-none"
            >
              <div className="relative h-36 rounded-t-xl overflow-hidden">
                <img
                  src={community.coverImage || "/api/placeholder/800/300"}
                  alt={community.name}
                  className="w-full h-full object-cover brightness-75 hover:brightness-90 transition-all duration-300"
                />
                <h2 className="absolute bottom-3 left-4 text-xl font-bold text-purple-300 drop-shadow-lg">
                  {community.name}
                </h2>
              </div>
              <div className="p-4 flex flex-col justify-between h-40">
                <p className="text-purple-400 mb-4 grow">
                  {community.description || "Join our community today!"}
                </p>
                <div className="flex justify-between text-purple-500 text-sm font-semibold">
                  <span>{community.members.length} members</span>
                  <span>{community.events.length} upcoming events</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// CommunityPage with Tailwind CSS
const CommunityPage: React.FC = () => {
  const { communityId } = useParams<{ communityId: string }>();
  const navigate = useNavigate();
  const [newPost, setNewPost] = useState<string>("");
  const [activeTab, setActiveTab] = useState("posts");
  const [commentInputs, setCommentInputs] = useState<{ [key: number]: string }>(
    {}
  );

  const community = sampleCommunities.find((c) => c.id === Number(communityId));
  const [posts, setPosts] = useState<Post[]>(community ? community.posts : []);

  useEffect(() => {
    if (community) setPosts(community.posts);
  }, [community]);

  if (!communityId) {
    return (
      <div className="text-pink-400 text-center p-12 font-bold text-lg font-sans">
        Invalid community ID.
      </div>
    );
  }

  if (!community) {
    return (
      <div
        className="flex flex-col justify-center items-center min-h-screen bg-pink-100 text-pink-800 rounded-xl m-6 p-10 shadow-xl font-sans"
        role="alert"
        aria-live="assertive"
      >
        <h2 className="text-3xl font-extrabold mb-4">Community Not Found</h2>
        <p className="mb-6 text-lg">
          The community you're looking for doesn't exist.
        </p>
        <button
          onClick={() => navigate("/communities")}
          className="bg-purple-400 text-black px-8 py-3 rounded-full font-semibold hover:bg-purple-500 focus:outline-none focus:ring-4 focus:ring-purple-300"
        >
          Back to Communities
        </button>
      </div>
    );
  }

  const addPost = () => {
    if (!newPost.trim()) return;
    const newPostObj: Post = {
      id: posts.length > 0 ? posts[posts.length - 1].id + 1 : 1,
      content: newPost.trim(),
      likes: 0,
      comments: [],
      author: "Current User",
      timestamp: "Just now",
    };
    setPosts((prevPosts) => [...prevPosts, newPostObj]);
    setNewPost("");
  };

  const toggleLike = (postId: number) => {
    setPosts((prevPosts) =>
      prevPosts.map((post) =>
        post.id === postId ? { ...post, likes: post.likes + 1 } : post
      )
    );
  };

  const handleCommentChange = (postId: number, value: string) => {
    setCommentInputs((prevInputs) => ({
      ...prevInputs,
      [postId]: value,
    }));
  };

  const addComment = (postId: number) => {
    const comment = commentInputs[postId]?.trim();
    if (!comment) return;

    setPosts((prevPosts) =>
      prevPosts.map((post) =>
        post.id === postId
          ? { ...post, comments: [...post.comments, comment] }
          : post
      )
    );

    setCommentInputs((prevInputs) => ({
      ...prevInputs,
      [postId]: "",
    }));
  };

  return (
    <div className="bg-gray-900 min-h-screen text-purple-200 font-sans pb-12">
      {/* Hero Header */}
      <div className="relative h-60 bg-purple-900 rounded-b-3xl overflow-hidden shadow-inner shadow-purple-700/75">
        <img
          src={community.coverImage || "/api/placeholder/1200/400"}
          alt={community.name}
          className="w-full h-full object-cover brightness-50"
        />
        <div className="absolute bottom-4 left-6 text-purple-300 z-20 max-w-[90%]">
          <button
            onClick={() => navigate("/communities")}
            aria-label="Back to Communities"
            className="text-purple-300 hover:text-purple-400 font-bold flex items-center space-x-2 cursor-pointer"
          >
            <svg
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path d="M15 19l-7-7 7-7" />
            </svg>
            <span>Back to Communities</span>
          </button>
          <h1 className="text-4xl font-extrabold mt-3 drop-shadow-md">
            {community.name}
          </h1>
          <p className="text-lg opacity-80 max-w-lg">{community.description}</p>
          <div className="flex space-x-6 mt-2 bg-purple-800 bg-opacity-30 rounded-full py-1 px-4 font-semibold tracking-wide text-purple-200 w-max shadow-lg">
            <span>{community.members.length} members</span>
            <span>{community.events.length} events</span>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div
        className="max-w-6xl mx-auto mt-6 border-b-4 border-purple-700 flex space-x-6 px-4 md:px-0"
        role="tablist"
        aria-label="Community content navigation"
      >
        {["posts", "events", "members"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            role="tab"
            aria-selected={activeTab === tab}
            tabIndex={activeTab === tab ? 0 : -1}
            className={`py-3 font-extrabold text-lg uppercase tracking-wider border-b-4 transition-colors duration-300 ${
              activeTab === tab
                ? "border-purple-400 text-purple-200"
                : "border-transparent text-purple-600 hover:text-purple-400"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Content Area */}
      <main className="max-w-6xl mx-auto mt-8 px-4 md:px-0">
        {activeTab === "posts" && (
          <>
            {/* Create Post */}
            <section
              aria-label="Create a new post"
              className="bg-gray-800 p-6 rounded-3xl shadow-lg mb-10 font-semibold"
            >
              <h2 className="text-2xl font-extrabold mb-4 text-purple-400 drop-shadow-lg">
                Create a Post
              </h2>
              <textarea
                aria-label="What's on your mind?"
                placeholder="What's on your mind?"
                rows={4}
                value={newPost}
                onChange={(e) => setNewPost(e.target.value)}
                className="w-full rounded-3xl border-2 border-purple-700 bg-purple-900 px-6 py-4 resize-y text-lg text-purple-200 placeholder-purple-400 shadow-inner focus:outline-none focus:border-purple-400 transition-colors"
              />
              <div className="flex justify-end mt-4">
                <button
                  disabled={!newPost.trim()}
                  onClick={addPost}
                  className={`px-10 py-3 rounded-full font-extrabold tracking-wide text-lg transition-transform duration-300 ${
                    newPost.trim()
                      ? "bg-purple-400 text-black shadow-lg hover:bg-purple-300 hover:scale-105"
                      : "bg-purple-800 text-purple-600 cursor-not-allowed"
                  }`}
                >
                  Post
                </button>
              </div>
            </section>

            {/* Posts Feed */}
            <section
              aria-label="Posts feed"
              className="flex flex-col space-y-8"
            >
              {posts.map((post) => (
                <article
                  key={post.id}
                  className="bg-gray-800 rounded-3xl p-6 shadow-lg text-purple-300"
                >
                  <header className="flex items-center gap-4 mb-6">
                    <div
                      className="h-14 w-14 rounded-full bg-purple-700 text-purple-50 font-bold text-xl flex items-center justify-center select-none drop-shadow-lg"
                      aria-hidden="true"
                    >
                      {post.author.charAt(0)}
                    </div>
                    <div>
                      <p className="font-bold text-purple-200 text-lg">
                        {post.author}
                      </p>
                      <p className="text-purple-500 text-sm">
                        {post.timestamp}
                      </p>
                    </div>
                  </header>
                  <p className="whitespace-pre-wrap mb-6 text-lg">
                    {post.content}
                  </p>
                  <div className="flex items-center justify-between border-t border-purple-700 pt-4 font-bold text-purple-400">
                    <button
                      onClick={() => toggleLike(post.id)}
                      aria-label={`Like post ${post.id}`}
                      className="flex items-center gap-2 hover:text-purple-300 focus:outline-none focus:ring-2 focus:ring-purple-400 rounded"
                      type="button"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        className="h-6 w-6"
                        aria-hidden="true"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5"
                        />
                      </svg>
                      {post.likes}
                    </button>
                    <span
                      aria-label={`${post.comments.length} comments`}
                      className="text-purple-500 text-sm font-semibold"
                    >
                      {post.comments.length} comments
                    </span>
                  </div>

                  {/* Comments Section */}
                  {post.comments.length > 0 && (
                    <div className="border-l-4 border-purple-400 pl-6 mt-6 space-y-3 text-purple-300">
                      {post.comments.map((comment, idx) => (
                        <p key={idx} className="whitespace-pre-wrap text-lg">
                          {comment}
                        </p>
                      ))}
                    </div>
                  )}

                  {/* Add Comment */}
                  <div className="mt-6 relative">
                    <input
                      type="text"
                      placeholder="Add a comment..."
                      value={commentInputs[post.id] || ""}
                      onChange={(e) =>
                        handleCommentChange(post.id, e.target.value)
                      }
                      aria-label={`Add comment for post ${post.id}`}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          e.preventDefault();
                          addComment(post.id);
                        }
                      }}
                      className="w-full rounded-full border-2 border-purple-700 bg-purple-900 px-6 py-3 text-purple-200 text-lg placeholder-purple-500 shadow-inner focus:border-purple-400 outline-none"
                    />
                    <button
                      onClick={() => addComment(post.id)}
                      aria-label={`Submit comment for post ${post.id}`}
                      type="button"
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-purple-400 hover:text-purple-300 focus:outline-none"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        className="h-6 w-6"
                        aria-hidden="true"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                        />
                      </svg>
                    </button>
                  </div>
                </article>
              ))}
            </section>
          </>
        )}

        {activeTab === "events" && (
          <section
            aria-label="Upcoming events"
            className="bg-gray-800 rounded-3xl p-8 shadow-lg"
          >
            <h2 className="text-2xl font-extrabold mb-6 text-purple-400 drop-shadow-lg">
              Upcoming Events
            </h2>
            {community.events.map((event) => (
              <div
                key={event.id}
                className="border-b border-purple-700 pb-6 mb-6 last:border-none last:mb-0"
              >
                <h3 className="text-xl font-bold text-purple-300 drop-shadow-md mb-1">
                  {event.title}
                </h3>
                <div className="flex items-center space-x-3 text-purple-500 text-base">
                  <svg
                    className="h-5 w-5 flex-shrink-0"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <span>{event.date}</span>
                </div>
                {event.location && (
                  <div className="flex items-center space-x-2 text-purple-400">
                    <svg
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={2}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      viewBox="0 0 24 24"
                      className="h-4 w-4"
                      aria-hidden="true"
                    >
                      <path d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <span>{event.location}</span>
                  </div>
                )}
                {event.attendees && (
                  <p className="text-purple-500 text-sm mt-1">
                    {event.attendees} people attending
                  </p>
                )}
              </div>
            ))}
          </section>
        )}

        {activeTab === "members" && (
          <section
            aria-label="Community members"
            className="bg-gray-800 rounded-3xl p-8 shadow-lg"
          >
            <h2 className="text-2xl font-extrabold mb-8 text-purple-400 drop-shadow-lg">
              Community Members
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
              {community.members.map((member, idx) => (
                <div
                  key={idx}
                  tabIndex={0}
                  aria-label={`Community member ${member}`}
                  className="flex items-center gap-4 p-4 rounded-3xl border-2 border-purple-700 shadow-md cursor-default text-purple-300 font-semibold select-none focus:outline-none focus:ring-4 focus:ring-purple-400 focus:ring-opacity-50"
                >
                  <div className="h-12 w-12 rounded-full bg-purple-700 flex items-center justify-center font-bold text-xl drop-shadow-lg select-none text-purple-100">
                    {member.charAt(0)}
                  </div>
                  <span className="text-lg truncate">{member}</span>
                </div>
              ))}
            </div>
          </section>
        )}
      </main>
    </div>
  );
};

// ProfilePage with Tailwind CSS
const ProfilePage = () => {
  const [user, setUser] = useState({
    name: "John Doe",
    email: "john.doe@example.com",
    bio: "Tech enthusiast and community builder",
    location: "San Francisco, CA",
    joinDate: "January 2025",
  });

  const [isEditing, setIsEditing] = useState(false);

  const handleEditProfile = () => {
    setIsEditing(true);
  };

  const handleSaveProfile = () => {
    setIsEditing(false);
    alert("Profile saved successfully!");
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  return (
    <div className="bg-gray-900 min-h-screen p-12 text-purple-200 font-sans">
      <div className="max-w-lg mx-auto bg-gray-800 rounded-3xl shadow-lg overflow-hidden">
        <div className="h-40 bg-gradient-to-br from-purple-900 to-purple-700 relative shadow-inner">
          <div className="absolute bottom-[-60px] left-8 w-32 h-32 rounded-full bg-purple-700 shadow-lg flex items-center justify-center font-extrabold text-6xl text-purple-200 select-none drop-shadow-lg">
            {user.name.charAt(0)}
          </div>
        </div>
        <div className="pt-20 p-10 text-center">
          {!isEditing ? (
            <>
              <h2 className="text-3xl font-extrabold text-purple-400">
                {user.name}
              </h2>
              <p className="text-purple-300 mb-8 font-semibold text-lg">
                {user.bio}
              </p>
              <p className="mb-2">
                <strong>Email: </strong> {user.email}
              </p>
              <p className="mb-2">
                <strong>Location: </strong> {user.location}
              </p>
              <p className="mb-6">
                <strong>Member since: </strong> {user.joinDate}
              </p>
              <button
                onClick={handleEditProfile}
                className="bg-purple-400 text-black px-8 py-3 rounded-full font-extrabold tracking-wide shadow-lg hover:bg-purple-300 transition-colors"
              >
                Edit Profile
              </button>
            </>
          ) : (
            <>
              <label
                className="block mb-6 text-left font-semibold text-purple-300"
                htmlFor="nameInput"
              >
                Name:
                <input
                  id="nameInput"
                  type="text"
                  name="name"
                  value={user.name}
                  onChange={handleInputChange}
                  className="w-full mt-2 px-4 py-2 rounded-xl bg-purple-900 border-2 border-purple-700 text-purple-200 focus:outline-none focus:border-purple-400 transition-colors"
                />
              </label>
              <label
                className="block mb-6 text-left font-semibold text-purple-300"
                htmlFor="bioInput"
              >
                Bio:
                <textarea
                  id="bioInput"
                  name="bio"
                  value={user.bio}
                  onChange={handleInputChange}
                  rows={4}
                  className="w-full mt-2 px-4 py-2 rounded-xl bg-purple-900 border-2 border-purple-700 text-purple-200 resize-y focus:outline-none focus:border-purple-400 transition-colors"
                />
              </label>
              <label
                className="block mb-6 text-left font-semibold text-purple-300"
                htmlFor="emailInput"
              >
                Email:
                <input
                  id="emailInput"
                  type="email"
                  name="email"
                  value={user.email}
                  onChange={handleInputChange}
                  className="w-full mt-2 px-4 py-2 rounded-xl bg-purple-900 border-2 border-purple-700 text-purple-200 focus:outline-none focus:border-purple-400 transition-colors"
                />
              </label>
              <label
                className="block mb-6 text-left font-semibold text-purple-300"
                htmlFor="locationInput"
              >
                Location:
                <input
                  id="locationInput"
                  type="text"
                  name="location"
                  value={user.location}
                  onChange={handleInputChange}
                  className="w-full mt-2 px-4 py-2 rounded-xl bg-purple-900 border-2 border-purple-700 text-purple-200 focus:outline-none focus:border-purple-400 transition-colors"
                />
              </label>
              <div className="flex justify-center space-x-6 mt-8">
                <button
                  onClick={handleSaveProfile}
                  className="bg-purple-400 px-10 py-3 rounded-full font-extrabold tracking-wide shadow-lg hover:bg-purple-300 transition-colors"
                >
                  Save
                </button>
                <button
                  onClick={() => setIsEditing(false)}
                  className="bg-gray-700 text-purple-300 px-10 py-3 rounded-full font-semibold shadow hover:bg-gray-600 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

const CommunityHubApp: React.FC = () => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) return null;

  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/communities" element={<CommunitiesPage />} />
        <Route path="/community/:communityId" element={<CommunityPage />} />
        <Route path="/profile" element={<ProfilePage />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
};

export default CommunityHubApp;
