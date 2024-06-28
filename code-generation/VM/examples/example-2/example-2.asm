// init vars
@256
D = A
@SP
M = D
// push constant 9
@9
D = A
@SP
A = M
M = D
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


// call example-2.sub2 2
@example-2$ret.1
D = A
@SP
A = M
M = D
@LCL
D = M
@SP
M = M+1
A = M
M = D
@ARG
D = M
@SP
M = M+1
A = M
M = D
@THIS
D = M
@SP
M = M+1
A = M
M = D
@THAT
D = M
@SP
M = M+1
A = M
M = D
@SP
M = M+1
D = M
@LCL
M = D
@ARG
M = D
@7
D = A
@ARG
M = M-D
@example-2.sub2
0; JMP
(example-2$ret.1)


// goto example-2$exit
@example-2$exit
0; JMP


// function sub2 2
(example-2.sub2)


// push argument 0
@0
D = A
@ARG
A = D+M
D = M
@SP
A = M
M = D
@SP
M = M+1


// push argument 1
@1
D = A
@ARG
A = D+M
D = M
@SP
A = M
M = D
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


// return (from function example-2.sub2)
@LCL
D = M
@R12
M = D
@5
D = A
@R12
A = M-D
D = M
@R13
M = D
@SP
M = M-1
A = M
D = M
@ARG
A = M
M = D
@ARG
D = M+1
@SP
M = D
@1
D = A
@R12
A = M-D
D = M
@THAT
M = D
@2
D = A
@R12
A = M-D
D = M
@THIS
M = D
@3
D = A
@R12
A = M-D
D = M
@ARG
M = D
@4
D = A
@R12
A = M-D
D = M
@LCL
M = D
@5
D = A
@R12
A = M-D
D = M
A = M
0; JMP


// label exit
(example-2$exit)


(END)
@END
0; JMP

