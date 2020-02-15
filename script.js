window.addEventListener("DOMContentLoaded", function() {
    var behavior = scroll_coordinates_behavior();
    for (property in behavior) {
        document.getElementById(`behavior_${property}`).innerText = behavior[property];
    }
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
