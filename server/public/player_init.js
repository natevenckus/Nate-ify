function sdkReadyHandler(accessToken) {
  const token = accessToken;
  
  window.player = new Spotify.Player({
    name: 'Nate-ify',
    getOAuthToken: cb => { cb(token); }
  });

  // Error handling
  player.addListener('initialization_error', ({ message }) => { console.error(message); });
  player.addListener('authentication_error', ({ message }) => { console.error(message); });
  player.addListener('account_error', ({ message }) => { console.error(message); });
  player.addListener('playback_error', ({ message }) => { console.error(message); });

  // Playback status updates
  player.addListener('player_state_changed', state => {render(state)});

  // Ready
  player.addListener('ready', ({ device_id }) => {
    console.log('Ready with Device ID', device_id);
    transferToThisDevice(device_id);
  });

  // Not Ready
  player.addListener('not_ready', ({ device_id }) => {
    console.log('Device ID has gone offline', device_id);
  });

  // Connect to the player!
  player.connect();

  //renderPlaylists();
  getAllTracks();
};

var lastState;
var currentTrack;

function render(state) {
  lastState = state;
  currentTrack = state.track_window.current_track;
  trackPositionMs = lastState.position;
  trackDurationMs = currentTrack.duration_ms;

  document.getElementById('trackName').innerHTML = currentTrack.name;
  document.getElementById('artistName').innerHTML = currentTrack.artists[0].name;
  document.getElementById('current-song-image').src = currentTrack.album.images[0].url;

  //updateTagSuggestions(state);
  updateHeart();
}

function updateHeart() {
  var saveIcon = document.getElementById('save-icon');

  window.spotifyApi.containsMySavedTracks([currentTrack.id]).then(function(data) {
    if(data['0']) {
      saveIcon.src = "black_heart_512.png";
      saveIcon.onclick = unsaveCurrentTrack;
      saveIcon.title = "Unsave this song";
    } else {
      saveIcon.src = "white_heart_512.png";
      saveIcon.onclick = saveCurrentTrack;
      saveIcon.title = "Save this song";
    }
  });
}

var trackPositionMs = 0;
var trackDurationMs = 0;

function formatMilliseconds(ms) {
  var date = new Date(ms);
  var mins = date.getMinutes();
  var secs = date.getSeconds();

  var secsStr = secs < 10 ? "0" + secs : secs;

  return mins + ":" + secsStr;
}

var tracks = [];

function getAllTracks() {
  tracks = [];
  getMyTracksRecursive(50, 0);
}

function getMyTracksRecursive(limit, offset) {
  window.spotifyApi.getMySavedTracks({limit: limit, offset: offset}).then(function(data) {
    tracks.push(...data.items);

    if(data.total > limit + offset) {
      getMyTracksRecursive(limit, offset + limit);  
    } else {
      alert("done");
    }
  });
}

function playSongsByDate() {
  var start = new Date(document.getElementById("startDate").value);
  var end = new Date(document.getElementById("endDate").value);
  alert(start);
  alert(end);
  var dateFiltered = filterTracksByDate(tracks, start, end);
  var uris = dateFiltered.map(track => track.track.uri);
  playSongs(uris);
}

function playSongs(songIDs) {
	window.spotifyApi.play(
		{
			"uris": songIDs
		}, 
		function(error, data) {
			if(error) {
				console.log(error);
			}
		}
	);
}

function filterTracksByDate(tracks, start, end) {
  return tracks.filter(track => {
    var releaseDate = new Date(track.track.album.release_date);
    
    if(releaseDate >= start && releaseDate <= end) {
      //console.log(track);
      return true;
    }

    return false;
  });
}

function updateProgressBar() {
  if(currentTrack && !lastState.paused) {
    trackPositionMs += 1000;
    trackDurationMs = currentTrack.duration_ms;
    trackPercentage = trackPositionMs / trackDurationMs * 100;

    document.getElementById('progressBar').max = trackDurationMs / 1000;
    document.getElementById('progressBar').value = trackPositionMs / 1000;

    document.getElementById('trackPosition').innerHTML = formatMilliseconds(trackPositionMs);
    document.getElementById('trackDuration').innerHTML = formatMilliseconds(trackDurationMs);
  }
}

function renderPlaylists() {
    renderPlaylistsRecurse(50, 0);
}

var playlists = [];

function renderPlaylistsRecurse(limit, offset) {
  window.spotifyApi.getUserPlaylists({limit: limit, offset: offset}).then(function(data) {
    data.items.forEach(item => {
      playlists.push(item);
    });

    if(data.total > limit + offset) {
      renderPlaylistsRecurse(limit, offset + limit);
    } else {
      var playlistDiv = document.getElementById("playlists");

      playlistDiv.style.listStyleType = "decimal";

      playlists.forEach(playlist => {
        if(playlist.tracks.total > 100) {
         playlistDiv.innerHTML += "<li>";
         playlistDiv.innerHTML += playlist.name;
         playlistDiv.innerHTML += "<input type='checkbox' value='" + playlist.id + "' onchange='checkPlaylist(this)'>";
         playlistDiv.innerHTML += "</li>";
       }
      });
    }
  });
}


function transferToThisDevice(deviceID) {
  window.spotifyApi.transferMyPlayback([deviceID]).then(function(error, data) {
    if(error) {
      alert(error);
    }
  });
}

//TODO: put this in its own Vue component, definitely.
function updateTagSuggestions(state) {
  var artistID = state.track_window.current_track.artists[0].uri.split(":")[2]
  var albumID = state.track_window.current_track.album.uri.split(":")[2]
  var trackID = state.track_window.current_track.id

  if(!artistID) 
    return null

  window.spotifyApi.getAlbum(albumID).then(function(data) {
    console.log("album:");
    console.log(data)
  })

  window.spotifyApi.getTrack(trackID).then(function(data) {
    console.log("track:");
    console.log(data)
  })

  window.spotifyApi.getArtist(artistID).then(function(data) {
    var tagSuggestions = document.getElementById("tagSuggestions")

    console.log(data.genres)

    tagSuggestions.innerHTML = ""

    data.genres.forEach(genre => {
      tagSuggestions.innerHTML += genre + "<br>"
    })
  })
}

setInterval(updateProgressBar, 1000);