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
  document.getElementById('current-song-image').src = currentTrack.album.images[0].url;
}

var trackPositionMs = 0;
var trackDurationMs = 0;

function updateProgressBar() {
  console.log('updating progress bar');
  if(currentTrack && !lastState.paused) {
    trackPositionMs += 2000;
    trackDurationMs = currentTrack.duration_ms;
    trackPercentage = trackPositionMs / trackDurationMs * 100;

    console.log('position: ' + trackPositionMs);
    console.log('duration: ' + trackDurationMs);
    console.log('trackPercentage = ' + trackPercentage);

    document.getElementById('progress-bar')
      .style = 'height:24px; width: ' + trackPercentage + '%';
  }
}

setInterval(updateProgressBar, 2000);