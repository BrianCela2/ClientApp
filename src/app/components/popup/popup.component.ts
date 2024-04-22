import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import {  ToastIconMap, ToastMessage, ToastType } from '../../shared/popup.model'; 
import { ToasterPosition } from '../../shared/popup.model'; 
import { PopupService } from '../../services/popup.service'; 
import { SHOW_HIDE } from '../../../assets/animations/show-hite'; 
import { CommonModule } from '@angular/common';
@Component({
  selector: 'foo-toaster',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.scss'],
  animations: [SHOW_HIDE],
  standalone:true,
  imports:[CommonModule]
})
export class PopUpComponent implements OnInit, OnDestroy {
  @Input()
  public position: ToasterPosition;

  private _toasterSubject$: Subject<void>;
  public messages: ToastMessage[];

  constructor(private _toasterService: PopupService) {
    this.position = ToasterPosition.BOTTOM_RIGHT;
    this._toasterSubject$ = new Subject<void>();
    this.messages = [];
  }

  ngOnInit(): void {
    this._toasterService.onToastMessage()
      .pipe(takeUntil(this._toasterSubject$))
      .subscribe(message => this._handleToastMessage(message))
  }

  private _handleToastMessage(message: ToastMessage) {
    if (this._isToasterPositionTop()) {
      this.messages.unshift(message);
    } else {
      this.messages.push(message);
    }
    setTimeout(() => this._removeMessage(message), message.duration);
  }

  private _isToasterPositionTop() {
    return this.position === ToasterPosition.TOP_LEFT ||
      this.position === ToasterPosition.TOP_CENTER ||
      this.position === ToasterPosition.TOP_RIGHT;
  }

  private _removeMessage(message: ToastMessage) {
    const index: number = this.messages.findIndex(e => e.id === message.id);
    if (index > -1) {
      this.messages.splice(index, 1);
    }
  }

  ngOnDestroy(): void {
    this._toasterSubject$.next();
    this._toasterSubject$.complete();
  }
  public getToastIcon(type: ToastType): string {
    return ToastIconMap[type];
  }
}