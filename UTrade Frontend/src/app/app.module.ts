import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SidebarComponent } from './layout/sidebar/sidebar.component';
import { TopbarComponent } from './layout/topbar/topbar.component';
import { NotificationIconComponent } from './shared/components/notification-icon/notification-icon.component';
import { UserProfileComponent } from './shared/components/user-profile/user-profile.component';
import { HomePageComponent } from './features/home/pages/home-page/home-page.component';
import { MainContentComponent } from './features/home/components/main-content/main-content.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import {MatBadgeModule} from '@angular/material/badge';


@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    TopbarComponent,
    NotificationIconComponent,
    UserProfileComponent,
    HomePageComponent,
    MainContentComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatIconModule,
    MatTableModule,
    MatBadgeModule
  ],
  exports: [
    MatIconModule,
    MatTableModule,
    MatBadgeModule
  ],
  providers: [
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
