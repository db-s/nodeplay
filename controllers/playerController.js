// Player Controller

var fs = require('fs');
var lame = require('lame');
var Speaker = require('speaker');
var url = require('url');
var files = require('../lib/files');

var stream = null;
var STATE = { play: 0, pause: 1, stop: 2 };
var playState = STATE.stop;

exports.index = function(req, res) {
	var musicDir = 'YOUR_MUSIC_DIR';
	return {
		files: files.getFilesRecursive(musicDir)
	}
}

exports.play = function(req, res) {
	var qs = url.parse(req.url, true).query;

	if (playState === STATE.play) this.stop();
	if (playState === STATE.pause) this.resume();
	
	playState = STATE.play;

	stream = fs.createReadStream(qs.path).pipe(new lame.Decoder);
	// stream.on('format', console.log);
	stream.pipe(new Speaker);
	stream.on('end', function() { console.log("END") });
	stream.on('finish', function() { console.log("FINISHED") });	

	return {
		response: 'ok',
		playstatus: playState
	}
};

exports.pause = function() {
	if (playState === STATE.play) {
		stream.unpipe();
		playState = STATE.pause;

		return {
			response: 'ok',
			playstatus: playState
		}
	}
}

exports.resume = function() {
	if (playState === STATE.pause) {
		stream.pipe(new Speaker());
		playState = STATE.play;

		return {
			response: 'ok',
			playstatus: playState
		}
	}
}

exports.stop = function() {
	if (playState !== STATE.stop) {
		stream.unpipe();
		stream.end();
		stream = null;
		playState = STATE.stop;

		return {
			response: 'ok',
			playstatus: playState
		}
	}
}