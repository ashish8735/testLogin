import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {oauth2_client_id, oauth2_client_secret, webapi} from '../my-constant/my-constants';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private loginRecord = webapi + 'login/?';
  private forgotPass = webapi + 'changePassword/sendPassword/?';
  private emailIsValid = webapi + 'changePassword/checkMail/?';

  header = {
    'Content-Type': 'application/json',
    // 'No-Auth':'true'
  };

  constructor(private http: HttpClient) {
  }

  loginService(username: string, password: string) {
    return this.http.put(this.loginRecord + 'username=' + username + '&password=' + password, {headers: this.header})
      .toPromise()
      .then(response => response)
      .catch(this.handleError);

  }

  userAuthentication(username: string, password: string) {
    let oauth2_token_endpoint = webapi + 'oauth/token';
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded;',
        'Authorization': 'Basic ' + btoa(oauth2_client_id + ':' + oauth2_client_secret),
        'No-Auth': 'true'
      })
    };

    const body = 'id={0}&secret={1}&grant_type=password&username={2}&password={3}'
      .replace('{0}', oauth2_client_id)
      .replace('{1}', oauth2_client_secret)
      .replace('{2}', username)
      .replace('{3}', password);

    // console.log('body',body);
    return this.http.post(oauth2_token_endpoint, body, httpOptions);
  }

  getForgotService(email: any) {
    const httpHeader = {
      headers: new HttpHeaders({
        'No-Auth': 'true'
      })
    };
    return this.http.get(this.forgotPass + 'emailId=' + email,  httpHeader).toPromise()
      .then(response => response)
      .catch(this.handleError);
  }

  emailCheck(email: any) {
    const httpHeader = {
      headers: new HttpHeaders({
        'No-Auth': 'true'
      })
    };
    return this.http.get(this.emailIsValid + 'emailId=' + email,  httpHeader).toPromise()
      .then(response => response)
      .catch(this.handleError);
  }

  private handleError(error: Response | any) {
    return Promise.reject(error.message || error);
  }
}
