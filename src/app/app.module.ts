import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './header/header.component';
import { MenuComponent } from './menu/menu.component';
import { TabsComponent } from './tabs/tabs.component';
import { TagsComponent } from './tags/tags.component';
import { ListComponent } from './list/list.component';
import { ListItemComponent } from './list-item/list-item.component';
import { PodcastComponent } from './podcast/podcast.component';
import { VideoComponent } from './video/video.component';
import { ShareComponent } from './share/share.component';
import { SliderComponent } from './slider/slider.component';
import { RouterModule, Routes } from '@angular/router';
import { DetailHeaderComponent } from './detail-header/detail-header.component';
import { SafePipe } from './safe.pipe';
import { SeoService} from './seo.service';
import { ClipboardModule } from 'ng2-clipboard';

const appRoutes: Routes = [

  { path: 'podcasts/:id', component: PodcastComponent },
  { path: 'videos/:id', component: VideoComponent },
  { path: '', component: HomeComponent },
];

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    MenuComponent,
    TabsComponent,
    TagsComponent,
    ListComponent,
    ListItemComponent,
    PodcastComponent,
    VideoComponent,
    ShareComponent,
    SliderComponent,
    DetailHeaderComponent,
    SafePipe,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    ClipboardModule,
    RouterModule.forRoot(appRoutes)
    // SeoService,
  ],
  providers: [SeoService,],
  bootstrap: [AppComponent]
})
export class AppModule { }
