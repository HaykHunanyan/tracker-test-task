function isTrackEvent(event: any): event is TrackEvent {
    return (
        typeof event.event === 'string' &&
        Array.isArray(event.tags) &&
        event.tags.every((tag: any) => typeof tag === 'string') &&
        typeof event.url === 'string' &&
        typeof event.title === 'string' &&
        typeof event.ts === 'number'
    );
}

function validateEvents(events: any[]): events is TrackEvent[] {
    return events.every(isTrackEvent);
}

export { validateEvents };
