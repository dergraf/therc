class RemoteLogger
    constructor: (@api_key, @app_id, @secret, @ready) ->
        proto = if document.location.protocol is "file:" then "http:" else document.location.protocol
        @fetch_js("#{ proto }//static.tambur.io/tambur.js", =>
            @fetch_js("#{ proto }//static.tambur.io/tambur_pub.min.js", =>
                if not @conn
                    @conn = new tambur.Connection(@api_key, @app_id)
                    @publisher = new tambur.Publisher(@conn, @secret)

                    nick = "remote_logger"
                    @streams = {}
                    @nr_of_streams = 0
                    for name in ["log", "error", "debug"]
                        @setup_stream(nick, name)
                        @nr_of_streams += 1
            )
        )

    setup_stream: (nickname, stream_name) ->
        stream = @conn.get_stream(stream_name)
        stream.ready = =>
            stream.enable_direct(nickname, @publisher.generate_direct_token(stream_name, nickname))
            stream.onenabled = =>
                window.console[stream_name] = (args...) => @log(stream_name, args)
                @streams[stream_name] = stream
                @nr_of_streams -= 1
                if @nr_of_streams is 0
                    @ready()

    log: (level, args) ->
        try
            @streams[level].direct_msg("remote_console", JSON.stringify([level, args]))
        catch error
            @last_error = error


    fetch_js: (url, success_callback, error_callback) ->
        script = document.createElement("script")
        script.setAttribute("type", "text/javascript")
        script.setAttribute("src", url)
        script.setAttribute("async", true) 
        script.onerror = error_callback
        script.onreadystatechange = script.onload = success_callback
        if script then document.getElementsByTagName("head")[0].appendChild(script)
        script

window["RC"] = (args...) -> new RemoteLogger(args...)
