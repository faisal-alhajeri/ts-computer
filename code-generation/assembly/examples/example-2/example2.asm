// calculates the length sum of 1 + 2 + 3 ... + n
// input n will be stored in RAM[0] (R0), output will be stored at RAM[1]

// initiate vars
@i
M = 0
@sum 
M = 0

// main loop, will see if condition meet or will go through the loop
(LOOP)

// load (i) and compare it to (R0)
@R0
D = M
@i
D = M-D

// if (i - R0) > 0 then the loop should end
@ENDLOOP
D; JGT 

// get i
@i
D = M 

// we add (i) to sum
@sum
M = D+M

// increment i
@i
M = M+1

@LOOP
0; JMP

(ENDLOOP)
// get the sum
@sum
D = M

// set the result (R1) to the sum variable
@R1
M = D


@END
0; JMP 



