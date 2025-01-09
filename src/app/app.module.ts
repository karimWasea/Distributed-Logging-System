import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LogenComponent } from './Component/logen/logen.component';
import { AuthComponent } from './Component/auth/auth.component';
import { FormsModule } from '@angular/forms';
import { LogEntryComponent } from './Component/log-entry/log-entry.component';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { LogslistComponent } from './Component/logslist/logslist.component';

@NgModule({
  declarations: [
    AppComponent,
    LogenComponent,
    AuthComponent,
    LogEntryComponent,
    LogslistComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    CommonModule,

    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
