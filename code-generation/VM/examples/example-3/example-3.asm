// init vars
@256
D = A
@SP
M = D
// push constant 11
@11
D = A
@SP
A = M
M = D
@SP
M = M+1


// push constant 5
@5
D = A
@SP
A = M
M = D
@SP
M = M+1


// call example-3.mult 2
@example-3$ret.1
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
@example-3.mult
0; JMP
(example-3$ret.1)


// goto example-3$last
@example-3$last
0; JMP


// function mult 2
(example-3.mult)


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


// pop temp 0
@5
D = A
@R12
M = D
@SP
M = M-1
A = M
D = M
@R12
A = M
M = D


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


// pop temp 1
@6
D = A
@R12
M = D
@SP
M = M-1
A = M
D = M
@R12
A = M
M = D


// push constant 0
@0
D = A
@SP
A = M
M = D
@SP
M = M+1


// pop temp 2
@7
D = A
@R12
M = D
@SP
M = M-1
A = M
D = M
@R12
A = M
M = D


// push constant 0
@0
D = A
@SP
A = M
M = D
@SP
M = M+1


// pop temp 3
@8
D = A
@R12
M = D
@SP
M = M-1
A = M
D = M
@R12
A = M
M = D


// label LOOP
(example-3.mult$LOOP)


// push temp 3
@8
D = M
@SP
A = M
M = D
@SP
M = M+1


// push temp 1
@6
D = M
@SP
A = M
M = D
@SP
M = M+1


// gte
@SP
M = M-1
A = M
D = M
@SP
M = M-1
A = M
D = D-M
D = D-1
@32767
A = !A
D = D&A
@SP
A = M
M = D
@SP
M = M+1


// if-goto example-3.mult$END
@SP
M = M-1
A = M
D = M
@example-3.mult$END
D; JNE


// push temp 0
@5
D = M
@SP
A = M
M = D
@SP
M = M+1


// push temp 2
@7
D = M
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


// pop temp 2
@7
D = A
@R12
M = D
@SP
M = M-1
A = M
D = M
@R12
A = M
M = D


// push temp 3
@8
D = M
@SP
A = M
M = D
@SP
M = M+1


// push constant 1
@1
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


// pop temp 3
@8
D = A
@R12
M = D
@SP
M = M-1
A = M
D = M
@R12
A = M
M = D


// goto example-3.mult$LOOP
@example-3.mult$LOOP
0; JMP


// label END
(example-3.mult$END)


// push temp 2
@7
D = M
@SP
A = M
M = D
@SP
M = M+1


// return (from function example-3.mult)
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


// label last
(example-3$last)


(END)
@END
0; JMP

