# Web Tracker

## Setup

### Backend

1. Navigate to the `backend` directory.
2. Install dependencies: `npm install`
3. Start the server: `npm run dev`

if you change the tracker.ts file, you will be do these steps

1. npm install -g typescript
2. tsc ( it will compile ts to js in the dist file)

### Frontend

1. Navigate to the `frontend` directory.
2. Install dependencies: `npm install`
3. Compile TypeScript: `npm run start

## Usage

1. Include the following snippet in your HTML pages to load the tracker script:

```html
<script>
    (function () {
        var script = document.createElement('script');
        script.src = 'http://localhost:8888/tracker';
        script.async = true;
        script.onload = function () {
            if (window.tracker) {
                window.tracker.track('pageview');
                window.tracker.track('test', 'one', 'two', 'three');
            }
        };
        document.head.appendChild(script);
    })();
</script>
```
