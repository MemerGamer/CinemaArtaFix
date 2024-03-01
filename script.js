(function () {
  // Function to replace 'http://' with 'https://' in a URL
  function toHttps(url) {
    return url.replace(/http:/g, "https:");
  }

  // Convert <a> tags
  document.querySelectorAll("a").forEach(function (link) {
    if (link.href.startsWith("http:")) {
      link.href = toHttps(link.href);
    }
  });

  // Convert <link> tags for stylesheets
  document.querySelectorAll('link[rel="stylesheet"]').forEach(function (link) {
    if (link.href.startsWith("http:")) {
      link.href = toHttps(link.href);
    }
  });

  // Convert <script> tags
  document.querySelectorAll("script").forEach(function (script) {
    if (script.src.startsWith("http:")) {
      script.src = toHttps(script.src);
    }
  });

  // Convert images
  document.querySelectorAll("img").forEach(function (img) {
    if (img.src.startsWith("http:")) {
      img.src = toHttps(img.src);
    }
  });

  // Convert any other tags with a 'src' attribute (e.g., iframes, embeds)
  document.querySelectorAll("[src]").forEach(function (element) {
    if (element.src.startsWith("http:")) {
      element.src = toHttps(element.src);
    }
  });

  // Convert any inline styles with background images loaded over HTTP
  document.querySelectorAll("[style]").forEach(function (element) {
    if (element.style.backgroundImage.startsWith("url(http:")) {
      element.style.backgroundImage = toHttps(element.style.backgroundImage);
    }
  });

  // Convert objects, videos, and any other embeds
  document.querySelectorAll("object, video, embed").forEach(function (embed) {
    var data = embed.getAttribute("data");
    if (data && data.startsWith("http:")) {
      embed.setAttribute("data", toHttps(data));
    }

    var src = embed.getAttribute("src");
    if (src && src.startsWith("http:")) {
      embed.setAttribute("src", toHttps(src));
    }
  });

  // Additional code to handle <script> tags for JavaScript files
  document.querySelectorAll("script").forEach(function (script) {
    // Check if the script src attribute exists and if it starts with 'http:'
    if (script.src && script.src.startsWith("http:")) {
      // Replace 'http:' with 'https:' in the script's src attribute
      script.src = toHttps(script.src);
    }
  });

  // Convert CSS @import in <style> elements
  document.querySelectorAll("style").forEach(function (style) {
    if (style.innerHTML.includes("http:")) {
      style.innerHTML = toHttps(style.innerHTML);
    }
  });

  function replaceImportWithLink() {
    // Search for all <style> tags in the document
    document.querySelectorAll("style").forEach(function (style) {
      // Check if the style tag contains the specific @import directive
      if (style.innerHTML.includes('@import "/misc/drupal.css";')) {
        // Create a new link element for the stylesheet
        var link = document.createElement("link");
        link.type = "text/css";
        link.href = "https://arta.cityplex.ro/misc/drupal.css"; // Changed to HTTPS

        link.rel = "stylesheet";

        // Append the new link element to the <head>
        document.head.appendChild(link);

        // Remove the <style> tag that contained the @import
        style.parentNode.removeChild(style);
      }
    });

    console.log("Replaced @import with <link> for drupal.css");
  }

  // Call the function to perform the replacement
  replaceImportWithLink();

  console.log("Conversion to HTTPS completed.");

  var scripts = [
    "https://arta.cityplex.ro/themes/alexa%20cityplex/httprequest.js",
    "https://arta.cityplex.ro/themes/alexa%20cityplex/m_ajax.js",
    "https://arta.cityplex.ro/themes/alexa%20cityplex/ticker.js",
    "https://code.jquery.com/jquery-1.11.3.min.js",
    "https://arta.cityplex.ro/themes/alexa%20cityplex/js/owl.carousel.min.js",
    "https://arta.cityplex.ro/themes/alexa%20cityplex/js/fancybox/jquery.fancybox.pack.js?v=2.1.5",
    "https://arta.cityplex.ro/themes/alexa%20cityplex/js/fancybox/helpers/jquery.fancybox-buttons.js?v=1.0.5",
    "https://arta.cityplex.ro/themes/alexa%20cityplex/js/fancybox/helpers/jquery.fancybox-media.js?v=1.0.6",
    "https://arta.cityplex.ro/themes/alexa%20cityplex/videojs/video.js",
    "https://arta.cityplex.ro/themes/alexa%20cityplex/js/fancybox/helpers/jquery.fancybox-thumbs.js?v=1.0.7",
    "https://arta.cityplex.ro/themes/alexa%20cityplex/js/main.js",
    "https://platform.twitter.com/widgets.js",
    "https://connect.facebook.net/en_US/sdk.js",
    "https://arta.cityplex.ro/themes/alexa%20cityplex/js/bootstrap.min.js",
  ];

  // Function to dynamically load a script
  function loadScript(src) {
    var script = document.createElement("script");
    script.src = src;
    script.async = false; // To ensure scripts are loaded in order
    document.body.appendChild(script); // Append to body or head as needed
  }

  // Iterate through the scripts array and load each script
  scripts.forEach(function (src) {
    loadScript(src);
  });

  console.log("All external JS scripts have been loaded.");
})();
