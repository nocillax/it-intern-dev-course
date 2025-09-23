**Task #2**

There are some necessary skills for every programmer — process files, calculate checksums, follow the instruction, etc. This task will help to train that.

Use language of your group (C# or JavaScript/TypeScript). In principle, you can use anything else, like PHP, Java, Python, Rust or Ruby or anything you like (you don't submit the code in this task, only the result).

Calculate SHA3-256 for every file from archive (https://www.dropbox.com/s/oy2668zp1lsuseh/task2.zip?dl=1). Note, files are binary, you don’t need encodings — if you read file to string with some encoding, you have to use the same encoding to decode string into bytes back for hashing (there is a technical term for such conversions — “stupid activity”).

Write hashes as 64 hex digits in lower case.

Sort hashes in the ascending order of the product of hex digit increased by one (for example, for the hash 63a6ba9e5de66b11ad6c6d3d1b39a5456f65f918fde6250565e365d89a5196c6 the sorting key is 71365623100112242680609229940949951316513259520000000000).

Join sorted hashes without any separator (not keys used for sorting, but hashes themselves).

Concatenate resulted string with your e-mail in lowercase.

Find the SHA3-256 of the result string.

Send obtained 64 hex digits in the lower case to the ⁠🤖tasks-1-2-3 channel using the following command
_!task2 email 64hexdigitshere_

Note: SHA3-256 is not the same algorithm as SHA-256.

Some additional hints:

- check if you use SHA3-256,
- check if you process exactly 256 required files (not everything in the some directory),
- check if you concatenate your strings without separator — beware of JavaScript's join!
- check if you write e-mail in lower case and e-mail goes to the end of the resulted string,
- and, of course, you have to calculate separate hash for every file, not to update the same hash with every file.

> **Never work with _binary_ files in text editors** — if your IDE, e.g., changes automagically even a single byte, your won't get a proper result (redownload the files if necessary).

**DEADLINE: next Friday (it's possible to submit several solutions, only the proper one counts).**

**About Task #2**

The hash algorithms work according to a very strict specification; all the "platforms" will get you the same results. There is no "partial" or "incomplete" implementation; it's either SHA3 or not (maybe it's some other algorithm).

The only problem you may encounter relates to proper interpretation of the data. E.g., what is ab? Is this a single byte [171] (0xAB = 171) or two bytes [97, 98] ('a' has ASCII code 97, and 'b' is 98)? But it’s mostly related to some string keys, like in the 4th task, not to binary data (unless you re-encode data by mistake in the second task).

Beware of Keccak, which differs from SHA-3. However, some outdated libraries may still refer to it as SHA-3 (just use the out-of-the-box API of your platform).
