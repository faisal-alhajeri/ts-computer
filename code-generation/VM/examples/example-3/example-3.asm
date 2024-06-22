// init vars
@256
D = A
@SP
M = D
// push constant 10
@10
D = A
@SP
A = M
M = D
@SP
M = M+1


// push constant 7
@7
D = A
@SP
A = M
M = D
@SP
M = M+1


// add
@SP
M = M-1
A = M
D = M
@SP
M = M-1
A = M
M = D+M
@SP
M = M+1


// push constant 2
@2
D = A
@SP
A = M
M = D
@SP
M = M+1


// push constant 3
@3
D = A
@SP
A = M
M = D
@SP
M = M+1


// add
@SP
M = M-1
A = M
D = M
@SP
M = M-1
A = M
M = D+M
@SP
M = M+1


// sub
@SP
M = M-1
A = M
D = M
@SP
M = M-1
A = M
M = M-D
@SP
M = M+1


// push constant 13
@13
D = A
@SP
A = M
M = D
@SP
M = M+1


// lt
@SP
M = M-1
A = M
D = M
@SP
M = M-1
A = M
D = M-D
@32767
A = !A
D = D&A
@SP
A = M
M = D
@SP
M = M+1


(END)
@END
0; JMP

