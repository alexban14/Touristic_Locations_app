import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EventSend, EventWrapper, OneEventWrapper } from 'src/app/eventsPage/event.model';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class EventsService {
    private allEventsEndpoint = '/events/get';
    private createEventEndpoint = '/events/create';
    private editEventEndpoint = '/events/edit';
    private deleteEventEndpoint = '/events/delete';

    constructor(private http: HttpClient) {}

    getAllEvents(page?: number, eventsLimit?: number) {
        let params;
        if (eventsLimit && page) {
            params = {
                params: new HttpParams().append('eventsLimit', eventsLimit).append('page', page)
            };
        }

        if (params) {
            return this.http.get<EventWrapper>(environment.baseURL + this.allEventsEndpoint, params);
        } else {
            return this.http.get<EventWrapper>(environment.baseURL + this.allEventsEndpoint);
        }
    }

    eventsByStartDate(startDate: number, page?: number, eventsLimit?: number) {
        let params;
        if (eventsLimit && page) {
            params = {
                params: new HttpParams().append('eventsLimit', eventsLimit).append('page', page).append('startDate', startDate)
            };
        }

        if (params) {
            return this.http.get<EventWrapper>(environment.baseURL + this.allEventsEndpoint + '/fromStartDate', params);
        } else {
            return this.http.get<EventWrapper>(environment.baseURL + this.allEventsEndpoint + '/fromStartDate', {
                params: {
                    startDate: startDate
                }
            });
        }
    }

    eventsByStartEnd(startDate: number, endDate: number, page?: number, eventsLimit?: number) {
        let params;
        if (eventsLimit && page) {
            params = {
                params: new HttpParams().append('eventsLimit', eventsLimit).append('page', page).append('startDate', startDate).append('endDate', endDate)
            };
        }

        if (params) {
            return this.http.get<EventWrapper>(environment.baseURL + this.allEventsEndpoint + '/fromStartEnd', params);
        } else {
            return this.http.get<EventWrapper>(environment.baseURL + this.allEventsEndpoint + '/fromStartEnd', {
                params: {
                    startDate: startDate,
                    endDate: endDate
                }
            });
        }
    }

    eventsByCategory(category: string, page?: number, eventsLimit?: number) {
        let params;
        if (eventsLimit && page) {
            params = {
                params: new HttpParams().append('eventsLimit', eventsLimit).append('page', page).append('category', category)
            };
        }

        if (params) {
            return this.http.get<EventWrapper>(environment.baseURL + this.allEventsEndpoint + '/byCategory', params);
        } else {
            return this.http.get<EventWrapper>(environment.baseURL + this.allEventsEndpoint + '/byCategory', {
                params: {
                    category: category
                }
            });
        }
    }

    getOneEvent(id: string) {
        return this.http.get<OneEventWrapper>(environment.baseURL + this.allEventsEndpoint + `/${id}`);
    }

    createEvent(event: EventSend) {
        return this.http.post<OneEventWrapper>(environment.baseURL + this.createEventEndpoint, event, {
            observe: 'body',
            withCredentials: true,
            headers: new HttpHeaders().append('Content-Type', 'application/json')
        });
    }

    editEvent(editedEvent: EventSend, id: string) {
        return this.http.put<OneEventWrapper>(environment.baseURL + this.editEventEndpoint + `/${id}`, editedEvent, {
            observe: 'body',
            withCredentials: true,
            headers: new HttpHeaders().append('Content-Type', 'application/json')
        });
    }

    deleteEvent(id: string) {
        return this.http.delete<{ message: string }>(environment.baseURL + this.deleteEventEndpoint + `/${id}`, {
            observe: 'body',
            withCredentials: true,
            headers: new HttpHeaders().append('Content-Type', 'application/json')
        });
    }
}
