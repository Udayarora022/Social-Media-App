export default function RightSidebar() {
  const trendingTopics = [
    { topic: "React", posts: "125K posts", growth: "+12%" },
    { topic: "JavaScript", posts: "89K posts", growth: "+8%" },
    { topic: "WebDevelopment", posts: "67K posts", growth: "+15%" },
    { topic: "MongoDB", posts: "45K posts", growth: "+5%" },
    { topic: "NodeJS", posts: "78K posts", growth: "+10%" },
  ]

  const suggestedUsers = [
    { name: "John Doe", username: "johndoe", avatar: null, verified: true },
    { name: "Jane Smith", username: "janesmith", avatar: null, verified: false },
    { name: "Mike Johnson", username: "mikej", avatar: null, verified: true },
  ]

  return (
    <div className="fixed right-0 top-0 h-full w-80 p-6 overflow-y-auto bg-gradient-to-b from-slate-50 to-blue-50">
      {/* Search Bar */}
      <div className="mb-6">
        <div className="relative">
          <input
            type="text"
            placeholder="Search SocialApp"
            className="w-full bg-white rounded-2xl py-4 px-6 pl-14 focus:outline-none focus:ring-2 focus:ring-purple-500 shadow-lg border border-purple-100 transition-all duration-300"
          />
          <div className="absolute left-5 top-1/2 transform -translate-y-1/2">
            <svg className="w-5 h-5 text-purple-400" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                clipRule="evenodd"
              />
            </svg>
          </div>
        </div>
      </div>

      {/* Trending */}
      <div className="bg-white rounded-3xl p-6 mb-6 shadow-xl border border-purple-100">
        <h2 className="text-xl font-bold mb-4 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
          🔥 What's trending
        </h2>
        <div className="space-y-4">
          {trendingTopics.map((trend, index) => (
            <div
              key={index}
              className="hover:bg-gradient-to-r hover:from-purple-50 hover:to-pink-50 p-3 rounded-xl cursor-pointer transition-all duration-300 group"
            >
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm text-gray-500">Trending in Technology</p>
                  <p className="font-bold text-gray-900 group-hover:text-purple-600 transition-colors">
                    #{trend.topic}
                  </p>
                  <p className="text-sm text-gray-500">{trend.posts}</p>
                </div>
                <span className="bg-gradient-to-r from-green-400 to-emerald-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                  {trend.growth}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Who to follow */}
      <div className="bg-white rounded-3xl p-6 shadow-xl border border-purple-100">
        <h2 className="text-xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          👥 Who to follow
        </h2>
        <div className="space-y-4">
          {suggestedUsers.map((user, index) => (
            <div key={index} className="flex items-center justify-between group">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full flex items-center justify-center ring-2 ring-purple-200">
                  <span className="text-white font-bold">{user.name.charAt(0)}</span>
                </div>
                <div>
                  <div className="flex items-center space-x-1">
                    <p className="font-bold text-sm text-gray-900">{user.name}</p>
                    {user.verified && (
                      <svg className="w-4 h-4 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                        <path
                          fillRule="evenodd"
                          d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                          clipRule="evenodd"
                        />
                      </svg>
                    )}
                  </div>
                  <p className="text-gray-500 text-sm">@{user.username}</p>
                </div>
              </div>
              <button className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-2 rounded-full text-sm font-bold hover:from-purple-600 hover:to-pink-600 transition-all duration-300 transform hover:scale-105 shadow-lg">
                Follow
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
