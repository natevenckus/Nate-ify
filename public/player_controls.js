function togglePlay() {
	console.log("window: " + window);
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