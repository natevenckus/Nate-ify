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