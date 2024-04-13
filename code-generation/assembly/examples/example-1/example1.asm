// add the value of R0 and R1 and 17 puth the value in R2

// get the value of R0 and save it in D
@R0
D = M

// get the value of R1 and add it to D (R0) value
@R1
D = D+M

// add 17 to D (R0 value + R1 value)
@17
D = D+A

// store the value in R2
@R2
M = D

// convition for ending the program
(END)
@END
0; JMP