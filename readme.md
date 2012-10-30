RC - Remote Javascript Console / Logger
=======================================

include 'rc.js' and create a new RC object
<code>
var rc = new RC(TAMBUR_API_KEY, TAMBUR_APP_ID, TAMBUR_APP_SECRET, ready_callback);
</code>
check the index.html as an example

this will send all console.log/console.error/console.debug messages over Tambur.io WebSockets to a Remote console.
A simple remote console is implemented in 'console.html'

This could be a very lightweight, and simple alternative to the weinre project.

This first version uses the TAMBUR_APP_SECRET directly instead of requesting access tokens from a server. Serverless, but less secure. Never expose the TAMBUR_APP_SECRET to the public.
