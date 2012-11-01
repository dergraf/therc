RC - Remote Javascript Console / Logger
=======================================

Including the 'rc.js' javascript file and create a new RC instance, this will intercept all calls to the console.(log|error|debug)
and send the log messages to the [Tambur.io](http://tambur.io) streams "log", "error", and "debug" as direct messages. 
For those of you who don't know about Tambur.io, visit [Tambur.io](http://tambur.io) and create an account. (Thanks!)

The file 'console.html' implements a simple remote console that prints out the different log messages as they arrive in the different streams.
The file 'index.html' shows how to instantiate and activate the RC.

You'll notice that both scripts use the Tambur APP Secret directly, which you should NEVER do on a public website. Since RC is built for use in a development environment I don't care.
Read up the Documentation on the different [Tambur.io stream modes](https://github.com/tamburio/tambur.js#modes) if you need to change it to a more secure tool 

This could be a very lightweight, completely incomplete, and simple alternative to the [weinre project](http://people.apache.org/~pmuellr/weinre/docs/1.x/1.5.0/).