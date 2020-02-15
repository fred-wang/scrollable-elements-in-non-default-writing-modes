function scroll_coordinates_behavior() {
    // Append a RTL 1px square scroller containing two 2px squares on the
    // same line, reveal the hidden one and check the sign of scrollLeft.
    document.body.insertAdjacentHTML("beforeend", "<div style='direction: rtl; position: absolute; overflow: hidden; width: 1px; height: 1px;'><div style='width: 2px;'><div style='display: inline-block; width: 1px;'></div><div style='display: inline-block; width: 1px;'></div></div></div>");
    var scroller = document.body.lastElementChild;
    scroller.firstElementChild.children[0].scrollIntoView();
    var right = scroller.scrollLeft;
    scroller.firstElementChild.children[1].scrollIntoView();
    var left = scroller.scrollLeft;
    // Per the CSSOM specification, the standard behavior is:
    // - decreasing coordinates when scrolling leftward.
    // - nonpositive coordinates for leftward scroller.
    var result = { "decreasing": left < right, "nonpositive": left < 0 };
    document.body.removeChild(scroller);
    return result;
}
