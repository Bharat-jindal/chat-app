const expect =require('expect');

const {generateMessage} =require('./message')

describe('Generate Message',()=>{
    it('should generate a message',()=>{
        var res=generateMessage('bharat','hello its a test')
        // expect(res.from).toBe('bharat');
        // expect(res.text).toBe('hello its a test');
        expect(res).toMatchObject({
            from:'bharat',
            text:'hello its a test'
        })
        expect(typeof res.createdAt).toBe("number")
    })
})