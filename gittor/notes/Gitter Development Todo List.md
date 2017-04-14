# Gittor Development Todo List

**Question:** what are the usibility issues?

### Post List
- [ ] per note history
- [ ] list history
- [ ] <green>feature</green> hook up to Dropbox backend or GitHub backend
- [ ] <green>feature</green> search view
- [ ] <green>feature</green> Note deletion confirmation
- [ ] <green>feature</green> allow people to choose default view when collapsed. (`code` vs. `preview`)
- [ ] <red>bug</red> KaTeX math finicky

#### Done
- [x] list flashes <red>issue</red>
- [x] dropdown to choose sorting post list by `createdAt` vs recent (`modifiedAt`)

### Editor
- [x] <red>placeholder ui</red> allow setting default view in `full-view`
- [ ] <orange>feature</orange> editor popovers to choose file type
- [ ] <green>enhancement</green> have the title-bar automatically set the title of the document when first typing.
- [ ] <green>enhancement</green> have the editor automatically set the title of the post when typing
- [x] <gray>not planned</gray> *placeholder* element in `inlineEditable` component

#### Done
- [x] <red>bug fix</red> *Utitled* placeholder in `PostLiteItem`.
- [x] Editor emits editing event when loading, thus modifying the `modifiedAt` property of the note. Causing the note list to flash. [^editor-flash-bug] <red>bug</red>
    [^editor-flash-bug]: This bug is super annoying. We reall need to get it fixed


#### Done
- [x] select new Note after creation





<style>
red, orange, green, blue, gray {
    font-size: 0.7em;
    color: white;
    border-radius: 4px;
    padding: 0.3em 6px;
    vertical-align: middle;
}
red {
    background-color: rgba(255, 0, 0, 0.6);
}
orange {
    background-color: orange;
}
green {
    background-color: rgba(31, 190, 28, 0.84);
}
blue {
    background-color: rgba(0, 0, 255, 0.6);
}
gray {
    background-color: gray;
}
</style>
