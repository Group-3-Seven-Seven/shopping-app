export class CheckModel{
    id : number = 0;
    firstname : string = '';
    middlename : string = '';
    lastname : string = '';
    username : string = '';
    email : string = '';
    password : string = '';
    mobilenumber : number = 0;
    role :string = 'user'
    status : string = 'activated'
    birthdate !: Date;
    address : string = ''
    interest : string = ''
}