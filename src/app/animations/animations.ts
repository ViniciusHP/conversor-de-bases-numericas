import { animate, animateChild, query, sequence, stagger, state, style, transition, trigger } from "@angular/animations";

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
  transition(':enter', [
    sequence([
      animate(500),
      query('@*', animateChild(), { optional: true })
    ])
  ]),
  transition(':leave', [
    sequence([
      query('@*', animateChild(), { optional: true }),
      animate(500)
    ])
  ]),
])

export const listAnimation = trigger('listAnimation', [
  transition('* => *', [
    query(':enter', style({ transform: 'translateY(-20px)', opacity: 0 }), { optional: true }),

    query(':enter', stagger('300ms', [
      animate('0.7s ease-in-out', style({ transform: 'translateY(0)', opacity: 1 }))
    ]), { optional: true }),

    query(':leave', stagger('100ms', [
      animate('0.7s ease-in-out', style({ transform: 'translateX(70px)', opacity: 0 }))
    ]), { optional: true })
  ])
])

export const hoverColor = trigger('hoverColor', [
  state('leave', style({ color: '*'})),
  state('enter', style({ color: '{{newColor}}'}), { params: { newColor: '*' }}),
  transition('* => *', [
    animate('0.3s ease-in-out')
  ])
])

export const smoothHeight = trigger('smoothHeight', [
  state('0', style({ height: '0px' })),
  transition('void <=> *', []),
  transition('* <=> *', [
    style({ height: '{{lastHeight}}px' }),
    animate('1s ease-in-out')
  ])
])
