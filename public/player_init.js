function sdkReadyHandler(accessToken) {
  const token = accessToken;
  
  window.player = new Spotify.Player({
    name: 'Web Playback SDK Quick Start Player',
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

function render(state) {
  var currentTrack = state.track_window.current_track;
  console.log(state.track_window.current_track);
  document.getElementById('trackName').innerHTML = currentTrack.name;
  document.getElementById('current-song-image').src = currentTrack.album.images[0].url;
}