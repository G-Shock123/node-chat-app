const expect=require('expect');
const {isRealString}= require ('./validation');

describe('isRealString', () =>{

  it('should reject non-string values',()=>{
    var res = isRealString(2323);
    expect(res).toBe(false);

  })

  it('should reject string with only spaces',()=>{
    var res = isRealString('      ');
    expect(res).toBe(false);

  })
  it('should allow strings with some non-space characters',()=>{

    var res = isRealString('   k   j   sss   ');
    expect(res).toBe(true);
  })

})
