export class User {
  _id: string;
  name: string;
  email: string; 
  token: string; 
}

export class UserRegistration {
  name: string;
  email: string;
  password: string;
  confirm_password: string;
}
