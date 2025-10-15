// A mock analytics service
export const trackPageView = (pageName: string) => {
    console.log(`[Analytics] Page View: ${pageName}`);
};

export const trackEvent = (eventName: string, eventData: Record<string, any>) => {
    console.log(`[Analytics] Event: ${eventName}`, eventData);
};
