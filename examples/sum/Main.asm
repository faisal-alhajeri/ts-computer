// init vars
@256
D = A
@SP
M = D
// call Main.main 0
@VM_BASE$ret.1
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
@5
D = A
@ARG
M = M-D
@Main.main
0; JMP
(VM_BASE$ret.1)


// goto VM_BASE$END
@VM_BASE$END
0; JMP


// function main 0
(Main.main)


// push constant 10
@10
D = A
@SP
A = M
M = D
@SP
M = M+1


// call Sum.sum 1
@Main.main$ret.1
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
@6
D = A
@ARG
M = M-D
@Sum.sum
0; JMP
(Main.main$ret.1)


// return (from function Main.main)
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


// label END
(VM_BASE$END)


(END)
@END
0; JMP

