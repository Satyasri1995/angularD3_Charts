

function drawWordCloud(selector,words,options) {

    if(!options){
        options={};
    }
    options.width=options.width||500;
    options.height=options.height||500;
    options.enterAnimationDuration=options.enterAnimationDuration||600;
    options.exitAnimationDuration=options.exitAnimationDuration||200;
    options.switchInterval=options.switchInterval||2000;
  //Create a new instance of the word cloud visualisation.
  var myWordCloud = wordCloud(selector);

  //Start cycling through the demo data
  showNewWords(myWordCloud);

  // Encapsulate the word cloud functionality
function wordCloud(selector) {
    var fill = d3.scale.category20();
  
    //Construct the word cloud's SVG element
    var svg = d3
      .select(selector)
      .append("svg")
      .attr("width", options.width)
      .attr("height", options.height)
      .append("g")
      .attr("transform", "translate(250,250)");
  
    //Draw the word cloud
    function draw(words) {
      var cloud = svg.selectAll("g text").data(words, function (d) {
        return d.text;
      });
  
      //Entering words
      cloud
        .enter()
        .append("text")
        .style("font-family", "Impact")
        .style("fill", function (d, i) {
          return fill(i);
        })
        .attr("text-anchor", "middle")
        .attr("font-size", 1)
        .text(function (d) {
          return d.text;
        });
  
      //Entering and existing words
      cloud
        .transition()
        .duration(options.enterAnimationDuration)
        .style("font-size", function (d) {
          return d.size + "px";
        })
        .attr("transform", function (d) {
          return "translate(" + [d.x, d.y] + ")rotate(" + d.rotate + ")";
        })
        .style("fill-opacity", 1);
  
      //Exiting words
      cloud
        .exit()
        .transition()
        .duration(options.exitAnimationDuration)
        .style("fill-opacity", 1e-6)
        .attr("font-size", 1)
        .remove();
    }
  
    //Use the module pattern to encapsulate the visualisation code. We'll
    // expose only the parts that need to be public.
    return {
      //Recompute the word cloud for a new set of words. This method will
      // asycnhronously call draw when the layout has been computed.
      //The outside world will need to call this function, so make it part
      // of the wordCloud return value.
      update: function (words) {
        d3.layout
          .cloud()
          .size([options.width, options.height])
          .words(words)
          .padding(5)
          .rotate(function () {
            return ~~(Math.random() * 2) * 90;
          })
          .font("Impact")
          .fontSize(function (d) {
            return d.size;
          })
          .on("end", draw)
          .start();
      },
    };
  }
  
  
  //Prepare one of the sample sentences by removing punctuation,
  // creating an array of words and computing a random size attribute.
  function getWords(i) {
    return words[i]
      .replace(/[!\.,:;\?]/g, "")
      .split(" ")
      .map(function (d) {
        return { text: d, size: 10 + Math.random() * 60 };
      });
  }
  
  //This method tells the word cloud to redraw with a new set of words.
  //In reality the new words would probably come from a server request,
  // user input or some other source.
  function showNewWords(vis, i) {
    i = i || 0;
  
    vis.update(getWords(i++ % words.length));
    setTimeout(function () {
      showNewWords(vis, i + 1);
    }, options.switchInterval);
  }
}
