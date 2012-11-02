// Generated by CoffeeScript 1.3.3
(function() {
  var RemoteLogger,
    __slice = [].slice;

  RemoteLogger = (function() {

    function RemoteLogger(api_key, app_id, secret, ready) {
      var proto,
        _this = this;
      this.api_key = api_key;
      this.app_id = app_id;
      this.secret = secret;
      this.ready = ready;
      proto = document.location.protocol === "file:" ? "http:" : document.location.protocol;
      this.fetch_js("" + proto + "//static.tambur.io/tambur.min.js", function() {
        return _this.fetch_js("" + proto + "//static.tambur.io/tambur_pub.min.js", function() {
          var name, nick, _i, _len, _ref, _results;
          if (!_this.conn) {
            _this.conn = new tambur.Connection(_this.api_key, _this.app_id);
            _this.publisher = new tambur.Publisher(_this.conn, _this.secret);
            nick = "remote_logger";
            _this.streams = {};
            _this.nr_of_streams = 0;
            _ref = ["log", "error", "debug"];
            _results = [];
            for (_i = 0, _len = _ref.length; _i < _len; _i++) {
              name = _ref[_i];
              _this.setup_stream(nick, name);
              _results.push(_this.nr_of_streams += 1);
            }
            return _results;
          }
        });
      });
    }

    RemoteLogger.prototype.setup_stream = function(nickname, stream_name) {
      var stream,
        _this = this;
      stream = this.conn.get_stream(stream_name);
      return stream.ready = function() {
        stream.enable_direct(nickname, _this.publisher.generate_direct_token(stream_name, nickname));
        return stream.onenabled = function() {
          window.console[stream_name] = function() {
            var args;
            args = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
            return _this.log(stream_name, args);
          };
          _this.streams[stream_name] = stream;
          _this.nr_of_streams -= 1;
          if (_this.nr_of_streams === 0) {
            return _this.ready();
          }
        };
      };
    };

    RemoteLogger.prototype.log = function(level, args) {
      try {
        return this.streams[level].direct_msg("remote_console", JSON.stringify([level, args]));
      } catch (error) {
        return this.last_error = error;
      }
    };

    RemoteLogger.prototype.fetch_js = function(url, success_callback, error_callback) {
      var script;
      script = document.createElement("script");
      script.setAttribute("type", "text/javascript");
      script.setAttribute("src", url);
      script.setAttribute("async", true);
      script.onerror = error_callback;
      script.onreadystatechange = script.onload = success_callback;
      if (script) {
        document.getElementsByTagName("head")[0].appendChild(script);
      }
      return script;
    };

    return RemoteLogger;

  })();

  window["RC"] = function() {
    var args;
    args = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
    return (function(func, args, ctor) {
      ctor.prototype = func.prototype;
      var child = new ctor, result = func.apply(child, args), t = typeof result;
      return t == "object" || t == "function" ? result || child : child;
    })(RemoteLogger, args, function(){});
  };

}).call(this);
