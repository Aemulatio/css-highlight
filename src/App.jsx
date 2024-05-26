import "./App.css";
import {useRef} from "react";

const words = ["Interdum", "malesuada fames", "primis", "Ut"].map((w) =>
    w.toLowerCase(),
);

//["malesuada fames"]

function App() {
    const ref = useRef(null);

    // const handleClick = () => {
    //   if (!ref || !ref.current) return;
    //   const content = ref.current;
    //
    //   // const treeWalker = document.createTreeWalker(content, NodeFilter.SHOW_TEXT);
    //   const treeWalker = document.createTreeWalker(
    //     content,
    //     NodeFilter.SHOW_ELEMENT,
    //     // {
    //     //   acceptNode(node) {
    //     //     return node.nodeName.toLowerCase() === "p"
    //     //       ? NodeFilter.FILTER_ACCEPT
    //     //       : NodeFilter.FILTER_REJECT;
    //     //   },
    //     // },
    //   );
    //
    //   const allTextNodes = [];
    //   let currentNode = treeWalker.nextNode();
    //   while (currentNode) {
    //     allTextNodes.push(currentNode);
    //     currentNode = treeWalker.nextNode();
    //   }
    //   console.log("all nodes: ", allTextNodes);
    //
    //   console.log(content);
    //
    //   const elems = allTextNodes.map((el) => {
    //     return { el, text: el?.textContent?.toLowerCase() };
    //   });
    //
    //   console.log("elems: ", elems);
    //
    //   const ranges = words.flatMap((str) => {
    //     const matches = [];
    //     return elems.map(({ text, el }) => {
    //       console.log("el: ", el);
    //       if (el.nodeName.toLowerCase() === "p") {
    //         matches.forEach((v, i, ar) => ar.pop());
    //         const paragraphText = el.innerText;
    //         const regexp = new RegExp(str, "gmi");
    //         console.log("matches: ", ...paragraphText.matchAll(regexp));
    //         matches.push(
    //           ...[...paragraphText.matchAll(regexp)].map((el) => el.index),
    //         );
    //         console.log("matches: ", matches, str);
    //       } else {
    //         // matches.map((match) => {});
    //         const indices = [];
    //         let startPos = 0;
    //         while (startPos < text?.length) {
    //           const index = text.indexOf(str, startPos);
    //           if (index === -1) break;
    //           console.log("index: ", index);
    //           indices.push(index);
    //           startPos = index + str.length;
    //         }
    //
    //         console.log("indices: ", indices);
    //         console.log("el: ", el);
    //
    //         return indices.map((index) => {
    //           // if (ind % 2 === 0) return;
    //           const range = new Range();
    //           // range.setStart(el, array[ind]);
    //           console.log("range: ", index, str, el.childNodes[0]);
    //           range.setStart(el.childNodes[0], index);
    //           range.setEnd(el.childNodes[0], index + str.length);
    //           // // range.setEnd(el, array[ind + 1]);
    //           return range;
    //         });
    //       }
    //     });
    //   });
    //   console.log("ranges: ", ranges);
    //   console.log("ranges: ", ...ranges.filter((f) => f).flat(1));
    //   const searchResultsHighlight = new Highlight(
    //     ...ranges
    //       .filter((f) => f)
    //       .flat(1)
    //       .filter((f) => f),
    //   );
    //
    //   // Register the Highlight object in the registry.
    //   CSS.highlights.set("example", searchResultsHighlight);
    //
    //   /*
    //                                                                                                                                                                                                           content.childNodes.forEach((paragraph) => {
    //                                                                                                                                                                                                             console.log(paragraph);
    //                                                                                                                                                                                                             console.log(paragraph.childNodes);
    //
    //                                                                                                                                                                                                             const exampleRange = new Range();
    //                                                                                                                                                                                                             exampleRange.setStart(paragraph, 1);
    //                                                                                                                                                                                                             exampleRange.setEnd(paragraph, 4);
    //
    //                                                                                                                                                                                                             const highlight = new Highlight(exampleRange);
    //
    //                                                                                                                                                                                                             highlight.type = "grammar-error";
    //
    //                                                                                                                                                                                                             CSS.highlights.set("example", highlight);
    //                                                                                                                                                                                                           });
    //                                                                                                                                                                                                           */
    // };

    const handleClick = () => {
        if (!ref || !ref.current) return;
        const content = ref.current;

        // const treeWalker = document.createTreeWalker(content, NodeFilter.SHOW_TEXT);
        const treeWalker = document.createTreeWalker(
            content,
            NodeFilter.SHOW_ELEMENT,
            {
                acceptNode(node) {
                    return node.nodeName.toLowerCase() === "p"
                        ? NodeFilter.FILTER_ACCEPT
                        : NodeFilter.FILTER_REJECT;
                },
            },
        );

        const pNodes = [];
        let currentNode = treeWalker.nextNode();
        while (currentNode) {
            pNodes.push(currentNode);
            currentNode = treeWalker.nextNode();
        }
        console.log("all nodes: ", pNodes);

        const ranges = [];

        pNodes.forEach((pNode) => {
            console.log("pnode: ", pNode);
            const text = pNode.innerText;
            const pWalker = document.createTreeWalker(pNode, NodeFilter.SHOW_TEXT);

            const textNodes = [];
            let currentNode = pWalker.nextNode();
            while (currentNode) {
                textNodes.push(currentNode);
                currentNode = pWalker.nextNode();
            }

            console.log("textNodes: ", textNodes);
            words.forEach((str) => {
                const matches = [];
                const regexp = new RegExp(str, "gmi");
                console.log("matches: ", ...text.matchAll(regexp));
                matches.push(...[...text.matchAll(regexp)].map((el) => el.index));
                console.log("matches: ", matches);

                matches.forEach((match) => {
                    console.log("match: ", match);
                    let isDone = false;
                    let positionCounter = 0;

                    textNodes.forEach((textNode) => {
                        textNode.textContent = textNode.textContent.replace("Ut", "Utro");
                        if (isDone) return;
                        console.log("textNode: ", textNode);
                        console.log("textNode textContent: ", textNode.textContent);
                        console.log("textNode length: ", textNode.wholeText.length);
                        console.log("positionCounter: ", positionCounter);
                        positionCounter += textNode.wholeText.length;
                        console.log("positionCounter after: ", positionCounter);
                        if (positionCounter >= match) {
                            const index = textNode.textContent.toLowerCase().indexOf(str);
                            console.log("index: ", index);
                            if (index < 0) {
                                console.log(
                                    "AAAA: ",
                                    str.toLowerCase().indexOf(textNode.textContent.toLowerCase()),
                                );
                                const newIndex = str
                                    .toLowerCase()
                                    .indexOf(textNode.textContent.toLowerCase());
                                console.log("newIndex: ", newIndex);
                                if (newIndex < 0) {
                                    console.log(
                                        "positionCounter - match: ",
                                        positionCounter - match,
                                    );
                                    const thisString = str
                                        .substring(0, positionCounter - match - 1)
                                        .trim();
                                    console.log("thisStgin: ", thisString);

                                    const thisIndex = textNode.textContent
                                        .toLowerCase()
                                        .toLowerCase()
                                        .indexOf(thisString);

                                    console.log("thisIndex: ", thisIndex);
                                    if (thisIndex < 0 || thisString === "") return;

                                    const range = new Range();
                                    // range.setStart(textNode, index);
                                    range.setStart(textNode, thisIndex);
                                    range.setEnd(textNode, textNode.textContent.length);
                                    console.log("range: ", range);
                                    ranges.push(range);
                                    console.log("str before change:", str);
                                    str = str.substring(thisString.length);
                                    console.log("str change:", str);
                                    // if (str === "") isDone = true;
                                    return;
                                } else {
                                    const range = new Range();
                                    // range.setStart(textNode, index);
                                    range.setStart(textNode, newIndex);
                                    range.setEnd(
                                        textNode,
                                        newIndex + textNode.textContent.length,
                                    );
                                    console.log("range: ", range);
                                    ranges.push(range);
                                    console.log("str before change:", str);
                                    str = str.substring(newIndex + textNode.textContent.length);
                                    console.log("str change:", str);
                                    // if (str === "") isDone = true;
                                    return;
                                }
                            } else {
                                console.log("else index: ", index);
                                console.log("else str + length: ", str, str.length);
                                const range = new Range();
                                // range.setStart(textNode, index);
                                range.setStart(textNode, index);
                                range.setEnd(textNode, index + str.length);
                                console.log("range: ", range);
                                ranges.push(range);

                                isDone = true;
                            }
                        }
                    });
                });
            });
            console.log("textNodes: ", textNodes);
        });
        const l = new Highlight(...ranges);
        CSS.highlights.set("example", l);
    };

    return (
        <div>
            <div ref={ref} className={"top"}>
                <p className="first">
                    <b>Interdum </b>
                    <span> et </span>
                    <i>
                        malesuada <b>fames </b>
                    </i>
                    <span>ac ante ipsum pr</span>
                    <b>im</b>
                    <i>is </i>
                    <span>
            in faucibus. Proin a leo non risus interdum aliquet. Phasellus
            venenatis feugiat nisi id vehicula. Suspendisse feugiat tincidunt
            accumsan. Sed quis est id eros pulvinar aliquam. Ut sodales
            scelerisque blandit. Quisque ac sapien est.
          </span>
                </p>
                <p className="second">
          <span>
            Interdum et malesuada fames ac ante ipsum primis in faucibus. Proin
            a leo non risus interdum aliquet. Phasellus venenatis feugiat nisi
            id vehicula. Suspendisse feugiat tincidunt accumsan. Sed quis est id
            eros pulvinar aliquam. Ut sodales scelerisque blandit. Quisque ac
            sapien est.
          </span>
                </p>
            </div>
            <button onClick={handleClick}>LETS DO IT</button>
            <button onClick={() => CSS.highlights.clear()}>clear</button>
        </div>
    );
}

export default App;
