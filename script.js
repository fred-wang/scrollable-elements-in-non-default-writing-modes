window.addEventListener("DOMContentLoaded", async function() {
    var behavior = scroll_coordinates_behavior_with_scrollIntoView();
    for (property in behavior)
        document.getElementById(`behavior_${property}`).innerText = behavior[property];
    var behavior2 = scroll_coordinates_behavior_by_setting_nonpositive_scrollLeft();
    for (property in behavior)
        document.getElementById(`behavior2_${property}`).innerText = behavior2[property];

    var response = await fetch("./scroll-coordinates-behavior.js");
    var code = document.getElementById("feature_detection_snippet");
    code.innerText = await response.text();
    hljs.highlightBlock(code);
});

window.addEventListener("load", function() {
    Array.from(document.querySelectorAll(".example")).forEach(div => {
        var scroller = div.getElementsByClassName("scroller")[0];
        var input = {
            scrollLeft: div.getElementsByTagName("input")[0],
            scrollTop: div.getElementsByTagName("input")[1]
        };
        var properties = ["scrollLeft", "scrollTop"];
        properties.forEach(property => {
            input[property].value = scroller[property];
        });
        properties.forEach(property => {
            input[property].addEventListener("change", function() {
                scroller[property] = input[property].value;
            });
        });
        scroller.addEventListener("scroll", function() {
            ["scrollLeft", "scrollTop"].forEach(property => {
                properties.forEach(property => {
                    input[property].value = scroller[property];
                });
            });
        })
    });
})
