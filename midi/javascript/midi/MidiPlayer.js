/**
 * MidiPlayer class. Used to play midi by javascript, without any plugin.
 * Requires a HTML5 browser: firefox, chrome, safari, opera, IE10+.
 *
 * The other 5 js files are from [2], which is a demo of [1]: 
 * [1] http://matt.west.co.tt/music/jasmid-midi-synthesis-with-javascript-and-html5-audio/
 * [2] http://jsspeccy.zxdemo.org/jasmid/
 *
 * Modification is done to audio.js:
 * - added function fireEventEnded().
 * - added 'ended' event firing when generator.finished is true.
 * - move 'context' outside function AudioPlayer, so in chrome it won't have this error
 *   when you loop the play:
 *   Failed to construct 'AudioContext': number of hardware contexts reached maximum (6)
 *
 * @by: X. Chen
 * @Create on: 4/1/2015
 * @Last modified: 4/2/2015
 */

if (typeof (MidiPlayer) == 'undefined') {

    /**
     * Constructor of MidiPlayer class.
     * @param midi Midi file to play.
     * @param target Target html element that this midiplayer is attached to.
     * @param loop Whether loop the play. optional, default is false.
     * @param debug_div If not empty, write debug message to this div.
     */
    var MidiPlayer = function(midi, target, loop, debug_div_id) {
        this.midi = midi;
        this.target = document.getElementById(target);
        this.loop = (typeof (loop) == 'undefined') ? false : loop;
        this.debug_div = (typeof (debug_div_id) == 'undefined') ?
                         null : document.getElementById(debug_div_id);
        this.midiFile = '';
        this.synth = '';
        this.replayer = '';
        this.audio = null;
        this.ct = 0; // loop counter.
        this.max_loop_ct = 0; // max number of loops. if <= 0, means infinite.
        this.started = false; // state of play started/stopped.
        this.listener_added = false;
    }

    MidiPlayer.prototype.debug = function(msg) {
        if (this.debug_div) {
            this.debug_div.innerHTML += msg + '<br/>';
        }
    }

    MidiPlayer.prototype.setMaxLoop = function(v) {
        if (! this.loop) return;
        this.max_loop_ct = v;
    }

    MidiPlayer.prototype.stop = function() {
        this.ct = 0;
        this.started = false;
        this.target.value = 'play';
        if (this.audio) { this.audio.stop(); }
    }

    MidiPlayer.prototype.play = function() {
        if (this.started) {
            this.stop();
            return;
        }

        this.started = true;
        var o = this.target;
        o.value = 'stop';

        var _this = this; // must be 'var', otherwise _this is public, and causes problem.
        var file = this.midi;
        var loop = this.loop;

        if (loop) {
            if (window.addEventListener) {
                // Second time calling play() should not add another listener, otherwise o has
                // more and more listeners, and will fire n events the n-th time calling play.
                if (! this.listener_added) {
                    this.listener_added = true;
                    o.addEventListener('ended', function() { // addEventListener not work for IE8.
                        //_this.debug('4: ct = ' + _this.ct);
                        //alert('ended');
                        _this.ct += 1;
                        if (_this.max_loop_ct <= 0 || _this.ct < _this.max_loop_ct) {
                            _this.replayer = Replayer(_this.midiFile, _this.synth);
                            _this.audio = AudioPlayer(_this.replayer, o, loop);
                            _this.debug( file + ': loop ' + (1 +_this.ct) );
                        }
                    }, false);
                 }
             } else if (window.attachEvent) { // IE don't work anyway.
                 //document.getElementById('music').attachEvent(
                 //    'onclick', function(e) { alert('IE end'); }, true);
             }
         } // end of: if (loop)

         // Not how "this" is passed into the closure!
         loadRemote(file, function(data) {
             if (_this.ct == 0) {
                 _this.midiFile = MidiFile(data);
                 _this.synth = Synth(44100);
             }
             _this.replayer = Replayer(_this.midiFile, _this.synth);
             _this.audio = AudioPlayer(_this.replayer, o, loop);
             _this.debug( file + ': loop ' + (1 + _this.ct) );
             //alert(_this.audio.type); // webkit for firefox, chrome; flash for opera/safari.
        });
    }


    // A private function, defined by 'var'.
    //function loadRemote(path, callback) {
    var loadRemote = function(path, callback) {
        var fetch = new XMLHttpRequest();
        fetch.open('GET', path);
        if (fetch.overrideMimeType) fetch.overrideMimeType("text/plain; charset=x-user-defined"); // not work for IE.
        else fetch.setRequestHeader('Accept-Charset', 'x-user-defined');
        fetch.onreadystatechange = function() {
            if(this.readyState == 4 && this.status == 200) {
                // munge response into a binary string
                var t;
                var t = this.responseText || "" ;
                var ff = [];
                var mx = t.length;
                var scc= String.fromCharCode;
                for (var z = 0; z < mx; z++) {
                    ff[z] = scc(t.charCodeAt(z) & 255);
                }
                callback(ff.join(""));
            }
        }
        fetch.send();
    }

}
