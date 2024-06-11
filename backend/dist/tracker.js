"use strict";
// Immediately Invoked Function Expression (IIFE) to avoid polluting the global scope
;
(function () {
    let buffer = [];
    let sending = false;
    // Replace with your actual backend URL or use an environment variable replacement plugin during build
    const url = 'http://localhost:8888'; // or use a global variable like window.API_ROOT
    function sendEvents() {
        if (sending || buffer.length === 0)
            return;
        sending = true;
        const eventsToSend = buffer.slice();
        buffer = [];
        console.log('EventsToSend:', eventsToSend);
        fetch(url + '/track', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(eventsToSend)
        })
            .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            sending = false;
            sendEvents(); // Send any new events that arrived during the send
        })
            .catch(error => {
            console.error('Failed to send events:', error);
            buffer = eventsToSend.concat(buffer); // Re-add failed events to buffer
            sending = false;
        });
    }
    ;
    window.tracker = {
        track: function (event, ...tags) {
            buffer.push({
                event,
                tags,
                url: window.location.href,
                title: document.title,
                ts: Math.floor(Date.now() / 1000)
            });
            if (buffer.length >= 3 || !sending) {
                sendEvents();
            }
        }
    };
    window.addEventListener('beforeunload', sendEvents);
})();
