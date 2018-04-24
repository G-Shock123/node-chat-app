const expect = require('expect');
const {Users}= require('./users')




describe('addUser',()=>{
  var users;

  beforeEach(()=>{
    users = new Users();
    users.users= [{
      id: '1',
      name: 'mike',
      room: 'Straw house'
    },
    {
      id: '2',
      name: 'Rupert',
      room: 'Stick house'
    },{
      id: '3',
      name: 'Bill',
      room: 'Straw house'
    }]

  });


  it('should add new user',()=>{
    var users = new Users();
    var user ={
      id:'123',
      name: 'Konnie',
      room: ' King of the hill'
    };

    var resUser = users.addUser(user.id,user.name,user.room)
    expect(users.users).toEqual([user]);
    expect(resUser).toEqual(user)

  });

  it('should return names for the Straw House',()=>{
    var userList = users.getUserList('Straw house');
    expect(userList).toEqual(['mike', 'Bill']);

  })

  it('should return names for the Stick house',()=>{
    var userList = users.getUserList('Stick house');
    expect(userList).toEqual(['Rupert']);

  });

  it('should find user', ()=>{
    var userId = '2';
    var user = users.getUser(userId);

    expect (user.id).toBe(userId);
  })

  it('should not find user', ()=>{
    var userId = '99';
    var user = users.getUser(userId);

    expect (user).toNotExist(userId);
  })


  it('should remove a user', ()=>{
    var userId = '1';
    var user = users.removeUser(userId);

    expect (user.id).toBe(userId);
    expect (users.users.length).toBe(2);

  })

  it('should not remove a user', ()=>{
    var userId = '99';
    var user = users.removeUser(userId);

    expect(user).toNotExist;
    expect (users.users.length).toBe(3);

  })
});
