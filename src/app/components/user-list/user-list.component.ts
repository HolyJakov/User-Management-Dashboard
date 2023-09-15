import { Component, OnInit } from '@angular/core';
import { JsonplaceholderService } from 'src/app/jsonplaceholder.service';
import { FormGroup,FormControl, Validators } from '@angular/forms';



@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit{

  constructor(private jsonplaceholderService: JsonplaceholderService) {}
  users: any[] = []
  selectedUser: any;
  errorMessage: string = '';
  


  addNewUser = new FormGroup({
    name:new FormControl('',Validators.required),
    email:new FormControl('',Validators.required),
    role:new FormControl('',Validators.required)
  })

  showadd!:boolean;
  showupdate!:boolean;
  refreshUserList() {
    this.jsonplaceholderService.getUsers().subscribe((data) => {
      this.users = data;
    },
    (error) => {
      this.errorMessage = 'Failed to fetch users. Please try again later.';
    }
    );
  }
  
  
  ngOnInit(): void{
    this.refreshUserList()
  }
  
  addUser(){
    this.jsonplaceholderService.addUsers(this.addNewUser.value).subscribe(data=>{
      this.addNewUser.reset({})
      this.errorMessage = '';
    },
    (error) => {
      this.errorMessage = 'Failed to add user. Please try again.';
    }
    )
  }
  deleteUser(user_id:any){
    this.jsonplaceholderService.deleteUsers(user_id).subscribe(result=>{
      this.refreshUserList()
      this.errorMessage = '';
    },
    (error) => {
      this.errorMessage = 'Failed to delete user. Please try again.';
    }
    )
  }

  updateData() {
    this.jsonplaceholderService.updateUsers(this.selectedUser.id, this.addNewUser.value).subscribe((res) => {
      this.addNewUser.reset({});
      this.refreshUserList(); 
      this.errorMessage = '';
    },
    (error) => {
      this.errorMessage = 'Failed to update user. Please try again.';
    }
    );
  }


  add(){
    this.showadd=true;
    this.showupdate= false;
  }
  update(user: any){
    this.selectedUser = user;
    this.addNewUser.setValue({
      name: this.selectedUser.name,
      email: this.selectedUser.email,
      role: this.selectedUser.company.bs, 
    });
    this.showadd=false;
    this.showupdate=true;
  }
}
