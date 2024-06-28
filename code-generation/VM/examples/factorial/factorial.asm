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


// push constant 5
@5
D = A
@SP
A = M
M = D
@SP
M = M+1


// call factorial.fac 1
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
@factorial.fac
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


// function fac 1
(factorial.fac)


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


// if-goto factorial.fac$end
@SP
M = M-1
A = M
D = M
@factorial.fac$end
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


// call factorial.fac 1
@factorial.fac$ret.1
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
@factorial.fac
0; JMP
(factorial.fac$ret.1)


// call mult.mult 2
@factorial.fac$ret.2
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
@mult.mult
0; JMP
(factorial.fac$ret.2)


// goto factorial.fac$result
@factorial.fac$result
0; JMP


// label end
(factorial.fac$end)


// push constant 1
@1
D = A
@SP
A = M
M = D
@SP
M = M+1


// label result
(factorial.fac$result)


// return (from function factorial.fac)
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


// function mult 2
(mult.mult)


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
(mult.mult$LOOP)


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


// if-goto mult.mult$END
@SP
M = M-1
A = M
D = M
@mult.mult$END
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


// goto mult.mult$LOOP
@mult.mult$LOOP
0; JMP


// label END
(mult.mult$END)


// push temp 2
@7
D = M
@SP
A = M
M = D
@SP
M = M+1


// return (from function mult.mult)
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

