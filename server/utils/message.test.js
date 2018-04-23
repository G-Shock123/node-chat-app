var expect = require('expect');
var{generateMessage} = require('./message');

describe('generateMessage', ()=>{
  it('should generate the correct message object',() =>{
    var from = "Tiana";
    var text = "Is very pretty";

    var res = generateMessage(from,text);


    expect(res.from).toBe(from);
    expect(res.text).toBe(text);
    expect(typeof res.createdAt).toBe('number');

    //call generate newMessage
    //store res in vairable
    //expect from matches the value i passed inspect
    //assert text matches at
    //assert createdAt is a number
  })

});
