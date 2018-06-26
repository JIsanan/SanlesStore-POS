import { animate,state,style,transition,trigger,query,group} from '@angular/animations';

export class Animations{

}

export const fadeAnimation = trigger('fadeAnimation',[
    transition("*=>*",[
        query(
            ':enter',
            [style({opacity:0})],
            {optional:true}
        ),
        query(
            ':leave',
            [style({opacity:1}),animate('0.5s',style({opacity:0}))],
            {optional:true}
        ),
        query(
            ':enter',
            [style({opacity:0}),animate('0.5s',style({opacity:1}))],
            {optional:true}
        )
    ])
])