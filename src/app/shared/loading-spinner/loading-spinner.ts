import { Component } from "@angular/core";

@Component({
  selector: 'app-loading-spinner',
  template: `<div class="center">
      <div class="wave"></div>
      <div class="wave"></div>
      <div class="wave"></div>
      <div class="wave"></div>
      <div class="wave"></div>
      <div class="wave"></div>
      <div class="wave"></div>
      <div class="wave"></div>
      <div class="wave"></div>
      <div class="wave"></div>
  </div>`,
  styleUrls: ['./loading-spinner.css'],
})
export class LoadingSpinner {}
