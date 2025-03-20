import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, delay, retryWhen, tap, timeout } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  private retryAttempt = 3; // Number of retry attempts
  private _path!: string;
  private _base: string = 'http://localhost:3000/';
  constructor(private http: HttpClient) {}

  public get<T>(
    id: string | number,
    query?: { [key: string]: any },
    url?: string,
    timeOut?: number
  ): Promise<T> {
    let attempt = 0;

    // Build the full URL
    const fullUrl = this.buildUrl(id, url);
    console.log(fullUrl);
    // Build query parameters
    const params = this.buildQueryParams(query);

    // Create the HTTP GET request with retry logic
    let request: Observable<T> = this.http
      .get<T>(fullUrl, { params })
      .pipe(
        retryWhen((errors) =>
          errors.pipe(
            tap((error) => {
              if (error.status > 0 && error.status < 500 && attempt < this.retryAttempt) {
                attempt += 1;
              } else {
                throw error; // Stop retrying
              }
            }),
            delay(2000) // Delay between retries
          )
        ),
        catchError((error) => {
          this.handleError(error, fullUrl);
          return throwError(error);
        })
      );

    // Add timeout if specified
    if (timeOut) {
      request = request.pipe(timeout(timeOut));
    }

    return new Promise((resolve, reject) => {
      request.subscribe(
        (response) => {
          resolve(response);
        },
        (error) => {
          reject(error);
        }
      );
    });
  }

  public create<T>(
    obj: T,
    query?: { [key: string]: any },
    url?: string,
    timeOut?: number
  ): Promise<T> {
    let attempt = 0;

    // Build the full URL
    const fullUrl = this.buildUrl(undefined, url);

    // Build query parameters
    const params = this.buildQueryParams(query);

    // Create the HTTP POST request with retry logic
    let request: Observable<T> = this.http
      .post<T>(fullUrl, obj, { params })
      .pipe(
        retryWhen((errors) =>
          errors.pipe(
            tap((error) => {
              if (
                (error.status > 0 && error.status < 500 && attempt < this.retryAttempt) ||
                url?.includes('order') ||
                url?.includes('item')
              ) {
                attempt += 1;
              } else {
                throw error; // Stop retrying
              }
            }),
            delay(2000) // Delay between retries
          )
        ),
        catchError((error) => {
          this.handleError(error, fullUrl, obj);
          return throwError(error);
        })
      );

    // Show spinner (if URL is not related to 'order' or 'item')
    if (!url?.includes('order') && !url?.includes('item')) {
    }

    // Add timeout if specified
    if (timeOut) {
      request = request.pipe(timeout(timeOut));
    }

    // Convert the observable to a promise
    return new Promise((resolve, reject) => {
      request.subscribe(
        (response) => {
          resolve(response);
        },
        (error) => {
          reject(error);
        }
      );
    });
  }

  public update<T>(
    id: string | number,
    obj: T,
    query?: { [key: string]: any },
    url?: string,
    timeOut?: number
  ): Promise<T> {
    let attempt = 0;

    // Build the full URL
    const fullUrl = this.buildUrl(id, url);

    // Build query parameters
    const params = this.buildQueryParams(query);

    // Create the HTTP PATCH request with retry logic
    let request: Observable<T> = this.http
      .patch<T>(fullUrl, obj, { params })
      .pipe(
        retryWhen((errors) =>
          errors.pipe(
            tap((error) => {
              if (
                (error.status > 0 && error.status < 500 && attempt < this.retryAttempt) ||
                url?.includes('order') ||
                url?.includes('item')
              ) {
                attempt += 1;
              } else {
                throw error; // Stop retrying
              }
            }),
            delay(2000) // Delay between retries
          )
        ),
        catchError((error) => {
          this.handleError(error, fullUrl, obj);
          return throwError(error);
        })
      );

    // Show spinner (if URL is not related to 'order' or 'item')
    if (!url?.includes('order') && !url?.includes('item')) {
    }

    // Add timeout if specified
    if (timeOut) {
      request = request.pipe(timeout(timeOut));
    }

    // Convert the observable to a promise
    return new Promise((resolve, reject) => {
      request.subscribe(
        (response) => {
          resolve(response);
        },
        (error) => {
          reject(error);
        }
      );
    });
  }

  public query<T>(
    query?: { [key: string]: any },
    url?: string,
    timeOut?: number
  ): Promise<T> {
    let attempt = 0;

    // Build the full URL
    const fullUrl = this.buildUrl(undefined, url);

    // Build query parameters
    const params = this.buildQueryParams(query);

    // Create the HTTP GET request with retry logic
    let request: Observable<T> = this.http
      .get<T>(fullUrl, { params })
      .pipe(
        retryWhen((errors) =>
          errors.pipe(
            tap((error) => {
              if (
                (error.status > 0 && error.status < 500 && attempt < this.retryAttempt) ||
                error.status === 429 // Too Many Requests
              ) {
                attempt += 1;
              } else {
                throw error; // Stop retrying
              }
            }),
            delay(2000) // Delay between retries
          )
        ),
        catchError((error) => {
          this.handleError(error, fullUrl);
          return throwError(error);
        })
      );

    // Add timeout if specified
    if (timeOut) {
      request = request.pipe(timeout(timeOut));
    }

    // Convert the observable to a promise
    return new Promise((resolve, reject) => {
      request.subscribe(
        (response) => {
          // Save data to IndexedDB (if applicable)
          resolve(response);
        },
        (error) => {
          this.handleError(error, fullUrl);
          reject(error);
        }
      );
    });
  }

  protected buildUrl(id?: string | number, newUrl?: string, report?: boolean): string {
    let url: string = newUrl ? newUrl : this._path;
    if (id) {
      url += `/${id}`;
    }
    url = `${this._base}${url}`;
    return url;
  }

  private buildQueryParams(query?: { [key: string]: any }): HttpParams {
    let params = new HttpParams();
    if (query) {
      Object.keys(query).forEach((key) => {
        params = params.set(key, query[key]);
      });
    }
    return params;
  }

  private handleError(error: any, url: string, obj?: any): void {
    console.error(`API Error at ${url}:`, error);
    console.error('Request Body:', obj);
    // Add additional error handling logic here (e.g., show a toast message)
  }
}
