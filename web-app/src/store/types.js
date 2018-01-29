/** Created by ge on 12/28/17. */
type TBadge = {
    name: string,
    link: any,
}

// placeholder: extended badge with drop-down

type TItem = {
    title: string,
    link: string,
    text: string,
    images: Array<string>
};

type TItemExt = TItem | {
    tags: Array<any>
}


