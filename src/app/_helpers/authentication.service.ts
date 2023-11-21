import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from './user';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
    private currentUserSubject: BehaviorSubject<User>;
    public currentUser: Observable<User>;

    constructor() {
        let user = null;
        this.currentUserSubject = new BehaviorSubject<User>(user);
        this.currentUser = this.currentUserSubject.asObservable();
        this.setCurrentUser();
    }

    public get currentUserValue(): User {
        return this.currentUserSubject.value;
    }

    setCurrentUser() {
        if (localStorage.getItem('currentUser')) {
            let user = new User();
            user.token = JSON.parse(localStorage.getItem('currentUser')).token;
            this.currentUserSubject.next(user);
        };
    }

    logout() {
        // remove user from local storage to log user out
        localStorage.clear();
        sessionStorage.clear();
        this.currentUserSubject.next(null);
    }
}