import { Component } from '@angular/core';
import {AuthConfig, OAuthService} from "angular-oauth2-oidc";
import {HttpClient} from "@angular/common/http";

const authConfig: AuthConfig = {
  issuer: 'http://localhost:8080/auth/realms/MyRealm',
  redirectUri: window.location.origin,
  clientId: 'test-id',
  scope: 'openid profile email',
  responseType: 'code',
  timeoutFactor: 0.75,
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  info: string = 'waiting...';

  constructor(private oauthService: OAuthService, private httpClient: HttpClient) {
    oauthService.configure(authConfig);
    oauthService.loadDiscoveryDocumentAndTryLogin();
    oauthService.setupAutomaticSilentRefresh();
  }

  ngOnInit(): void {
  }

  login() {
    this.oauthService.initLoginFlow();
  }

  logout() {
    this.oauthService.logOut();
  }

  isLoggedIn() {
    return this.oauthService.hasValidAccessToken()
  }

  currentUser() {
    return `${this.oauthService.getIdentityClaims()['name']} (${this.oauthService.getIdentityClaims()['preferred_username']} / ${this.oauthService.getIdentityClaims()['email']})`
  }

  async fetchInfo() {
    this.info = '';
    try {
      this.info = await this.httpClient.get('http://localhost:8081/greeting', {responseType: 'text'}).toPromise();
    } catch (e) {
      this.info = JSON.stringify(e);
    }
  }
}
