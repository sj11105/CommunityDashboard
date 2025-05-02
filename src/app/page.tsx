// communities-platform.tsx
import { useState, useEffect } from "react";

type User = {
  id: string;
  name: string;
  email: string;
  avatar: string;
  joinedCommunities: string[];
};

type Community = {
  id: string;
  name: string;
  description: string;
  members: string[];
  posts: Post[];
  events: Event[];
};

type Post = {
  id: string;
  authorId: string;
  content: string;
  timestamp: Date;
  likes: string[];
  comments: Comment[];
};

type Comment = {
  id: string;
  authorId: string;
  content: string;
  timestamp: Date;
};

type Event = {
  id: string;
  title: string;
  description: string;
  date: Date;
  organizerId: string;
  attendees: string[];
};

export default function CommunityPlatform() {
  // State management
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [communities, setCommunities] = useState<Community[]>([]);
  const [selectedCommunityId, setSelectedCommunityId] = useState<string | null>(
    null
  );
  const [newPostContent, setNewPostContent] = useState("");
  const [newCommentContent, setNewCommentContent] = useState("");
  const [newEvent, setNewEvent] = useState({
    title: "",
    description: "",
    date: "",
  });
  const [view, setView] = useState<"feed" | "events" | "members">("feed");
  const [isLoginView, setIsLoginView] = useState(true);

  // Mock data initialization
  useEffect(() => {
    const mockUsers: User[] = [
      {
        id: "user1",
        name: "Alex Johnson",
        email: "alex@example.com",
        avatar: "",
        joinedCommunities: ["comm1", "comm2"],
      },
    ];

    const mockCommunities: Community[] = [
      {
        id: "comm1",
        name: "React Developers",
        description: "A community for React enthusiasts",
        members: ["user1"],
        posts: [
          {
            id: "post1",
            authorId: "user1",
            content: "Just learned about React hooks!",
            timestamp: new Date(),
            likes: [],
            comments: [],
          },
        ],
        events: [
          {
            id: "event1",
            title: "React Meetup",
            description: "Monthly React discussion",
            date: new Date(Date.now() + 86400000 * 7), // 7 days from now
            organizerId: "user1",
            attendees: ["user1"],
          },
        ],
      },
      {
        id: "comm2",
        name: "TypeScript Lovers",
        description: "For TypeScript developers",
        members: ["user1"],
        posts: [],
        events: [],
      },
    ];

    setCurrentUser(mockUsers[0]);
    setCommunities(mockCommunities);
    setSelectedCommunityId("comm1");
  }, []);

  // Helper functions
  const selectedCommunity = communities.find(
    (c) => c.id === selectedCommunityId
  );
  const getUserById = (userId: string) => {
    // In a real app, this would fetch from your user database
    return {
      id: userId,
      name: userId === "user1" ? "Alex Johnson" : `User ${userId}`,
      avatar: "",
    };
  };

  // Event handlers
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, you would authenticate here
    setIsLoginView(false);
  };

  const handleCreatePost = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedCommunity || !currentUser || !newPostContent) return;

    const newPost: Post = {
      id: `post-${Date.now()}`,
      authorId: currentUser.id,
      content: newPostContent,
      timestamp: new Date(),
      likes: [],
      comments: [],
    };

    setCommunities(
      communities.map((community) =>
        community.id === selectedCommunity.id
          ? { ...community, posts: [newPost, ...community.posts] }
          : community
      )
    );

    setNewPostContent("");
  };

  const handleAddComment = (postId: string) => {
    if (!selectedCommunity || !currentUser || !newCommentContent) return;

    const newComment: Comment = {
      id: `comment-${Date.now()}`,
      authorId: currentUser.id,
      content: newCommentContent,
      timestamp: new Date(),
    };

    setCommunities(
      communities.map((community) =>
        community.id === selectedCommunity.id
          ? {
              ...community,
              posts: community.posts.map((post) =>
                post.id === postId
                  ? { ...post, comments: [...post.comments, newComment] }
                  : post
              ),
            }
          : community
      )
    );

    setNewCommentContent("");
  };

  const handleLikePost = (postId: string) => {
    if (!selectedCommunity || !currentUser) return;

    setCommunities(
      communities.map((community) =>
        community.id === selectedCommunity.id
          ? {
              ...community,
              posts: community.posts.map((post) =>
                post.id === postId
                  ? {
                      ...post,
                      likes: post.likes.includes(currentUser.id)
                        ? post.likes.filter((id) => id !== currentUser.id)
                        : [...post.likes, currentUser.id],
                    }
                  : post
              ),
            }
          : community
      )
    );
  };

  const handleCreateEvent = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedCommunity || !currentUser || !newEvent.title) return;

    const event: Event = {
      id: `event-${Date.now()}`,
      title: newEvent.title,
      description: newEvent.description,
      date: new Date(newEvent.date),
      organizerId: currentUser.id,
      attendees: [currentUser.id],
    };

    setCommunities(
      communities.map((community) =>
        community.id === selectedCommunity.id
          ? { ...community, events: [...community.events, event] }
          : community
      )
    );

    setNewEvent({ title: "", description: "", date: "" });
  };

  const handleJoinCommunity = (communityId: string) => {
    if (!currentUser) return;

    // Add user to community members
    setCommunities(
      communities.map((community) =>
        community.id === communityId
          ? { ...community, members: [...community.members, currentUser.id] }
          : community
      )
    );

    // Add community to user's joined communities
    setCurrentUser({
      ...currentUser,
      joinedCommunities: [...currentUser.joinedCommunities, communityId],
    });
  };

  // UI Components
  const LoginForm = () => (
    <div
      style={{
        maxWidth: "400px",
        margin: "2rem auto",
        padding: "1.5rem",
        border: "1px solid #ddd",
        borderRadius: "8px",
        boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
      }}
    >
      <h2 style={{ textAlign: "center", marginBottom: "1.5rem" }}>
        Community Platform
      </h2>
      <form onSubmit={handleLogin}>
        <div style={{ marginBottom: "1rem" }}>
          <label style={{ display: "block", marginBottom: "0.5rem" }}>
            Email
          </label>
          <input
            type="email"
            style={{
              width: "100%",
              padding: "0.5rem",
              border: "1px solid #ddd",
              borderRadius: "4px",
            }}
            required
          />
        </div>
        <div style={{ marginBottom: "1.5rem" }}>
          <label style={{ display: "block", marginBottom: "0.5rem" }}>
            Password
          </label>
          <input
            type="password"
            style={{
              width: "100%",
              padding: "0.5rem",
              border: "1px solid #ddd",
              borderRadius: "4px",
            }}
            required
          />
        </div>
        <button
          type="submit"
          style={{
            width: "100%",
            padding: "0.75rem",
            backgroundColor: "#4CAF50",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          Login
        </button>
      </form>
    </div>
  );

  const CommunitySidebar = () => (
    <div
      style={{
        width: "250px",
        padding: "1rem",
        borderRight: "1px solid #ddd",
        height: "100vh",
        overflowY: "auto",
      }}
    >
      <h3 style={{ marginBottom: "1rem" }}>Your Communities</h3>
      <ul style={{ listStyle: "none", padding: 0 }}>
        {currentUser?.joinedCommunities.map((communityId) => {
          const community = communities.find((c) => c.id === communityId);
          if (!community) return null;
          return (
            <li
              key={community.id}
              style={{
                padding: "0.5rem",
                marginBottom: "0.5rem",
                borderRadius: "4px",
                backgroundColor:
                  selectedCommunityId === community.id
                    ? "#f0f0f0"
                    : "transparent",
                cursor: "pointer",
              }}
              onClick={() => setSelectedCommunityId(community.id)}
            >
              {community.name}
            </li>
          );
        })}
      </ul>

      <h3 style={{ margin: "1.5rem 0 1rem" }}>Discover</h3>
      <ul style={{ listStyle: "none", padding: 0 }}>
        {communities
          .filter(
            (community) =>
              !currentUser?.joinedCommunities.includes(community.id)
          )
          .map((community) => (
            <li
              key={community.id}
              style={{
                padding: "0.5rem",
                marginBottom: "0.5rem",
                borderRadius: "4px",
                backgroundColor: "#f9f9f9",
                cursor: "pointer",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              {community.name}
              <button
                onClick={() => handleJoinCommunity(community.id)}
                style={{
                  padding: "0.25rem 0.5rem",
                  backgroundColor: "#4CAF50",
                  color: "white",
                  border: "none",
                  borderRadius: "4px",
                  cursor: "pointer",
                }}
              >
                Join
              </button>
            </li>
          ))}
      </ul>
    </div>
  );

  const CommunityHeader = () => (
    <div
      style={{
        padding: "1rem",
        borderBottom: "1px solid #ddd",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <h2>{selectedCommunity?.name}</h2>
      <div style={{ display: "flex", gap: "1rem" }}>
        <button
          onClick={() => setView("feed")}
          style={{
            padding: "0.5rem 1rem",
            backgroundColor: view === "feed" ? "#4CAF50" : "#f0f0f0",
            color: view === "feed" ? "white" : "black",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          Feed
        </button>
        <button
          onClick={() => setView("events")}
          style={{
            padding: "0.5rem 1rem",
            backgroundColor: view === "events" ? "#4CAF50" : "#f0f0f0",
            color: view === "events" ? "white" : "black",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          Events
        </button>
        <button
          onClick={() => setView("members")}
          style={{
            padding: "0.5rem 1rem",
            backgroundColor: view === "members" ? "#4CAF50" : "#f0f0f0",
            color: view === "members" ? "white" : "black",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          Members
        </button>
      </div>
    </div>
  );

  const PostFeed = () => (
    <div style={{ padding: "1rem", flex: 1 }}>
      <form onSubmit={handleCreatePost} style={{ marginBottom: "1.5rem" }}>
        <textarea
          value={newPostContent}
          onChange={(e) => setNewPostContent(e.target.value)}
          placeholder="What's on your mind?"
          style={{
            width: "100%",
            padding: "0.75rem",
            border: "1px solid #ddd",
            borderRadius: "4px",
            minHeight: "100px",
            marginBottom: "0.5rem",
            resize: "vertical",
          }}
          required
        />
        <button
          type="submit"
          style={{
            padding: "0.5rem 1rem",
            backgroundColor: "#4CAF50",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          Post
        </button>
      </form>

      <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
        {selectedCommunity?.posts.map((post) => (
          <div
            key={post.id}
            style={{
              border: "1px solid #ddd",
              borderRadius: "8px",
              padding: "1rem",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                marginBottom: "0.5rem",
              }}
            >
              <div
                style={{
                  width: "40px",
                  height: "40px",
                  borderRadius: "50%",
                  backgroundColor: "#f0f0f0",
                  marginRight: "0.75rem",
                }}
              ></div>
              <div>
                <div style={{ fontWeight: "bold" }}>
                  {getUserById(post.authorId).name}
                </div>
                <div style={{ fontSize: "0.8rem", color: "#666" }}>
                  {post.timestamp.toLocaleString()}
                </div>
              </div>
            </div>
            <p style={{ margin: "1rem 0" }}>{post.content}</p>
            <div style={{ display: "flex", gap: "1rem", marginBottom: "1rem" }}>
              <button
                onClick={() => handleLikePost(post.id)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.25rem",
                  backgroundColor: "transparent",
                  border: "none",
                  cursor: "pointer",
                  color: post.likes.includes(currentUser?.id || "")
                    ? "#4CAF50"
                    : "#666",
                }}
              >
                <span>👍</span>
                <span>{post.likes.length}</span>
              </button>
              <button
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.25rem",
                  backgroundColor: "transparent",
                  border: "none",
                  cursor: "pointer",
                  color: "#666",
                }}
              >
                <span>💬</span>
                <span>{post.comments.length}</span>
              </button>
            </div>

            <div
              style={{
                marginTop: "1rem",
                borderTop: "1px solid #eee",
                paddingTop: "1rem",
              }}
            >
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleAddComment(post.id);
                }}
                style={{ display: "flex", gap: "0.5rem", marginBottom: "1rem" }}
              >
                <input
                  type="text"
                  value={newCommentContent}
                  onChange={(e) => setNewCommentContent(e.target.value)}
                  placeholder="Add a comment..."
                  style={{
                    flex: 1,
                    padding: "0.5rem",
                    border: "1px solid #ddd",
                    borderRadius: "4px",
                  }}
                  required
                />
                <button
                  type="submit"
                  style={{
                    padding: "0.5rem 1rem",
                    backgroundColor: "#4CAF50",
                    color: "white",
                    border: "none",
                    borderRadius: "4px",
                    cursor: "pointer",
                  }}
                >
                  Post
                </button>
              </form>

              {post.comments.map((comment) => (
                <div
                  key={comment.id}
                  style={{
                    display: "flex",
                    gap: "0.75rem",
                    marginBottom: "0.75rem",
                    padding: "0.5rem",
                    backgroundColor: "#f9f9f9",
                    borderRadius: "4px",
                  }}
                >
                  <div
                    style={{
                      width: "32px",
                      height: "32px",
                      borderRadius: "50%",
                      backgroundColor: "#f0f0f0",
                      flexShrink: 0,
                    }}
                  ></div>
                  <div>
                    <div style={{ fontWeight: "bold" }}>
                      {getUserById(comment.authorId).name}
                    </div>
                    <div>{comment.content}</div>
                    <div style={{ fontSize: "0.8rem", color: "#666" }}>
                      {comment.timestamp.toLocaleString()}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const EventsView = () => (
    <div style={{ padding: "1rem", flex: 1 }}>
      <form onSubmit={handleCreateEvent} style={{ marginBottom: "1.5rem" }}>
        <h3 style={{ marginBottom: "1rem" }}>Create New Event</h3>
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          <input
            type="text"
            placeholder="Event Title"
            value={newEvent.title}
            onChange={(e) =>
              setNewEvent({ ...newEvent, title: e.target.value })
            }
            style={{
              padding: "0.5rem",
              border: "1px solid #ddd",
              borderRadius: "4px",
            }}
            required
          />
          <textarea
            placeholder="Description"
            value={newEvent.description}
            onChange={(e) =>
              setNewEvent({ ...newEvent, description: e.target.value })
            }
            style={{
              padding: "0.5rem",
              border: "1px solid #ddd",
              borderRadius: "4px",
              minHeight: "80px",
              resize: "vertical",
            }}
          />
          <input
            type="datetime-local"
            value={newEvent.date}
            onChange={(e) => setNewEvent({ ...newEvent, date: e.target.value })}
            style={{
              padding: "0.5rem",
              border: "1px solid #ddd",
              borderRadius: "4px",
            }}
            required
          />
          <button
            type="submit"
            style={{
              padding: "0.5rem 1rem",
              backgroundColor: "#4CAF50",
              color: "white",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
              alignSelf: "flex-start",
            }}
          >
            Create Event
          </button>
        </div>
      </form>

      <h3 style={{ marginBottom: "1rem" }}>Upcoming Events</h3>
      <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
        {selectedCommunity?.events
          .filter((event) => new Date(event.date) > new Date())
          .sort(
            (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
          )
          .map((event) => (
            <div
              key={event.id}
              style={{
                border: "1px solid #ddd",
                borderRadius: "8px",
                padding: "1rem",
              }}
            >
              <h4 style={{ marginBottom: "0.5rem" }}>{event.title}</h4>
              <p style={{ marginBottom: "0.5rem" }}>{event.description}</p>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginBottom: "0.5rem",
                }}
              >
                <span style={{ color: "#666" }}>
                  {event.date.toLocaleString()}
                </span>
                <span style={{ color: "#666" }}>
                  Organized by: {getUserById(event.organizerId).name}
                </span>
              </div>
              <div
                style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}
              >
                <span>👥 {event.attendees.length} attending</span>
              </div>
            </div>
          ))}
      </div>
    </div>
  );

  const MembersView = () => (
    <div style={{ padding: "1rem", flex: 1 }}>
      <h3 style={{ marginBottom: "1rem" }}>Community Members</h3>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
          gap: "1rem",
        }}
      >
        {selectedCommunity?.members.map((memberId) => {
          const member = getUserById(memberId);
          return (
            <div
              key={memberId}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.75rem",
                padding: "0.75rem",
                border: "1px solid #ddd",
                borderRadius: "8px",
              }}
            >
              <div
                style={{
                  width: "40px",
                  height: "40px",
                  borderRadius: "50%",
                  backgroundColor: "#f0f0f0",
                }}
              ></div>
              <div>
                <div style={{ fontWeight: "bold" }}>{member.name}</div>
                <div style={{ fontSize: "0.8rem", color: "#666" }}>Member</div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );

  if (isLoginView) {
    return <LoginForm />;
  }

  return (
    <div style={{ display: "flex", height: "100vh" }}>
      <CommunitySidebar />

      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
        }}
      >
        <CommunityHeader />

        {view === "feed" && <PostFeed />}
        {view === "events" && <EventsView />}
        {view === "members" && <MembersView />}
      </div>
    </div>
  );
}
