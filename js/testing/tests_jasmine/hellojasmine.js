/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
function helloWorld() {
  return 'Hello world!';
}

describe('Hello world', function () {
  it('says hello', function () {
    expect(helloWorld()).toEqual('Hello world!');
  });
});
