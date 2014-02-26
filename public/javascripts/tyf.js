Zepto(function($) {
  $.ajax({
    url: 'http://gdata.youtube.com/feeds/api/videos/<%= videoid %>',
    data: {'v':'2', 'alt':'jsonc'},
    dataType: 'json',
    success: function (data) {
      var params = { 'allowScriptAccess': 'always', 'wmode': 'transparent' };
      var atts = { id: "myytplayer" };
      var playerwidth = '640';
      if (data.data && data.data !== 'undefined' && data.data.aspectRatio === 'widescreen') {
        playerwidth = '853';
      }
      var playerheight = '480';
      swfobject.embedSWF("http://www.youtube.com/apiplayer?enablejsapi=1&playerapiid=ytplayer&version=3", "ytapiplayer", playerwidth, playerheight, "10", null, null, params, atts);

      var slider = document.getElementById('slider');
      slider.setAttribute('max', data.data.duration);
    }
  });
});


var ytplayer;
var playercontainer = document.getElementById('playercontainer');

function onYouTubePlayerReady() {
  ytplayer = document.getElementById('myytplayer');
  ytplayer.cueVideoById({'videoId': '<%= videoid %>', 'startSeconds': 0});
  console.log(ytplayer);

  var playlink = document.getElementById('play');
  playlink.onclick = function (ev) {
    ytplayer.playVideo();
    return false;
  }

  var pauselink = document.getElementById('pause');
  pauselink.onclick = function (ev) {
    ytplayer.pauseVideo();
    return false;
  }

  var altlink = document.getElementById('alt');
  altlink.onclick = function (ev) {
    ytplayer.loadVideoById({'videoId': 'y3OzHBEcymw', 'startSeconds': 74});
    return false;
  }

  ytplayer.onmousedown = function (ev) {
    var tagoffset = getTagOffset(ytplayer, ev);
    ytplayer.pauseVideo();
    createTag(playercontainer, tagoffset);
  }

  var slider = document.getElementById('slider');
  slider.onchange = function (ev) {
     console.log(this.value);
     ytplayer.seekTo(this.value);
  }

}

function getOffset(el) {
  var _x = 0;
  var _y = 0;
  while( el && !isNaN( el.offsetLeft ) && !isNaN( el.offsetTop )) {
    _x += el.offsetLeft - el.scrollLeft;
    _y += el.offsetTop - el.scrollTop;
    el = el.offsetParent;
  }
  return { top: _y, left: _x };
}

function getTagOffset(el, ev) {
  var xoff = ev.x - getOffset(el).left;
  var yoff = ev.y - getOffset(el).top;
  return { left: xoff, top: yoff};
}

function createTag(playercontainer, tagoffset) {
  var tag = document.createElement('div');
  tag.setAttribute('class', 'tag');
  tag.setAttribute('style', 'left: ' + tagoffset.left + 'px; top: ' + tagoffset.top + 'px');
  tag.innerHTML = 'Nic Johnson';
  playercontainer.appendChild(tag);
}