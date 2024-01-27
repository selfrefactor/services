function greatRenaming(
    roadRegister
){
  
  return
}

test('happy', () => {
    const roadRegister = [[false,true,true,false], 
 [true,false,true,false], 
 [true,true,false,true], 
 [false,false,true,false]]

  const result = greatRenaming(
    roadRegister
  )

  const expected = [[false,false,false,true], 
 [false,false,true,true], 
 [false,true,false,true], 
 [true,true,true,false]]    
  // expect(result).toEqual(expected)
})
