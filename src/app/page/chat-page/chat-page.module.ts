import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ChatPageComponent} from './chat-page.component';
import {RouterModule, Routes} from '@angular/router';
import {ChatComponent} from './chat/chat.component';
import {ChatWriterComponent} from './chat/chat-writer/chat-writer.component';
import {SharedComponentsModule} from '../../shared/component/shared-components.module';
import {AddNewContactComponent} from './chat/add-new-contact/add-new-contact.component';

const routes: Routes = [
  {path: '', component: ChatPageComponent}
];

@NgModule({
  declarations: [
    ChatPageComponent,
    ChatComponent,
    ChatWriterComponent,
    AddNewContactComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedComponentsModule,
  ],
  exports: [
    RouterModule
  ]
})
export class ChatPageModule {
}
