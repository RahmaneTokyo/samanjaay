import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, NavigationEnd, Router, RouterLink, RouterLinkActive, RouterOutlet} from "@angular/router";
import {filter} from "rxjs";
import {SidemenuComponent} from "../../layout/sidemenu/sidemenu.component";

@Component({
  selector: 'app-home',
  standalone: true,
    imports: [
        RouterOutlet,
        RouterLink,
        RouterLinkActive,
        SidemenuComponent
    ],
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit {
    currentChildRoute = "";
    open = false;

    constructor(private router: Router, private activatedRoute: ActivatedRoute,) {
    }

    ngOnInit() {
        this.activatedRoute.firstChild?.url.subscribe(urlSegments => {
            this.currentChildRoute = urlSegments.map(segment => segment.path).join('/');
        });

        this.router.events.pipe(
            filter(event => event instanceof NavigationEnd)
        ).subscribe(() => {
            const firstChild = this.activatedRoute.firstChild;
            if (firstChild) {
                this.currentChildRoute = firstChild.snapshot.url.map(segment => segment.path).join('/');
            }
        });
    }
}
