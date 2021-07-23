import { animate, state, style, transition, trigger } from "@angular/animations";

export const slideDown = trigger('slideDown', [
  state('void', style({ transform: 'translateY(-20px)' , opacity: 0 })),
  state('*', style({ transform: 'translateY(0)' , opacity: 1 })),
  transition(':enter, :leave', [
    animate('0.5s ease-out')
  ])
]);

export const slideUp = trigger('slideUp', [
  state('void', style({ transform: 'translateY(20px)' , opacity: 0 })),
  state('*', style({ transform: 'translateY(0)' , opacity: 1 })),
  transition(':enter, :leave', [
    animate('0.5s ease-out')
  ])
]);

export const fade = trigger('fade', [
  state('void', style({ opacity: 0 })),
  transition(':enter, :leave', [
    animate(500)
  ])
])
