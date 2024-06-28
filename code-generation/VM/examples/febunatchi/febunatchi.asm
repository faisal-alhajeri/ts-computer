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


// call feb 1
@code-generation/VM/examples/febunatchi/febunatchi.vm$ret.1
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
@code-generation/VM/examples/febunatchi/febunatchi.vm.feb
0; JMP
(code-generation/VM/examples/febunatchi/febunatchi.vm$ret.1)


// goto code-generation/VM/examples/febunatchi/febunatchi.vm$end
@code-generation/VM/examples/febunatchi/febunatchi.vm$end
0; JMP


// function feb 1
(code-generation/VM/examples/febunatchi/febunatchi.vm.feb)


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


// if-goto code-generation/VM/examples/febunatchi/febunatchi.vm.feb$base
@SP
M = M-1
A = M
D = M
@code-generation/VM/examples/febunatchi/febunatchi.vm.feb$base
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


// call feb 1
@code-generation/VM/examples/febunatchi/febunatchi.vm.feb$ret.1
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
@code-generation/VM/examples/febunatchi/febunatchi.vm.feb
0; JMP
(code-generation/VM/examples/febunatchi/febunatchi.vm.feb$ret.1)


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


// call feb 1
@code-generation/VM/examples/febunatchi/febunatchi.vm.feb$ret.2
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
@code-generation/VM/examples/febunatchi/febunatchi.vm.feb
0; JMP
(code-generation/VM/examples/febunatchi/febunatchi.vm.feb$ret.2)


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


// goto code-generation/VM/examples/febunatchi/febunatchi.vm.feb$return
@code-generation/VM/examples/febunatchi/febunatchi.vm.feb$return
0; JMP


// label base
(code-generation/VM/examples/febunatchi/febunatchi.vm.feb$base)


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
(code-generation/VM/examples/febunatchi/febunatchi.vm.feb$return)


// return (from function code-generation/VM/examples/febunatchi/febunatchi.vm.feb)
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


// label end
(code-generation/VM/examples/febunatchi/febunatchi.vm$end)


(END)
@END
0; JMP

