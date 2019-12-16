# Nate-ify (WIP)
A music player that replaces the traditional playlist system with a "tagging" system. Currently implemented as a wrapper for Spotify.

# What's the Advantage?
The advantages are many. Once the playlist framework used by Spotify (and all other major music players) is replaced by this tagging system, 
the power of the user will increase significantly. Primarily, this is because the user will now be able to dynamically generate "playlists"
based on the tags linked to each song. For example, a user may have tags (many of which will be auto-generated or suggested) for various
emotions, decades, genres, languages, memories, and so much more. And so, if a user wants to listen to "sad/alternative music," or 
"upbeat/1990s/rock," or "Spanish/party music," this can be done with a couple of clicks. Using Spotify's current playlist framework, the
only want to accomplish this would be to build a separate playlist for each one of these combinations, which is horribly inefficient and
the antithesis of user-friendly. One of the best parts? This application will be fully integrated with Spotify, so all of your current
saved songs and playlists will be immediately present in the app!

# Technologies Used
* Node.js for backend
* Currently vanilla JavaScript for frontend. I intend to replace this with either Vue or Angular, along with Bootstrap.
* DBMS is TBD. I haven't yet reached the point of a need for persistent mass storage.

# Timeline
I'm currently in a proof-of-concept stage. I've integrated with many parts of the Spotify web and user APIs, but I imagine it will take another
month or two until I have the core functionality of the app working, mostly due to busy-ness in the rest of my life.

# Goals
I love listening to music, and I use Spotify almost every day. So first and foremost, I want to build an app that I enjoy using and
receive a lot of personal utility from. Then, if it seems marketable, I'll try to make it accessible to all, likely for free since I'm
using Spotify for all music streaming in the backend.

# Limitations
Unfortunately, Spotify currently only offers a streaming API from a web browser. This is fine for users listening from a laptop, but
most listeners use their smartphones. Ideally in the future they'll expose a similar API for app developoment. But until then, I'll
simply work on getting the proof-of-concept complete for a web application!
