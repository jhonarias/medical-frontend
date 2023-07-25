import { HttpClient, HttpParams } from "@angular/common/http";
import { Observable } from 'rxjs';
import { httpOptions } from 'src/app/shared/helpers/http-options';
import { Command, Query } from "../api-models";

export class HttpClientService {
    constructor(
        protected httpClient: HttpClient
      ) {}

      /**
   * Method which sends a POST request to the server
   */
  protected post<T extends Command, U>(
    url: string,
    endpoint: string,
    command?: T
  ): Observable<U> {
    return this.httpClient.post<U>(`${url}/${endpoint}`, command, httpOptions);
  }

  /**
   * Method which sends a PATCH request to the server
   */
  protected patch<T extends Command, U>(
    url: string,
    endpoint: string,
    command?: T
  ): Observable<U> {
    return this.httpClient.patch<U>(`${url}/${endpoint}`, command, httpOptions);
  }

  /**
   * Method which sends a PUT request to the server
   */
  protected put<T extends Command, U>(
    url: string,
    endpoint: string,
    command?: T
  ): Observable<U> {
    return this.httpClient.put<U>(`${url}/${endpoint}`, command, httpOptions);
  }

  /**
   * Method which sends a GET request to the server
   */
  protected get<T extends Query, U>(
    url: string,
    endpoint: string,
    query?: T
  ): Observable<U> {
    const options = {
      headers: httpOptions.headers,
      params: new HttpParams(),
    };

    if (query) {
      Object.keys(query).forEach((key) => {
        // @ts-ignore
        options.params = options.params.append(key, query[key]);
      });
    }

    return this.httpClient.get<U>(`${url}/${endpoint}`, options);
  }

  /**
   * Method which sends a DELETE request to the server
   */
  protected delete<T extends Command, U>(
    url: string,
    endpoint: string,
    command?: T
  ): Observable<U> {
    const options = {
      headers: httpOptions.headers,
      body: command,
    };

    return this.httpClient.delete<U>(`${url}/${endpoint}`, options);
  }
}