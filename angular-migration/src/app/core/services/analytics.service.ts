import { Injectable } from '@angular/core';

declare global {
  interface Window {
    dataLayer?: unknown[];
  }
}

@Injectable({
  providedIn: 'root',
})
export class AnalyticsService {
  trackEvent(eventName: string, eventParams: Record<string, unknown>): void {
    if (typeof window !== 'undefined' && window.dataLayer) {
      window.dataLayer.push({
        event: eventName,
        ...eventParams,
      });
    }
  }

  trackPageView(pagePath: string, pageTitle: string): void {
    this.trackEvent('page_view', {
      page_path: pagePath,
      page_title: pageTitle,
    });
  }

  trackClick(elementId: string, elementText: string): void {
    this.trackEvent('click', {
      element_id: elementId,
      element_text: elementText,
    });
  }
}
