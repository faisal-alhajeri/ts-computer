// init vars
@256
D = A
@SP
M = D
@FP
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
@FP
D = M
@SP
M = M+1
A = M
M = D
@SP
M = M+1
D = M
@FP
M = D
@ARG
M = D
@7
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


// push constant 7
@7
D = A
@SP
A = M
M = D
@SP
M = M+1


// call febunatchi.feb 1
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
@FP
D = M
@SP
M = M+1
A = M
M = D
@SP
M = M+1
D = M
@FP
M = D
@ARG
M = D
@7
D = A
@ARG
M = M-D
@febunatchi.feb
0; JMP
(Main.main$ret.1)


// return (from function Main.main)
@FP
D = M
@R12
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
@FP
M = D
@2
D = A
@R12
A = M-D
D = M
@THAT
M = D
@3
D = A
@R12
A = M-D
D = M
@THIS
M = D
@4
D = A
@R12
A = M-D
D = M
@ARG
M = D
@5
D = A
@R12
A = M-D
D = M
@LCL
M = D
@6
D = A
@R12
A = M-D
D = M
A = M
0; JMP


// function feb 1
(febunatchi.feb)


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


// lte
@SP
M = M-1
A = M
D = M
@SP
M = M-1
A = M
D = M-D
D = D-1
@32767
A = !A
D = D&A
@SP
A = M
M = D
@SP
M = M+1


// if-goto febunatchi.feb$base
@SP
M = M-1
A = M
D = M
@febunatchi.feb$base
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


// call febunatchi.feb 1
@febunatchi.feb$ret.1
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
@FP
D = M
@SP
M = M+1
A = M
M = D
@SP
M = M+1
D = M
@FP
M = D
@ARG
M = D
@7
D = A
@ARG
M = M-D
@febunatchi.feb
0; JMP
(febunatchi.feb$ret.1)


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


// push constant 2
@2
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


// call febunatchi.feb 1
@febunatchi.feb$ret.2
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
@FP
D = M
@SP
M = M+1
A = M
M = D
@SP
M = M+1
D = M
@FP
M = D
@ARG
M = D
@7
D = A
@ARG
M = M-D
@febunatchi.feb
0; JMP
(febunatchi.feb$ret.2)


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


// goto febunatchi.feb$return
@febunatchi.feb$return
0; JMP


// label base
(febunatchi.feb$base)


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


// label return
(febunatchi.feb$return)


// return (from function febunatchi.feb)
@FP
D = M
@R12
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
@FP
M = D
@2
D = A
@R12
A = M-D
D = M
@THAT
M = D
@3
D = A
@R12
A = M-D
D = M
@THIS
M = D
@4
D = A
@R12
A = M-D
D = M
@ARG
M = D
@5
D = A
@R12
A = M-D
D = M
@LCL
M = D
@6
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



