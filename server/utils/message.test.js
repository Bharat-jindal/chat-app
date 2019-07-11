const expect =require('expect');

const {generateMessage,generateLocation} =require('./message')

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

describe('Generate location Message',()=>{
    it('should generate locatrion object',()=>{
        var res=generateLocation('bharat',2183179318,138913989130);

    expect(res).toMatchObject({
        from:'bharat',
        url:'https://www.google.com/maps?q=2183179318,138913989130'
    })
    expect(typeof res.createdAt).toBe("number")
    })
})