import { Component, Input } from '@angular/core';
import { breadCrumbItem } from 'src/app/models/breadcrumb';

@Component({
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.scss']
})
export class BreadcrumbComponent {
  @Input() breadCrumb: breadCrumbItem = {
    title: '',
    icon: '',
    url: '',
    canNavigate: false,
    child: null
  };
}
