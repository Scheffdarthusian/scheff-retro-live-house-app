import React, { useEffect } from "react";
import TypeIt from "typeit";

const TitleTypewriter = () => {
  useEffect(() => {
    new TypeIt("#title", {
      lifeLike: false,
      speed: 0,
    })
      .type("r")
      .pause(253)
      .delete(1)
      .pause(138)
      .delete(1)
      .pause(461)
      .type("R")
      .pause(211)
      .type("e")
      .pause(296)
      .type("t")
      .pause(149)
      .type("r")
      .pause(143)
      .type("o")
      .pause(907)
      .type(" ")
      .pause(320)
      .type("L")
      .pause(197)
      .type("i")
      .pause(90)
      .type("v")
      .pause(117)
      .type("e")
      .pause(155)
      .type(" ")
      .pause(415)
      .type("H")
      .pause(222)
      .type("o")
      .pause(96)
      .type("u")
      .pause(87)
      .type("s")
      .pause(129)
      .type("e")
      .go();
  }, []);

  return (
    <h1 id="title" style={{ fontFamily: "sans-serif", fontWeight: "280", textAlign: "left", margin: "30px 30px", fontSize: "100px", color: "white" }}>
      {/* Initial empty content; TypeIt will replace this */}
    </h1>
  );
};

export default TitleTypewriter;
