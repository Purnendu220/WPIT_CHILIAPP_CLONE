import {Component, Input, OnInit} from '@angular/core';
import {UserBasic} from '../../core/model/user-basic.model';
import { UtitlityService } from '../../core/utils.service';
import { Router } from '@angular/router';
declare var $: any;

@Component({
  selector: 'app-user-search',
  templateUrl: './user-search.component.html',
  styleUrls: ['./user-search.component.scss']
})
export class UserSearchComponent implements OnInit {
  @Input() userSearchList: UserBasic[];

  constructor(private router: Router) {
  }

  slideUpList(id) {
    $('.exploreSearch').slideUp('slow');
    $('#userSearchTypeAhed').val("");
    UtitlityService.redirectUser(this.router,'user',id);
  }
  ngOnInit() {
    $(document).mouseup(function (e) {
      if(e.target.offsetParent && e.target.offsetParent.id != 'user_search_list' ){
        $('.exploreSearch').slideUp('slow');      }

    });
    
  }


}
