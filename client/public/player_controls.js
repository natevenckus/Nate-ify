function togglePlay() {
	window.player.togglePlay();
}

function prevTrack() {
	window.player.previousTrack();
}

function nextTrack() {
	window.player.nextTrack();
}

function seek(newPosition) {
	window.player.seek(newPosition * 1000);
}

function toggleLike() {
	saveCurrentTrack();
}

function getPlaylists() {
	window.spotifyApi.getUserPlaylists().then(function(data) {
		return data;
	});
}

function saveCurrentTrack() {
	window.player.getCurrentState().then(state => {
		var id = state.track_window.current_track.id;

		if(id) {
			window.spotifyApi.addToMySavedTracks([id]).then(function(data) {
				updateHeart();
			});
		}
	});
}

function unsaveCurrentTrack() {
	window.player.getCurrentState().then(state => {
		var id = state.track_window.current_track.id;

		if(id) {
			window.spotifyApi.removeFromMySavedTracks([id]).then(function(data) {
				updateHeart();
			});
		}
	});
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

var checked_playlists = [];

function checkPlaylist(playlist) {
	if(playlist.checked) {
		checked_playlists.push(playlist.value);
	} else {
		var index = checked_playlists.indexOf(playlist.value);

		if(index >= 0) {
			checked_playlists.splice(index, 1);
		}
	}

	playBasedOnChecked();
}

function playBasedOnChecked() {
	var playlist_songs = {};
	var processed = 0;
	var total = checked_playlists.length;

	checked_playlists.forEach(playlistID => {
		window.spotifyApi.getPlaylistTracks(playlistID, function(error, data) {
			if(error) {
				alert(error);
				return;
			}

			if(playlist_songs[playlistID] == null) {
				playlist_songs[playlistID] = new Array();
			}

			data.items.forEach(song => {
				playlist_songs[playlistID].push(song.track.uri);
			});

			processed++;

			if(processed == total) {
				var i = 0;
				var intersection;

				for (const [key, value] of Object.entries(playlist_songs)) {
				  if(i == 0) {
				  	intersection = value;
				  } else {
				  	intersection = intersect(intersection, value);
				  }

				  i++;
				}

				playSongs(intersection);
			}
		});
	});

	function intersect(a, b) {
	    var t;
	    if (b.length > a.length) t = b, b = a, a = t; // indexOf to loop over shorter

	    return a.filter(function (e) {
	        return b.indexOf(e) > -1;
	    });
	}
}

function getCategories() {
	window.spotifyApi.getCategories().then(function(data) {
		console.log("Categories:");
		console.log(data);
	});
}