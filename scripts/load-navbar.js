$(document).ready (function () {
     $("#navbar").load ("navbar.html", function () {
          let content = $("#navbar").contents ();
          $("#navbar").replaceWith (content);
     });
});
