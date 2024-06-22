// push constant 10
@10
D = A
@SP
A = M
M = D
@SP
M = M + 1


// push this 1
@1
D = A
@THIS
A = M + D
D = M
@SP
A = M
M = D
@SP
M = M + 1


// add
@SP
AM = M - 1
D = M
@SP
AM = M - 1
M = D + M
@SP
M = M + 1


// push that 10
@10
D = A
@THAT
A = M + D
D = M
@SP
A = M
M = D
@SP
M = M + 1


// push pointer 1
@THAT
D = M
@SP
A = M
M = D
@SP
M = M + 1


// sub
@SP
AM = M - 1
D = M
@SP
AM = M - 1
M = M - D
@SP
M = M + 1


// neg
@SP
AM = M - 1
M = -M
@SP
M = M + 1


// pop temp 2
@7
D = A
@temp
M = D
@SP
AM = M - 1
D = M
@temp
A = M
M = D

