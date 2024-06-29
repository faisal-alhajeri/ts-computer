// init vars
@256
D = A
@SP
M = D


// push constant 0
@0
D = A
@SP
A = M
M = D
@SP
M = M+1


// call Main.main 1
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
@6
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


// function sum 1
(Sum.sum)


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


// push constant 1
@1
D = A
@SP
A = M
M = D
@SP
M = M+1


// eq
@SP
M = M-1
A = M
D = M
@SP
M = M-1
A = M
M = M-D
D = !M
M = M-1
D = D&M
@32767
A = !A
D = D&A
@SP
A = M
M = D
@SP
M = M+1


// if-goto Sum.sum$base
@SP
M = M-1
A = M
D = M
@Sum.sum$base
D; JNE


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


// push constant 1
@1
D = A
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


// call Sum.sum 1
@Sum.sum$ret.1
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
(Sum.sum$ret.1)


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


// goto Sum.sum$return
@Sum.sum$return
0; JMP


// label base
(Sum.sum$base)


// push constant 1
@1
D = A
@SP
A = M
M = D
@SP
M = M+1


// label return
(Sum.sum$return)


// return (from function Sum.sum)
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


// goto VM_BASE$END
@VM_BASE$END
0; JMP



