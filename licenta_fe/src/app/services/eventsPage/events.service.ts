import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Event, EventSend, EventWrapper, OneEventWrapper } from 'src/app/eventsPage/event.model';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class EventsService {
    private allEventsEndpoint = '/events/get';
    private createEventEndpoint = '/events/create';
    private editEventEndpoint = '/events/edit';
    private deleteEventEndpoint = '/event/delete';

    constructor(private http: HttpClient) {}

    getAllEvents() {
        return this.http.get<EventWrapper>(environment.baseURL + this.allEventsEndpoint);
    }

    eventsByStartDate(startDate: number) {
        return this.http.get<EventWrapper>(environment.baseURL + '/fromStartDate', {
            params: {
                startDate: startDate
            }
        });
    }

    eventsByStartEnd(startDate: number, endDate: number) {
        return this.http.get<EventWrapper>(environment.baseURL + '/fromStartEnd', {
            params: {
                startDate: startDate,
                endDate: endDate
            }
        });
    }

    eventsByCategory(category: string) {
        return this.http.get<EventWrapper>(environment.baseURL + 'byCategory', {
            params: {
                category: category
            }
        });
    }

    getOneEvent(id: string) {
        return this.http.get<OneEventWrapper>(environment.baseURL + this.allEventsEndpoint + `/${id}`);
    }

    createEvent(event: any) {
        return this.http.post<OneEventWrapper>(environment.baseURL + this.createEventEndpoint, event, {
            observe: 'body',
            withCredentials: true,
            headers: new HttpHeaders().append('Content-Type', 'application/json')
        });
    }

    editEvent(editedEvent: any) {
        return this.http.put<OneEventWrapper>(environment.baseURL + this.editEventEndpoint, editedEvent, {
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
