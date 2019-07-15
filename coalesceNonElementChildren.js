import React, {Children} from 'react'

// @ts-ignore
export default function coalesceNonElementChildren(children, coalesceNodes) {
    let coalescedChildren = [];
    let contiguousNonElements: React.ReactText[] = [];
    Children.forEach(children, (child: React.ReactChild) => {
        if (!React.isValidElement(child)) {
            contiguousNonElements.push(child);
            return;
        }

        if (contiguousNonElements.length) {
            coalescedChildren.push(
                coalesceNodes(contiguousNonElements, coalescedChildren.length)
            );
            contiguousNonElements = [];
        }

        coalescedChildren.push(child);
    });

    if (contiguousNonElements.length) {
        coalescedChildren.push(
            coalesceNodes(contiguousNonElements, coalescedChildren.length)
        );
    }

    return coalescedChildren;
}
