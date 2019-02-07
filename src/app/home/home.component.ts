import { Component, OnInit } from '@angular/core'
import { Router} from '@angular/router'
import { UserService } from '../shared/user.service'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(
    private router: Router,
    private user: UserService
  ) { }

  ngOnInit() {}

  onGetStarted(e) {
    const userDisplayName = e.value
    this.user.createUser(userDisplayName)
    this.router.navigate(['/choose'], { queryParams: { displayName: userDisplayName } })
  }



}
