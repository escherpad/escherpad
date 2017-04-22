1. figure out the best way to load all notes from dropbox.

say in folder: dropbox://folder_1

We will want to load all notes under this folder. For example, if there are 
- subfolder_1
- subfolder_2

1. download file index
2. when clicking on file to view, download file content. 
    - only download file if file matches: `.txt`, `.md`, `.rmd`, `.pymd`.
    - `.pdf` and `.png` files are sourced directly from dropbox url.

then we want to load all notes under this folder.

Rank all notes by the date modified. One can:
- search by filemask: ".md"
- just search, order by time modified, keep cursor, and then load more when scrolled to the bottom.

then label each file by path. 
