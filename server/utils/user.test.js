const expect= require('expect');

const {Users} =require('./users');

describe('Users class',()=>{
    var users;
    beforeEach(()=>{
        users=new Users;
        users.users=[
            {id:1,
            name:'Andrew',
            room:'node-course'
            },
            {id:2,
                name:'Mike',
                room:'react-course'
                },
            {id:3,
            name:'Jen',
            room:'node-course'
            }    
        ]
    })
    it('should add new user',()=>{
        var users=new Users
        const user={
            id:'jhjkdsbna',
            name:'bharat',
            room:'hjnnds'
        }
        var resUser=users.addUser(user.id,user.name,user.room);
        expect(users.users).toEqual([user]);

    })
    
    it('should return names for node course',()=>{
        var userList=users.getUserList('node-course');
        expect(userList).toEqual(['Andrew','Jen'])
        
    })
    it('should return names for react course',()=>{
        var userList=users.getUserList('react-course');
        expect(userList).toEqual(['Mike'])
        
    })
    it('should find user on valod id',()=>{
        var resUser=users.getUser(2);
        expect(resUser).toEqual({id:2,
            name:'Mike',
            room:'react-course'
            })
    })
    it('should not find user on invalod id',()=>{
        var resUser=users.getUser(4);
        expect(resUser).toBe(undefined)
    })
    it('should remove a user',()=>{
        var Userid=1;
        var resUser=users.removeUser(Userid);
        expect(resUser.id).toBe(Userid);
        expect(users.users).toHaveLength(2)
    })
    it('should not remove a user',()=>{
        var Userid=4;
        var resUser=users.removeUser(Userid);
        expect(resUser).toBeFalsy();
        expect(users.users).toHaveLength(3)
    })
})