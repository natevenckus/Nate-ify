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

function saveCurrentTrack() {
	window.player.getCurrentState().then(state => {
		var id = state.track_window.current_track.id;

		if(id) {
			window.spotifyApi.addToMySavedTracks([id]).then(function(data) {
				console.log("add: ", data);
			});
		}
	});
}

function unsaveCurrentTrack() {
	window.player.getCurrentState().then(state => {
		var id = state.track_window.current_track.id;

		if(id) {
			window.spotifyApi.removeFromMySavedTracks([id]).then(function(data) {
				console.log("remove: ", data);
			});
		}
	});
}