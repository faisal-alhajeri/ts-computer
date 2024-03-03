// do the high level (for i in {1, 2, 3 ... n} do thhing to arr[i])
// base address will be in (R0) so its memory location
// input n will be in (R1)
// will try to set the arr[i] to -1 while i < n


@n
M = 0

// get the first address of the array
(LOOP)
@n
D = M
@R1
D = M - D

@END
D; JEQ

// get current n
@n
D = M
// get the base address and add to it currnet (n) which saved in D
@R0
A = M + D

// set the value to -1 (as we want it to be -1)
M = -1

// increment n
@n
M = M + 1

@LOOP
0; JMP

(END)
@END
0; JMP







