function scroll_coordinates_behavior_with_scrollIntoView() {
    // Append a RTL scrollable 1px square containing two 1px-wide descendants on
    // the same line, reveal each of them successively and compare their
    // scrollLeft coordinates. The scrollable square has 'position: fixed' so
    // that scrollIntoView() calls don't scroll the viewport.
    document.body.insertAdjacentHTML("beforeend", "<div style='direction: rtl; position: fixed; left: 0; top: 0; overflow: hidden; width: 1px; height: 1px;'><div style='width: 2px; height: 1px;'><div style='display: inline-block; width: 1px;'></div><div style='display: inline-block; width: 1px;'></div></div></div>");
    var scroller = document.body.lastElementChild;
    scroller.firstElementChild.children[0].scrollIntoView();
    var right = scroller.scrollLeft;
    scroller.firstElementChild.children[1].scrollIntoView();
    var left = scroller.scrollLeft;

    // Per the CSSOM specification, the standard behavior is:
    // - decreasing coordinates when scrolling leftward.
    // - nonpositive coordinates for scroller with leftward overflow.
    var result = { "decreasing": left < right, "nonpositive": left < 0 };
    document.body.removeChild(scroller);
    return result;
}

function scroll_coordinates_behavior_by_setting_nonpositive_scrollLeft() {
    // Append a RTL scrollable 1px square containing a 2px-wide child and check
    // the initial scrollLeft and whether it is possible to set a negative one.
    document.body.insertAdjacentHTML("beforeend", "<div style='direction: rtl; position: absolute; left: 0; top: 0; overflow: hidden; width: 1px; height: 1px;'><div style='width: 2px; height: 1px;'></div></div>");
    var scroller = document.body.lastElementChild;
    var initially_positive = scroller.scrollLeft > 0;
    scroller.scrollLeft = -1;
    var has_negative = scroller.scrollLeft < 0;

    // Per the CSSOM specification, the standard behavior is:
    // - decreasing coordinates when scrolling leftward.
    // - nonpositive coordinates for scroller with leftward overflow.
    var result = { "decreasing": has_negative || initially_positive, "nonpositive": has_negative };
    document.body.removeChild(scroller);
    return result;
}
