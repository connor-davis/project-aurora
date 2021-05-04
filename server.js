let express = require("express");
let next = require("next");

let dev = process.env.NODE_ENV !== "production";
let app = next({ dev });
let handle = app.getRequestHandler();

app
  .prepare()
  .then(() => {
    let server = express();

    // server.use("/api", api);

    server.get("*", (request, response) => {
      return handle(request, response);
    });

    server.listen(3000, () => {
      console.log("> Ready on http://localhost:3000");
    });
  })
  .catch((error) => {
    console.error(error.stack);
    process.exit(1);
  });
