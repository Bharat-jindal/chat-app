const expect=require('expect');
const {isRealString} =require('./validation');

describe('isRealString',()=>{
    it('should return false for pasing non string values',()=>{
        var res=isRealString(1)
        expect(res).toBe(false)
    })
    it('should return false for pasing spaces',()=>{
        var res=isRealString('     ')
        expect(res).toBe(false)
    })
    it('should return true for pasing string values',()=>{
        var res=isRealString(' 9 5   ')
        expect(res).toBe(true)
    })

    
})