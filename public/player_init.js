function sdkReadyHandler(accessToken) {
  const token = accessToken;
  
  window.player = new Spotify.Player({
    name: 'Nate-ify',
    getOAuthToken: cb => { cb(token); }
  });

  console.log('just set player');
  console.log('player = ' + player);

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
  });

  // Not Ready
  player.addListener('not_ready', ({ device_id }) => {
    console.log('Device ID has gone offline', device_id);
  });

  // Connect to the player!
  player.connect();
};

var lastState;
var currentTrack;

function render(state) {
  lastState = state;
  currentTrack = state.track_window.current_track;
  trackPositionMs = lastState.position;
  trackDurationMs = currentTrack.duration_ms;
  console.log(state.track_window.current_track);
  document.getElementById('trackName').innerHTML = currentTrack.name;
  document.getElementById('artistName').innerHTML = currentTrack.artists[0].name;
  document.getElementById('current-song-image').src = currentTrack.album.images[0].url;
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

function updateProgressBar() {
  if(currentTrack && !lastState.paused) {
    trackDurationMs = currentTrack.duration_ms;
    trackPercentage = trackPositionMs / trackDurationMs * 100;

    document.getElementById('progressBar').max = trackDurationMs / 1000;
    document.getElementById('progressBar').value = trackPositionMs / 1000;

    document.getElementById('trackPosition').innerHTML = formatMilliseconds(trackPositionMs);
    document.getElementById('trackDuration').innerHTML = formatMilliseconds(trackDurationMs);

    trackPositionMs += 1000;
  }
}

setInterval(updateProgressBar, 1000);