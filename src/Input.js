import React, { useState } from "react";

export default function Input() {
  const [text, setText] = useState();
  return <input onChange={(e) => setText(e.currentTarget.value)} />;
}
